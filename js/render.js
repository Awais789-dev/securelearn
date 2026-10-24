/* render.js
   Functions that turn data into cards. Used by more than one page
   (for example, course cards appear on Home and on Courses). */
(function () {
  'use strict';

  var SL = window.SL;
  var el = SL.el;
  var R = (SL.render = {});

  R.levelClass = function (level) {
    return { Beginner: 'badge-green', Intermediate: 'badge-cyan', Advanced: 'badge-amber' }[level] || '';
  };

  R.badge = function (text, extraClass) {
    return el('span', { class: 'badge' + (extraClass ? ' ' + extraClass : ''), text: text });
  };

  R.lessonCount = function (course) {
    return course.modules.reduce(function (total, mod) { return total + mod.lessons.length; }, 0);
  };

  R.formatDate = function (iso) {
    var date = new Date(iso + 'T00:00:00');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  R.courseCard = function (course) {
    return el('a', {
      class: 'card card-hover course-card reveal',
      href: 'course-details.html?id=' + encodeURIComponent(course.id)
    }, [
      el('div', { class: 'course-icon', 'aria-hidden': 'true', text: course.icon }),
      el('div', { class: 'row' }, [R.badge(course.level, R.levelClass(course.level)), R.badge(course.category)]),
      el('h3', { text: course.title }),
      el('p', { text: course.summary }),
      el('div', { class: 'meta-row' }, [
        el('span', { text: '⏱ ' + course.duration }),
        el('span', { text: '📚 ' + R.lessonCount(course) + ' lessons' })
      ])
    ]);
  };

  R.postCard = function (post, featured) {
    return el('a', {
      class: 'card card-hover post-card reveal' + (featured ? ' is-featured' : ''),
      href: 'blog-post.html?slug=' + encodeURIComponent(post.slug)
    }, [
      el('div', { class: 'meta-top' }, [
        R.badge(post.category, 'badge-cyan'),
        el('span', { text: R.formatDate(post.date) }),
        el('span', { text: post.readTime + ' min read' })
      ]),
      el('h3', { text: post.title }),
      el('p', { text: post.excerpt }),
      el('span', { class: 'card-link', text: 'Read article →' })
    ]);
  };

  R.empty = function (title, message) {
    return el('div', { class: 'empty-state' }, [
      el('h3', { text: title }),
      el('p', { text: message })
    ]);
  };
})();
