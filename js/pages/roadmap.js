/* roadmap.js: learning roadmap with checkboxes. Progress is saved in this browser (localStorage). */
(function () {
  'use strict';

  var SL = window.SL;
  var roadmap = window.SL_DATA.roadmap;
  var el = SL.el;
  var qs = SL.qs;

  var timeline = qs('#timeline');
  var certs = qs('#cert-grid');
  var overallBar = qs('#overall-bar');
  var overallText = qs('#overall-text');
  var resetBtn = qs('#reset-progress');
  if (!timeline) return;

  var done = SL.storage.get('roadmap', []);
  var allTasks = roadmap.stages.reduce(function (list, s) { return list.concat(s.tasks); }, []);

  function save() {
    SL.storage.set('roadmap', done);
  }

  function stageCount(stage) {
    return stage.tasks.filter(function (t) { return done.indexOf(t.id) !== -1; }).length;
  }

  /* Update the numbers and bars without rebuilding the whole list. */
  function paintProgress() {
    var total = allTasks.length;
    var finished = allTasks.filter(function (t) { return done.indexOf(t.id) !== -1; }).length;
    var percent = Math.round((finished / total) * 100);
    overallBar.style.width = percent + '%';
    qs('#overall-progress').setAttribute('aria-valuenow', String(percent));
    overallText.textContent = finished + ' of ' + total + ' steps done (' + percent + '%)';

    roadmap.stages.forEach(function (stage) {
      var badge = qs('#stage-count-' + stage.id);
      if (badge) badge.textContent = stageCount(stage) + '/' + stage.tasks.length;
    });
  }

  function buildStage(stage, index) {
    var list = el('ul', { class: 'task-list' });
    stage.tasks.forEach(function (task) {
      var checkbox = el('input', { type: 'checkbox', id: 'task-' + task.id });
      checkbox.checked = done.indexOf(task.id) !== -1;
      checkbox.addEventListener('change', function () {
        done = done.filter(function (id) { return id !== task.id; });
        if (checkbox.checked) done.push(task.id);
        save();
        paintProgress();
      });
      list.append(el('li', {}, [el('label', { class: 'check', for: 'task-' + task.id }, [checkbox, el('span', { text: task.text })])]));
    });

    return el('article', { class: 'stage reveal' }, [
      el('div', { class: 'stage-num', 'aria-hidden': 'true', text: String(index + 1) }),
      el('div', { class: 'card' }, [
        el('div', { class: 'stage-head' }, [
          el('h3', { text: stage.title }),
          el('div', { class: 'row' }, [
            SL.render.badge(stage.duration, 'badge-cyan'),
            el('span', { class: 'badge badge-green', id: 'stage-count-' + stage.id, text: '' })
          ])
        ]),
        el('p', { class: 'muted', text: stage.desc }),
        list
      ])
    ]);
  }

  roadmap.stages.forEach(function (stage, index) { timeline.append(buildStage(stage, index)); });

  roadmap.certs.forEach(function (cert) {
    certs.append(el('div', { class: 'card reveal' }, [
      SL.render.badge(cert.level, SL.render.levelClass(cert.level === 'Entry' ? 'Beginner' : cert.level)),
      el('h3', { text: cert.name }),
      el('p', { class: 'muted', text: cert.focus })
    ]));
  });

  resetBtn.addEventListener('click', function () {
    if (!done.length) return;
    if (window.confirm('Clear all roadmap progress?')) {
      done = [];
      save();
      SL.qsa('.task-list input').forEach(function (box) { box.checked = false; });
      paintProgress();
      SL.toast('Progress cleared.');
    }
  });

  paintProgress();
  SL.reveal();
})();
