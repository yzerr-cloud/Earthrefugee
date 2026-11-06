(function (G) {
  const h = G.ui.h;
  G.ui.ResourceChip = {
    create({ emoji, label }) {
      const value = h('span', { class: 'res-chip__value' });
      const el = h('div', { class: 'res-chip', role: 'group', 'aria-label': label }, G.ui.Icon({ emoji, label }), value);
      let last = null;
      return {
        el,
        update({ value: v, tone }, bump) {
          value.textContent = v;
          el.classList.toggle('res-chip--danger', tone === 'danger');
          el.setAttribute('aria-label', `${label} ${v}`);
          if (bump && last !== null && last !== v) { el.classList.add('is-bump'); setTimeout(() => el.classList.remove('is-bump'), 900); }
          last = v;
        }
      };
    },
    /* 4개 칩을 담은 가로 스크롤 행 */
    createRow(views) {
      const chips = views.map((v) => ({ key: v.key, c: G.ui.ResourceChip.create(v) }));
      const el = h('div', { class: 'res-row', role: 'group', 'aria-label': '보유 자원', tabindex: '0' }, chips.map((x) => x.c.el));
      return { el, update(vs, bumpKeys = []) { vs.forEach((v) => chips.find((x) => x.key === v.key).c.update(v, bumpKeys.includes(v.key))); } };
    }
  };
})(window.Game);
