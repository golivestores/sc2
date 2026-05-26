window.addEventListener("load", function () {
  if (!window.Shopify || !window.Shopify.loadFeatures) return;

  function initializeConsent() {
    document.addEventListener("cookieyes_consent_update", updateShopifyConsent);
    document.addEventListener("cookieyes_banner_load", updateShopifyConsent);
    updateShopifyConsent();
  }

  window.Shopify.loadFeatures(
    [
      {
        name: "consent-tracking-api",
        version: "0.1",
      },
    ],
    initializeConsent
  );

  function updateShopifyConsent(metaData) {
    let applicableLaw = "";
    let categories = {};
    let consentDataAvailable = false;

    if (typeof window.getCkyConsent === "function") {
      const consentData = window.getCkyConsent();
      if (consentData) {
        applicableLaw = consentData.activeLaw;
        categories = consentData.categories;
        consentDataAvailable = true;
      }
    } else if (
      metaData &&
      metaData.detail &&
      window.cookieyes &&
      window.cookieyes._ckyStore &&
      window.cookieyes._ckyStore._bannerConfig
    ) {
      applicableLaw = window.cookieyes._ckyStore._bannerConfig.activeLaw;
      metaData.detail.accepted.forEach((category) => {
        categories[category] = true;
      });
      metaData.detail.rejected.forEach((category) => {
        categories[category] = false;
      });
      consentDataAvailable = true;
    }

    if (!consentDataAvailable) {
      return;
    }

    if (applicableLaw === "gdpr") {
      const isTrackingAccepted = categories["analytics"] ?? false;
      const isMarketingAccepted = categories["advertisement"] ?? false;
      const isFunctionalAccepted = categories["functional"] ?? false;

      window.Shopify.customerPrivacy.setTrackingConsent(
        {
          analytics: isTrackingAccepted,
          marketing: isMarketingAccepted,
          preferences: isFunctionalAccepted,
        },
        _ckyNoop
      );
    } else if (applicableLaw === "ccpa") {
      const isCCPAAccepted = Object.values(categories).every(
        (value) => value === true
      );
      window.Shopify.customerPrivacy.setTrackingConsent(
        { sale_of_data: isCCPAAccepted },
        _ckyNoop
      );
    } else if (applicableLaw === "") {
      window.Shopify.customerPrivacy.setTrackingConsent(
        {
          analytics: true,
          marketing: true,
          preferences: true,
          sale_of_data: true,
        },
        _ckyNoop
      );
    }
  }
  function _ckyNoop() {}
});
