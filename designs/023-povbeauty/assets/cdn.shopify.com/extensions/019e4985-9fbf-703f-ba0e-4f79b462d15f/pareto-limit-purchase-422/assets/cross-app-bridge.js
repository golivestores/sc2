(function () {
  if (window.ParetoAppBridge) return; // Prevent duplicate init

  const CHANNEL = 'shopify-discount-limit-bridge';

  window.ParetoAppBridge = {
    _handlers: {},
    _channel: new BroadcastChannel(CHANNEL),

    init() {
      this._channel.onmessage = (e) => {
        const { event, data } = e.data;
        (this._handlers[event] || []).forEach(fn => fn(data));
      };
    },

    emit(event, data) {
      this._channel.postMessage({ event, data });
      window.dispatchEvent(new CustomEvent(`app:${event}`, { detail: data }));
    },

    on(event, callback) {
      this._handlers[event] = this._handlers[event] || [];
      this._handlers[event].push(callback);

      window.addEventListener(`app:${event}`, (e) => callback(e.detail));
    },

    // Request-Response pattern
    async request(event, data, timeout = 3000) {
      return new Promise((resolve, reject) => {
        const responseEvent = `${event}:response:${Date.now()}`;
        const timer = setTimeout(() => reject(new Error('Timeout')), timeout);

        this.on(responseEvent, (response) => {
          clearTimeout(timer);
          resolve(response);
        });

        this.emit(event, { ...data, _responseEvent: responseEvent });
      });
    }
  };

  window.ParetoAppBridge.init();
})();