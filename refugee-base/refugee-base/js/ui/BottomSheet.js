(function (G) {
  const h = G.ui.h;
  G.ui.BottomSheet = {
    create({ onClose }) {
      let open = false, lastFocus = null;
      const title = h('h2', { class: 'sheet__title', id: 'sheet-title' });
      const closeBtn = G.ui.Button.create({ label: '닫기', variant: 'ghost', onClick: () => api.close() });
      const body = h('div', { class: 'sheet__body' });
      const panel = h('div', { class: 'sheet__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'sheet-title', tabindex: '-1' },
        h('div', { class: 'sheet__grab', 'aria-hidden': 'true' }), h('header', { class: 'sheet__header' }, title, closeBtn.el), body);
      const root = h('div', { class: 'sheet', inert: true, 'aria-hidden': 'true' }, h('div', { class: 'sheet__scrim', onClick: () => api.close() }), panel);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) api.close(); });

      const api = {
        el: root,
        get isOpen() { return open; },
        open({ title: t, content }) {
          title.textContent = t; body.replaceChildren(content); body.scrollTop = 0;
          if (open) return;
          open = true; lastFocus = document.activeElement;
          root.removeAttribute('inert'); root.removeAttribute('aria-hidden');
          root.classList.add('is-open'); document.body.classList.add('is-scroll-locked');
          requestAnimationFrame(() => panel.focus());
        },
        close() {
          if (!open) return;
          open = false;
          root.classList.remove('is-open'); root.setAttribute('inert', ''); root.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('is-scroll-locked');
          if (lastFocus && lastFocus.focus) lastFocus.focus();
          onClose && onClose();
        }
      };
      return api;
    }
  };
})(window.Game);
