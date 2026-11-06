/* 상태 → 화면용 값. 화면 부품은 이 결과만 받는다. */
(function (G) {
  const f = G.core.format;
  const pct = (e) => Math.round(((e.total - e.remaining) / e.total) * 100);

  function visibleExpedition(s) {
    if (s.selectedRegion === '전체') return s.expeditions.slice().sort((a, b) => a.remaining - b.remaining)[0] || null;
    return s.expeditions.find((e) => e.region === s.selectedRegion) || null;
  }
  function totals(list) {
    return list.reduce((t, r) => ({ funds: t.funds + r.funds, exp: t.exp + r.exp, clues: t.clues + r.clues, parts: t.parts + r.parts }),
      { funds: 0, exp: 0, clues: 0, parts: 0 });
  }

  G.core.selectors = {
    totals,
    resourceViews(s) {
      const r = s.resources, low = r.sanity < 30;
      return [
        { key: 'funds', emoji: '💰', label: '자금', value: f.compact(r.funds) },
        { key: 'clues', emoji: '🔍', label: '단서', value: f.number(r.clues) },
        { key: 'sanity', emoji: '🧠', label: '정신력', value: `${r.sanity}/${s.sanityMax}` + (low ? ' 위험' : ''), tone: low ? 'danger' : 'normal' },
        { key: 'parts', emoji: '🔧', label: '장비 부품', value: f.number(r.parts) }
      ];
    },
    expeditionView(s) {
      const e = visibleExpedition(s);
      if (!e) return { empty: true, regionLabel: s.selectedRegion };
      return { empty: false, id: e.id, name: e.name, region: e.region, remainingText: f.duration(e.remaining), progress: pct(e), stage: e.stage };
    },
    expeditionDetail(s, id) {
      const e = s.expeditions.find((x) => x.id === id);
      if (!e) return null;
      return {
        id: e.id, name: e.name, region: e.region, stage: e.stage, risk: e.risk, riskDanger: e.risk === '높음',
        remainingText: f.duration(e.remaining), progress: pct(e), reward: e.reward, log: e.log,
        members: e.agentIds.map((i) => s.agents.find((a) => a.id === i))
      };
    },
    rewardView(s) {
      const t = totals(s.pendingRewards);
      return { count: s.pendingRewards.length, totals: t, disabled: s.pendingRewards.length === 0 };
    },
    teamView(s) {
      const members = s.teamIds.map((i) => s.agents.find((a) => a.id === i));
      return { count: members.length, capacity: s.teamCapacity, members, emptySlots: Math.max(0, s.teamCapacity - members.length) };
    },
    clueView(s) {
      const c = s.caseFile;
      return { title: c.title, clue: c.clue, detail: c.detail, step: c.step, total: c.steps.length, steps: c.steps, collected: c.collected };
    }
  };
})(window.Game);
