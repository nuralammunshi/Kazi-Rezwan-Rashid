/*==============================================================
  site.js — behavior for the 2026 refresh (Home, About, Projects, Huck)

  Plain vanilla JS, no dependencies. Every block is a no-op when its
  markup is absent, so all four pages load the same file.
==============================================================*/
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /*--------------------  Scroll reveal  --------------------*/
  /* Content that is opacity:0 with no callback is invisible content —
     the failure mode is total. Hence three layers: IntersectionObserver
     (the path that normally runs), a rect check on scroll/resize, and a
     1.5s deadline that forces everything visible regardless. */
  function armReveal() {
    var nodes = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (!nodes.length) return;

    if (reduced) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }

    var pending = nodes.slice();
    var io = null;

    function show(n) {
      n.classList.add('is-in');
      if (io) io.unobserve(n);
      var i = pending.indexOf(n);
      if (i > -1) pending.splice(i, 1);
    }
    function showAll() {
      pending.slice().forEach(show);
      disarm();
    }
    function check() {
      var vh = window.innerHeight || 800;
      pending.slice().forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > 0) show(n);
      });
      if (!pending.length) disarm();
    }
    function disarm() {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    var ioFired = false;
    if (window.IntersectionObserver) {
      io = new IntersectionObserver(function (entries) {
        ioFired = true;
        entries.forEach(function (e) { if (e.isIntersecting) show(e.target); });
        if (!pending.length) disarm();
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
      nodes.forEach(function (n) { io.observe(n); });
    }

    requestAnimationFrame(check);
    setTimeout(check, 250);
    setTimeout(function () { if (!ioFired) showAll(); }, 1500);
  }

  /*--------------------  Mobile nav  --------------------*/
  function armNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav-list]');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('span').className = 'lnr lnr-menu';
    }
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('span').className = open ? 'lnr lnr-cross' : 'lnr lnr-menu';
    });
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) close();
    });
  }

  /*--------------------  Live demo overlay  --------------------*/
  function armDemo() {
    var overlay = document.querySelector('[data-demo]');
    if (!overlay) return;
    var frame = overlay.querySelector('iframe');
    var openers = document.querySelectorAll('[data-demo-open]');
    if (!openers.length) return;

    function open() {
      /* src is held in data-src so the demo host is only contacted
         when someone actually asks for it. */
      if (frame && !frame.getAttribute('src')) frame.setAttribute('src', frame.getAttribute('data-src'));
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      if (frame) frame.removeAttribute('src'); /* stops audio/mic capture */
    }

    [].forEach.call(openers, function (b) { b.addEventListener('click', open); });
    [].forEach.call(overlay.querySelectorAll('[data-demo-close]'), function (b) {
      b.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) close();
    });
  }

  /*--------------------  Projects filter  --------------------*/
  function armFilters() {
    var buttons = document.querySelectorAll('[data-filter]');
    if (!buttons.length) return;
    var rows = document.querySelectorAll('[data-cat]');
    var groups = document.querySelectorAll('[data-group]');

    function apply(f) {
      [].forEach.call(buttons, function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-filter') === f);
        b.setAttribute('aria-pressed', b.getAttribute('data-filter') === f ? 'true' : 'false');
      });
      [].forEach.call(rows, function (row) {
        row.style.display = (f === 'all' || row.getAttribute('data-cat') === f) ? '' : 'none';
      });
      var first = true;
      [].forEach.call(groups, function (group) {
        var cats = (group.getAttribute('data-group') || '').split(' ');
        var show = f === 'all' || cats.indexOf(f) !== -1;
        group.style.display = show ? '' : 'none';
        /* Clear the top margin of whichever group ends up first so a
           filtered view doesn't open with dead space. */
        if (show) { group.style.marginTop = first ? '0' : ''; first = false; }
      });
    }

    [].forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-filter')); });
    });
    apply('all');
  }

  /*--------------------  Timeline expanders  --------------------*/
  function armExpanders() {
    var items = document.querySelectorAll('[data-exp]');
    if (!items.length) return;
    var single = false; /* multiple panels may be open at once */

    function setOpen(item, open) {
      var btn = item.querySelector('[data-exp-btn]');
      var panel = item.querySelector('[data-exp-panel]');
      if (!btn || !panel) return;
      item._open = open;
      panel.style.maxHeight = open ? (panel.scrollHeight + 60) + 'px' : '0px';
      panel.style.opacity = open ? '1' : '0';
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    [].forEach.call(items, function (item) {
      var btn = item.querySelector('[data-exp-btn]');
      var panel = item.querySelector('[data-exp-panel]');
      if (!btn || !panel) return;
      setOpen(item, item.hasAttribute('data-exp-open'));
      btn.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var isOpen = !!item._open;
        if (single && !isOpen) {
          [].forEach.call(items, function (o) { if (o !== item) setOpen(o, false); });
        }
        setOpen(item, !isOpen);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.target.closest('a')) return;
          e.preventDefault();
          btn.click();
        }
      });
    });

    /* Re-measure open panels after a reflow — a wrapped paragraph is
       taller than the max-height captured at the previous width. */
    window.addEventListener('resize', function () {
      [].forEach.call(items, function (item) { if (item._open) setOpen(item, true); });
    });
  }

  /*--------------------  Huck lightbox  --------------------*/
  function armLightbox() {
    var box = document.querySelector('[data-lightbox]');
    var photos = document.querySelectorAll('[data-photo]');
    if (!box || !photos.length) return;

    var img = box.querySelector('img');
    var index = -1;

    function open(i) {
      index = i;
      img.setAttribute('src', photos[i].getAttribute('src'));
      box.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    function close() {
      index = -1;
      box.hidden = true;
      document.body.style.overflow = '';
    }
    function step(d) {
      if (index < 0) return;
      open((index + d + photos.length) % photos.length); /* wraps at both ends */
    }

    [].forEach.call(photos, function (p, i) {
      p.addEventListener('click', function () { open(i); });
    });
    box.addEventListener('click', close); /* backdrop */
    box.querySelector('[data-lightbox-close]').addEventListener('click', function (e) {
      e.stopPropagation(); close();
    });
    [].forEach.call(box.querySelectorAll('[data-lightbox-step]'), function (b) {
      /* stopPropagation, or an arrow click closes the overlay under it */
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        step(parseInt(b.getAttribute('data-lightbox-step'), 10));
      });
    });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  /*--------------------  Hero Aerodynamic Wind Streamlines & Flight Canvas  --------------------*/
  function armHeroCanvas() {
    var canvas = document.getElementById('heroNeuralCanvas');
    if (!canvas) return;
    if (reduced) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width = 0;
    var height = 0;
    var particles = [];
    var particleCount = 48;
    var mouse = { x: -1000, y: -1000, active: false };
    var animFrame = null;
    var isVisible = true;
    var time = 0;

    function resize() {
      var hero = canvas.closest('.hero') || canvas.parentElement;
      width = hero ? hero.offsetWidth : window.innerWidth;
      height = hero ? hero.offsetHeight : 720;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function createParticles() {
      particles = [];
      var count = width < 640 ? 24 : particleCount;
      var colors = [
        { r: 79, g: 70, b: 229 },   // indigo
        { r: 124, g: 58, b: 237 },  // violet
        { r: 6, g: 182, b: 212 },   // cyan
        { r: 16, g: 185, b: 129 }   // emerald
      ];

      for (var i = 0; i < count; i++) {
        var c = colors[i % colors.length];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 0.7 + 0.5,
          angle: (Math.random() - 0.5) * 0.4,
          waveSpeed: Math.random() * 0.002 + 0.001,
          waveAmp: Math.random() * 22 + 10,
          seed: Math.random() * 100,
          radius: Math.random() * 1.8 + 1.2,
          alpha: Math.random() * 0.4 + 0.35,
          trail: [],
          maxTrail: Math.floor(Math.random() * 12 + 8),
          color: c
        });
      }
    }

    function draw() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      time += 1;

      var maxDist = width < 640 ? 85 : 130;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        // Soaring flight trajectory (aerodynamic drift with vertical wave oscillation)
        var wave = Math.sin(time * p.waveSpeed + p.seed) * p.waveAmp;
        var vx = p.speed * Math.cos(p.angle);
        var vy = p.speed * Math.sin(p.angle) + Math.cos(time * p.waveSpeed + p.seed) * 0.45;

        p.x += vx;
        p.y += vy;

        // Wrap around boundaries smoothly
        if (p.x < -30) p.x = width + 30;
        else if (p.x > width + 30) p.x = -30;

        if (p.y < -30) p.y = height + 30;
        else if (p.y > height + 30) p.y = -30;

        // Mouse breeze interaction (deflect gracefully like wind)
        if (mouse.active) {
          var mdx = p.x - mouse.x;
          var mdy = p.y - mouse.y;
          var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160 && mdist > 0) {
            var pushForce = (1 - mdist / 160) * 1.4;
            p.x += (mdx / mdist) * pushForce;
            p.y += (mdy / mdist) * pushForce;
          }
        }

        // Keep trail points for aerodynamic flight slipstream
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrail) p.trail.pop();

        // Draw soaring slipstream trail
        if (p.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (var t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          var grad = ctx.createLinearGradient(
            p.trail[0].x, p.trail[0].y,
            p.trail[p.trail.length - 1].x, p.trail[p.trail.length - 1].y
          );
          grad.addColorStop(0, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + (p.alpha * 0.6) + ')');
          grad.addColorStop(1, 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ', 0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Draw connections between proximate particles
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var cdx = p.x - p2.x;
          var cdy = p.y - p2.y;
          var cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < maxDist) {
            var lineAlpha = (1 - cdist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(99, 102, 241, ' + lineAlpha + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw leading soaring particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + p.alpha + ')';
        ctx.fill();
      }

      animFrame = requestAnimationFrame(draw);
    }

    var heroEl = canvas.closest('.hero');
    if (heroEl) {
      heroEl.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      heroEl.addEventListener('mouseleave', function () {
        mouse.active = false;
      });
    }

    window.addEventListener('resize', function () {
      resize();
      createParticles();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        isVisible = false;
        if (animFrame) cancelAnimationFrame(animFrame);
      } else {
        isVisible = true;
        draw();
      }
    });

    if ('IntersectionObserver' in window && heroEl) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              draw();
            }
          } else {
            isVisible = false;
            if (animFrame) cancelAnimationFrame(animFrame);
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroEl);
    }

    resize();
    createParticles();
    draw();
  }

  /*--------------------  Hero 3D Card Interactive Tilt  --------------------*/
  function armHeroCards() {
    if (reduced) return;
    var cards = document.querySelectorAll('.architecture-card, .arch-model-box');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = 'perspective(900px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-5px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /*--------------------  Copy to Clipboard Handler  --------------------*/
  function armCopyButtons() {
    var copyBtns = document.querySelectorAll('.ref-copy-btn[data-copy-text]');
    if (!copyBtns.length) return;
    [].forEach.call(copyBtns, function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var text = btn.getAttribute('data-copy-text');
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showCopySuccess(btn);
          }).catch(function () {
            fallbackCopy(text, btn);
          });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });

    function showCopySuccess(btn) {
      var orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa fa-check" style="color:#34d399;"></i>';
      btn.style.borderColor = 'rgba(52, 211, 153, 0.6)';
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.style.borderColor = '';
      }, 1800);
    }

    function fallbackCopy(text, btn) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showCopySuccess(btn);
      } catch (err) {}
      document.body.removeChild(ta);
    }
  }

  /*--------------------  Interactive Card Spotlight (Linear/Stripe style)  --------------------*/
  function armCardSpotlight() {
    var cards = document.querySelectorAll('.ref-card-pro');
    if (!cards.length) return;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
      card.addEventListener('mouseleave', function () {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  /*--------------------  Scroll Progress Indicator  --------------------*/
  function armScrollProgress() {
    var bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    function update() {
      var scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = height > 0 ? (scroll / height) * 100 : 0;
      bar.style.width = Math.min(Math.max(progress, 0), 100).toFixed(2) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /*--------------------  Header Scrolled State  --------------------*/
  function armHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function check() {
      var scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scroll > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /*--------------------  Back to Top Floating Button  --------------------*/
  function armBackToTop() {
    var btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    function check() {
      var scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (scroll > 320) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  function init() {
    if (!reduced) {
      document.documentElement.classList.add('js-reveal');
    }
    armReveal();
    armScrollProgress();
    armHeaderScroll();
    armBackToTop();
    armHeroCanvas();
    armHeroCards();
    armNav();
    armDemo();
    armFilters();
    armExpanders();
    armLightbox();
    armCopyButtons();
    armCardSpotlight();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
