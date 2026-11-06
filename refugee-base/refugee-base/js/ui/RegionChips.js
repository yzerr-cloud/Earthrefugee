(function (G) {
  const h = G.ui.h;
  G.ui.RegionChips = {
    create({ regions, onSelect }) {
      const chips = regions.map((r) => h('button', { type: 'button', class: 'chip', role: 'radio', 'aria-checked': 'false', text: r, onClick: () => onSelect(r) }));
      const el = h('div', { class: 'chip-row', role: 'radiogroup', 'aria-label': '지역 선택' }, chips);
      return { el, update(selected) { chips.forEach((c) => c.setAttribute('aria-checked', String(c.textContent === selected))); } };
    }
  };
})(window.Game);
