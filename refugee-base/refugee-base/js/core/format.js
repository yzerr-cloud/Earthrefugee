(function (G) {
  const pad = (n) => String(n).padStart(2, '0');
  G.core.format = {
    number: (n) => Math.round(n).toLocaleString('ko-KR'),
    compact(n) { return n >= 10000 ? (n / 1000).toFixed(1) + 'K' : Math.round(n).toLocaleString('ko-KR'); },
    duration(sec) {
      sec = Math.max(0, Math.round(sec));
      const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
      return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
    }
  };
})(window.Game);
