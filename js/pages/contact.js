/* contact.js: form validation. This is a frontend demo, so the message is not sent anywhere. */
(function () {
  'use strict';

  var SL = window.SL;
  var qs = SL.qs;

  var form = qs('#contact-form');
  if (!form) return;

  var fields = {
    name: { input: qs('#c-name'), check: function (v) { return v.length >= 2 ? '' : 'Please enter your name.'; } },
    email: { input: qs('#c-email'), check: function (v) { return SL.isEmail(v) ? '' : 'Please enter a valid email address.'; } },
    subject: { input: qs('#c-subject'), check: function (v) { return v ? '' : 'Please choose a subject.'; } },
    message: { input: qs('#c-message'), check: function (v) { return v.length >= 20 ? '' : 'Please write at least 20 characters.'; } }
  };

  var counter = qs('#c-count');
  var MAX = 500;

  function validate(key) {
    var field = fields[key];
    var message = field.check(field.input.value.trim());
    field.input.classList.toggle('is-invalid', Boolean(message));
    field.input.setAttribute('aria-invalid', String(Boolean(message)));
    qs('#c-' + key + '-error').textContent = message;
    return !message;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].input.addEventListener('blur', function () { validate(key); });
    fields[key].input.addEventListener('input', function () {
      if (fields[key].input.classList.contains('is-invalid')) validate(key);
    });
  });

  fields.message.input.addEventListener('input', function () {
    var length = fields.message.input.value.length;
    counter.textContent = length + ' / ' + MAX;
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var allValid = Object.keys(fields).map(validate).every(Boolean);
    if (!allValid) {
      SL.toast('Please fix the highlighted fields.', 'error');
      var firstBad = qs('.is-invalid', form);
      if (firstBad) firstBad.focus();
      return;
    }
    form.reset();
    counter.textContent = '0 / ' + MAX;
    SL.toast('Thanks! This is a demo, so your message was not sent.', 'ok');
  });
})();
