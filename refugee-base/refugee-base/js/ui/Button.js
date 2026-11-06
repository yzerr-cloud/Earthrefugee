(function (G) {
  const h = G.ui.h;
  G.ui.Button = {
    create({ label, variant = 'primary', block = false, onClick, disabled = false }) {
      const el = h('button', { type: 'button', class: `btn btn--${variant}` + (block ? ' btn--block' : ''), onClick, disabled: disabled || null, text: label });
      return {
        el,
        update({ label: l, disabled: d }) { if (l != null) el.textContent = l; if (d != null) el.disabled = d; }
      };
    }
  };
})(window.Game);
