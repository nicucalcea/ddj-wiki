export class Datawrapper {
  constructor(id, containerName) {
    this.id = id;
    this.viz = undefined;
    this.containerName = containerName;
    this.container = document.getElementById(containerName);
    this.observer = null;
    this.listeners = {};

    this.setupObserver();
    this.renderDataWrapper();
    this.setupEventListener();
  }

  setupObserver() {
    const ObserverConstructor =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    if (ObserverConstructor) {
      this.observer = new ObserverConstructor(this.setViz.bind(this));
      this.observer.observe(this.container, {
        subtree: true,
        childList: true,
      });
    }
  }

  setViz() {
    this.viz =
      this.container.getElementsByTagName('datawrapper-visualization')[0] ||
      undefined;
    if (this.viz) this.observer.disconnect();
  }

  renderDataWrapper() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.src = `https://datawrapper.dwcdn.net/${this.id}/embed.js`;
    script.charset = 'utf-8';

    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.src = `https://datawrapper.dwcdn.net/${this.id}/full.png`;
    img.alt = '';
    noscript.appendChild(img);

    this.container.appendChild(script);
    this.container.appendChild(noscript);
  }

  updateViz(key, value) {
    if (this.viz) {
      this.viz.patch(key, value);
    }
  }

  setupEventListener() {
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  receiveMessage = (event) => {
    if (event.data && event.data.source === 'datawrapper' && event.data.chartId && this.listeners[event.data.type]) {
      this.listeners[event.data.type].forEach((cb) => {
        if (typeof cb === 'function') cb(event.data);
      });
    }
  }

  on(event, callback, once = false) {
    if (typeof event !== 'string') throw new Error('event name must be a string');
    if (typeof callback !== 'function') throw new Error('callback must be a function');
    if (!this.listeners[event]) this.listeners[event] = [];
    const wrappedCallback = once ? (...args) => {
      callback(...args);
      this.off(event, wrappedCallback);
    } : callback;
    this.listeners[event].push(wrappedCallback);
    return this;
  }

  off(event, callback) {
    if (!this.listeners[event]) return this;
    if (!callback) this.listeners[event].length = 0;
    const i = this.listeners[event].indexOf(callback);
    if (i > -1) {
      this.listeners[event].splice(i, 1);
    }
    return this;
  }
}