(function (G) {
  const h = G.ui.h;
  const ITEMS = [{ id: 'base', emoji: '🏠', label: '거점' }, { id: 'expedition', emoji: '🧭', label: '원정' },
    { id: 'agents', emoji: '👥', label: '조사원' }, { id: 'research', emoji: '🔬', label: '연구' }];
  G.ui.NavBar = {
    create({ active, onSelect }) {
      const btns = ITEMS.map((it) => {
        const b = h('button', { type: 'button', class: 'nav__item', onClick: () => onSelect(it), 'aria-label': it.label },
          h('span', { class: 'tf', 'aria-hidden': 'true', text: it.emoji }), h('span', { text: it.label }));
        if (it.id === active) b.setAttribute('aria-current', 'page');
        return b;
      });
      return { el: h('nav', { class: 'nav', 'aria-label': '주 메뉴' }, btns) };
    }
  };
})(window.Game);
