/* 거점 화면: 부품을 조립하고 store와 연결만 한다. */
(function (G) {
  const h = G.ui.h, U = G.ui, sel = G.core.selectors;
  G.screens.BaseScreen = {
    mount(root, store) {
      const { actions } = store;
      const s0 = store.getState();

      // 부품 생성
      const topbar = U.TopBar.create({ onToggleTheme: () => { const t = G.core.theme.toggle(); actions.notify(t === 'dark' ? '어두운 화면으로 바꿨습니다' : '밝은 화면으로 바꿨습니다'); } });
      const resources = U.ResourceChip.createRow(sel.resourceViews(s0));
      const exp = U.ExpeditionCard.create({ onDetail: (id) => actions.openSheet('expedition', id) });
      const reward = U.RewardCard.create({ onClaim: actions.claimRewards });
      const team = U.TeamCard.create();
      const clue = U.ClueCard.create({ onOpen: () => actions.openSheet('clue') });
      const regions = U.RegionChips.create({ regions: s0.regions, onSelect: actions.selectRegion });
      const toast = U.Toast.create();
      const sheet = U.BottomSheet.create({ onClose: actions.closeSheet });
      const nav = U.NavBar.create({ active: 'base', onSelect: (it) => { if (it.id !== 'base') actions.notify(`${it.label} 화면은 아직 준비 중입니다`); } });

      // 스켈레톤: 실제 카드와 같은 크기 클래스
      const sk = U.Skeleton;
      const skeleton = h('div', { class: 'screen', 'aria-busy': 'true', 'aria-label': '불러오는 중' },
        h('div', { class: 'res-row' }, [1, 2, 3, 4].map(sk.resource)),
        h('div', { class: 'screen__section' }, h('div', { class: 'bento' },
          sk.card('bento__exp', [['line', '40%'], ['line', '80%'], ['num'], ['line'], ['btn']]),
          sk.card('bento__reward', [['line', '70%'], ['num', '50%'], ['line'], ['btn']]),
          sk.card('bento__team', [['line', '70%'], ['num', '50%'], ['line'], ['line']]),
          sk.card('bento__clue', [['line', '60%'], ['line'], ['line', '80%'], ['line', '50%']]))),
        h('div', { class: 'screen__section' }, h('div', { class: 'chip-row' }, [1, 2, 3, 4].map(sk.chip))));

      const content = h('div', { class: 'screen' }, resources.el,
        h('main', { class: 'screen__section' }, h('div', { class: 'bento' }, exp.el, reward.el, team.el, clue.el)),
        h('section', { class: 'screen__section', 'aria-label': '지역 선택' }, h('p', { class: 'screen__section-title', text: '지역 보기' }), regions.el));

      root.append(h('div', { class: 'app' }, topbar.el, skeleton, content), nav.el, sheet.el, toast.el);

      // 시트 내용 (열려 있는 동안 타이머 갱신)
      let sheetContent = null, sheetKey = null;
      function syncSheet(s) {
        if (!s.sheet) { sheet.close(); sheetContent = null; sheetKey = null; return; }
        const key = s.sheet.type + ':' + s.sheet.id;
        if (key === sheetKey) return;
        sheetKey = key;
        if (s.sheet.type === 'expedition') {
          const d = sel.expeditionDetail(s, s.sheet.id);
          sheetContent = U.ExpeditionSheetContent.create(d);
          sheet.open({ title: d.name, content: sheetContent.el });
        } else {
          sheetContent = U.ClueSheetContent.create(sel.clueView(s));
          sheet.open({ title: s.caseFile.title, content: sheetContent.el });
        }
      }

      function render(s, bump) {
        skeleton.hidden = !s.loading; content.hidden = s.loading;
        topbar.update(s.baseName);
        resources.update(sel.resourceViews(s), bump);
        exp.update(sel.expeditionView(s));
        reward.update(sel.rewardView(s));
        team.update(sel.teamView(s));
        clue.update(sel.clueView(s));
        regions.update(s.selectedRegion);
        syncSheet(s);
      }

      store.subscribe((s, type, payload) => {
        if (type === 'toast') return toast.show(payload.message, { tone: payload.tone });
        if (type === 'tick') {
          exp.update(sel.expeditionView(s));
          if (s.sheet && s.sheet.type === 'expedition' && sheetContent) { const d = sel.expeditionDetail(s, s.sheet.id); d && sheetContent.update(d); }
          return;
        }
        render(s, payload && payload.bump);
      });
      render(s0);
    }
  };
})(window.Game);
