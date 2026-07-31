---
name: Nuxt/Spline mirrors must be packaged with local base paths, Spline scenes, and Draco
description: Lessons from 090-flowty/Himax. Mac packages for Nuxt sites with Spline/WebGL must rewrite project preview paths, include .splinecode and Draco decoder assets, and be validated from the extracted zip under a local HTTP server.
type: feedback
originSessionId: 090-flowty-2026-07-10
---

# Nuxt/Spline Mac Package Rule

This is mandatory for future `designs/NNN-*` full-site packages, especially Nuxt sites with Spline/WebGL.

## What Failed

The source preview worked at:

`http://127.0.0.1:8080/designs/090-flowty/index.html`

But a Mac package serves `site/` as the web root:

`http://127.0.0.1:<port>/index.html`

That changes every root-relative and base-relative path. If the package keeps paths like `/designs/090-flowty/spline/phone.splinecode`, `/designs/090-flowty/draco/draco_decoder.wasm`, or `<base href="/designs/090-flowty/">`, the Mac colleague sees missing 3D or broken assets even though the source preview looked correct.

## Required Packaging Behavior

- Rewrite `<base href="/designs/NNN-slug/">` to `<base href="/">` inside the packaged `site/index.html`.
- Rewrite any text reference to `/designs/NNN-slug/...` to `/...` in packaged HTML/CSS/JS/JSON/SVG/XML.
- Do not limit path rewriting to `assets/`; Nuxt `_nuxt/`, Spline `spline/`, Draco `draco/`, `video/`, and `cdn-cgi/` also matter.
- Include every `.splinecode` referenced by chunks, not just the one seen in HTML.
- Include Draco decoder files if Spline runtime requests them:
  - `draco_wasm_wrapper.js`
  - `draco_decoder.wasm`
  - `draco_decoder.js`
- Patch Spline runtime decoder path to the local package path before packaging.
- Validate from a freshly extracted zip, not from the source directory.
- Validate through local HTTP only. `file://` is not an acceptable delivery path for Nuxt/WebGL/Spline mirrors.

## Required Validation

Run a browser check against the extracted package with external requests blocked or observed:

- `index.html` returns 200.
- Key JS/CSS/Spline/Draco resources return 200 from `127.0.0.1`.
- Broken images count is 0.
- Non-analytics local 4xx/requestfailed count is 0.
- At least one Spline/WebGL canvas is created, has real viewport dimensions, and is visible.
- Screenshot shows the actual 3D object, not just an empty black area or a loading shell.

## Script Status

`package-mac-site.py` has been updated after 090-flowty:

- It rewrites `<base href="/designs/<source>/">` to `<base href="/">`.
- It rewrites all `/designs/<source>/...` packaged text references to `/...`.
- It treats root paths with file extensions as local files during reference validation instead of misclassifying them as route fallback.
- It still creates a Mac-friendly package with `open-on-mac.command`, `README-MAC.txt`, `README-CODEX.txt`, executable zip permissions, and extracted-zip validation.

