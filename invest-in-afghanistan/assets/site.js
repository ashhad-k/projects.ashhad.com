/* ═══════════════════════════════════════════════════════════════
   Invest in Afghanistan — shared chrome for every inner page.
   Injects the nav, mega menu, mobile menu and footer so the site
   navigation is defined once, then wires reveals and components.
   Each page sets  window.PAGE = {section:'invest', title:'…'}
   before this file loads, to mark the active nav item.
   ═══════════════════════════════════════════════════════════════ */
(function(){
"use strict";

/* ── site map: one source of truth for every link on the site ──
   Rule: a menu entry only exists if it opens a DIFFERENT page. No entry
   points at an anchor on the page it already sits under, and no entry
   points at a page that belongs to another section. Sections with only
   one destination are plain links with no dropdown. */
var NAVGROUPS=[
 {id:'m1',label:'Invest',key:'invest',cols:[
   {h:'The case',links:[
     ['Why Afghanistan','why-afghanistan.html'],
     ['Key Industries','industries.html'],
     ['Provinces & Regions','provinces.html']]},
   {h:'Getting involved',links:[
     ['Investment Opportunities','opportunities.html'],
     ['Incentives & Industrial Parks','incentives.html'],
     ['Success Stories','success-stories.html']]}],
  card:{t:'12 live projects',p:'Ticket sizes, target returns and a documented permitting path.',
        href:'opportunities.html',img:'valley'}},

 {id:'m2',label:'Start a Business',key:'business',cols:[
   {h:'Decide',links:[
     ['Business Setup Guide','start-a-business.html'],
     ['Legal Structures','legal-structures.html'],
     ['Business Activities','business-activities.html']]},
   {h:'Prepare',links:[
     ['Foreign Ownership Rules','foreign-ownership.html'],
     ['Required Documents','required-documents.html'],
     ['Government Fees','fees.html']]}],
  card:{t:'Open the portal',p:'Apply, pay and track every licence in one account.',
        href:'portal/login.html',img:'biz'}},

 {id:'m3',label:'Services',key:'services',href:'services.html'},

 {id:'m4',label:'Verify & Search',key:'verify',href:'verify.html'},

 {id:'m5',label:'Resources',key:'resources',cols:[
   {h:'Reference',links:[
     ['Laws & Regulations','resources.html'],
     ['Forms & Templates','forms.html'],
     ['FAQ & Support','faq.html']]},
   {h:'The Ministry',links:[
     ['Newsroom','news.html'],
     ['About the Ministry','about.html'],
     ['Contact & Offices','contact.html']]}],
  card:{t:'Newsroom',p:'Announcements, regulatory updates and milestones.',
        href:'news.html',img:'agri'}}
];

var MAINLINKS=[
 ['Home','index.html'],['Why Afghanistan','why-afghanistan.html'],
 ['Key Industries','industries.html'],['Opportunities','opportunities.html'],
 ['Start a Business','start-a-business.html'],['Services','services.html'],
 ['Verify & Search','verify.html'],['Newsroom','news.html']
];

var FOOTCOLS=[
 ['Invest',[['Why Afghanistan','why-afghanistan.html'],['Key Industries','industries.html'],
   ['Provinces & Regions','provinces.html'],['Investment Opportunities','opportunities.html'],
   ['Incentives & Industrial Parks','incentives.html'],['Success Stories','success-stories.html']]],
 ['Start a Business',[['Business Setup Guide','start-a-business.html'],['Legal Structures','legal-structures.html'],
   ['Business Activities','business-activities.html'],['Foreign Ownership Rules','foreign-ownership.html'],
   ['Required Documents','required-documents.html'],['Government Fees','fees.html']]],
 ['Services & Verification',[['All Services A–Z','services.html'],['Verify & Search','verify.html'],
   ['Open the Portal','portal/login.html']]],
 ['Resources',[['Laws & Regulations','resources.html'],['Forms & Templates','forms.html'],
   ['FAQ & Support','faq.html'],['Newsroom','news.html'],
   ['About the Ministry','about.html'],['Contact & Offices','contact.html']]]
];

var IMG={
 hero:"media/hero.jpg",
 lakes:"media/lakes.jpg",
 valley:"media/valley.jpg",
 park:"media/park.jpg",
 corridor:"media/corridor.jpg",
 mining:"media/mining.jpg",
 agri:"media/agri.jpg",
 energy:"media/energy.jpg",
 biz:"media/biz.jpg",
 factory:"media/factory.jpg",
 saffron:"media/saffron.jpg",
 coldchain:"media/coldchain.jpg",
 solarfarm:"media/solarfarm.jpg",
 copper:"media/copper.jpg",
 textile:"media/textile.jpg",
 cargo:"media/cargo.jpg",
 storage:"media/storage.jpg",
 marble:"media/marble.jpg",
 foodproc:"media/foodproc.jpg",
 bonded:"media/bonded.jpg",
 packaging:"media/packaging.jpg",
 hydro:"media/hydro.jpg",
 infra:"media/infra.jpg",
 solarpark:"media/solarpark.jpg",
 briefing:"media/briefing.jpg",
 operating:"media/operating.jpg"
};
/* if the media folder has not been downloaded, fall back to the hosted copy */
var IMG_REMOTE={
 hero:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202247_2968e3da-4603-473a-9512-9691f8d36339.png",
 lakes:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202237_e4894d9a-2eeb-4bf9-a29e-840acb3353e7.png",
 valley:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_202257_de6ae476-d822-4a6a-bf8f-4302272438cd.png",
 park:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_200909_bd0e43f8-1a5d-45d6-bc82-28cc08a91a58.png",
 corridor:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260728_200900_dd2094b5-a426-4eb1-a335-3175e4e32d8e.png",
 mining:"https://images.unsplash.com/photo-1523848309072-c199db53f137?auto=format&fit=crop&w=1600&q=75",
 agri:"https://images.unsplash.com/photo-1615885108069-7d5bef9a7e22?auto=format&fit=crop&w=1600&q=75",
 energy:"https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=75",
 biz:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=75",
 factory:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=75",
 saffron:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=75",
 coldchain:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002933_43e6b48d-b74e-498c-a51c-0063e27c319b.png",
 solarfarm:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002936_d77999d3-8acf-43f8-8570-2fed332d8463.png",
 copper:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002944_64a19a08-5667-41be-b5c3-41abec22e74a.png",
 textile:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002946_98f4071b-f91f-4901-8424-c6b597b81a8a.png",
 cargo:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002954_6a0940cb-8e22-460b-ade8-9cc11a1fad0e.png",
 storage:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_002957_e4f2fe5f-f0f1-4a37-a209-c3501d702e83.png",
 marble:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003008_fc4dd240-3a5a-48c2-b95d-e4b2e0aa92cb.png",
 foodproc:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003011_ae828196-05a3-44f0-95ff-01f5d0c99a2c.png",
 bonded:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003019_b7cdc25a-ccb2-4f3d-a28e-d2dc08c51713.png",
 packaging:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003024_60c5bdf4-f7a0-48b8-96f2-c06d1e627ea7.png",
 hydro:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003032_0c7dc6dd-f771-45c9-8e70-e9049b947c9e.png",
 infra:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003035_65ed84fa-bac1-4b8d-b22e-c7f057b0d175.png",
 solarpark:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_003042_8da5ba38-59a1-4e38-a7bb-7a8af6499942.png",
 briefing:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_020041_ede9285e-7221-4f93-bed5-719bc703d02a.png",
 operating:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260729_020059_0731da54-360a-4046-a4a5-b57c9b58ac67.png",
 abouthero:"https://d8j0ntlcm91z4.cloudfront.net/user_3EySZIHS96lw8w2EzUMJbOz80lR/hf_20260730_015305_49aa75e5-77a2-4fc7-a2be-96f4b0ac080c.png"
};
window.SITE_IMG=IMG;window.SITE_IMG_REMOTE=IMG_REMOTE;

/* Brand logo — grey lockup on light surfaces, white lockup on dark ones. */
var LOGO_DARK='<img class="logoimg" src="media/logo_grey.png" alt="Invest in Afghanistan" width="691" height="289">';
var LOGO_LIGHT='<img class="logoimg" src="media/logo_white.png" alt="Invest in Afghanistan" width="691" height="289">';
var PAGE=window.PAGE||{};

/* ═══ NAV + MEGA MENU ═══ */
function buildNav(){
 var megas=NAVGROUPS.filter(function(g){return g.cols}).map(function(g){
  var cols=g.cols.map(function(c){
   return '<div><div class="mcolh">'+c.h+'</div>'+
    c.links.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>'}).join('')+'</div>';
  }).join('');
  var card='<a class="megacard zoom" href="'+g.card.href+'">'+
   '<img data-img="'+g.card.img+'" alt="">'+
   '<div><h4>'+g.card.t+'</h4><p>'+g.card.p+'</p></div>'+
   '<span class="txtlink lt" style="border:0;padding:0">Open &#8599;</span></a>';
  return '<div class="mega" id="'+g.id+'"><div class="mega-in">'+cols+card+'</div></div>';
 }).join('');

 var links=NAVGROUPS.map(function(g){
  var on=(PAGE.section===g.key?' act':'');
  /* a section with a single destination is a plain link, not a dropdown */
  if(!g.cols)return '<a class="nlk'+on+'" href="'+g.href+'">'+g.label+'</a>';
  return '<a class="nlk'+on+'" data-m="'+g.id+'">'+g.label+' <span class="car"></span></a>';
 }).join('');

 return '<div class="navhold"><nav><div class="in-n">'+
  '<a class="logo" href="index.html">'+LOGO_DARK+'</a>'+links+
  '<button class="navcta" onclick="location.href=\'portal/login.html\'">Portal <span>&#8599;</span></button>'+
  '<button class="burger" id="bg" aria-label="Menu"><i></i><i></i></button>'+
  '</div>'+megas+'</nav></div>';
}

/* ═══ MOBILE MENU ═══ */
function buildMenu(){
 var main=MAINLINKS.map(function(l,i){
  return '<a class="mlink" href="'+l[1]+'"><span class="idx">0'+(i+1)+'</span>'+
   '<span class="big"><span class="sw"><span>'+l[0]+'</span><span>'+l[0]+'</span></span></span></a>';
 }).join('');
 /* the accordions mirror the footer, so mobile shows the whole site map */
 var cols=FOOTCOLS.map(function(c){
  return '<div class="mcol"><h6>'+c[0]+'<i></i></h6><div class="mcb">'+
   c[1].map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>'}).join('')+'</div></div>';
 }).join('');
 return '<div id="menu">'+
  '<div class="m-top"><a class="logo" href="index.html">'+LOGO_LIGHT+'</a>'+
   '<button class="m-cl" id="mcl" aria-label="Close">&#10005;</button></div>'+
  '<div class="m-in"><div>'+main+'</div><div class="mcols">'+cols+'</div></div>'+
  '<div class="mportal"><a class="pillbtn lime" href="portal/login.html">Open the portal &rarr;</a></div>'+
  '<div class="mfoot"><span>invest@moic.gov.af</span><span>+93 (0) 20 000 0000</span>'+
   '<span>Kabul, Afghanistan</span></div></div>';
}

/* ═══ FOOTER ═══
   Identical to the homepage closer: the "Ready to build what's next?" panel,
   the sector marquee, the link columns, the oversized wordmark and the legal
   line. Built here so it stays defined once for the whole site. */
var SECWORDS=['Mining','Agriculture','Energy','Manufacturing','Infrastructure',
 'Tourism','Services','Industrial Parks','Logistics'];

function buildFooter(){
 var cols=FOOTCOLS.map(function(c){
  return '<div class="ftcol"><h6>'+c[0]+'<i></i></h6><div class="ftb">'+
   c[1].map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>'}).join('')+'</div></div>';
 }).join('');
 var soc=[
  ['LinkedIn','<path d="M4.5 4.5h3v15h-3zM6 3.2v.01"/><path d="M10 9.5h3v1.6c.6-1.1 1.8-1.9 3.4-1.9 2.5 0 3.6 1.6 3.6 4.4v5.9h-3v-5.3c0-1.3-.5-2.2-1.7-2.2-1.1 0-1.8.8-2.1 1.6-.1.3-.2.7-.2 1v4.9h-3z"/>'],
  ['Instagram','<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" stroke="none"/>'],
  ['X','<path d="M17.5 3h3l-6.6 7.6L22 21h-5.9l-4.2-5.5L7 21H4l7.1-8.1L2.5 3h6l3.8 5z"/>'],
  ['YouTube','<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.8l4.5 2.7-4.5 2.7z"/>']
 ].map(function(x){
  return '<a href="#" aria-label="'+x[0]+'"><svg viewBox="0 0 24 24">'+x[1]+'</svg></a>';
 }).join('');
 var secLine=SECWORDS.map(function(w){return w+' <em>&#10022;</em>'}).join(' ');

 return '<section class="readysec" id="ready"><div class="glow"></div>'+
  '<div class="wrap">'+
   '<span class="label lt"><span class="plus">+</span> Afghanistan&#39;s connected business &amp; investment gateway</span>'+
   '<div class="readyrow">'+
    '<h2>Ready to build<span class="b2">what&#39;s next?</span></h2>'+
    '<div class="rcontact"><b>invest@moic.gov.af</b><span>+93 (0) 20 000 0000</span>'+
     '<span>Kabul, Afghanistan</span></div>'+
   '</div>'+
   '<div class="rbtns">'+
    '<a class="pillbtn lime" href="start-a-business.html">Start a Business &rarr;</a>'+
    '<a class="pillbtn outw" href="opportunities.html">Explore Investments &#8599;</a>'+
   '</div>'+
   '<div class="socials">'+soc+'</div>'+
  '</div>'+
  '<div class="fmarq"><div class="tk3"><span>'+secLine+'</span><span>'+secLine+'</span></div></div>'+
  '<div class="wrap"><div class="ftcols">'+
   '<div class="ftbrand"><a class="logo" href="index.html" style="cursor:pointer">'+
     LOGO_LIGHT+'</a>'+
    '<p>The official business and investment gateway of the Ministry of Industry &amp; Commerce.</p>'+
    '<div class="langs"><span>English</span><span>&#1583;&#1585;&#1740;</span><span>&#1662;&#1690;&#1578;&#1608;</span></div>'+
    '</div>'+
   cols+'</div></div>'+
  /* full-bleed, exactly like the homepage — deliberately outside .wrap */
  '<div class="endmark"><span id="emk">Invest In Afghanistan</span></div>'+
  '<div class="wrap"><div class="ftbot">'+
   '<span>&copy; 2026 Ministry of Industry &amp; Commerce &middot; Afghanistan &mdash; All rights reserved</span>'+
   '<span>Privacy Policy &middot; Terms of Service &middot; Accessibility</span>'+
  '</div></div></section>';
}

/* the wordmark is sized to the exact width of its container */
function fitEnd(){
 var el=document.getElementById('emk');if(!el)return;
 var box=el.parentNode.clientWidth;if(!box)return;
 for(var i=0;i<3;i++){
  el.style.fontSize='100px';
  var w=el.getBoundingClientRect().width;if(w<=0)return;
  el.style.fontSize=(100*box/w)+'px';
  if(Math.abs(el.getBoundingClientRect().width-box)<0.6)break;
 }
}

/* Pages that build markup at runtime (industries, opportunities) must use THIS
   loader, not a copy — the copies had no remote fallback, so every injected
   image was deleted whenever media/ had not been downloaded. */
window.SITE_LOAD_IMG=loadImg;
window.SITE_SCAN_IMGS=function(root){
 (root||document).querySelectorAll('img[data-img]:not([data-b])').forEach(loadImg);
};

/* ═══ MOUNT ═══ */
function mount(){
 var navSlot=document.getElementById('site-nav');
 var footSlot=document.getElementById('site-footer');
 if(navSlot)navSlot.outerHTML=buildNav()+buildMenu();
 if(footSlot)footSlot.outerHTML=buildFooter();
 wire();
 fitEnd();
 addEventListener('resize',fitEnd);addEventListener('load',fitEnd);
 if(document.fonts)document.fonts.ready.then(fitEnd);
 setTimeout(fitEnd,400);setTimeout(fitEnd,1400);
}

function wire(){
 /* images */
 document.querySelectorAll('img[data-img]:not([data-b])').forEach(function(el){
  loadImg(el)
 });

 /* mega menu — hover opens, click pins, Esc closes */
 var pinned=null;
 function closeMega(){document.querySelectorAll('.mega').forEach(function(m){m.classList.remove('on')});
  document.querySelectorAll('.nlk').forEach(function(n){n.classList.remove('open')});pinned=null}
 function openMega(id,link){closeMega();
  var m=document.getElementById(id);if(m){m.classList.add('on');link.classList.add('open')}}
 document.querySelectorAll('.nlk[data-m]').forEach(function(lk){
  lk.addEventListener('mouseenter',function(){if(!pinned)openMega(lk.dataset.m,lk)});
  lk.addEventListener('click',function(e){e.preventDefault();
   if(pinned===lk.dataset.m){closeMega()}else{openMega(lk.dataset.m,lk);pinned=lk.dataset.m}});
 });
 /* hovering a single-destination link closes whatever panel is open */
 document.querySelectorAll('.nlk:not([data-m])').forEach(function(lk){
  lk.addEventListener('mouseenter',function(){if(!pinned)closeMega()});
 });
 var navhold=document.querySelector('.navhold');
 if(navhold)navhold.addEventListener('mouseleave',function(){if(!pinned)closeMega()});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMega();closeMenu()}});

 /* mobile menu */
 var menu=document.getElementById('menu'),bg=document.getElementById('bg'),mcl=document.getElementById('mcl');
 function openMenu(){if(menu){menu.classList.add('on');bg.classList.add('open');document.body.style.overflow='hidden'}}
 function closeMenu(){if(menu){menu.classList.remove('on');bg.classList.remove('open');document.body.style.overflow=''}}
 window.closeMenu=closeMenu;
 if(bg)bg.addEventListener('click',function(){menu.classList.contains('on')?closeMenu():openMenu()});
 if(mcl)mcl.addEventListener('click',closeMenu);

 /* menu + footer accordions (mobile) */
 document.querySelectorAll('.mcol h6,.ftcol h6').forEach(function(h){
  h.addEventListener('click',function(){h.parentNode.classList.toggle('open')});
 });

 /* reveal on scroll + counters */
 var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('in');
   e.target.querySelectorAll('[data-count]').forEach(count);io.unobserve(e.target)}})},{threshold:.14});
 document.querySelectorAll('.rv,.mask,.stat').forEach(function(el){io.observe(el)});

 function count(el){
  var to=parseFloat(el.dataset.count)||0,dec=(el.dataset.dec|0),t0=null,dur=1500;
  var box=el.closest('.stat');if(box)box.classList.add('counting');
  function tick(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1);
   var e=1-Math.pow(1-p,3);
   el.textContent=(to*e).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,',');
   if(p<1){requestAnimationFrame(tick)}else if(box){box.classList.remove('counting')}}
  requestAnimationFrame(tick);
 }

 /* accordions on the page */
 document.querySelectorAll('.acc .q').forEach(function(q){
  q.addEventListener('click',function(){
   var it=q.parentNode,open=it.classList.contains('open');
   it.parentNode.querySelectorAll('.it').forEach(function(x){x.classList.remove('open')});
   if(!open)it.classList.add('open');
  });
 });

 /* endmark auto-fit */
 fitEnd();
 addEventListener('resize',fitEnd);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitEnd);
 setTimeout(fitEnd,300);setTimeout(fitEnd,1200);
}

/* try the local media folder first, then the hosted copy, then give up quietly */
function loadImg(el){
 var k=el.dataset.img;el.dataset.b=1;
 var local=IMG[k],remote=IMG_REMOTE[k];
 if(!local&&!remote)return;
 el.style.opacity=0;el.style.transition='opacity 1s ease';
 var im=new Image();
 im.onload=function(){el.src=im.src;el.style.opacity=1};
 im.onerror=function(){
  if(remote&&im.src.indexOf(remote)<0){im.src=remote;return}
  el.remove()};
 im.src=local||remote;
}
window.loadImg=loadImg;

function fitEnd(){
 var el=document.getElementById('emk');if(!el)return;
 var box=el.parentNode.clientWidth;if(!box)return;
 var fs=100;el.style.fontSize='100px';
 for(var i=0;i<3;i++){
  var w=el.getBoundingClientRect().width;if(w<=0)return;
  if(Math.abs(w-box)<0.6)break;
  fs=fs*box/w;el.style.fontSize=fs+'px';
 }
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',mount)}else{mount()}
})();
