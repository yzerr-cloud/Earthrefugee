(function (G) {
  const root = document.documentElement;
  G.core.theme = {
    isDark: () => root.getAttribute('data-theme') === 'dark',
    toggle() {
      const next = G.core.theme.isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('rf-theme', next); } catch (e) {}
      return next;
    }
  };
})(window.Game);
