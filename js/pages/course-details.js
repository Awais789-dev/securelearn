/* course-details.js: shows one course. The course is chosen with ?id=course-id in the URL. */
(function () {
  'use strict';

  var SL = window.SL;
  var D = window.SL_DATA;
  var el = SL.el;
  var qs = SL.qs;

  var root = qs('#course-root');
  if (!root) return;

  var course = D.courses.find(function (c) { return c.id === SL.getParam('id'); });

  if (!course) {
    document.title = 'Course not found | SecureLearn';
    root.textContent = '';
    root.append(
      el('div', { class: 'container section' }, [
        SL.render.empty('Course not found', 'That course does not exist or the link is wrong.'),
        el('p', { class: 'center-text mt-3' }, [el('a', { class: 'btn btn-primary', href: 'courses.html', text: 'Browse all courses' })])
      ])
    );
    return;
  }

  document.title = course.title + ' | SecureLearn';
  var lessonTotal = SL.render.lessonCount(course);

  /* ------------------------------------------------------------ Hero text */
  qs('#course-crumb').textContent = course.title;
  qs('#course-title').textContent = course.title;
  qs('#course-summary').textContent = course.summary;
  qs('#course-badges').append(
    SL.render.badge(course.level, SL.render.levelClass(course.level)),
    SL.render.badge(course.category)
  );

  /* ---------------------------------------------------------- Main column */
  qs('#course-description').textContent = course.description;

  var outcomes = qs('#course-outcomes');
  course.outcomes.forEach(function (text) { outcomes.append(el('li', { text: text })); });

  var requirements = qs('#course-requirements');
  course.requirements.forEach(function (text) { requirements.append(el('li', { text: text })); });

  var curriculum = qs('#course-curriculum');
  course.modules.forEach(function (mod, index) {
    var list = el('ol');
    mod.lessons.forEach(function (lesson) { list.append(el('li', { text: lesson })); });
    curriculum.append(
      el('details', { open: index === 0 }, [
        el('summary', {}, [
          'Module ' + (index + 1) + ': ' + mod.title,
          el('span', { class: 'summary-meta', text: mod.lessons.length + ' lessons' })
        ]),
        el('div', { class: 'accordion-body' }, [list])
      ])
    );
  });

  /* -------------------------------------------------------------- Sidebar */
  var facts = qs('#course-facts');
  [
    ['Level', course.level],
    ['Duration', course.duration],
    ['Lessons', String(lessonTotal)],
    ['Modules', String(course.modules.length)],
    ['Price', 'Free']
  ].forEach(function (pair) {
    facts.append(el('li', {}, [el('span', { text: pair[0] }), el('strong', { text: pair[1] })]));
  });

  var enrollBtn = qs('#enroll-btn');
  function isEnrolled() {
    return SL.storage.get('enrolled', []).indexOf(course.id) !== -1;
  }
  function paintEnroll() {
    enrollBtn.textContent = isEnrolled() ? '✓ Enrolled (click to leave)' : 'Enroll for free';
    enrollBtn.classList.toggle('btn-ghost', isEnrolled());
    enrollBtn.classList.toggle('btn-primary', !isEnrolled());
  }
  enrollBtn.addEventListener('click', function () {
    var list = SL.storage.get('enrolled', []);
    if (isEnrolled()) {
      list = list.filter(function (id) { return id !== course.id; });
      SL.toast('You left this course.');
    } else {
      list.push(course.id);
      SL.toast('Enrolled! Saved in this browser only (demo).', 'ok');
    }
    SL.storage.set('enrolled', list);
    paintEnroll();
  });
  paintEnroll();

  /* -------------------------------------------------------------- Related */
  var related = qs('#related-courses');
  var others = D.courses.filter(function (c) { return c.id !== course.id; });
  others.sort(function (a, b) {
    var scoreA = (a.category === course.category ? 2 : 0) + (a.level === course.level ? 1 : 0);
    var scoreB = (b.category === course.category ? 2 : 0) + (b.level === course.level ? 1 : 0);
    return scoreB - scoreA;
  });
  others.slice(0, 3).forEach(function (c) { related.append(SL.render.courseCard(c)); });

  SL.reveal();
})();
