(function (G) {
  const h = G.ui.h;
  G.ui.Toast = {
    create() {
      const el = h('div', { class: 'toast-host', role: 'status', 'aria-live': 'polite' });
      let timer;
      return {
        el,
        show(message, { tone = 'default', duration = 2600 } = {}) {
          el.replaceChildren(h('div', { class: 'toast toast--' + tone, text: message }));
          clearTimeout(timer); timer = setTimeout(() => el.replaceChildren(), duration);
        }
      };
    }
  };
})(window.Game);
