/* auth.js: login and sign up forms. UI only.
   No account is created and no password is stored or sent anywhere. */
(function () {
  'use strict';

  var SL = window.SL;
  var qs = SL.qs;

  var loginForm = qs('#login-form');
  var signupForm = qs('#signup-form');
  var tabLogin = qs('#tab-login');
  var tabSignup = qs('#tab-signup');
  if (!loginForm || !signupForm) return;

  /* ---------------------------------------------------------------- Tabs */
  function showTab(name) {
    var isLogin = name !== 'signup';
    loginForm.hidden = !isLogin;
    signupForm.hidden = isLogin;
    tabLogin.setAttribute('aria-pressed', String(isLogin));
    tabSignup.setAttribute('aria-pressed', String(!isLogin));
    qs('#auth-title').textContent = isLogin ? 'Welcome back' : 'Create your account';
  }

  tabLogin.addEventListener('click', function () { showTab('login'); history.replaceState(null, '', '#login'); });
  tabSignup.addEventListener('click', function () { showTab('signup'); history.replaceState(null, '', '#signup'); });
  window.addEventListener('hashchange', function () { showTab(location.hash.slice(1)); });
  showTab(location.hash.slice(1));

  /* ------------------------------------------------------------ Helpers */
  function setError(inputId, message) {
    var input = qs('#' + inputId);
    input.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    qs('#' + inputId + '-error').textContent = message || '';
    return !message;
  }

  /* ---------------------------------------------------------- Login form */
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var okEmail = setError('l-email', SL.isEmail(qs('#l-email').value.trim()) ? '' : 'Enter a valid email address.');
    var okPass = setError('l-password', qs('#l-password').value ? '' : 'Enter your password.');
    if (!okEmail || !okPass) return;
    loginForm.reset();
    SL.toast('Demo only: no real login happened.', 'ok');
  });

  /* --------------------------------------------------------- Signup form */
  var signupPassword = qs('#s-password');
  var bar = qs('#s-bar');
  var strengthLabel = qs('#s-strength');

  signupPassword.addEventListener('input', function () {
    var result = SL.pw.score(signupPassword.value);
    bar.style.width = signupPassword.value ? (result.score + 1) * 20 + '%' : '0';
    bar.className = 'meter-bar lvl-' + Math.max(result.score, 1);
    strengthLabel.textContent = signupPassword.value ? 'Strength: ' + result.label : 'Use 12 or more characters.';
  });

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = qs('#s-name').value.trim();
    var pass = signupPassword.value;
    var strength = SL.pw.score(pass);

    var results = [
      setError('s-name', name.length >= 2 ? '' : 'Enter your name.'),
      setError('s-email', SL.isEmail(qs('#s-email').value.trim()) ? '' : 'Enter a valid email address.'),
      setError('s-password', strength.score >= 2 ? '' : 'Choose a stronger password (at least Okay).'),
      setError('s-confirm', qs('#s-confirm').value === pass && pass ? '' : 'The passwords do not match.'),
      setError('s-terms', qs('#s-terms').checked ? '' : 'Please accept the terms to continue.')
    ];
    if (!results.every(Boolean)) {
      SL.toast('Please fix the highlighted fields.', 'error');
      return;
    }
    signupForm.reset();
    bar.style.width = '0';
    strengthLabel.textContent = 'Use 12 or more characters.';
    SL.toast('Demo only: no account was created.', 'ok');
  });
})();
