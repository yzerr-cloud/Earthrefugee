(function (G) {
  const h = G.ui.h;
  G.ui.TopBar = {
    create({ onToggleTheme }) {
      const title = h('h1', { class: 'topbar__title' });
      const themeBtn = h('button', { type: 'button', class: 'btn btn--ghost', onClick: onToggleTheme }, G.ui.Icon({ emoji: '🌓', label: '화면 모드' }));
      const el = h('header', { class: 'topbar' }, h('div', { class: 'topbar__text' }, h('p', { class: 'topbar__eyebrow', text: '지구난민론 · 조사 거점' }), title), themeBtn);
      return { el, update(name) { title.textContent = name; } };
    }
  };
})(window.Game);
