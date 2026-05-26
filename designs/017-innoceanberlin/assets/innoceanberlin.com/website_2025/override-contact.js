/**
 * Contact page override — fix copy and emails after React renders.
 *
 * Edit CONTACT_OVERRIDES (emails + mailto) and CONTACT_TEXT_FIXES (plain text).
 * Loaded from index.html like override-about.js.
 */

(function () {
  'use strict';

  var CONTACT_OVERRIDES = [
    {
      from: 'c.kritscher@innocean.eu',
      to: 'newbiz@innocean.eu',
    },
  ];

  var CONTACT_TEXT_FIXES = [
    { from: 'New bussiness', to: 'New business' },
  ];

  function waitForReactApp() {
    return new Promise(function (resolve) {
      var checkInterval = setInterval(function () {
        var root = document.getElementById('root');
        if (root && root.children.length > 0) {
          clearInterval(checkInterval);
          setTimeout(resolve, 1000);
        }
      }, 100);

      setTimeout(function () {
        clearInterval(checkInterval);
        resolve();
      }, 10000);
    });
  }

  function isContactPath() {
    return /\/contact\/?/i.test(location.pathname);
  }

  function applyOverrides() {
    if (!isContactPath()) {
      return;
    }

    var root = document.getElementById('root');
    var scope = root || document.body;
    var changed = 0;

    CONTACT_OVERRIDES.forEach(function (map) {
      var from = map.from;
      var to = map.to;
      if (!from || !to) return;

      var mailFrom = 'mailto:' + from;
      var mailTo = 'mailto:' + to;

      scope.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
        var href = a.getAttribute('href') || '';
        if (href === mailFrom || href.indexOf(from) !== -1) {
          a.setAttribute('href', mailTo);
          changed++;
        }
      });

      var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (node.textContent && node.textContent.indexOf(from) !== -1) {
          node.textContent = node.textContent.split(from).join(to);
          changed++;
        }
      }
    });

    CONTACT_TEXT_FIXES.forEach(function (map) {
      var from = map.from;
      var to = map.to;
      if (!from || !to) return;

      var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while ((node = walker.nextNode())) {
        if (node.textContent && node.textContent.indexOf(from) !== -1) {
          node.textContent = node.textContent.split(from).join(to);
          changed++;
        }
      }
    });

    if (changed) {
      console.log('Contact override: applied ' + changed + ' update(s).');
    }
  }

  function runContactOverride() {
    waitForReactApp().then(function () {
      applyOverrides();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runContactOverride);
  } else {
    runContactOverride();
  }

  var lastUrl = location.href;
  new MutationObserver(function () {
    var url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (isContactPath()) {
        setTimeout(applyOverrides, 500);
      }
    }
  }).observe(document, { subtree: true, childList: true });
})();
