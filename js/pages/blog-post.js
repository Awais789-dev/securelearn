/* blog-post.js: shows one article. The article is chosen with ?slug=post-slug in the URL.
   Content blocks are built with DOM methods, so text can never inject HTML. */
(function () {
  'use strict';

  var SL = window.SL;
  var D = window.SL_DATA;
  var el = SL.el;
  var qs = SL.qs;

  var root = qs('#post-root');
  if (!root) return;

  var post = D.posts.find(function (p) { return p.slug === SL.getParam('slug'); });

  if (!post) {
    document.title = 'Article not found | SecureLearn';
    root.textContent = '';
    root.append(
      el('div', { class: 'container section' }, [
        SL.render.empty('Article not found', 'That article does not exist or the link is wrong.'),
        el('p', { class: 'center-text mt-3' }, [el('a', { class: 'btn btn-primary', href: 'blog.html', text: 'Back to the blog' })])
      ])
    );
    return;
  }

  document.title = post.title + ' | SecureLearn';

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  /* ----------------------------------------------------------------- Hero */
  qs('#post-crumb').textContent = post.category;
  qs('#post-title').textContent = post.title;
  qs('#post-meta').append(
    SL.render.badge(post.category, 'badge-cyan'),
    el('span', { text: SL.render.formatDate(post.date) }),
    el('span', { text: post.readTime + ' min read' })
  );

  /* ---------------------------------------------------------------- Body */
  var article = qs('#post-body');
  var toc = qs('#toc-list');

  post.content.forEach(function (block) {
    if (block.type === 'p') {
      article.append(el('p', { text: block.text }));
    } else if (block.type === 'h2') {
      var id = slugify(block.text);
      article.append(el('h2', { id: id, text: block.text }));
      toc.append(el('li', {}, [el('a', { href: '#' + id, text: block.text })]));
    } else if (block.type === 'ul') {
      var list = el('ul');
      block.items.forEach(function (item) { list.append(el('li', { text: item })); });
      article.append(list);
    } else if (block.type === 'code') {
      article.append(el('pre', {}, [el('code', { text: block.text })]));
    } else if (block.type === 'note') {
      article.append(el('div', { class: 'callout' }, [el('strong', { text: 'Note: ' }), block.text]));
    }
  });

  /* -------------------------------------------------------------- Actions */
  qs('#copy-link').addEventListener('click', function () {
    SL.copy(window.location.href, 'Link copied');
  });

  /* -------------------------------------------------------------- Related */
  var related = qs('#related-posts');
  D.posts
    .filter(function (p) { return p.slug !== post.slug; })
    .sort(function (a, b) { return (b.category === post.category) - (a.category === post.category); })
    .slice(0, 2)
    .forEach(function (p) { related.append(SL.render.postCard(p)); });

  SL.reveal();
})();
