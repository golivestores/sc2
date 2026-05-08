
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.BGEdQoKJ.js","/cdn/shopifycloud/checkout-web/assets/c1/app.CI7WX3Qu.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.DT7LdZt3.js","/cdn/shopifycloud/checkout-web/assets/c1/browser.DUHnKAN1.js","/cdn/shopifycloud/checkout-web/assets/c1/phone-phoneCountryCode.DFn20R0p.js","/cdn/shopifycloud/checkout-web/assets/c1/types-ModalOrigin.C3pgGwDv.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useReplaceShopPayInHistory.Cqc0eKLg.js","/cdn/shopifycloud/checkout-web/assets/c1/purchasing-company-isValidPurchasingCompanyBillingAddress.Cc5D7haV.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-shared.DOhKRuik.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound.C8sSi_j_.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors.D2cjzQPG.js","/cdn/shopifycloud/checkout-web/assets/c1/FullScreenBackground.DUWVa1pF.js","/cdn/shopifycloud/checkout-web/assets/c1/events-shared.C-dpl-VC.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon.C_eXYJRt.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon.D2Fpq5Mq.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.3QnNyRgQ.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage.CCm_TzLq.js","/cdn/shopifycloud/checkout-web/assets/c1/MarketsProDisclaimer.Cna_Dg5O.js","/cdn/shopifycloud/checkout-web/assets/c1/CrossBorderConsolidation.Bqo_Vh86.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSubscribeMessenger.BLVtcyCt.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocation.CXxE0tD5.js","/cdn/shopifycloud/checkout-web/assets/c1/Page.VovI15rv.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons.DLndyQrK.js","/cdn/shopifycloud/checkout-web/assets/c1/OffsitePaymentFailed.W6adRJaY.js","/cdn/shopifycloud/checkout-web/assets/c1/AmazonPayButton.De7W9Dod.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useSuppressShopPayModalOnLoad.Duqn5CL3.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.Dj3NH39l.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine.nWOu5Gbi.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview.BxlSEhZp.js","/cdn/shopifycloud/checkout-web/assets/c1/PickupPointCarrierLogo.CgoXsY_C.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayNegotiationIntercept-helpers.DJ2dRBr9.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.DeCfNBCH.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField.5yLnstVT.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.DzenEJvq.js","/cdn/shopifycloud/checkout-web/assets/c1/paypal-express-usePayPalPaymentErrorHandler.B6uuEIFy.js","/cdn/shopifycloud/checkout-web/assets/c1/RememberMeDescriptionText.AzjlKm_i.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.D4ty8-Lb.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayOptInDisclaimer.Clv8PTZP.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary.BpSZ1uv0.js","/cdn/shopifycloud/checkout-web/assets/c1/OrderEditVaultedDelivery.BevOph-a.js","/cdn/shopifycloud/checkout-web/assets/c1/SeparatePaymentsNotice.BHBukRnT.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayInstallmentsUkHoldoutExperiment.D1MSuUlo.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.hzskrXa8.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants.DRfgdvWl.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.6JLF60JL.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.CIdoOSF4.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions.i1WeotZh.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.DdxQGI6c.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.Bt97c7va.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options.PtRlWMmu.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.CBYtFLOU.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.D0waP8Px.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.CfAhKPz4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/phoneCountryCode._rd0li_4.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/FullScreenBackground.CgbmfY9l.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/shared.CEMlQpma.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.BVsfwQv1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/CrossBorderConsolidation.B9NnUP55.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/LocalizationExtensionField.zKSsYRoI.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MobileOrderSummary.Cko1fUoG.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OrderEditVaultedDelivery.CSQKPDv7.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/usePayPalPaymentErrorHandler.1xZZnAMV.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/AmazonPayButton.uqpm88mq.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useSubscribeMessenger.BrcQzLuH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DutyOptions.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PickupPointCarrierLogo.cbVP6Hp_.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingMethodSelector.B0hio2RO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/SubscriptionPriceBreakdown.BSemv9tH.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Page.BYM12A8B.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OffsitePaymentFailed.BxwwfmsJ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StackedMerchandisePreview.D6OuIVjc.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0926/5387/9670/files/OMR_LOGO_BLACK_HORIZONTAL_1_x320.png?v=1765379051"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  