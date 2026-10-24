/* blog.js: search and filter the post list */
(function () {
  'use strict';

  var SL = window.SL;
  var posts = window.SL_DATA.posts;
  var el = SL.el;
  var qs = SL.qs;

  var grid = qs('#post-grid');
  var search = qs('#post-search');
  var chips = qs('#category-chips');
  var count = qs('#result-count');
  if (!grid) return;

  var categories = posts.reduce(function (list, p) {
    return list.indexOf(p.category) === -1 ? list.concat(p.category) : list;
  }, []);

  var state = { query: '', category: 'All' };

  ['All'].concat(categories).forEach(function (cat) {
    chips.append(el('button', {
      class: 'chip', type: 'button', 'data-category': cat, 'aria-pressed': String(cat === 'All'), text: cat,
      onclick: function () { state.category = cat; render(); }
    }));
  });

  search.addEventListener('input', SL.debounce(function () {
    state.query = search.value.trim().toLowerCase();
    render();
  }, 120));

  function render() {
    var list = posts.filter(function (p) {
      var text = (p.title + ' ' + p.excerpt + ' ' + p.category).toLowerCase();
      return (!state.query || text.indexOf(state.query) !== -1) &&
        (state.category === 'All' || p.category === state.category);
    });

    SL.qsa('#category-chips .chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-category') === state.category));
    });

    var unfiltered = !state.query && state.category === 'All';
    count.textContent = list.length + (list.length === 1 ? ' article' : ' articles');
    grid.textContent = '';

    if (!list.length) {
      grid.append(SL.render.empty('No articles found', 'Try a different search or category.'));
      return;
    }
    list.forEach(function (post, index) {
      grid.append(SL.render.postCard(post, unfiltered && index === 0));
    });
    SL.reveal();
  }

  render();
})();
