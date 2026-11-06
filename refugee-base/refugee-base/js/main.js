(function (G) {
  const store = G.core.store;
  G.screens.BaseScreen.mount(document.getElementById('app'), store);
  store.actions.load();
  setInterval(store.actions.tick, 1000);
})(window.Game);
