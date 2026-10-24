/* theme-init.js
   Runs in <head> before the page paints so there is no flash of the wrong theme.
   It also adds the "js" class that the CSS uses for scroll animations. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var theme = 'dark';
  try {
    var saved = JSON.parse(localStorage.getItem('sl:theme'));
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (e) {
    /* storage can be blocked, dark is a fine default */
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
