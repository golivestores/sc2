(function () {
  if (window.__sc2PodiumBridgeEffect) return;
  window.__sc2PodiumBridgeEffect = true;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function smooth(edge0, edge1, value) {
    var t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function install() {
    if (!document.body || document.getElementById('sc2-podium-bridge-effect')) return;

    var style = document.createElement('style');
    style.id = 'sc2-podium-bridge-effect';
    style.textContent = [
      ':root{--sc2-bridge-wash:0;--sc2-header-color:#000;--sc2-letter-progress:0;--sc2-copy-progress:.74;--sc2-copy-opacity:1;--sc2-source-copy-opacity:0;--sc2-canvas-scale:1;--sc2-canvas-x:0px;--sc2-canvas-y:0px}',
      '#sc2-bridge-wash{display:none!important}',
      '#sc2-bridge-particles{display:none!important}',
      '#sc2-bridge-copy{position:fixed;left:30px;right:30px;bottom:26px;z-index:51;pointer-events:none;color:#000;opacity:var(--sc2-copy-opacity);font-weight:900;text-transform:uppercase;line-height:.88;letter-spacing:0;display:flex;align-items:flex-end;justify-content:space-between}',
      '#sc2-bridge-copy-main{max-width:760px;font-size:clamp(28px,2.05vw,40px)}',
      '#sc2-bridge-copy-scroll{font-size:clamp(14px,.9vw,18px);line-height:.86;text-align:right}',
      '#sc2-bridge-copy .sc2-copy-letter{display:inline-block;will-change:transform,opacity,filter;transform:translate3d(calc(var(--sc2-copy-progress) * var(--sc2-dx,0) * 1px),calc(var(--sc2-copy-progress) * var(--sc2-dy,0) * 1px),0) rotate(calc(var(--sc2-copy-progress) * var(--sc2-rot,0) * 1deg));opacity:calc(1 - var(--sc2-copy-progress) * var(--sc2-fade,.36));filter:blur(calc(var(--sc2-copy-progress) * .28px))}',
      '#sc2-bridge-copy .sc2-copy-space{display:inline-block;width:.34em}',
      'body.sc2-bridge-active header,body.sc2-bridge-active header *{color:var(--sc2-header-color)!important}',
      'body.sc2-bridge-active #global-canvas{filter:none!important}',
      '.sc2-split-effect{white-space:pre-wrap;opacity:var(--sc2-source-copy-opacity);transition:opacity .08s linear}',
      '.sc2-split-effect .char,.sc2-split-effect .sc2-letter{display:inline-block;will-change:transform,opacity,filter;color:currentColor;transform:translate3d(calc(var(--sc2-letter-progress) * var(--sc2-dx,0) * 1px),calc(var(--sc2-letter-progress) * var(--sc2-dy,0) * 1px),0) rotate(calc(var(--sc2-letter-progress) * var(--sc2-rot,0) * 1deg));opacity:calc(1 - var(--sc2-letter-progress) * var(--sc2-fade,.62));filter:blur(calc(var(--sc2-letter-progress) * .45px))}',
      '.sc2-split-effect .sc2-space{display:inline-block;width:.34em}',
      '@media (max-width:700px){#sc2-bridge-copy{left:14px;right:14px;bottom:18px;display:block}#sc2-bridge-copy-main{max-width:100%;font-size:clamp(18px,6.4vw,26px)}#sc2-bridge-copy-scroll{position:absolute;right:0;bottom:0;font-size:12px}.sc2-split-effect .char,.sc2-split-effect .sc2-letter{transform:translate3d(calc(var(--sc2-letter-progress) * var(--sc2-dx,0) * .58px),calc(var(--sc2-letter-progress) * var(--sc2-dy,0) * .58px),0) rotate(calc(var(--sc2-letter-progress) * var(--sc2-rot,0) * .65deg))}}'
    ].join('');
    document.head.appendChild(style);

    var particles = document.createElement('canvas');
    particles.id = 'sc2-bridge-particles';
    var copy = document.createElement('div');
    copy.id = 'sc2-bridge-copy';
    var copyMain = document.createElement('div');
    copyMain.id = 'sc2-bridge-copy-main';
    var copyScroll = document.createElement('div');
    copyScroll.id = 'sc2-bridge-copy-scroll';
    copy.appendChild(copyMain);
    copy.appendChild(copyScroll);
    document.documentElement.appendChild(particles);
    document.documentElement.appendChild(copy);

    var ctx = particles.getContext('2d');
    var dpr = 1;
    var dots = buildDots();
    var ticking = false;
    var preparedText = false;

    function buildDots() {
      var result = [];
      for (var i = 0; i < 760; i++) {
        var a = i * 12.9898;
        var b = Math.sin(a) * 43758.5453;
        var c = Math.sin(a * 1.731) * 24634.6345;
        var r = Math.sqrt(Math.abs(b % 1)) * 96;
        var theta = Math.abs(c % 1) * Math.PI * 2;
        result.push({
          ox: Math.cos(theta) * r,
          oy: Math.sin(theta) * r * 0.72,
          sx: ((Math.abs(Math.sin(a * 2.41)) % 1) - 0.5) * 420,
          sy: ((Math.abs(Math.sin(a * 3.19)) % 1) - 0.5) * 260,
          size: 1 + (Math.abs(Math.sin(a * 4.7)) % 1) * 2.6,
          shade: Math.abs(Math.sin(a * 5.11)) > 0.78 ? 255 : 0
        });
      }
      return result;
    }

    function resizeParticles() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      particles.width = Math.max(1, Math.round(window.innerWidth * dpr));
      particles.height = Math.max(1, Math.round(window.innerHeight * dpr));
      particles.style.width = window.innerWidth + 'px';
      particles.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function smallestTextElement(match) {
      var all = Array.prototype.slice.call(document.querySelectorAll('h1,h2,p,span,div'));
      var best = null;
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        if (el.dataset.sc2Split === '1') continue;
        if (el.children.length > 8 || el.closest('header') || el.closest('#mobile-menu') || el.closest('#sc2-bridge-copy')) continue;
        var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || !match(text)) continue;
        if (!best || (el.textContent || '').length < (best.textContent || '').length) best = el;
      }
      return best;
    }

    function bestExistingCharElement(match) {
      var all = Array.prototype.slice.call(document.querySelectorAll('h1,h2,p,span,div'));
      var best = null;
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        if (el.closest('header') || el.closest('#mobile-menu') || el.closest('#sc2-bridge-copy')) continue;
        var chars = el.querySelectorAll('.char');
        if (!chars.length) continue;
        var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || !match(text, el)) continue;
        var rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (!best || chars.length > best.querySelectorAll('.char').length) best = el;
      }
      return best;
    }

    function tagExistingChars(el, strength) {
      if (!el) return false;
      var chars = Array.prototype.slice.call(el.querySelectorAll('.char'));
      if (!chars.length) return false;
      if (el.dataset.sc2Split === '1' && el.querySelectorAll('.sc2-letter').length === chars.length) return false;
      el.dataset.sc2Split = '1';
      el.classList.add('sc2-split-effect');
      for (var i = 0; i < chars.length; i++) {
        var span = chars[i];
        var ch = span.textContent || '';
        var seed = (i * 1103515245 + (ch.charCodeAt(0) || 17) * 97) >>> 0;
        var rx = (seed % 200) / 100 - 1;
        var ry = (((seed / 200) | 0) % 200) / 100 - 1;
        span.classList.add('sc2-letter');
        span.style.setProperty('--sc2-dx', (rx * 54 * strength).toFixed(2));
        span.style.setProperty('--sc2-dy', (ry * 26 * strength).toFixed(2));
        span.style.setProperty('--sc2-rot', (rx * 6 * strength).toFixed(2));
        span.style.setProperty('--sc2-fade', (0.42 + Math.abs(rx) * 0.35).toFixed(2));
      }
      return true;
    }

    function refreshTaggedText() {
      var heroTarget = document.querySelector('.c-hero_text') || bestExistingCharElement(function (text) {
        return text.indexOf('WE OFFER CREATIVE DIRECTION') === 0;
      });
      tagExistingChars(heroTarget, 1);
      var scrollTarget = bestExistingCharElement(function (text, el) {
        var rect = el.getBoundingClientRect();
        return text === 'SCROLL DOWN' && rect.top > window.innerHeight * 0.5;
      });
      tagExistingChars(scrollTarget, 1.35);
    }

    function splitLetters(el, strength) {
      if (!el || el.dataset.sc2Split === '1') return false;
      var text = el.textContent || '';
      if (!text.trim()) return false;
      el.dataset.sc2Split = '1';
      el.classList.add('sc2-split-effect');
      el.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        var span = document.createElement('span');
        if (/\s/.test(ch)) {
          span.className = 'sc2-space';
          span.textContent = ch === '\n' ? '\n' : ' ';
        } else {
          var seed = (i * 1103515245 + text.charCodeAt(i) * 97) >>> 0;
          var rx = (seed % 200) / 100 - 1;
          var ry = (((seed / 200) | 0) % 200) / 100 - 1;
          span.className = 'sc2-letter';
          span.textContent = ch;
          span.style.setProperty('--sc2-dx', (rx * 54 * strength).toFixed(2));
          span.style.setProperty('--sc2-dy', (ry * 26 * strength).toFixed(2));
          span.style.setProperty('--sc2-rot', (rx * 6 * strength).toFixed(2));
          span.style.setProperty('--sc2-fade', (0.42 + Math.abs(rx) * 0.35).toFixed(2));
        }
        el.appendChild(span);
      }
      return true;
    }

    function fillCopyText(el, text, strength) {
      el.textContent = '';
      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === '\n') {
          el.appendChild(document.createElement('br'));
          continue;
        }
        var span = document.createElement('span');
        if (/\s/.test(ch)) {
          span.className = 'sc2-copy-space';
          span.textContent = ' ';
        } else {
          var seed = (i * 2654435761 + text.charCodeAt(i) * 131) >>> 0;
          var rx = (seed % 200) / 100 - 1;
          var ry = (((seed / 200) | 0) % 200) / 100 - 1;
          span.className = 'sc2-copy-letter';
          span.textContent = ch;
          span.style.setProperty('--sc2-dx', (rx * 46 * strength).toFixed(2));
          span.style.setProperty('--sc2-dy', (ry * 14 * strength).toFixed(2));
          span.style.setProperty('--sc2-rot', (rx * 4.5 * strength).toFixed(2));
          span.style.setProperty('--sc2-fade', (0.3 + Math.abs(rx) * 0.38).toFixed(2));
        }
        el.appendChild(span);
      }
    }

    function prepareText() {
      var heroTarget = document.querySelector('.c-hero_text') || bestExistingCharElement(function (text) {
        return text.indexOf('WE OFFER CREATIVE DIRECTION') === 0;
      });
      var hero = tagExistingChars(heroTarget, 1) || splitLetters(smallestTextElement(function (text) {
        return text.indexOf('WE OFFER CREATIVE DIRECTION') === 0;
      }), 1);
      var scrollTarget = bestExistingCharElement(function (text, el) {
        var rect = el.getBoundingClientRect();
        return text === 'SCROLL DOWN' && rect.top > window.innerHeight * 0.5;
      });
      var scroll = tagExistingChars(scrollTarget, 1.35) || splitLetters(smallestTextElement(function (text) {
        return text === 'SCROLL DOWN';
      }), 1.35);
      preparedText = preparedText || hero || scroll;
      requestUpdate();
    }

    function drawParticles(progress, opacity) {
      particles.style.opacity = opacity.toFixed(3);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (opacity < 0.02) return;

      var cx = window.innerWidth * (window.innerWidth < 700 ? 0.48 : 0.43);
      var cy = window.innerHeight * (window.innerWidth < 700 ? 0.42 : 0.49);
      var spread = smooth(0.1, 0.92, progress);
      for (var i = 0; i < dots.length; i++) {
        var dot = dots[i];
        var x = cx + dot.ox + dot.sx * spread;
        var y = cy + dot.oy + dot.sy * spread;
        var alpha = opacity * (1 - spread * 0.45) * (0.45 + (i % 7) / 10);
        ctx.fillStyle = 'rgba(' + dot.shade + ',' + dot.shade + ',' + dot.shade + ',' + alpha.toFixed(3) + ')';
        ctx.fillRect(x, y, dot.size, dot.size);
      }
    }

    function updateBridge() {
      ticking = false;
      refreshTaggedText();
      var unit = Math.max(1, window.innerHeight);
      var scrollUnit = window.scrollY / unit;
      var enter = smooth(0.06, 0.46, scrollUnit);
      var letterProgress = smooth(0.03, 0.34, scrollUnit) * (1 - smooth(1.25, 1.7, scrollUnit));
      var headerWhite = smooth(0.28, 0.82, scrollUnit) * (1 - smooth(2.55, 3.05, scrollUnit));
      var headerValue = Math.round(headerWhite * 255);
      var particleOpacity = 0;
      var copyProgress = 0.74 + smooth(0.02, 0.32, scrollUnit) * 0.21;
      var copyOpacity = 1 - smooth(0.36, 0.58, scrollUnit);
      var canvasScale = 1;
      var canvasY = 0;

      document.documentElement.style.setProperty('--sc2-bridge-wash', '0');
      document.documentElement.style.setProperty('--sc2-letter-progress', letterProgress.toFixed(3));
      document.documentElement.style.setProperty('--sc2-copy-progress', copyProgress.toFixed(3));
      document.documentElement.style.setProperty('--sc2-copy-opacity', copyOpacity.toFixed(3));
      document.documentElement.style.setProperty('--sc2-source-copy-opacity', (1 - copyOpacity).toFixed(3));
      document.documentElement.style.setProperty('--sc2-canvas-scale', canvasScale.toFixed(3));
      document.documentElement.style.setProperty('--sc2-canvas-y', canvasY.toFixed(1) + 'px');
      document.documentElement.style.setProperty('--sc2-canvas-x', '0px');
      document.documentElement.style.setProperty('--sc2-header-color', 'rgb(' + headerValue + ',' + headerValue + ',' + headerValue + ')');
      document.body.classList.toggle('sc2-bridge-active', scrollUnit > 0.02 && scrollUnit < 3.18);
      drawParticles(smooth(0.05, 0.8, scrollUnit), particleOpacity);
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateBridge);
    }

    resizeParticles();
    fillCopyText(copyMain, 'WE OFFER CREATIVE DIRECTION\n& PRODUCTION FOR ATHLETICISM.', 1);
    fillCopyText(copyScroll, 'SCROLL\nDOWN', 1.3);
    setTimeout(prepareText, 900);
    setTimeout(prepareText, 2200);
    setTimeout(prepareText, 5000);
    window.addEventListener('resize', function () {
      resizeParticles();
      requestUpdate();
    });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    requestUpdate();
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('scroll'));
      requestUpdate();
    }, 450);
    setTimeout(function () {
      window.dispatchEvent(new Event('scroll'));
      requestUpdate();
    }, 1400);

    if (!preparedText) prepareText();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(install, 2600);
    });
  } else {
    setTimeout(install, 2600);
  }
})();
