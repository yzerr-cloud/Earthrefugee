(function (G) {
  const h = G.ui.h, { Card, Badge, Button, ProgressBar } = G.ui;
  G.ui.ExpeditionCard = {
    create({ onDetail }) {
      let currentId = null;
      const region = h('span', { class: 'card__label' });
      const status = Badge('진행 중');
      const name = h('h2', { class: 'card__title' });
      const time = h('span', { class: 'card__number' });
      const timeLabel = h('span', { class: 'card__sub', text: '남은 시간' });
      const stage = h('p', { class: 'card__sub' });
      const bar = ProgressBar.create({ label: '원정 진행률' });
      const btn = Button.create({ label: '원정 상세', variant: 'secondary', block: true, onClick: () => currentId && onDetail(currentId) });

      const body = h('div', { class: 'card__spacer-wrap', style: 'display:contents' },
        h('div', { class: 'card__eyebrow' }, region, status), name,
        h('div', { class: 'exp__time' }, time, timeLabel), stage, bar.el);
      const emptyTitle = h('h2', { class: 'card__title' });
      const empty = h('div', { class: 'exp__empty' }, emptyTitle,
        h('p', { class: 'card__sub', text: '파견된 조사팀이 없습니다. 원정 메뉴에서 조사팀을 보낼 수 있습니다.' }));

      const el = Card({ cls: 'bento__exp', emphasis: true, attrs: { 'aria-label': '진행 중인 원정' } },
        body, empty, h('div', { class: 'card__spacer' }), btn.el);
      return {
        el,
        update(v) {
          body.hidden = v.empty; empty.hidden = !v.empty;
          btn.update({ disabled: v.empty });
          if (v.empty) { currentId = null; emptyTitle.textContent = `${v.regionLabel} 지역 원정 없음`; return; }
          currentId = v.id;
          region.textContent = v.region; name.textContent = v.name; time.textContent = v.remainingText;
          stage.textContent = v.stage; bar.update(v.progress);
        }
      };
    }
  };
})(window.Game);
