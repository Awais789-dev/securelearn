/* home.js: stats, featured courses, tools preview, latest posts, terminal demo, newsletter form */
(function () {
  'use strict';

  var SL = window.SL;
  var D = window.SL_DATA;
  var el = SL.el;
  var qs = SL.qs;

  /* ----------------------------------------------------------------- Stats */
  var statsBox = qs('#home-stats');
  if (statsBox) {
    var lessons = D.courses.reduce(function (n, c) { return n + SL.render.lessonCount(c); }, 0);
    var entries = D.sheets.reduce(function (n, s) { return n + s.items.length; }, 0) + D.ports.length;
    [
      [D.courses.length, 'Courses'],
      [lessons, 'Lessons'],
      [entries, 'Cheat sheet entries'],
      [D.tools.length, 'Browser tools']
    ].forEach(function (pair) {
      statsBox.append(el('div', { class: 'stat' }, [el('strong', { text: String(pair[0]) }), el('span', { text: pair[1] })]));
    });
  }

  /* ----------------------------------------------------- Featured content */
  var featured = qs('#featured-courses');
  if (featured) {
    ['cybersecurity-fundamentals', 'ethical-hacking-essentials', 'soc-analyst-starter'].forEach(function (id) {
      var course = D.courses.find(function (c) { return c.id === id; });
      if (course) featured.append(SL.render.courseCard(course));
    });
  }

  var toolsBox = qs('#tools-preview');
  if (toolsBox) {
    D.tools.slice(0, 3).forEach(function (tool) {
      toolsBox.append(el('a', { class: 'card card-hover reveal', href: 'tools.html#' + tool.id }, [
        el('div', { class: 'card-icon', 'aria-hidden': 'true', text: tool.icon }),
        el('h3', { text: tool.title }),
        el('p', { class: 'muted', text: tool.desc }),
        el('span', { class: 'card-link', text: 'Open tool →' })
      ]));
    });
  }

  var postsBox = qs('#latest-posts');
  if (postsBox) {
    D.posts.slice(0, 3).forEach(function (post) { postsBox.append(SL.render.postCard(post)); });
  }

  /* -------------------------------------------------------- Terminal demo */
  var body = qs('#terminal-body');
  if (body) {
    var script = [
      { kind: 'cmd', text: 'nmap -sV 192.168.56.101' },
      { kind: 'out', text: 'Starting Nmap scan on 1 host...' },
      { kind: 'out', text: 'PORT   STATE SERVICE VERSION' },
      { kind: 'ok', text: '21/tcp open  ftp     vsftpd 2.3.4' },
      { kind: 'ok', text: '22/tcp open  ssh     OpenSSH 4.7p1' },
      { kind: 'ok', text: '80/tcp open  http    Apache httpd 2.2.8' },
      { kind: 'out', text: 'Scan complete: 3 services found.' },
      { kind: 'cmd', text: 'echo "Only scan systems you own or have permission to test."' },
      { kind: 'warn', text: 'Only scan systems you own or have permission to test.' }
    ];
    var cursor = el('span', { class: 't-cursor', 'aria-hidden': 'true' });
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var sleep = function (ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); };

    var run = async function () {
      for (var i = 0; i < script.length; i++) {
        var line = script[i];
        var row = el('div');
        body.insertBefore(row, cursor);
        if (line.kind === 'cmd') {
          row.append(el('span', { class: 't-prompt', text: '$ ' }));
          var typed = el('span');
          row.append(typed);
          for (var c = 0; c < line.text.length; c++) {
            typed.textContent += line.text[c];
            if (!reduceMotion) await sleep(28);
          }
          if (!reduceMotion) await sleep(350);
        } else {
          row.append(el('span', { class: 't-' + line.kind, text: line.text }));
          if (!reduceMotion) await sleep(260);
        }
      }
    };

    body.setAttribute('aria-label', 'Example Nmap scan output');
    body.append(cursor);
    run();
  }

  /* ------------------------------------------------------ Newsletter form */
  var form = qs('#newsletter-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var input = qs('#newsletter-email');
      if (!SL.isEmail(input.value.trim())) {
        input.classList.add('is-invalid');
        SL.toast('Please enter a valid email address.', 'error');
        return;
      }
      input.classList.remove('is-invalid');
      form.reset();
      SL.toast('Thanks! This is a demo, so nothing was saved.', 'ok');
    });
  }

  SL.reveal();
})();
