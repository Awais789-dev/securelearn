/* cheatsheets.js: tabbed command lists with search and copy buttons.
   While you search, results from every sheet are shown together. */
(function () {
  'use strict';

  var SL = window.SL;
  var D = window.SL_DATA;
  var el = SL.el;
  var qs = SL.qs;

  var tabs = qs('#sheet-tabs');
  var results = qs('#sheet-results');
  var search = qs('#sheet-search');
  var count = qs('#result-count');
  if (!tabs) return;

  /* The ports list lives in data.js once. Here we turn it into a sheet. */
  var sheets = D.sheets.concat([{
    id: 'ports',
    title: 'Common Ports',
    icon: '🔌',
    items: D.ports.map(function (p) {
      return { cmd: p.port + '/' + p.proto.toLowerCase(), desc: p.service + ': ' + p.note };
    })
  }]);

  var state = { active: sheets[0].id, query: '' };

  sheets.forEach(function (sheet) {
    tabs.append(el('button', {
      class: 'chip', type: 'button', 'data-sheet': sheet.id, 'aria-pressed': 'false',
      text: sheet.icon + ' ' + sheet.title,
      onclick: function () {
        state.active = sheet.id;
        search.value = '';
        state.query = '';
        render();
      }
    }));
  });

  search.addEventListener('input', SL.debounce(function () {
    state.query = search.value.trim().toLowerCase();
    render();
  }, 100));

  function row(item) {
    return el('div', { class: 'cmd-row' }, [
      el('code', { text: item.cmd }),
      el('p', { text: item.desc }),
      el('button', {
        class: 'btn btn-ghost btn-sm', type: 'button', text: 'Copy',
        'aria-label': 'Copy ' + item.cmd,
        onclick: function () { SL.copy(item.cmd, 'Copied: ' + item.cmd); }
      })
    ]);
  }

  function render() {
    var searching = state.query.length > 0;

    SL.qsa('#sheet-tabs .chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(!searching && chip.getAttribute('data-sheet') === state.active));
    });

    var groups = (searching ? sheets : sheets.filter(function (s) { return s.id === state.active; }))
      .map(function (sheet) {
        var items = searching
          ? sheet.items.filter(function (i) { return (i.cmd + ' ' + i.desc).toLowerCase().indexOf(state.query) !== -1; })
          : sheet.items;
        return { sheet: sheet, items: items };
      })
      .filter(function (g) { return g.items.length; });

    var total = groups.reduce(function (n, g) { return n + g.items.length; }, 0);
    count.textContent = total + (total === 1 ? ' entry' : ' entries');
    results.textContent = '';

    if (!total) {
      results.append(SL.render.empty('Nothing found', 'Try another word, like "scan", "port" or "hash".'));
      return;
    }

    groups.forEach(function (group) {
      var list = el('div', { class: 'cmd-list' });
      group.items.forEach(function (item) { list.append(row(item)); });
      results.append(el('section', { class: 'sheet-group' }, [
        el('h2', { text: group.sheet.icon + ' ' + group.sheet.title }),
        list
      ]));
    });
  }

  render();
})();
