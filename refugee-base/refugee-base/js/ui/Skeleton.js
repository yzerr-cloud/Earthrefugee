(function (G) {
  const h = G.ui.h;
  const S = (kind, style) => h('span', { class: 'skeleton skeleton--' + kind, style });
  /* 실제 카드와 같은 클래스(크기)를 써서 자리 이동이 없게 한다. */
  G.ui.Skeleton = {
    card(cls, rows) { return h('div', { class: 'card card--skeleton ' + cls, 'aria-hidden': 'true' }, rows.map(([k, w]) => S(k, w ? 'width:' + w : null))); },
    resource: () => S('res'),
    chip: () => S('chip')
  };
})(window.Game);
