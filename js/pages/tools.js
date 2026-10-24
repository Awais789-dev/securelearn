/* tools.js: six small security tools. Everything runs in the browser and nothing is sent anywhere.
   Each tool has its own init function so they stay independent. */
(function () {
  'use strict';

  var SL = window.SL;
  var D = window.SL_DATA;
  var el = SL.el;
  var qs = SL.qs;
  var byId = function (id) { return document.getElementById(id); };

  /* ------------------------------------------------------------ Tool tabs */
  var tabs = qs('#tool-tabs');
  var panels = SL.qsa('.tool-panel');
  if (!tabs) return;

  function show(id) {
    var known = D.tools.some(function (t) { return t.id === id; });
    var target = known ? id : D.tools[0].id;
    panels.forEach(function (panel) { panel.hidden = panel.id !== 'tool-' + target; });
    SL.qsa('#tool-tabs .chip').forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('data-tool') === target));
    });
  }

  D.tools.forEach(function (tool) {
    tabs.append(el('button', {
      class: 'chip', type: 'button', 'data-tool': tool.id, 'aria-pressed': 'false',
      text: tool.icon + ' ' + tool.title,
      onclick: function () {
        show(tool.id);
        history.replaceState(null, '', '#' + tool.id);
      }
    }));
  });

  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
  show(location.hash.slice(1));

  /* ---------------------------------------------------- Password checker */
  function initChecker() {
    var input = byId('pw-input');
    var bar = byId('pw-bar');
    var label = byId('pw-label');
    var bits = byId('pw-bits');
    var time = byId('pw-time');
    var list = byId('pw-checks');

    function update() {
      var result = SL.pw.score(input.value);
      bar.style.width = (input.value ? (result.score + 1) * 20 : 0) + '%';
      bar.className = 'meter-bar lvl-' + Math.max(result.score, 1);
      label.textContent = result.label;
      bits.textContent = input.value ? result.bits + ' bits' : '-';
      time.textContent = result.crackTime;
      list.textContent = '';
      result.checks.forEach(function (check) {
        list.append(el('li', { class: check.ok ? 'is-pass' : '', text: check.text }));
      });
    }

    input.addEventListener('input', update);
    update();
  }

  /* -------------------------------------------------- Password generator */
  function initGenerator() {
    var SETS = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      digits: '0123456789',
      symbols: '!@#$%^&*()-_=+[]{};:,.?'
    };
    var AMBIGUOUS = /[Il1O0o]/g;

    var length = byId('gen-length');
    var lengthOut = byId('gen-length-out');
    var output = byId('gen-output');
    var info = byId('gen-info');
    var boxes = {
      upper: byId('gen-upper'),
      lower: byId('gen-lower'),
      digits: byId('gen-digits'),
      symbols: byId('gen-symbols')
    };
    var noAmbiguous = byId('gen-ambiguous');

    /* Random whole number from 0 to max-1 with no modulo bias. */
    function randomInt(max) {
      var limit = Math.floor(0x100000000 / max) * max;
      var buffer = new Uint32Array(1);
      var value;
      do {
        crypto.getRandomValues(buffer);
        value = buffer[0];
      } while (value >= limit);
      return value % max;
    }

    function generate() {
      var chosen = Object.keys(SETS)
        .filter(function (key) { return boxes[key].checked; })
        .map(function (key) { return noAmbiguous.checked ? SETS[key].replace(AMBIGUOUS, '') : SETS[key]; });

      lengthOut.textContent = length.value;

      if (!chosen.length) {
        output.textContent = 'Pick at least one character type';
        info.textContent = '';
        return;
      }

      var size = Math.max(Number(length.value), chosen.length);
      var pool = chosen.join('');
      var chars = chosen.map(function (set) { return set[randomInt(set.length)]; });
      while (chars.length < size) chars.push(pool[randomInt(pool.length)]);

      /* Fisher-Yates shuffle so the guaranteed characters are not always first. */
      for (var i = chars.length - 1; i > 0; i--) {
        var j = randomInt(i + 1);
        var temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
      }

      var password = chars.join('');
      output.textContent = password;
      var result = SL.pw.score(password);
      info.textContent = result.label + ' · about ' + Math.round(size * Math.log2(pool.length)) + ' bits';
    }

    length.addEventListener('input', generate);
    Object.keys(boxes).forEach(function (key) { boxes[key].addEventListener('change', generate); });
    noAmbiguous.addEventListener('change', generate);
    byId('gen-new').addEventListener('click', generate);
    byId('gen-copy').addEventListener('click', function () {
      if (output.textContent && output.textContent.indexOf('Pick at least') !== 0) {
        SL.copy(output.textContent, 'Password copied');
      }
    });
    generate();
  }

  /* ------------------------------------------------------ Hash generator */
  function initHash() {
    var ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    var text = byId('hash-text');
    var file = byId('hash-file');
    var results = byId('hash-results');
    var status = byId('hash-status');
    var run = 0;

    var supported = window.crypto && window.crypto.subtle;
    if (!supported) {
      status.textContent = 'Your browser does not support hashing here. Open the site over https or on localhost.';
    }

    var rows = {};
    ALGORITHMS.forEach(function (name) {
      var out = el('code', { class: 'mono', text: '' });
      rows[name] = out;
      results.append(el('div', { class: 'hash-row' }, [
        el('span', { class: 'label', text: name }),
        el('div', { class: 'output-box' }, [
          out,
          el('button', {
            class: 'btn btn-ghost btn-sm', type: 'button', text: 'Copy',
            'aria-label': 'Copy ' + name + ' hash',
            onclick: function () { if (out.textContent) SL.copy(out.textContent, name + ' hash copied'); }
          })
        ])
      ]));
    });

    function toHex(buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
        return b.toString(16).padStart(2, '0');
      }).join('');
    }

    function hashAll(bytes) {
      if (!supported) return;
      var current = ++run;
      ALGORITHMS.forEach(function (name) {
        crypto.subtle.digest(name, bytes).then(function (buffer) {
          if (current === run) rows[name].textContent = toHex(buffer);
        });
      });
    }

    text.addEventListener('input', function () {
      file.value = '';
      status.textContent = text.value ? '' : 'Type some text or choose a file.';
      hashAll(new TextEncoder().encode(text.value));
    });

    file.addEventListener('change', function () {
      var chosen = file.files[0];
      if (!chosen) return;
      if (chosen.size > 100 * 1024 * 1024) {
        status.textContent = 'That file is over 100 MB. Please pick a smaller one.';
        return;
      }
      text.value = '';
      status.textContent = 'Hashing ' + chosen.name + ' (' + chosen.size + ' bytes)';
      chosen.arrayBuffer().then(hashAll);
    });

    text.dispatchEvent(new Event('input'));
  }

  /* ---------------------------------------------------------------- Base64 */
  function initBase64() {
    var input = byId('b64-input');
    var output = byId('b64-output');
    var error = byId('b64-error');

    function encode(value) {
      var bytes = new TextEncoder().encode(value);
      var binary = '';
      bytes.forEach(function (b) { binary += String.fromCharCode(b); });
      return btoa(binary);
    }

    function decode(value) {
      var binary = atob(value.trim());
      var bytes = Uint8Array.from(binary, function (c) { return c.charCodeAt(0); });
      return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    }

    function run(fn) {
      error.textContent = '';
      try {
        output.value = fn(input.value);
      } catch (e) {
        output.value = '';
        error.textContent = 'That input could not be converted. Check that it is valid Base64.';
      }
    }

    byId('b64-encode').addEventListener('click', function () { run(encode); });
    byId('b64-decode').addEventListener('click', function () { run(decode); });
    byId('b64-copy').addEventListener('click', function () { if (output.value) SL.copy(output.value); });
  }

  /* --------------------------------------------------------------- Ciphers */
  function initCiphers() {
    var type = byId('cipher-type');
    var mode = byId('cipher-mode');
    var shiftField = byId('caesar-field');
    var keyField = byId('vigenere-field');
    var shift = byId('caesar-shift');
    var key = byId('vigenere-key');
    var input = byId('cipher-input');
    var output = byId('cipher-output');
    var error = byId('cipher-error');

    function mod26(n) { return ((n % 26) + 26) % 26; }

    /* Shift one letter, keep case. Other characters pass through unchanged. */
    function shiftLetter(ch, amount) {
      var code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(65 + mod26(code - 65 + amount));
      if (code >= 97 && code <= 122) return String.fromCharCode(97 + mod26(code - 97 + amount));
      return ch;
    }

    function caesar(text, amount, decrypt) {
      var s = decrypt ? -amount : amount;
      return text.split('').map(function (ch) { return shiftLetter(ch, s); }).join('');
    }

    function vigenere(text, keyword, decrypt) {
      var letters = keyword.toUpperCase().replace(/[^A-Z]/g, '');
      if (!letters) return null;
      var index = 0;
      return text.split('').map(function (ch) {
        if (!/[A-Za-z]/.test(ch)) return ch;
        var amount = letters.charCodeAt(index % letters.length) - 65;
        index++;
        return shiftLetter(ch, decrypt ? -amount : amount);
      }).join('');
    }

    function update() {
      var isCaesar = type.value === 'caesar';
      shiftField.hidden = !isCaesar;
      keyField.hidden = isCaesar;
      error.textContent = '';
      var decrypt = mode.value === 'decrypt';

      if (isCaesar) {
        var amount = parseInt(shift.value, 10);
        if (isNaN(amount)) amount = 0;
        output.value = caesar(input.value, amount, decrypt);
      } else {
        var result = vigenere(input.value, key.value, decrypt);
        if (result === null) {
          output.value = '';
          error.textContent = 'Enter a keyword made of letters.';
        } else {
          output.value = result;
        }
      }
    }

    [type, mode, shift, key, input].forEach(function (node) {
      node.addEventListener('input', update);
      node.addEventListener('change', update);
    });
    byId('cipher-copy').addEventListener('click', function () { if (output.value) SL.copy(output.value); });
    update();
  }

  /* ----------------------------------------------------------- Port lookup */
  function initPorts() {
    var input = byId('port-search');
    var body = byId('port-rows');
    var count = byId('port-count');

    function render() {
      var query = input.value.trim().toLowerCase();
      var list = D.ports.filter(function (p) {
        return !query || (p.port + ' ' + p.proto + ' ' + p.service + ' ' + p.note).toLowerCase().indexOf(query) !== -1;
      });
      body.textContent = '';
      list.forEach(function (p) {
        body.append(el('tr', {}, [
          el('td', {}, [el('code', { text: String(p.port) })]),
          el('td', { text: p.proto }),
          el('td', { text: p.service }),
          el('td', { text: p.note })
        ]));
      });
      count.textContent = list.length ? list.length + ' of ' + D.ports.length + ' ports' : 'No ports match your search.';
    }

    input.addEventListener('input', SL.debounce(render, 80));
    render();
  }

  initChecker();
  initGenerator();
  initHash();
  initBase64();
  initCiphers();
  initPorts();
})();
