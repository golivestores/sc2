(() => {
  window.decagonEmbed =
    window.decagonEmbed ||
    (function () {
      const iframe = document.createElement("iframe"); // private
      let isLoaded = false;

      const sendMessageSafely = (message) => {
        if (isLoaded) {
          iframe.contentWindow.postMessage(message, "https://decagon.ai");
        } else {
          window.addEventListener(
            "decagonloadembed",
            () => {
              iframe.contentWindow.postMessage(message, "https://decagon.ai");
            },
            { once: true },
          );
        }
      };

      const callbacks = {
        onMetadataRequest: null, // Stores user's callback for REQUEST_METADATA
      };

      const processMetadataResponse = async (response) => {
        try {
          if (response.ok) {
            sendMessageSafely({
              metadataRequestResult: { data: response, ok: true },
            });
            return;
          }

          const errorType = [401, 403].includes(response.status)
            ? "NOT_LOGGED_IN"
            : "UNKNOWN_ERROR";

          sendMessageSafely({
            metadataRequestResult: { data: [], ok: false, error: errorType },
          });
        } catch (err) {
          sendMessageSafely({
            metadataRequestResult: { data: [], ok: false, error: "ERROR" },
          });
        }
      };

      // -- CUSTOM START --
      function updateAppearance() {
        const appearance =
          document.documentElement.getAttribute("data-appearance");
        sendMessageSafely({ theme: { appearance } });
      }

      const themeObserver = new MutationObserver(updateAppearance);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-appearance"],
      });
      // Set up initial sync
      updateAppearance();
      // -- CUSTOM END --

      return {
        init: function () {
          const loadEmbed = () => {
            iframe.allowFullscreen = true;
            iframe.allow = "fullscreen";
            const iframeStyle = iframe.style;

            iframeStyle.boxSizing = "borderBox";
            iframeStyle.right = 0;
            iframeStyle.bottom = 0;
            iframeStyle.border = 0;
            iframeStyle.margin = 0;
            iframeStyle.padding = 0;
            iframeStyle.zIndex = 99999999;
            iframeStyle.display = "none";
            iframeStyle.outline = "none";
            iframeStyle.width = `100%`;
            iframeStyle.height = `100%`;

            iframe.addEventListener("load", () => {
              iframe.style.display = "block";
            });

            let embedUrl = `https://decagon.ai/embed/oura`;
            if (
              [
                "ouraring.com",
                "ourasandbox.com",
                "ourastaging.com",
                "ourasandbox.com",
              ].includes(window.location.hostname) &&
              window.location.hostname != "support.ouraring.com"
            ) {
              embedUrl += `?theme=oura_restricted`;
            }

            iframe.src = embedUrl;

            const containerEl = document.getElementById(
              "decagon-embed-container",
            );
            if (!containerEl) return;

            containerEl.appendChild(iframe);

            window.addEventListener("message", function (e) {
              const key = e.message ? "message" : "data";
              const data = e[key];

              if (typeof data !== "object") return;

              if (data.type === "DECAGON_LOADED") {
                if (isLoaded) return;
                window.dispatchEvent(new CustomEvent("decagonloadembed"));
                isLoaded = true;

                // Emit event to notify the event listener that the widget has loaded
                window.dispatchEvent(
                  new MessageEvent("message", {
                    data: {
                      type: "DECAGON_EVENT",
                      payload: {
                        eventName: "DECAGON_LOADED",
                      },
                    },
                  }),
                );
              } else if (data.type === "DECAGON_ACTIVE") {
                // Add metadata to track device type based on browser width
                sendMessageSafely({
                  addMetadata: { browser_device_type: browserDeviceType },
                });
              } else if (
                data.type === "REQUEST_METADATA" &&
                callbacks.onMetadataRequest
              ) {
                callbacks.onMetadataRequest(data.payload, async (response) => {
                  processMetadataResponse(response);
                });
              }
            });
          };

          if (document.readyState === "complete") {
            loadEmbed();
          } else {
            document.addEventListener("readystatechange", () => {
              if (document.readyState === "complete") {
                loadEmbed();
              }
            });
          }
        },
        setMetadata: function (metadata) {
          sendMessageSafely({ metadata });
        },
        setUserIdAuth: function (signature, epoch) {
          sendMessageSafely({ userIdAuth: { signature, epoch } });
        },
        setUserId: function (userId) {
          sendMessageSafely({ userId });
        },
        setInitialUserMessage: function (initialUserMessage) {
          sendMessageSafely({ initialUserMessage });
        },
        setChatSessionDuration: function (durationInHours) {
          sendMessageSafely({ chatSessionDuration: durationInHours });
        },
        isReady: function () {
          return isLoaded;
        },
        setConversation: function (conversationId) {
          sendMessageSafely({ conversationId });
        },
        setTriggerMessage: function (triggerMessage, isProactive = false) {
          sendMessageSafely({ triggerMessage, isProactive });
        },
        startNewConversation: function () {
          sendMessageSafely({ startNewConversation: true });
        },
        setMetadataRequestListener: function (callback) {
          callbacks.onMetadataRequest = callback;
        },
        sendMessage: function (sdkMessage) {
          sendMessageSafely({ sdkMessage });
        },
        setLocalizationData: function (localizationData) {
          sendMessageSafely({ localizationData });
        },
        setEventListener: function (callback) {
          window.addEventListener("message", function (e) {
            const key = e.message ? "message" : "data";
            const data = e[key];

            const allowedTypes = ["USER_ACTION", "DECAGON_EVENT"];
            if (
              typeof data === "object" &&
              allowedTypes.includes(data.type) &&
              data.payload
            ) {
              callback(data.payload);
            }
          });
        },
      };
    })();

  window.decagonEmbed.init();
})();
