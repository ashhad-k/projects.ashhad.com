/* ══════════════════════════════════════════════════════════════════
   MOTION LAYER — smooth scroll, cursor, magnetics, footer bounce.
   Runs after site.js. Every part checks for reduced motion and for
   touch first, and silently does nothing where it does not belong.
   ══════════════════════════════════════════════════════════════════ */
(function(){
'use strict';

var REDUCED = matchMedia('(prefers-reduced-motion:reduce)').matches;
var COARSE  = matchMedia('(hover:none),(pointer:coarse)').matches;
var LIVE    = !REDUCED && !COARSE;

/* ══════════ 1. SMOOTH SCROLL ══════════ */
var lenis = null;
if (window.Lenis && !REDUCED) {
 lenis = new window.Lenis({
  duration: 1.05,
  easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)) },
  smoothWheel: true,
  syncTouch: false,          /* native momentum on phones — never fight the OS */
  touchMultiplier: 1.5,
  wheelMultiplier: 1
 });
 (function raf(time){ lenis.raf(time); requestAnimationFrame(raf) })(0);
 window.LENIS = lenis;
}

/* one helper the rest of the site can call, Lenis or not */
window.smoothTo = function(target, offset){
 offset = offset || 0;
 if (lenis) { lenis.scrollTo(target, {offset: offset, duration: 1.15}); return }
 var el = (typeof target === 'string') ? document.querySelector(target) : target;
 if (el && el.scrollIntoView) el.scrollIntoView({behavior:'smooth', block:'start'});
 else if (typeof target === 'number') scrollTo({top: target, behavior:'smooth'});
};

/* in-page anchors go through Lenis, otherwise they would jump instantly —
   Lenis sets scroll-behavior:auto on <html>, which disables native smoothing */
document.addEventListener('click', function(e){
 var a = e.target.closest && e.target.closest('a[href^="#"]');
 if (!a) return;
 var id = a.getAttribute('href');
 if (!id || id === '#') return;
 var el = document.querySelector(id);
 if (!el) return;
 e.preventDefault();
 window.smoothTo(el, -76);                    /* clear the sticky nav */
 if (history.replaceState) history.replaceState(null, '', id);
});

/* ══════════ 2. CURSOR ══════════ */
if (LIVE) {
 var ring = document.createElement('div'); ring.className = 'cur';
 var dot  = document.createElement('div'); dot.className  = 'curdot';
 document.body.appendChild(ring); document.body.appendChild(dot);
 document.documentElement.classList.add('cur-on');

 var mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my, shown = false;

 addEventListener('mousemove', function(e){
  mx = e.clientX; my = e.clientY;
  if (!shown) { shown = true; rx = mx; ry = my }
  dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
 }, {passive:true});

 (function loop(){
  rx += (mx - rx) * 0.18;                     /* the ring lags, the dot does not */
  ry += (my - ry) * 0.18;
  ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
  requestAnimationFrame(loop);
 })();

 /* leaving the window hides it, so it never sits frozen in a corner */
 document.addEventListener('mouseleave', function(){ ring.style.opacity = dot.style.opacity = 0 });
 document.addEventListener('mouseenter', function(){ ring.style.opacity = dot.style.opacity = '' });

 var CLICKY = 'a,button,.pillbtn,.navcta,.mgo,.chip,.qa .q,.acc .q,.rrow,.pcard,' +
              '.stc,.card,.mlink,.doc,.frow,.gs-pill,.langs span,.socials a,.toc a,' +
              '.idxbar a,.ftcol h6,.mcol h6,.nlk,.dl,.svc,.filters button';
 var TEXTY  = 'input,textarea,select,[contenteditable="true"]';

 document.addEventListener('mouseover', function(e){
  var t = e.target;
  if (t.closest && t.closest(TEXTY))      { ring.className = 'cur txt'; return }
  if (t.closest && t.closest(CLICKY))     { ring.className = 'cur on';
                                            document.documentElement.classList.add('act'); return }
  ring.className = 'cur';
  document.documentElement.classList.remove('act');
 });

 /* the carousel reads as draggable */
 document.addEventListener('mousedown', function(e){
  if (e.target.closest && e.target.closest('.track,.carousel,.pgrid')) ring.classList.add('grab');
 });
 addEventListener('mouseup', function(){ ring.classList.remove('grab') });
}

/* ══════════ 3. MAGNETIC CONTROLS ══════════ */
if (LIVE) {
 var MAGNETS = '.pillbtn,.navcta,.mgo,.socials a,.gs-go,.acc .q .pl,.burger';
 var bound = new WeakSet();

 function arm(el){
  if (bound.has(el)) return; bound.add(el);
  el.classList.add('mag');
  var R = 0.34;                                /* how far it follows, 0–1 */
  el.addEventListener('mousemove', function(e){
   var r = el.getBoundingClientRect();
   var x = (e.clientX - (r.left + r.width/2))  * R;
   var y = (e.clientY - (r.top  + r.height/2)) * R;
   el.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
  });
  el.addEventListener('mouseleave', function(){ el.style.translate = '' });
 }
 function scan(){ document.querySelectorAll(MAGNETS).forEach(arm) }
 scan();
 /* nav, footer and card grids are injected after load */
 setTimeout(scan, 300); setTimeout(scan, 1200);
 window.SITE_ARM_MAGNETS = scan;
}

/* ══════════ 4. FOOTER BOUNCE ══════════ */
(function(){
 function init(){
  var f = document.querySelector('.readysec');
  if (!f || f.classList.contains('bnc')) return;
  f.classList.add('bnc');

  var kids = [].slice.call(f.children).filter(function(c){
   return !c.classList.contains('glow');
  });
  if (!kids.length) return;

  if (REDUCED) { kids.forEach(function(k){ k.classList.add('seen') }); return }

  /* threshold 0 + a bottom inset means "reveal when this block's top edge
     crosses 82% of the screen" — correct for a short marquee and for a
     700px-tall panel alike, which a percentage threshold is not. */
  var io = new IntersectionObserver(function(es){
   es.forEach(function(e){
    if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target) }
   });
  }, {threshold: 0, rootMargin: '0px 0px -18% 0px'});
  kids.forEach(function(k){ io.observe(k) });

  /* Safety net. The last block (the copyright line) sits at the very bottom of
     the document, so at maximum scroll its top is around 91% of the viewport —
     below the 82% trigger line, which it can therefore never cross. Without
     this it would stay invisible forever. Reveal anything still hidden once the
     page bottom is reached. */
  function guard(){
   if (innerHeight + Math.ceil(window.scrollY) >= document.body.scrollHeight - 4) {
    kids.forEach(function(k){ k.classList.add('seen') });
    removeEventListener('scroll', guard);
   }
  }
  addEventListener('scroll', guard, {passive:true});
  guard();
 }
 init();
 setTimeout(init, 300);      /* the footer is built by site.js on inner pages */
 setTimeout(init, 1200);
})();

/* ══════════ 5. HERO WORDMARK — proximity lift ══════════ */
(function(){
 var wm = document.getElementById('wmark');
 if (!wm || wm.querySelector('.wch')) return;

 /* split into letters, keeping the sky-blue full stop as its own letter */
 var dot  = wm.querySelector('.dot');
 var text = (wm.firstChild && wm.firstChild.nodeType === 3)
            ? wm.firstChild.nodeValue : wm.textContent.replace(/\.$/, '');
 wm.innerHTML = '';
 text.split('').forEach(function(c){
  var sp = document.createElement('span');
  sp.className = 'wch';
  sp.textContent = c;
  wm.appendChild(sp);
 });
 if (dot) {
  var d = document.createElement('span');
  d.className = 'wch dot'; d.id = 'wdot'; d.textContent = dot.textContent || '.';
  wm.appendChild(d);
 }
 /* the word is auto-fitted to the column, so re-measure now that it is split */
 if (typeof window.fitWordmark === 'function') {
  window.fitWordmark();
  setTimeout(window.fitWordmark, 60);
  setTimeout(window.fitWordmark, 600);
 }

 if (!LIVE) return;

 var chs   = [].slice.call(wm.querySelectorAll('.wch'));
 var stage = wm.closest('.hmain') || wm;
 var RADIUS = 260, LIFT = 38;
 var raf = null, ev = null;

 function apply(){
  raf = null;
  var mid = [];
  chs.forEach(function(c){ var r = c.getBoundingClientRect(); mid.push(r.left + r.width/2) });
  chs.forEach(function(c, i){
   var f = Math.max(0, 1 - Math.abs(ev.clientX - mid[i]) / RADIUS);
   var e = f * f;                                   /* eased falloff */
   c.style.transform  = 'translateY(' + (-LIFT * e).toFixed(1) + 'px) scale(' + (1 + .06 * e).toFixed(3) + ')';
   c.style.color      = f > .45 ? 'var(--sky)' : '';
   c.style.textShadow = f > .45 ? '0 18px 44px rgba(125,211,252,' + (.35 * f).toFixed(2) + ')' : '';
  });
 }
 stage.addEventListener('mousemove', function(e){
  ev = e; if (!raf) raf = requestAnimationFrame(apply);   /* one recalc per frame */
 }, {passive:true});
 stage.addEventListener('mouseleave', function(){
  if (raf) { cancelAnimationFrame(raf); raf = null }
  chs.forEach(function(c){ c.style.transform = ''; c.style.color = ''; c.style.textShadow = '' });
 });
})();

})();
