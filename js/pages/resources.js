/* resources.js: search and filter external learning links */
(function () {
  'use strict';

  var SL = window.SL;
  var resources = window.SL_DATA.resources;
  var el = SL.el;
  var qs = SL.qs;

  var grid = qs('#resource-grid');
  var search = qs('#resource-search');
  var chips = qs('#type-chips');
  var count = qs('#result-count');
  if (!grid) return;

  var types = resources.reduce(function (list, r) {
    return list.indexOf(r.type) === -1 ? list.concat(r.type) : list;
  }, []);
  var state = { query: '', type: 'All' };

  ['All'].concat(types).forEach(function (type) {
    chips.append(el('button', {
      class: 'chip', type: 'button', 'data-type': type, 'aria-pressed': String(type === 'All'), text: type,
      onclick: function () { state.type = type; render(); }
    }));
  });

  search.addEventListener('input', SL.debounce(function () {
    state.query = search.value.trim().toLowerCase();
    render();
  }, 120));

  function card(r) {
    return el('a', {
      class: 'card card-hover resource-card reveal',
      href: r.url, target: '_blank', rel: 'noopener noreferrer'
    }, [
      el('div', { class: 'row between' }, [SL.render.badge(r.type, 'badge-cyan'), el('span', { class: 'muted', 'aria-hidden': 'true', text: '↗' })]),
      el('h3', { text: r.title }),
      el('p', { text: r.desc }),
      el('span', { class: 'card-link', text: 'Visit site (opens in a new tab)' })
    ]);
  }

  function render() {
    var list = resources.filter(function (r) {
      var text = (r.title + ' ' + r.desc + ' ' + r.type).toLowerCase();
      return (!state.query || text.indexOf(state.query) !== -1) && (state.type === 'All' || r.type === state.type);
    });

    SL.qsa('#type-chips .chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-type') === state.type));
    });

    count.textContent = list.length + (list.length === 1 ? ' resource' : ' resources');
    grid.textContent = '';

    if (!list.length) {
      grid.append(SL.render.empty('No resources found', 'Try a different search or type.'));
      return;
    }
    list.forEach(function (r) { grid.append(card(r)); });
    SL.reveal();
  }

  render();
})();
