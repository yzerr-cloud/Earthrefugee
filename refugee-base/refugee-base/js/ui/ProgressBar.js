(function (G) {
  const h = G.ui.h;
  G.ui.ProgressBar = {
    create({ label }) {
      const fill = h('div', { class: 'progress__fill' });
      const text = h('span', { class: 'progress__text', 'aria-hidden': 'true' });
      const el = h('div', { class: 'progress' },
        h('div', { class: 'progress__track', role: 'progressbar', 'aria-label': label, 'aria-valuemin': '0', 'aria-valuemax': '100' }, fill), text);
      const track = el.firstChild;
      return { el, update(p) { fill.style.width = p + '%'; text.textContent = p + '%'; track.setAttribute('aria-valuenow', p); } };
    },
    steps(done, total) {
      const el = G.ui.h('div', { class: 'steps', 'aria-hidden': 'true' });
      for (let i = 0; i < total; i++) el.append(G.ui.h('span', { class: 'steps__item' + (i < done ? ' is-done' : '') }));
      return el;
    }
  };
})(window.Game);
