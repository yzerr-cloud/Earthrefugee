(function (G) {
  const h = G.ui.h, { ProgressBar } = G.ui;
  const sec = (t, ...c) => h('section', { class: 'sec' }, h('h3', { class: 'sec__title', text: t }), ...c);
  G.ui.ClueSheetContent = {
    create(v) {
      const stepRows = v.steps.map((s, i) => {
        const state = i < v.step - 1 ? 'done' : i === v.step - 1 ? 'current' : 'locked';
        // 완료/현재/잠김을 색뿐 아니라 글자로도 구분
        const note = state === 'done' ? '완료' : state === 'current' ? '진행 중' : '잠김';
        return h('li', { class: 'step is-' + state }, h('span', { class: 'step__mark', text: String(i + 1) }),
          h('span', { class: 'step__text', text: s }), h('span', { class: 'list-row__sub', text: note }));
      });
      return {
        el: h('div', { style: 'display:contents' },
          h('p', { class: 'quote', text: `“${v.clue}”` }),
          h('p', { text: v.detail }),
          sec(`사건 진행 ${v.step}/${v.total}`, ProgressBar.steps(v.step, v.total), h('ul', { class: 'panel' }, stepRows)),
          sec('확보한 단서', h('ul', { class: 'panel' }, v.collected.map((c) => h('li', { class: 'list-row' }, h('span', { class: 'list-row__main', text: c })))))),
        update() {}
      };
    }
  };
})(window.Game);
