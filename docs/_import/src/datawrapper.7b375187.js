export class DataWrapper {
  constructor(id, containerName) {
    this.id = id;
    this.viz = undefined;
    this.containerName = containerName;
    this.container = document.getElementById(containerName);
    this.observer = null;
    this.setupObserver();
    this.renderDataWrapper();
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
}