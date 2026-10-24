/* courses.js: search and filter the course list. Supports ?category=Pentesting in the URL. */
(function () {
  'use strict';

  var SL = window.SL;
  var courses = window.SL_DATA.courses;
  var el = SL.el;
  var qs = SL.qs;

  var grid = qs('#course-grid');
  var search = qs('#course-search');
  var levelBox = qs('#level-filters');
  var categorySelect = qs('#category-select');
  var count = qs('#result-count');
  if (!grid) return;

  var categories = courses.reduce(function (list, c) {
    return list.indexOf(c.category) === -1 ? list.concat(c.category) : list;
  }, []);

  var state = { query: '', level: 'All', category: SL.getParam('category') || 'All' };
  if (categories.indexOf(state.category) === -1) state.category = 'All';

  /* Build the filter controls */
  ['All', 'Beginner', 'Intermediate', 'Advanced'].forEach(function (level) {
    levelBox.append(el('button', {
      class: 'chip', type: 'button', 'data-level': level, 'aria-pressed': String(level === 'All'),
      text: level,
      onclick: function () { state.level = level; render(); }
    }));
  });

  ['All'].concat(categories).forEach(function (cat) {
    categorySelect.append(el('option', { value: cat, text: cat === 'All' ? 'All categories' : cat }));
  });
  categorySelect.value = state.category;

  search.addEventListener('input', SL.debounce(function () {
    state.query = search.value.trim().toLowerCase();
    render();
  }, 120));

  categorySelect.addEventListener('change', function () {
    state.category = categorySelect.value;
    render();
  });

  function matches(course) {
    var text = (course.title + ' ' + course.summary + ' ' + course.category).toLowerCase();
    return (
      (!state.query || text.indexOf(state.query) !== -1) &&
      (state.level === 'All' || course.level === state.level) &&
      (state.category === 'All' || course.category === state.category)
    );
  }

  function render() {
    var list = courses.filter(matches);
    grid.textContent = '';

    SL.qsa('#level-filters .chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-level') === state.level));
    });

    count.textContent = list.length + (list.length === 1 ? ' course' : ' courses');

    if (!list.length) {
      grid.append(SL.render.empty('No courses found', 'Try a different search or clear the filters.'));
      return;
    }
    list.forEach(function (course) { grid.append(SL.render.courseCard(course)); });
    SL.reveal();
  }

  render();
})();
