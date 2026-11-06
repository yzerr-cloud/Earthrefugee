(function (G) {
  const h = G.ui.h, f = G.core.format, { Card, Button } = G.ui;
  G.ui.RewardCard = {
    create({ onClaim }) {
      const count = h('p', { class: 'card__number' });
      const lines = h('ul', { class: 'reward__lines' });
      const btn = Button.create({ label: '보상 받기', variant: 'primary', block: true, onClick: onClaim });
      const el = Card({ cls: 'bento__reward', attrs: { 'aria-label': '수령 가능한 보상' } },
        h('p', { class: 'card__label', text: '수령 가능' }), count, lines, h('div', { class: 'card__spacer' }), btn.el);
      const line = (k, v) => h('li', { class: 'reward__line' }, h('span', { text: k }), h('b', { text: v }));
      return {
        el,
        update(v) {
          count.replaceChildren(String(v.count), h('small', { text: '건' }));
          lines.replaceChildren(line('자금', '+' + f.number(v.totals.funds)), line('경험치', '+' + f.number(v.totals.exp)),
            line('단서', '+' + v.totals.clues), line('부품', '+' + v.totals.parts));
          btn.update({ disabled: v.disabled });
        }
      };
    }
  };
})(window.Game);
