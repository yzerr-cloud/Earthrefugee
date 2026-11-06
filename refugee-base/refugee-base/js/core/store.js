/* 게임 상태와 행동. DOM을 만지지 않는다. */
(function (G) {
  const f = G.core.format;
  let state = G.data.createSeed();
  state.loading = true;
  state.sheet = null;           // { type, id }
  let rewardSeq = 3;
  const listeners = new Set();
  const emit = (type, payload) => listeners.forEach((l) => l(state, type, payload));
  const notify = (message, tone) => emit('toast', { message, tone: tone || 'default' });

  const actions = {
    load() { setTimeout(() => { state.loading = false; emit('change'); }, 900); },
    selectRegion(region) { if (state.regions.includes(region) && region !== state.selectedRegion) { state.selectedRegion = region; emit('change'); } },
    openSheet(type, id) { state.sheet = { type, id }; emit('change'); },
    closeSheet() { if (state.sheet) { state.sheet = null; emit('change'); } },
    claimRewards() {
      if (!state.pendingRewards.length) return;
      const t = G.core.selectors.totals(state.pendingRewards);
      state.resources.funds += t.funds;
      state.resources.clues += t.clues;
      state.resources.parts += t.parts;
      const n = state.pendingRewards.length;
      state.pendingRewards = [];
      emit('change', { bump: ['funds', 'clues', 'parts'].filter((k) => t[k] > 0) });
      const parts = [`자금 +${f.number(t.funds)}`, `경험치 +${f.number(t.exp)}`];
      if (t.clues) parts.push(`단서 +${t.clues}`);
      if (t.parts) parts.push(`부품 +${t.parts}`);
      notify(`보상 ${n}건 수령 · ${parts.join(' · ')}`);
    },
    tick() {
      if (state.loading) return;
      state.expeditions.forEach((e) => {
        e.remaining -= 1;
        if (e.remaining <= 0) {
          e.remaining = e.total;
          rewardSeq += 1;
          state.pendingRewards.push({ id: 'r' + rewardSeq, from: e.name, ...e.reward });
          notify(`${e.name} 원정 완료 · 새 보상 도착`);
          emit('change');
        }
      });
      emit('tick');
    },
    notify
  };

  G.core.store = {
    getState: () => state,
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    actions
  };
})(window.Game);
