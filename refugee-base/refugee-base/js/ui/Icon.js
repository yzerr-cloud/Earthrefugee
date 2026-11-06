/* Tossface 아이콘 + 글자 라벨 (항상 함께) */
(function (G) {
  const h = G.ui.h;
  G.ui.Icon = ({ emoji, label, cls = '' }) =>
    h('span', { class: 'icon-label ' + cls },
      h('span', { class: 'tf', 'aria-hidden': 'true', text: emoji }),
      h('span', { class: 'icon-label__text', text: label }));
})(window.Game);
