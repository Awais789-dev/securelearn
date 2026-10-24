/* password.js
   Password strength scoring, shared by the Tools page and the Sign up form.
   Everything runs in the browser. Nothing is stored or sent anywhere.

   SL.pw.score(password) returns:
   { score: 0-4, label, bits, crackTime, checks: [{ ok, text }] } */
(function () {
  'use strict';

  var SL = window.SL;

  var COMMON = [
    'password', '123456', '12345678', '123456789', 'qwerty', 'abc123', 'letmein', 'welcome',
    'admin', 'iloveyou', 'monkey', 'dragon', 'football', 'login', 'passw0rd', '111111',
    '000000', 'qwerty123', '1q2w3e4r', 'password1', 'princess', 'sunshine', 'master',
    'shadow', 'trustno1', 'changeme', 'whatever'
  ];

  var SEQUENCES = ['abcdefghijklmnopqrstuvwxyz', '0123456789', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  function poolSize(password) {
    var size = 0;
    if (/[a-z]/.test(password)) size += 26;
    if (/[A-Z]/.test(password)) size += 26;
    if (/\d/.test(password)) size += 10;
    if (/[^A-Za-z0-9]/.test(password)) size += 33;
    return size;
  }

  function hasSequence(password) {
    var text = password.toLowerCase();
    return SEQUENCES.some(function (seq) {
      for (var i = 0; i <= seq.length - 4; i++) {
        var chunk = seq.slice(i, i + 4);
        var reversed = chunk.split('').reverse().join('');
        if (text.indexOf(chunk) !== -1 || text.indexOf(reversed) !== -1) return true;
      }
      return false;
    });
  }

  function formatDuration(seconds) {
    if (seconds < 1) return 'instantly';
    if (seconds < 60) return Math.round(seconds) + ' seconds';
    if (seconds < 3600) return Math.round(seconds / 60) + ' minutes';
    if (seconds < 86400) return Math.round(seconds / 3600) + ' hours';
    if (seconds < 31557600) return Math.round(seconds / 86400) + ' days';
    var years = seconds / 31557600;
    if (years < 1000) return Math.round(years) + ' years';
    if (years < 1e6) return 'thousands of years';
    if (years < 1e9) return 'millions of years';
    return 'billions of years or more';
  }

  var LABELS = ['Very weak', 'Weak', 'Okay', 'Strong', 'Very strong'];

  function score(password) {
    var length = password.length;
    var isCommon = COMMON.indexOf(password.toLowerCase()) !== -1;
    var repeats = /(.)\1{2,}/.test(password);
    var sequence = hasSequence(password);
    var pool = poolSize(password);

    var bits = length && pool ? length * Math.log2(pool) : 0;
    if (repeats) bits *= 0.75;
    if (sequence) bits *= 0.75;
    if (isCommon) bits = Math.min(bits, 10);

    var level = 0;
    if (bits >= 80) level = 4;
    else if (bits >= 60) level = 3;
    else if (bits >= 40) level = 2;
    else if (bits >= 28) level = 1;

    /* Assume a fast offline attack of 10 billion guesses per second.
       On average an attacker finds the password after trying half the options. */
    var seconds = bits ? Math.pow(2, bits - 1) / 1e10 : 0;

    return {
      score: length ? level : 0,
      label: length ? LABELS[level] : 'Enter a password',
      bits: Math.round(bits),
      crackTime: length ? formatDuration(seconds) : '-',
      checks: [
        { ok: length >= 12, text: 'At least 12 characters' },
        { ok: /[a-z]/.test(password) && /[A-Z]/.test(password), text: 'Upper and lower case letters' },
        { ok: /\d/.test(password), text: 'Includes a number' },
        { ok: /[^A-Za-z0-9]/.test(password), text: 'Includes a symbol' },
        { ok: length > 0 && !isCommon, text: 'Not a very common password' },
        { ok: length > 0 && !repeats && !sequence, text: 'No repeated characters or easy sequences' }
      ]
    };
  }

  SL.pw = { score: score };
})();
