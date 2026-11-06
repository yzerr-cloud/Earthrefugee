(function (G) {
  const h = G.ui.h, { Card, ProgressBar } = G.ui;
  G.ui.ClueCard = {
    create({ onOpen }) {
      const text = h('p', { class: 'clue__text' });
      const stepText = h('span', { class: 'card__sub' });
      const stepsWrap = h('div');
      const el = Card({ cls: 'bento__clue card--tappable', tag: 'button', attrs: { type: 'button', onclick: null, 'aria-label': '핵심 단서 자세히 보기' } },
        h('p', { class: 'card__label', text: '핵심 단서' }), text, h('div', { class: 'card__spacer' }), stepText, stepsWrap,
        h('span', { class: 'card__more', text: '자세히 보기' }));
      el.addEventListener('click', onOpen);
      return {
        el,
        update(v) {
          text.textContent = `“${v.clue}”`;
          stepText.textContent = `사건 진행 ${v.step}/${v.total}`;
          stepsWrap.replaceChildren(ProgressBar.steps(v.step, v.total));
        }
      };
    }
  };
})(window.Game);
