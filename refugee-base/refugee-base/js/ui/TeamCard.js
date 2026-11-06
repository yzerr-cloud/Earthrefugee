(function (G) {
  const h = G.ui.h, { Card } = G.ui;
  G.ui.TeamCard = {
    create() {
      const count = h('p', { class: 'card__number' });
      const list = h('ul', { class: 'team__list' });
      const el = Card({ cls: 'bento__team', attrs: { 'aria-label': '조사팀' } }, h('p', { class: 'card__label', text: '조사팀 배치' }), count, list);
      return {
        el,
        update(v) {
          count.replaceChildren(`${v.count}/${v.capacity}`, h('small', { text: '명' }));
          const rows = v.members.map((m) => h('li', { class: 'team__row' }, h('span', { class: 'team__name', text: m.name }), h('span', { class: 'team__role', text: m.role })));
          for (let i = 0; i < v.emptySlots; i++) rows.push(h('li', { class: 'team__row team__row--empty' }, h('span', { class: 'team__name', text: '빈 자리' })));
          list.replaceChildren(...rows);
        }
      };
    }
  };
})(window.Game);
