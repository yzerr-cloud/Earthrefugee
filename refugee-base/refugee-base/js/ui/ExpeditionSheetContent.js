(function (G) {
  const h = G.ui.h, f = G.core.format, { Badge, ProgressBar } = G.ui;
  const kv = (k, v) => h('div', { class: 'kv' }, h('dt', { text: k }), h('dd', null, v));
  const sec = (t, ...c) => h('section', { class: 'sec' }, h('h3', { class: 'sec__title', text: t }), ...c);
  G.ui.ExpeditionSheetContent = {
    create(d) {
      const time = h('span', { class: 'card__number', text: d.remainingText });
      const bar = ProgressBar.create({ label: '원정 진행률' }); bar.update(d.progress);
      const el = h('div', { style: 'display:contents' },
        h('div', { class: 'sec' }, h('div', { class: 'card__eyebrow' }, Badge(d.region), Badge('진행 중')), h('div', { class: 'exp__time' }, time, h('span', { class: 'card__sub', text: '남은 시간' })), bar.el),
        sec('원정 정보', h('dl', { class: 'panel' },
          kv('현재 단계', d.stage),
          kv('위험도', d.riskDanger ? Badge('높음 · 주의', 'danger') : d.risk),
          kv('파견 인원', `${d.members.length}명`))),
        sec('파견 조사원', h('ul', { class: 'panel' }, d.members.map((m) =>
          h('li', { class: 'list-row' }, h('span', { class: 'list-row__main', text: m.name }), h('span', { class: 'list-row__sub', text: `${m.role} · ${m.status}` }))))),
        sec('완료 시 보상', h('dl', { class: 'panel' },
          kv('자금', '+' + f.number(d.reward.funds)), kv('경험치', '+' + f.number(d.reward.exp)),
          kv('단서', '+' + d.reward.clues), kv('장비 부품', '+' + d.reward.parts))),
        sec('최근 기록', h('div', { class: 'panel' }, d.log.map((l) => h('p', { class: 'log' }, h('span', { class: 'log__time', text: l.t }), h('span', { text: l.text })))))
      );
      return { el, update(nd) { time.textContent = nd.remainingText; bar.update(nd.progress); } };
    }
  };
})(window.Game);
