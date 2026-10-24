/* main.js
   Shared helpers (window.SL) and behavior used on every page:
   theme toggle, mobile menu, header shadow, back to top, scroll reveal,
   show/hide password buttons. Page scripts load after this file. */
(function () {
  'use strict';

  var SL = (window.SL = window.SL || {});

  /* ------------------------------------------------------------- Helpers */
  SL.qs = function (selector, root) {
    return (root || document).querySelector(selector);
  };

  SL.qsa = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  /* Build a DOM element safely. Text always goes in as text, never as HTML.
     SL.el('a', { class: 'btn', href: '#', text: 'Hi' }, [child, 'text']) */
  SL.el = function (tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === false || value === null || value === undefined) return;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key.indexOf('on') === 0 && typeof value === 'function') node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? '' : value);
    });
    [].concat(children || []).forEach(function (child) {
      if (child === null || child === undefined || child === false) return;
      node.append(child.nodeType ? child : document.createTextNode(String(child)));
    });
    return node;
  };

  SL.getParam = function (name) {
    return new URLSearchParams(window.location.search).get(name);
  };

  SL.debounce = function (fn, wait) {
    var timer;
    return function () {
      var args = arguments;
      var self = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(self, args); }, wait || 150);
    };
  };

  SL.isEmail = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  };

  /* localStorage wrapper that never throws (storage can be blocked). */
  SL.storage = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem('sl:' + key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem('sl:' + key, JSON.stringify(value));
      } catch (e) {
        /* ignore */
      }
    }
  };

  SL.toast = function (message, type) {
    var box = SL.qs('#toast-box');
    if (!box) {
      box = SL.el('div', { id: 'toast-box', class: 'toast-box', role: 'status', 'aria-live': 'polite' });
      document.body.append(box);
    }
    var toast = SL.el('div', { class: 'toast' + (type ? ' toast-' + type : ''), text: message });
    box.append(toast);
    setTimeout(function () {
      toast.classList.add('is-leaving');
      setTimeout(function () { toast.remove(); }, 300);
    }, 3200);
  };

  SL.copy = function (text, message) {
    function done() {
      SL.toast(message || 'Copied to clipboard', 'ok');
    }
    function fallback() {
      var area = SL.el('textarea', { readonly: true, style: 'position:fixed;opacity:0' });
      area.value = text;
      document.body.append(area);
      area.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      area.remove();
      done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  };

  /* Fade in elements with the "reveal" class when they scroll into view.
     Call SL.reveal() again after adding new elements to the page. */
  var observer = null;
  SL.reveal = function () {
    var pending = SL.qsa('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      pending.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
    }
    pending.forEach(function (node) { observer.observe(node); });
  };

  /* --------------------------------------------------------------- Theme */
  var themeButton = SL.qs('#theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    SL.storage.set('theme', theme);
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '☾' : '☀';
      themeButton.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
    }
  }

  if (themeButton) {
    applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    themeButton.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* --------------------------------------------------------- Mobile menu */
  var nav = SL.qs('#primary-nav');
  var navToggle = SL.qs('#nav-toggle');

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.textContent = open ? '✕' : '☰';
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (nav && navToggle) {
    navToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setMenu(false);
    });
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.site-header')) setMenu(false);
    });
  }

  /* ------------------------------------------- Header shadow, back to top */
  var header = SL.qs('#site-header-bar');
  var toTop = SL.el('button', { class: 'icon-btn to-top', type: 'button', 'aria-label': 'Back to top', text: '↑' });
  document.body.append(toTop);
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0 });
  });

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------- Show / hide password buttons
     Usage: <button type="button" data-toggle-password="inputId">Show</button> */
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-toggle-password]');
    if (!button) return;
    var input = document.getElementById(button.getAttribute('data-toggle-password'));
    if (!input) return;
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.textContent = show ? 'Hide' : 'Show';
    button.setAttribute('aria-pressed', String(show));
  });

  SL.reveal();
})();
