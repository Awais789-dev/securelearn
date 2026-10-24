/* layout.js
   Builds the header and footer once so every page shares the same markup.
   To add a page to the menu, add one line to NAV_LINKS below. */
(function () {
  'use strict';

  var NAV_LINKS = [
    { id: 'courses', label: 'Courses', href: 'courses.html' },
    { id: 'roadmap', label: 'Roadmap', href: 'roadmap.html' },
    { id: 'cheatsheets', label: 'Cheat Sheets', href: 'cheatsheets.html' },
    { id: 'tools', label: 'Tools', href: 'tools.html' },
    { id: 'blog', label: 'Blog', href: 'blog.html' },
    { id: 'resources', label: 'Resources', href: 'resources.html' },
    { id: 'about', label: 'About', href: 'about.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' }
  ];

  var FOOTER_COLUMNS = [
    {
      title: 'Learn',
      links: [
        { label: 'Courses', href: 'courses.html' },
        { label: 'Roadmap', href: 'roadmap.html' },
        { label: 'Blog', href: 'blog.html' }
      ]
    },
    {
      title: 'Practice',
      links: [
        { label: 'Cheat Sheets', href: 'cheatsheets.html' },
        { label: 'Browser Tools', href: 'tools.html' },
        { label: 'Resources', href: 'resources.html' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: 'about.html' },
        { label: 'Contact', href: 'contact.html' },
        { label: 'Log in', href: 'auth.html' }
      ]
    }
  ];

  var SHIELD =
    '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">' +
    '<path d="M16 3l11 4.2v8.3c0 6.6-4.5 11.5-11 14.3C9.5 27 5 22.1 5 15.5V7.2L16 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M11 16l3.5 3.5L21 12" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var activeId = document.body.getAttribute('data-nav') || document.body.getAttribute('data-page');

  function buildHeader() {
    var items = NAV_LINKS.map(function (link) {
      var current = link.id === activeId ? ' aria-current="page"' : '';
      return '<li><a href="' + link.href + '"' + current + '>' + link.label + '</a></li>';
    }).join('');

    return (
      '<header class="site-header" id="site-header-bar">' +
      '<div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="SecureLearn home">' + SHIELD +
      '<span class="brand-name">Secure<span>Learn</span></span></a>' +
      '<nav class="nav" id="primary-nav" aria-label="Primary"><ul>' + items + '</ul></nav>' +
      '<div class="header-actions">' +
      '<button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch color theme">☾</button>' +
      '<a class="btn btn-primary btn-sm" href="auth.html">Log in</a>' +
      '<button class="icon-btn nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">☰</button>' +
      '</div></div></header>'
    );
  }

  function buildFooter() {
    var columns = FOOTER_COLUMNS.map(function (col) {
      var links = col.links
        .map(function (l) { return '<li><a href="' + l.href + '">' + l.label + '</a></li>'; })
        .join('');
      return '<div><h4>' + col.title + '</h4><ul>' + links + '</ul></div>';
    }).join('');

    return (
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-about"><a class="brand" href="index.html">' + SHIELD +
      '<span class="brand-name">Secure<span>Learn</span></span></a>' +
      '<p>Free cybersecurity learning for students. Learn it, practice it, and use it legally and ethically.</p></div>' +
      columns +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + ' SecureLearn. A frontend demo project.</span>' +
      '<span>Courses and posts are sample content.</span></div>' +
      '</div></footer>'
    );
  }

  var headerSlot = document.getElementById('site-header');
  var footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.outerHTML = buildHeader();
  if (footerSlot) footerSlot.outerHTML = buildFooter();
})();
