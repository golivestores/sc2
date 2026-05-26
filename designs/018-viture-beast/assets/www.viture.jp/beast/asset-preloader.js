// @ts-check

// asset-preloader.js
// standalone script that runs before react to track loading of critical assets
// preloads all frame sequence images (intro, trans_1, trans_3) for current device only;
// frame counts must match IntroSequence + Section3 (app/(sections)/(components)/intro-sequence, section3)
// uses spring physics for smooth progress bar animation

/**
 * @typedef {{
 *   progress: number
 *   displayedProgress: number
 *   onProgress: (callback: (progress: number) => void) => void
 *   allReady: Promise<void>
 *   getStatus: () => AssetPreloaderStatus
 * }} AssetPreloader
 */

/**
 * @typedef {{
 *   actualProgress: string
 *   displayedProgress: string
 *   assetsLoaded: number
 *   totalAssets: number
 *   allAssetsReady: boolean
 *   hasResolved: boolean
 *   elapsed: string
 * }} AssetPreloaderStatus
 */

;(() => {
	/** @type {Window & { assetPreloader?: AssetPreloader }} */
	const win = window

	// spring physics config
	// same tuning as the cyberpunk site — critically/slightly overdamped for no overshoot
	const SPRING_STIFFNESS = 100
	const SPRING_DAMPING = 30
	const SPRING_MASS = 1
	const SPRING_REST_VELOCITY = 0.0001
	const SPRING_REST_DISPLACEMENT = 0.0001
	// ease-in: ramp up stiffness over this duration when target changes
	const STIFFNESS_RAMP_MS = 400
	const IMAGE_TIMEOUT_MS = 15000

	const LOG_PREFIX = "[asset-preloader]"
	/** @param {...unknown} args */
	const log = (...args) => console.log(LOG_PREFIX, ...args)

	if (win.assetPreloader) {
		log("already initialized, reusing existing instance")
		return
	}

	log("initializing standalone asset preloader script")
	log(
		`config: spring(stiffness=${SPRING_STIFFNESS}, damping=${SPRING_DAMPING}, ramp=${STIFFNESS_RAMP_MS}ms)`,
	)
	const startTime = performance.now()

	// detect mobile using the same breakpoint as the app (800px, see styles/layout.mjs)
	const isMobile = window.matchMedia("(max-width: 799px)").matches
	log(`device: ${isMobile ? "mobile" : "desktop"}`)

	// frame counts must match IntroSequence and Section3 exactly
	const sequences = [
		{
			name: "in",
			desktop: { length: 90, url: (i) => `assets/www.viture.jp/beast/sequences/in/${i + 1}.webp` },
			mobile: { length: 45, url: (i) => `assets/www.viture.jp/beast/sequences/in-mobile/${i * 2 + 1}.webp` },
		},
		{
			name: "trans_1",
			desktop: { length: 165, url: (i) => `assets/www.viture.jp/beast/sequences/trans_1/${i + 1}.avif` },
			mobile: { length: 165, url: (i) => `assets/www.viture.jp/beast/sequences/trans_1-mobile/${i + 1}.avif` },
		},
		{
			name: "trans_3",
			desktop: { length: 241, url: (i) => `assets/www.viture.jp/beast/sequences/trans_3/${i + 1}.avif` },
			mobile: { length: 241, url: (i) => `assets/www.viture.jp/beast/sequences/trans_3-mobile/${i + 1}.avif` },
		},
	]

	const totalAssets = sequences.reduce(
		(sum, seq) => sum + (isMobile ? seq.mobile.length : seq.desktop.length),
		0,
	)
	const allUrls = sequences.flatMap((seq) => {
		const { length, url } = isMobile ? seq.mobile : seq.desktop
		return Array.from({ length }, (_, i) => url(i))
	})
	let loadedAssets = 0
	/** actual progress (jumps immediately as images load) */
	let progress = 0
	/** smoothly animated progress driven by spring physics */
	let displayedProgress = 0
	let hasResolved = false
	let allAssetsReady = false

	/** @type {((progress: number) => void)[]} */
	const callbacks = []

	/** @type {{ promise: Promise<void>, resolve: () => void, reject: (reason?: unknown) => void }} */
	const allReadyResolvers = /** @type {any} */ (Promise).withResolvers()

	log(`preloading ${totalAssets} sequence frames (${sequences.map((s) => s.name).join(", ")})`)

	// spring physics state
	let springVelocity = 0
	let lastFrameTime = performance.now()
	let lastTargetValue = 0
	/** @type {number | null} */
	let targetChangeTime = null

	/**
	 * spring physics animation loop
	 * uses a damped harmonic oscillator to smoothly follow actual progress
	 */
	function animateProgress() {
		const now = performance.now()
		// cap dt to avoid huge jumps if tab was backgrounded
		const dt = Math.min((now - lastFrameTime) / 1000, 0.1)
		lastFrameTime = now

		// detect when target changes to start the ease-in ramp
		if (progress !== lastTargetValue) {
			targetChangeTime = now
			lastTargetValue = progress
		}

		if (
			displayedProgress !== progress ||
			Math.abs(springVelocity) > SPRING_REST_VELOCITY
		) {
			const displacement = displayedProgress - progress

			// ease-in: ramp stiffness from 0 to full over STIFFNESS_RAMP_MS
			let easeInFactor = 1
			if (targetChangeTime !== null) {
				const timeSinceChange = now - targetChangeTime
				const t = Math.min(timeSinceChange / STIFFNESS_RAMP_MS, 1)
				easeInFactor = t * t // quadratic ease-in
			}
			const effectiveStiffness = SPRING_STIFFNESS * easeInFactor

			// spring force: F = -kx (hooke's law)
			const springForce = -effectiveStiffness * displacement
			// damping force: F = -cv
			const dampingForce = -SPRING_DAMPING * springVelocity
			// a = F/m
			const acceleration = (springForce + dampingForce) / SPRING_MASS

			springVelocity += acceleration * dt
			displayedProgress += springVelocity * dt

			displayedProgress = Math.max(0, Math.min(1, displayedProgress))

			// settle when close enough and moving slowly
			if (
				Math.abs(displacement) < SPRING_REST_DISPLACEMENT &&
				Math.abs(springVelocity) < SPRING_REST_VELOCITY
			) {
				displayedProgress = progress
				springVelocity = 0
			}

			// update the progress bar element directly (bypasses react)
			// the element is identified by data-preload-progress attribute on the section1 progress bar
			const bar = /** @type {HTMLElement | null} */ (
				document.querySelector("[data-preload-progress]")
			)
			if (bar) {
				bar.style.transform = `translateX(${(displayedProgress - 1) * 100}%)`
			}
		}

		// resolve when all assets ready AND spring has settled at 100%
		const isSettled =
			Math.abs(springVelocity) < SPRING_REST_VELOCITY &&
			Math.abs(displayedProgress - progress) < SPRING_REST_DISPLACEMENT
		if (allAssetsReady && !hasResolved && progress >= 1 && isSettled) {
			hasResolved = true
			const elapsed = (performance.now() - startTime).toFixed(0)
			log(`all assets ready, spring settled after ${elapsed}ms`)
			allReadyResolvers.resolve()
		}

		requestAnimationFrame(animateProgress)
	}
	// start the animation loop immediately
	requestAnimationFrame(animateProgress)

	/** recalculates progress based on loaded asset count */
	function recalculate() {
		const oldProgress = progress
		progress = totalAssets > 0 ? loadedAssets / totalAssets : 0

		if (progress !== oldProgress) {
			log(
				`progress: ${(progress * 100).toFixed(1)}% | ${loadedAssets}/${totalAssets} assets`,
			)
		}

		for (const cb of callbacks) cb(progress)

		if (!allAssetsReady && loadedAssets >= totalAssets && totalAssets > 0) {
			allAssetsReady = true
			const elapsed = (performance.now() - startTime).toFixed(0)
			log(
				`all assets loaded in ${elapsed}ms, waiting for spring to settle...`,
			)
		}
	}

	// preload only the current device's sequence URLs (no desktop on mobile or vice versa)
	for (const url of allUrls) {
		const img = new Image()
		let settled = false
		const finish = () => {
			if (settled) return
			settled = true
			loadedAssets++
			recalculate()
		}
		const timeoutId = window.setTimeout(() => {
			log(`timed out while loading: ${url}`)
			finish()
		}, IMAGE_TIMEOUT_MS)
		img.onload = () => {
			window.clearTimeout(timeoutId)
			finish()
		}
		img.onerror = () => {
			// count errors as loaded so we don't block the preloader forever
			log(`failed to load: ${url}`)
			window.clearTimeout(timeoutId)
			finish()
		}
		img.src = url
	}

	/** @param {(progress: number) => void} callback */
	function onProgress(callback) {
		callbacks.push(callback)
		callback(progress)
	}

	/** @type {AssetPreloader} */
	const assetPreloader = {
		get progress() {
			return progress
		},
		get displayedProgress() {
			return displayedProgress
		},
		onProgress,
		allReady: allReadyResolvers.promise,
		getStatus: () => ({
			actualProgress: `${(progress * 100).toFixed(1)}%`,
			displayedProgress: `${(displayedProgress * 100).toFixed(1)}%`,
			assetsLoaded: loadedAssets,
			totalAssets,
			allAssetsReady,
			hasResolved,
			elapsed: `${(performance.now() - startTime).toFixed(0)}ms`,
		}),
	}

	win.assetPreloader = assetPreloader

	log("initialization complete, window.assetPreloader exposed")
	log("tip: call window.assetPreloader.getStatus() to see current state")
})()
