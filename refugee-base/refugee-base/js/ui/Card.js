(function (G) {
  const h = G.ui.h;
  /* 카드 껍데기. 내용은 각 카드 부품이 채운다. */
  G.ui.Card = ({ cls = '', emphasis = false, tag = 'article', attrs = {} }, ...children) =>
    h(tag, { class: 'card ' + (emphasis ? 'card--emphasis ' : '') + cls, ...attrs }, ...children);
  G.ui.Badge = (text, tone) => h('span', { class: 'badge' + (tone ? ' badge--' + tone : ''), text });
})(window.Game);
