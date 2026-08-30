/* ═══════════════════════════════════════════════════════════════
   Invest in Afghanistan — Portal shared behaviour.
   Front-end only: no backend calls. Every interaction is simulated
   so the prototype is fully clickable for the developer handoff.
   ═══════════════════════════════════════════════════════════════ */
(function(){
 'use strict';

 /* ---- password show / hide ---- */
 document.querySelectorAll('[data-toggle]').forEach(function(t){
  t.addEventListener('click',function(){
   var inp=t.parentNode.querySelector('input');
   if(!inp)return;
   if(inp.type==='password'){inp.type='text';t.textContent='Hide';}
   else{inp.type='password';t.textContent='Show';}
  });
 });

 /* ---- password strength meter ---- */
 document.querySelectorAll('[data-strength]').forEach(function(inp){
  var meter=document.querySelector(inp.getAttribute('data-strength'));
  if(!meter)return;
  var lab=meter.parentNode.querySelector('.pw-lab');
  inp.addEventListener('input',function(){
   var v=inp.value,s=0;
   if(v.length>=8)s++;
   if(/[A-Z]/.test(v)&&/[a-z]/.test(v))s++;
   if(/\d/.test(v))s++;
   if(/[^A-Za-z0-9]/.test(v))s++;
   if(v.length===0)s=0;
   meter.className='pw-meter s'+s;
   if(lab)lab.textContent=['Enter a password','Weak — add length','Fair — add a capital or number','Good','Strong'][s];
  });
 });

 /* ---- phone number: digits and spaces only ---- */
 document.querySelectorAll('.ip.tel input,input[type="tel"]').forEach(function(inp){
  inp.addEventListener('input',function(){
   var v=inp.value.replace(/[^\d ]/g,'');if(v!==inp.value)inp.value=v;
  });
 });

 /* ---- confirm password: clear the mismatch note once it matches ---- */
 document.querySelectorAll('[data-pwc]').forEach(function(pwc){
  pwc.addEventListener('input',function(){
   var f=pwc.closest('form'),pw=f&&f.querySelector('[data-pw]'),msg=f&&f.querySelector('[data-pwmsg]');
   if(msg&&pw&&pwc.value===pw.value)msg.classList.remove('show');
  });
 });

 /* ---- OTP code boxes: auto-advance, backspace, paste ---- */
 document.querySelectorAll('[data-otp]').forEach(function(wrap){
  var boxes=[].slice.call(wrap.querySelectorAll('input'));
  boxes.forEach(function(b,i){
   b.addEventListener('input',function(){
    b.value=b.value.replace(/[^0-9]/g,'').slice(-1);
    b.classList.toggle('filled',!!b.value);
    if(b.value&&boxes[i+1])boxes[i+1].focus();
    syncOtp();
   });
   b.addEventListener('keydown',function(e){
    if(e.key==='Backspace'&&!b.value&&boxes[i-1]){boxes[i-1].focus();}
   });
   b.addEventListener('paste',function(e){
    e.preventDefault();
    var d=(e.clipboardData||window.clipboardData).getData('text').replace(/[^0-9]/g,'').slice(0,boxes.length);
    for(var j=0;j<d.length&&i+j<boxes.length;j++){boxes[i+j].value=d[j];boxes[i+j].classList.add('filled');}
    var next=Math.min(i+d.length,boxes.length-1);boxes[next].focus();
    syncOtp();
   });
  });
  function syncOtp(){
   var code=boxes.map(function(b){return b.value;}).join('');
   var btn=document.querySelector(wrap.getAttribute('data-otp'));
   if(btn)btn.disabled=code.length<boxes.length;
  }
  syncOtp();
 });

 /* ---- resend countdown ---- */
 document.querySelectorAll('[data-resend]').forEach(function(btn){
  var count=parseInt(btn.getAttribute('data-resend'),10)||30;
  var label=document.querySelector(btn.getAttribute('data-resend-label'));
  var t=count;
  btn.disabled=true;
  function tick(){
   if(label)label.textContent='Resend code in '+t+'s';
   if(t<=0){btn.disabled=false;if(label)label.textContent='';return;}
   t--;setTimeout(tick,1000);
  }
  tick();
  btn.addEventListener('click',function(){
   if(btn.disabled)return;
   t=count;btn.disabled=true;tick();
  });
 });

 /* ---- prototype: prevent real submits, route via data-goto ---- */
 document.querySelectorAll('[data-goto]').forEach(function(el){
  el.addEventListener('click',function(e){
   var href=el.getAttribute('data-goto');
   if(href){e.preventDefault();window.location.href=href;}
  });
 });
 document.querySelectorAll('form[data-af]').forEach(function(f){
  f.addEventListener('submit',function(e){e.preventDefault();
   var pw=f.querySelector('[data-pw]'),pwc=f.querySelector('[data-pwc]'),pmsg=f.querySelector('[data-pwmsg]');
   if(pw&&pwc&&pw.value!==pwc.value){if(pmsg)pmsg.classList.add('show');pwc.focus();return;}
   if(pmsg)pmsg.classList.remove('show');
   var go=f.getAttribute('data-next');if(!go)return;
   // carry account type if this form has a type chooser
   var sel=f.querySelector('.acct input[name="atype"]:checked');
   if(sel&&go.indexOf('?')<0)go+='?type='+sel.value;
   window.location.href=go;});
 });

 /* ---- account type carried across the flow via ?type= ---- */
 function currentType(){
  var m=location.search.match(/type=(investor|business)/);
  return m?m[1]:'business';
 }
 var TYPE=currentType();

 /* ---- verify screen routes by flow: login -> dashboard, signup -> onboarding ---- */
 document.querySelectorAll('form[data-verify]').forEach(function(f){
  var login=/flow=login/.test(location.search);
  f.setAttribute('data-next', login ? (TYPE==='investor'?'i-dashboard.html?role=investor':'b-dashboard.html?role=business') : 'onboarding.html?type='+TYPE);
 });
 document.documentElement.setAttribute('data-acct',TYPE);
 // swap any [data-biz]/[data-inv] text nodes
 document.querySelectorAll('[data-biz]').forEach(function(el){
  el.textContent=TYPE==='investor'?el.getAttribute('data-inv'):el.getAttribute('data-biz');
 });
 function toggleBlock(el,hide){
  el.style.display=hide?'none':'';
  // hidden required fields still block form validation — disable them so submit works
  el.querySelectorAll('input,select,textarea').forEach(function(c){c.disabled=hide;});
 }
 document.querySelectorAll('.only-biz').forEach(function(el){toggleBlock(el,TYPE==='investor');});
 document.querySelectorAll('.only-inv').forEach(function(el){toggleBlock(el,TYPE!=='investor');});
 // append ?type= to onward links so it persists
 document.querySelectorAll('[data-carry]').forEach(function(a){
  var h=a.getAttribute('href')||a.getAttribute('data-next');
  if(h&&h.indexOf('?')<0){var attr=a.hasAttribute('href')?'href':'data-next';a.setAttribute(attr,h+'?type='+TYPE);}
 });
 document.querySelectorAll('form[data-carry]').forEach(function(f){
  var h=f.getAttribute('data-next');
  if(h&&h.indexOf('?')<0)f.setAttribute('data-next',h+'?type='+TYPE);
 });

 /* ---- account type chooser on create-account: carry into next ---- */
 document.querySelectorAll('.acct input[name="atype"]').forEach(function(r){
  r.addEventListener('change',function(){
   var f=r.closest('form');
   if(f){var n=f.getAttribute('data-next-base')||'verify.html';f.setAttribute('data-next',n);}
  });
 });

 /* ---- document upload: real file picker, validation, preview ---- */
 document.querySelectorAll('.drop').forEach(function(d){
  var input=document.createElement('input');
  input.type='file';input.accept='.pdf,.jpg,.jpeg,.png';input.style.display='none';
  d.appendChild(input);
  d.addEventListener('click',function(e){if(e.target!==input)input.click();});
  input.addEventListener('change',function(){
   var f=input.files&&input.files[0];if(!f)return;
   var tx=d.querySelector('.tx b'),sp=d.querySelector('.tx span'),ic=d.querySelector('.ic');
   if(!/\.(pdf|jpe?g|png)$/i.test(f.name)){
    d.classList.remove('filled');d.classList.add('err');input.value='';
    if(sp)sp.textContent='Unsupported file — use PDF, JPG or PNG.';return;}
   if(f.size>10*1024*1024){
    d.classList.remove('filled');d.classList.add('err');input.value='';
    if(sp)sp.textContent='File is over 10 MB — please choose a smaller one.';return;}
   d.classList.remove('err');d.classList.add('filled');
   var kb=f.size/1024,size=kb>=1024?(kb/1024).toFixed(1)+' MB':Math.max(1,Math.round(kb))+' KB';
   if(tx)tx.textContent=d.getAttribute('data-filed')||'Document uploaded';
   if(sp)sp.textContent=f.name+' · '+size+' · click to replace';
   if(ic){
    if(/^image\//.test(f.type)){ic.innerHTML='<img alt="preview" src="'+URL.createObjectURL(f)+'">';}
    else{ic.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg>';}
   }
  });
 });

 /* ═══════════ SIGNED-IN APP SHELL ═══════════ */
 var ic={
  dash:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  apps:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
  plus:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  lic:'<path d="M3 5h18v14H3z"/><circle cx="8" cy="12" r="2.4"/><path d="M14 10h4M14 14h4"/>',
  doc:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
  pay:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  vfy:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  bell:'<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
  cog:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-2.82 1.17V22a2 2 0 01-4 0v-.09A1.65 1.65 0 006 20.4l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 003.34 15H3.26a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0018 4.6l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0021.66 11H22a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>'
 };
 var NAV=[
  {k:'Overview',items:[{h:'dashboard.html',t:'Dashboard',i:ic.dash}]},
  {k:'Applications',items:[
   {h:'applications.html',t:'My applications',i:ic.apps},
   {h:'new-application.html',t:'New application',i:ic.plus}]},
  {k:'My records',items:[
   {h:'licences.html',t:'Licences',i:ic.lic},
   {h:'documents.html',t:'Documents',i:ic.doc}]},
  {k:'Billing & tools',items:[
   {h:'payments.html',t:'Fees & payments',i:ic.pay},
   {h:'verify-licence.html',t:'Verify a licence',i:ic.vfy}]}
 ];
 var FOOT=[
  {h:'notifications.html',t:'Notifications',i:ic.bell,badge:'3'},
  {h:'settings.html',t:'Settings',i:ic.cog}
 ];
 function svg(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>';}

 /* ---- toast: lightweight action feedback (so nothing is a dead button) ---- */
 var toastEl=null;
 function toast(msg){
  if(!toastEl){toastEl=document.createElement('div');toastEl.className='toast';document.body.appendChild(toastEl);}
  toastEl.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg><span>'+msg+'</span>';
  toastEl.classList.add('show');
  clearTimeout(toastEl._t);toastEl._t=setTimeout(function(){toastEl.classList.remove('show');},2600);
 }
 window.__toast=toast;
 // any element with data-toast fires a toast (mock actions)
 document.addEventListener('click',function(e){
  var t=e.target.closest('[data-toast]'); if(t){e.preventDefault();toast(t.getAttribute('data-toast'));}
 });

 var PILL={rev:'rev',ok:'ok',dr:'dr'};
 var PAYMETHODS=[
  {t:'Bank transfer',s:'Da Afghanistan Bank · ····3021',ic:'<path d="M3 21h18"/><path d="M4 10h16"/><path d="M6 10v11M18 10v11M10 10v11M14 10v11"/><path d="M12 3l9 6H3z"/>',def:true},
  {t:'Card',s:'Visa ending 4242',ic:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'},
  {t:'Mobile money',s:'HesabPay · +93 7·· ··· ·34',ic:'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>'}
 ];
 function navHtml(page,help){
  var s='';
  NAV.forEach(function(g){
   s+='<div class="navk">'+g.k+'</div>';
   g.items.forEach(function(it){
    s+='<a class="nav'+(it.h===page?' on':'')+'" href="'+it.h+'">'+svg(it.i)+'<span>'+it.t+'</span>'+(it.badge?'<span class="badge">'+it.badge+'</span>':'')+'</a>';
   });
  });
  s+='<div style="flex:1"></div>';
  if(help)s+='<div class="side-help"><b>Need a hand?</b><p>Talk to your named facilitation officer.</p>'+
   '<a href="../contact.html">Contact &rarr;</a></div>';
  s+='<div class="navk">Account</div>';
  FOOT.forEach(function(it){
   s+='<a class="nav'+(it.h===page?' on':'')+'" href="'+it.h+'">'+svg(it.i)+'<span>'+it.t+'</span>'+(it.badge?'<span class="badge">'+it.badge+'</span>':'')+'</a>';
  });
  return s;
 }
 /* ---- demo personas: switch between the two portals ---- */
 var PROFILES={
  business:{
   name:'Herat Cold Chain', role:'Business owner', initials:'HC',
   greet:'Welcome back, Herat Cold Chain.',
   status:'One application is in review and one document request is outstanding.',
   stats:[
    {big:'3',lab:'Active applications',sc:'#176f7e',bg:'rgba(0,180,204,.12)',ic:ic.apps,delta:'2 progressing'},
    {big:'2',lab:'Valid licences',sc:'#3f9e4d',bg:'rgba(140,224,95,.16)',ic:ic.lic,delta:'All active'},
    {big:'1',lab:'Action needed',sc:'#b7791f',bg:'rgba(245,165,36,.16)',ic:'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>',delta:'Document requested'},
    {big:'$0',lab:'Outstanding fees',sc:'#0d1b26',bg:'rgba(13,27,38,.06)',ic:ic.pay,delta:'All settled'}
   ],
   apps:[
    {nm:'New trade licence',svc:'Trade licence',mt:'Submitted 24 Jul · day 3 of 5–7 working days',ref:'AF-TL-2026-0442',st:'rev',stl:'In review',sub:'24 Jul 2026',province:'Herat',fee:'$120.00 · paid',officer:'M. Ahmadi'},
    {nm:'Trademark registration — “HeratCold”',svc:'Trademark',mt:'Approved 27 Jul · opposition window to 12 Aug',ref:'AF-TM-2026-0119',st:'ok',stl:'Approved',sub:'13 Jul 2026',province:'—',fee:'$90.00 · paid',officer:'S. Noori'},
    {nm:'Industrial plot allocation — Herat Park',svc:'Industrial plot',mt:'Draft · 2 documents left to upload',ref:'AF-LD-2026-0058',st:'dr',stl:'Draft',sub:'—',province:'Herat',fee:'By assessment',officer:'—'},
    {nm:'Company registration — Herat Cold Chain Ltd',svc:'Company registration',mt:'Approved 12 Jun · certificate issued',ref:'AF-CR-2026-0771',st:'ok',stl:'Approved',sub:'02 Jun 2026',province:'Herat',fee:'$200.00 · paid',officer:'S. Noori'},
    {nm:'Import permit — refrigeration units',svc:'Import permit',mt:'Submitted 26 Jul · awaiting customs classification',ref:'AF-IP-2026-0203',st:'rev',stl:'In review',sub:'26 Jul 2026',province:'Herat',fee:'$60.00 · paid',officer:'M. Ahmadi'}
   ],
   notifs:[
    {c:'ok',g:'Today',unread:true,t:'Trademark “HeratCold” approved',s:'Registered. Opposition window runs until 12 Aug.',tm:'2h ago'},
    {c:'warn',g:'Today',unread:true,t:'Document requested',s:'A proof of address is needed for plot allocation AF-LD-2026-0058.',tm:'4h ago'},
    {c:'info',g:'Today',unread:true,t:'Trade licence entered review',s:'AF-TL-2026-0442 is with a licensing officer. Decision by 31 Jul.',tm:'1d ago'},
    {c:'ok',g:'Earlier this week',unread:false,t:'Payment received',s:'Trade licence fee of $120.00 received.',tm:'24 Jul'},
    {c:'ok',g:'Earlier this week',unread:false,t:'Account verified',s:'Phone and identity confirmed. All features unlocked.',tm:'24 Jul'},
    {c:'info',g:'Earlier this week',unread:false,t:'New opportunity in Herat',s:'A cold-chain incentive matching your sectors was published.',tm:'22 Jul'}
   ],
   person:{first:'Yusuf',last:'Rahimi',email:'yusuf@heratcold.af',phone:'+93 7XX XXX X34'},
   org:{kind:'business',label:'Business',rows:[['Registered business name','Herat Cold Chain Ltd'],['Structure','Limited liability company (LLC)'],['Primary sector','Agriculture & agri-processing'],['Province of operation','Herat']]},
   action:{t:'Upload proof of address for your plot allocation',
    p:'The reviewing officer requested a utility bill or lease for AF-LD-2026-0058. Uploading it moves the draft to review.',cta:'Upload document',href:'documents.html'},
   activity:[
    {c:'done',t:'Trademark approved',s:'“HeratCold” · 2 hours ago'},
    {c:'now',t:'Trade licence entered review',s:'AF-TL-2026-0442 · yesterday'},
    {c:'done',t:'Payment received',s:'Trade licence fee · $120 · 24 Jul'},
    {c:'done',t:'Account verified',s:'Phone & identity confirmed · 24 Jul'}
   ],
   licences:[
    {ty:'Trade licence',nm:'Cold storage & warehousing',ref:'AF-MOIC-2026-118432',sc:'ok',sl:'Valid & active',hold:'Herat Cold Chain Ltd',issued:'27 Jul 2026',expiry:'27 Jul 2027',meter:'11 months remaining',pct:92},
    {ty:'Trademark',nm:'“HeratCold” word mark',ref:'AF-TM-2026-0119',sc:'ok',sl:'Registered',hold:'Herat Cold Chain Ltd',issued:'27 Jul 2026',expiry:'Renews 2036',meter:'10-year term',pct:98},
    {ty:'Company registration',nm:'Herat Cold Chain Ltd',ref:'AF-CR-2026-0771',sc:'ok',sl:'Active',hold:'Herat Cold Chain Ltd',issued:'12 Jun 2026',expiry:'No expiry',meter:'Perpetual',pct:100}
   ],
   docs:[
    {nm:'National ID',fl:'national-id.pdf',cat:'Identity',dt:'24 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Certificate of registration',fl:'registration.pdf',cat:'Business',dt:'24 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Premises lease',fl:'lease-herat.pdf',cat:'Property',dt:'24 Jul 2026',sc:'act',sl:'In use'},
    {nm:'Bank letter',fl:'bank-letter.pdf',cat:'Financial',dt:'25 Jul 2026',sc:'rev',sl:'Reviewing'},
    {nm:'Tax registration',fl:'tin.pdf',cat:'Business',dt:'26 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Proof of address',fl:'Requested for AF-LD-2026-0058',cat:'Property',dt:'—',sc:'missing',sl:'Missing',req:'your plot allocation (AF-LD-2026-0058)'}
   ],
   pay:{
    outstanding:'$0.00',outLabel:'All fees settled · nothing due',outDue:false,
    totalPaid:'$425.00',paidCount:'4 payments · 2026',
    next:{name:'Plot assessment fee',note:'Due when AF-LD-2026-0058 is submitted',amt:'TBD'},
    history:[
     {item:'Trade licence fee',ref:'AF-TL-2026-0442',date:'24 Jul 2026',amt:'$120.00',sc:'ok',sl:'Paid'},
     {item:'Trademark filing fee',ref:'AF-TM-2026-0119',date:'20 Jul 2026',amt:'$90.00',sc:'ok',sl:'Paid'},
     {item:'Company registration fee',ref:'AF-CR-2026-0771',date:'12 Jun 2026',amt:'$200.00',sc:'ok',sl:'Paid'},
     {item:'Name reservation',ref:'AF-CR-2026-0771',date:'08 Jun 2026',amt:'$15.00',sc:'ok',sl:'Paid'}
    ]
   }
  },
  investor:{
   name:'Gulf Capital Partners', role:'Investor', initials:'GC',
   greet:'Welcome back, Gulf Capital Partners.',
   status:'Your Herat Park land request is under assessment and a proof-of-funds document is outstanding.',
   stats:[
    {big:'2',lab:'Registered investments',sc:'#176f7e',bg:'rgba(0,180,204,.12)',ic:ic.apps,delta:'$4.2M committed'},
    {big:'1',lab:'Land requests',sc:'#3f9e4d',bg:'rgba(140,224,95,.16)',ic:'<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/>',delta:'Under assessment'},
    {big:'1',lab:'Action needed',sc:'#b7791f',bg:'rgba(245,165,36,.16)',ic:'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>',delta:'Proof of funds'},
    {big:'3',lab:'Incentives eligible',sc:'#0d1b26',bg:'rgba(13,27,38,.06)',ic:'<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>',delta:'Cold-chain, energy'}
   ],
   apps:[
    {nm:'Investment registration',svc:'Investment registration',mt:'Approved 20 Jul · certificate issued',ref:'AF-IR-2026-0091',st:'ok',stl:'Approved',sub:'14 Jul 2026',province:'Herat',fee:'$250.00 · paid',officer:'R. Sadat'},
    {nm:'Industrial land request — Herat Park',svc:'Industrial land',mt:'Submitted 25 Jul · under assessment (30–45 days)',ref:'AF-LD-2026-0061',st:'rev',stl:'In review',sub:'25 Jul 2026',province:'Herat',fee:'By assessment',officer:'R. Sadat'},
    {nm:'Incentive application — cold-chain',svc:'Incentive',mt:'Draft · 1 document left to upload',ref:'AF-IN-2026-0034',st:'dr',stl:'Draft',sub:'—',province:'—',fee:'Free',officer:'—'},
    {nm:'Trademark registration — “GulfCold”',svc:'Trademark',mt:'Approved 22 Jul',ref:'AF-TM-2026-0140',st:'ok',stl:'Approved',sub:'10 Jul 2026',province:'—',fee:'$90.00 · paid',officer:'S. Noori'},
    {nm:'Profit repatriation registration',svc:'Repatriation',mt:'Submitted 26 Jul · under review',ref:'AF-RP-2026-0012',st:'rev',stl:'In review',sub:'26 Jul 2026',province:'—',fee:'Free',officer:'R. Sadat'}
   ],
   notifs:[
    {c:'ok',g:'Today',unread:true,t:'Investment registered',s:'AF-IR-2026-0091 approved and certificate issued.',tm:'3h ago'},
    {c:'warn',g:'Today',unread:true,t:'Proof of funds requested',s:'A bank letter is required before Herat Park land (AF-LD-2026-0061) is allocated.',tm:'5h ago'},
    {c:'info',g:'Today',unread:true,t:'Land request under assessment',s:'AF-LD-2026-0061 is being assessed. Typical time 30–45 days.',tm:'1d ago'},
    {c:'ok',g:'Earlier this week',unread:false,t:'Eligibility confirmed',s:'3 incentive schemes matched your investment.',tm:'24 Jul'},
    {c:'ok',g:'Earlier this week',unread:false,t:'Account verified',s:'Phone and identity confirmed. All features unlocked.',tm:'24 Jul'},
    {c:'info',g:'Earlier this week',unread:false,t:'New incentive scheme',s:'A renewable-energy incentive is now open for applications.',tm:'21 Jul'}
   ],
   person:{first:'Omar',last:'Al-Farsi',email:'omar@gulfcap.example',phone:'+971 5X XXX XX34'},
   org:{kind:'investor',label:'Investor',rows:[['Investing as','A company / fund'],['Entity','Gulf Capital Partners'],['Home country','United Arab Emirates'],['Planned investment size','$2M – $10M'],['Sectors of interest','Cold chain, energy']]},
   action:{t:'Submit proof of funds for your land request',
    p:'A bank letter or statement is required before Herat Park land (AF-LD-2026-0061) can be allocated.',cta:'Upload document',href:'documents.html'},
   activity:[
    {c:'done',t:'Investment registered',s:'AF-IR-2026-0091 · certificate issued · 3 hours ago'},
    {c:'now',t:'Land request under assessment',s:'AF-LD-2026-0061 · yesterday'},
    {c:'done',t:'Eligibility confirmed',s:'3 incentive schemes matched · 24 Jul'},
    {c:'done',t:'Account verified',s:'Phone & identity confirmed · 24 Jul'}
   ],
   licences:[
    {ty:'Investment registration',nm:'Cold-chain project',ref:'AF-IR-2026-0091',sc:'ok',sl:'Active',hold:'Gulf Capital Partners',issued:'20 Jul 2026',expiry:'20 Jul 2029',meter:'2 yr 11 mo remaining',pct:97},
    {ty:'Incentive eligibility',nm:'Cold-chain incentive scheme',ref:'AF-IN-2026-0031',sc:'ok',sl:'Confirmed',hold:'Gulf Capital Partners',issued:'24 Jul 2026',expiry:'Review Jul 2027',meter:'Annual review',pct:88}
   ],
   docs:[
    {nm:'Passport',fl:'passport.pdf',cat:'Identity',dt:'24 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Certificate of incorporation',fl:'gcp-incorporation.pdf',cat:'Business',dt:'24 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Board resolution',fl:'board-resolution.pdf',cat:'Business',dt:'24 Jul 2026',sc:'ok',sl:'Verified'},
    {nm:'Tax residency certificate',fl:'tax-residency.pdf',cat:'Financial',dt:'25 Jul 2026',sc:'rev',sl:'Reviewing'},
    {nm:'Proof of funds',fl:'Requested for AF-LD-2026-0061',cat:'Financial',dt:'—',sc:'missing',sl:'Missing',req:'your Herat Park land request (AF-LD-2026-0061)'}
   ],
   pay:{
    outstanding:'$500.00',outLabel:'Land assessment fee due',outDue:true,
    totalPaid:'$400.00',paidCount:'2 payments · 2026',
    next:{name:'Land assessment fee',note:'Herat Park · AF-LD-2026-0061',amt:'$500.00'},
    history:[
     {item:'Land assessment fee',ref:'AF-LD-2026-0061',date:'Due now',amt:'$500.00',sc:'due',sl:'Due'},
     {item:'Legal review fee',ref:'AF-IR-2026-0091',date:'22 Jul 2026',amt:'$150.00',sc:'ok',sl:'Paid'},
     {item:'Investment registration fee',ref:'AF-IR-2026-0091',date:'20 Jul 2026',amt:'$250.00',sc:'ok',sl:'Paid'}
    ]
   }
  }
 };
 function getProfile(){var m=location.search.match(/profile=(investor|business)/);return m?m[1]:'business';}
 var PROFILE=getProfile(), P=PROFILES[PROFILE];
 // carry ?profile onto an internal app link
 function withP(h){
  if(!h||/^(https?:|\.\.\/|#|mailto:|tel:)/.test(h))return h;
  if(h.indexOf('profile=')>=0)return h;
  return h+(h.indexOf('?')>=0?'&':'?')+'profile='+PROFILE;
 }

 var content=document.querySelector('main.content[data-page]:not([data-view])');
 if(content){
  var page=content.getAttribute('data-page');
  var logo='<a class="lg lt" href="../index.html"><img class="logoimg" src="../media/logo_white.png" alt="Invest in Afghanistan" width="691" height="289"></a>';
  var uchip='<div class="side-foot"><a class="uchip" href="'+withP('settings.html')+'"><span class="av">'+P.initials+'</span><span class="nm"><b>'+P.name+'</b><span>'+P.role+'</span></span><span class="cog">'+svg(ic.cog)+'</span></a></div>';
  var side=document.createElement('aside');side.className='side';
  side.innerHTML=logo+'<nav>'+navHtml(page,true)+'</nav>'+uchip;
  var pswitch='<div class="pswitch" title="Preview the other portal"><span class="pl">Preview</span>'+
   '<a class="'+(PROFILE==='business'?'on':'')+'" href="?profile=business">Business</a>'+
   '<a class="'+(PROFILE==='investor'?'on':'')+'" href="?profile=investor">Investor</a></div>';
  var topbar='<header class="topbar">'+
   '<button class="mburg" data-mnav><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'+
   '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg><input placeholder="Search applications, licences, documents…"></div>'+
   '<div class="tb-r">'+pswitch+
    '<a class="ico" href="'+withP('notifications.html')+'" title="Notifications"><svg viewBox="0 0 24 24">'+ic.bell+'</svg><span class="dot"></span></a>'+
    '<a class="av" href="'+withP('settings.html')+'">'+P.initials+'</a>'+
   '</div></header>';
  var main=document.createElement('div');main.className='main';
  main.innerHTML=topbar;
  var app=document.createElement('div');app.className='app';
  content.parentNode.insertBefore(app,content);
  main.appendChild(content);
  app.appendChild(side);app.appendChild(main);
  // mobile nav
  var mnav=document.createElement('div');mnav.className='mnav';
  mnav.innerHTML='<div class="sc" data-mnav-close></div><div class="pan">'+logo+'<nav style="margin-top:22px">'+navHtml(page)+'</nav></div>';
  document.body.appendChild(mnav);
  document.querySelectorAll('[data-mnav]').forEach(function(b){b.addEventListener('click',function(){mnav.classList.add('open');});});
  document.querySelectorAll('[data-mnav-close]').forEach(function(b){b.addEventListener('click',function(){mnav.classList.remove('open');});});
  // carry ?profile across every in-app link (nav, quick actions, rows…)
  app.querySelectorAll('a[href]').forEach(function(a){a.setAttribute('href',withP(a.getAttribute('href')));});

  if(page==='dashboard.html') renderDashboard(content,P);
  if(page==='licences.html') renderLicences(content,P);
  if(page==='documents.html') renderDocuments(content,P);
  if(page==='payments.html') renderPayments(content,P);
  if(page==='applications.html') renderApplications(content,P);
  if(page==='application-detail.html') renderApplicationDetail(content,P);
  if(page==='notifications.html') renderNotifications(content,P);
  if(page==='settings.html') renderSettings(content,P);
 }

 /* ---- My applications (list + filter) ---- */
 function renderApplications(root,P){
  var body=root.querySelector('#appList'); if(!body)return;
  function rows(list){
   return list.map(function(a){
    return '<a class="r" data-s="'+a.st+'" href="'+withP('application-detail.html?ref='+encodeURIComponent(a.ref))+'">'+
     '<div><div class="nm">'+a.nm+'</div><div class="mt">'+a.mt+'</div></div>'+
     '<span class="ref">'+a.ref+'</span><span class="pill '+PILL[a.st]+'">'+a.stl+'</span>'+
     '<span class="chev"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span></a>';
   }).join('');
  }
  body.innerHTML=rows(P.apps);
  var n=function(s){return P.apps.filter(function(a){return s==='all'||a.st===s;}).length;};
  set(root,'#fAll','All ('+P.apps.length+')');
  var filt=root.querySelector('#appFilt');
  if(filt){
   var rowsEl=[].slice.call(body.querySelectorAll('.r'));
   filt.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
    filt.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
    var f=b.getAttribute('data-f');
    rowsEl.forEach(function(r){r.style.display=(f==='all'||r.getAttribute('data-s')===f)?'':'none';});
   });});
  }
 }

 /* ---- Application detail (tracking) ---- */
 function renderApplicationDetail(root,P){
  var wrap=root.querySelector('#adWrap'); if(!wrap)return;
  var m=location.search.match(/ref=([^&]+)/);
  var ref=m?decodeURIComponent(m[1]):null;
  var a=null; P.apps.forEach(function(x){if(x.ref===ref)a=x;});
  if(!a){P.apps.forEach(function(x){if(!a&&x.st==='rev')a=x;});} if(!a)a=P.apps[0];
  // status-derived timeline
  var tl;
  if(a.st==='dr') tl=[['done','Draft created','Saved · '+(a.sub!=='—'?a.sub:'recently')],['now','Complete &amp; submit','Upload the remaining documents to submit'],['','Review','Begins once submitted'],['','Decision','—']];
  else if(a.st==='ok') tl=[['done','Application submitted',a.sub],['done','Completeness check passed','Routed to officer'],['done','Reviewed &amp; approved','Certificate issued'],['done','Complete','On record and verifiable']];
  else tl=[['done','Application submitted',a.sub+', 09:14'],['done','Completeness check passed','Routed to '+a.officer],['now','Under review by officer','In progress — you’ll be notified of any questions'],['','Decision &amp; issue','Expected within the stated time']];
  var tlH=tl.map(function(e){
   var mk=e[0]==='now'?'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>':(e[0]==='done'?'<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg>':'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>');
   return '<div class="e '+e[0]+'"><span class="mk">'+mk+'</span><div class="tx"><b>'+e[1]+'</b><span>'+e[2]+'</span></div></div>';
  }).join('');
  var stageLabel=a.st==='dr'?'Draft — not yet submitted':(a.st==='ok'?'Approved':'In review');
  wrap.innerHTML=
   '<div class="pagehead"><div class="bc"><a href="'+withP('dashboard.html')+'">Dashboard</a> / <a href="'+withP('applications.html')+'">Applications</a> / <span>'+a.ref+'</span></div>'+
    '<div class="row"><div><h1>'+a.nm+'</h1><p class="sub">Reference '+a.ref+' · '+a.svc+(a.sub!=='—'?' · submitted '+a.sub:'')+'</p></div>'+
    '<span class="pill '+PILL[a.st]+'" style="font-size:13px;padding:8px 14px">'+a.stl+'</span></div></div>'+
   '<div class="det"><div>'+
    '<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>Progress</b><span style="font-size:13px;color:var(--mut)">'+stageLabel+'</span></div>'+
     '<div class="panel-p"><div class="tl">'+tlH+'</div></div></div>'+
    '<div class="panel"><div class="panel-h"><b>Attached documents</b></div><div class="panel-p">'+
     ['Certificate of registration.pdf','Supporting document.pdf','National ID.pdf'].map(function(d){
      return '<div class="docrow"><span class="fi"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg></span><div><div>'+d+'</div><div class="mt">On record</div></div><a href="#" data-toast="Opening document (mock)">View</a></div>';
     }).join('')+'</div></div>'+
   '</div><div>'+
    '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Summary</b><div class="rev" style="margin-top:14px;border:0">'+
     '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">Service</span><span class="val">'+a.svc+'</span></div>'+
     '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">Province</span><span class="val">'+a.province+'</span></div>'+
     '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">Fee</span><span class="val">'+a.fee+'</span></div>'+
     '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">Officer</span><span class="val">'+a.officer+'</span></div></div></div>'+
    '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Need to make a change?</b>'+
     '<p style="font-size:13px;color:var(--mut);line-height:1.55;margin:8px 0 14px">Message the reviewing officer or withdraw while it’s in review.</p>'+
     '<button class="pillbtn out sm" data-msg style="width:100%;margin-bottom:9px">Message officer</button>'+
     '<button class="pillbtn out sm" data-withdraw style="width:100%">Withdraw application</button></div>'+
    (a.officer!=='—'?'<div class="panel panel-p"><b style="font-size:15px">Assigned officer</b><div style="display:flex;align-items:center;gap:12px;margin-top:12px">'+
     '<span style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#176f7e,#0f5a67);color:#fff;display:grid;place-items:center;font-weight:600;font-size:14px">'+a.officer.replace(/[^A-Z]/g,'').slice(0,2)+'</span>'+
     '<div><b style="font-size:14px">'+a.officer+'</b><div style="font-size:12.5px;color:var(--mut)">Facilitation Unit · '+(a.province!=='—'?a.province:'Ministry')+'</div></div></div></div>':'')+
   '</div></div>';
  // message officer modal
  var mm=document.createElement('div');mm.className='vmodal';
  mm.innerHTML='<div class="sc" data-mc></div><div class="card"><button class="x" data-mc>&times;</button>'+
   '<div style="padding:24px"><b style="font-size:18px;font-weight:600">Message the officer</b>'+
   '<p style="font-size:13px;color:var(--mut);margin:6px 0 14px">About '+a.ref+' · '+a.officer+'</p>'+
   '<textarea rows="4" placeholder="Type your message…" style="width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-family:inherit;font-size:14px;resize:vertical;outline:0"></textarea>'+
   '<div style="display:flex;gap:9px;margin-top:14px"><button class="pillbtn out sm" data-mc style="flex:1">Cancel</button>'+
   '<button class="pillbtn ink sm" data-msend style="flex:1">Send message</button></div></div></div>';
  document.body.appendChild(mm);
  mm.querySelectorAll('[data-mc]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();mm.classList.remove('open');});});
  mm.querySelector('[data-msend]').addEventListener('click',function(){mm.classList.remove('open');toast('Message sent to '+a.officer);});
  var mb=wrap.querySelector('[data-msg]'); if(mb)mb.addEventListener('click',function(){mm.classList.add('open');});
  var wb=wrap.querySelector('[data-withdraw]'); if(wb)wb.addEventListener('click',function(){toast('Withdrawal request submitted');});
 }

 /* ---- Notifications ---- */
 function renderNotifications(root,P){
  var list=root.querySelector('#notifList'); if(!list)return;
  function render(){
   var groups={};var order=[];
   P.notifs.forEach(function(n){if(!groups[n.g]){groups[n.g]=[];order.push(n.g);}groups[n.g].push(n);});
   list.innerHTML=order.map(function(g){
    return '<div class="ndate">'+g+'</div><div class="nlist">'+groups[g].map(function(n){
     var ic=n.c==='ok'?'<path d="M5 12l5 5 9-11"/>':(n.c==='warn'?'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>':'<circle cx="12" cy="12" r="4"/>');
     return '<div class="n '+n.c+(n.unread?' unread':'')+'"><span class="ic">'+svg(ic)+'</span>'+
      '<div class="bd"><b>'+n.t+'</b><p>'+n.s+'</p></div><span class="tm">'+n.tm+'</span>'+(n.unread?'<span class="u"></span>':'')+'</div>';
    }).join('')+'</div>';
   }).join('');
   var un=P.notifs.filter(function(n){return n.unread;}).length;
   var badge=document.querySelector('.side a.nav[href*="notifications"] .badge');
   if(badge)badge.style.display=un?'':'none', badge.textContent=un;
  }
  render();
  var mk=root.querySelector('#markAll');
  if(mk)mk.addEventListener('click',function(e){e.preventDefault();P.notifs.forEach(function(n){n.unread=false;});render();toast('All notifications marked as read');});
 }

 /* ---- Settings ---- */
 function renderSettings(root,P){
  if(!root.querySelector('#setProfile'))return;
  var pr=P.person;
  set(root,'#setInitials',P.initials);set(root,'#setName',P.name);set(root,'#setRole',P.role+' · verified');
  var pf=root.querySelector('#setProfile');
  pf.innerHTML='<div class="fld row2"><div><label>First name</label><div class="ip"><input value="'+pr.first+'"></div></div>'+
   '<div><label>Last name</label><div class="ip"><input value="'+pr.last+'"></div></div></div>'+
   '<div class="fld"><label>Email</label><div class="ip"><input value="'+pr.email+'"></div></div>'+
   '<div class="fld"><label>Mobile</label><div class="ip"><input value="'+pr.phone+'"></div></div>'+
   '<button class="pillbtn ink" data-toast="Profile saved" style="margin-top:6px">Save changes</button>';
  // org tab label + fields
  set(root,'#orgTabLabel',P.org.label);
  var org=root.querySelector('#setOrg');
  org.innerHTML=P.org.rows.map(function(r){
   return '<div class="fld"><label>'+r[0]+'</label><div class="ip"><input value="'+r[1]+'"></div></div>';
  }).join('')+'<button class="pillbtn ink" data-toast="Details saved" style="margin-top:6px">Save changes</button>';
 }

 /* ---- fees & payments ---- */
 function renderPayments(root,P){
  var pay=P.pay; if(!pay)return;
  var bc=root.querySelector('#balCard'); if(bc)bc.classList.toggle('due',pay.outDue);
  set(root,'#balAmt',pay.outstanding); set(root,'#balLab',pay.outLabel);
  var pn=root.querySelector('#balPay'); if(pn)pn.style.display=pay.outDue?'inline-flex':'none';
  set(root,'#paidTotal',pay.totalPaid); set(root,'#paidCount',pay.paidCount);
  set(root,'#nextName',pay.next.name); set(root,'#nextNote',pay.next.note); set(root,'#nextAmt',pay.next.amt);

  // saved payment methods panel
  var pm=root.querySelector('#payMethods');
  if(pm)pm.innerHTML=PAYMETHODS.map(function(m){
   return '<div class="pmeth"><span class="mi">'+svg(m.ic)+'</span><div class="mt"><b>'+m.t+'</b><span>'+m.s+'</span></div>'+
    (m.def?'<span class="mdef">Default</span>':'<a class="lk" href="#" data-toast="Payment method options">Manage</a>')+'</div>';
  }).join('')+'<button class="pmeth add" data-toast="Add a payment method — mock in this prototype"><span class="mi"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span><b>Add a payment method</b></button>';

  var body=root.querySelector('#payBody'); if(!body)return;
  function rowHtml(h,i){
   var due=h.sc==='due';
   var ic=due?'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>':'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>';
   return '<tr'+(due?' class="due"':'')+' data-row="'+i+'">'+
    '<td><div class="pf"><span class="pfi'+(due?' warn':'')+'">'+svg(ic)+'</span><span class="pnm">'+h.item+'</span></div></td>'+
    '<td class="hidesm ref">'+h.ref+'</td><td class="hidesm dt">'+h.date+'</td>'+
    '<td class="amt">'+h.amt+'</td>'+
    '<td><span class="pill '+(due?'rev':'ok')+'">'+h.sl+'</span></td>'+
    '<td class="ta">'+(due?'<button class="lk" data-pay="'+i+'">Pay now</button>':'<button class="lk" data-receipt="'+i+'">Receipt</button>')+'</td></tr>';
  }
  body.innerHTML=pay.history.map(rowHtml).join('');

  // ---- pay modal ----
  var modal=document.createElement('div');modal.className='vmodal paymodal';
  modal.innerHTML='<div class="sc" data-pc></div><div class="card">'+
   '<button class="x" data-pc>&times;</button>'+
   '<div class="pm-wrap"><div class="pm-hd"><b>Pay a fee</b><span data-pitem></span></div>'+
    '<div class="pm-amt"><span>Amount due</span><b data-pamt>$0.00</b></div>'+
    '<div class="pm-mk">Pay with</div><div class="pm-methods" data-pmethods></div>'+
    '<div class="pm-ft"><button class="pillbtn out sm" data-pc>Cancel</button>'+
     '<button class="pillbtn ink sm" data-pdo>Pay</button></div></div>'+
   '<div class="pm-done" hidden><div class="circ"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg></div>'+
    '<b>Payment received</b><p data-pdone></p><a class="pillbtn ink sm" data-pc>Done</a></div>';
  document.body.appendChild(modal);
  modal.querySelector('[data-pmethods]').innerHTML=PAYMETHODS.map(function(m,i){
   return '<label class="pm-opt"><input type="radio" name="pmeth"'+(m.def?' checked':'')+'>'+
    '<span class="mi">'+svg(m.ic)+'</span><span class="mt"><b>'+m.t+'</b><span>'+m.s+'</span></span>'+
    '<span class="rk"></span></label>';
  }).join('');
  function pclose(){modal.classList.remove('open');modal.querySelector('.pm-wrap').hidden=false;modal.querySelector('.pm-done').hidden=true;}
  modal.querySelectorAll('[data-pc]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();pclose();});});
  var curPay=null;
  function openPay(i){
   var h=pay.history[i]; curPay=i;
   modal.querySelector('[data-pitem]').textContent=h.item+' · '+h.ref;
   modal.querySelector('[data-pamt]').textContent=h.amt;
   modal.querySelector('.pm-wrap').hidden=false;modal.querySelector('.pm-done').hidden=true;
   var pd=modal.querySelector('[data-pdo]');pd.textContent='Pay '+h.amt;pd.disabled=false;
   modal.classList.add('open');
  }
  modal.querySelector('[data-pdo]').addEventListener('click',function(){
   var btn=this;btn.disabled=true;btn.textContent='Processing…';
   setTimeout(function(){
    var h=pay.history[curPay];
    modal.querySelector('.pm-wrap').hidden=true;
    var done=modal.querySelector('.pm-done');done.hidden=false;
    modal.querySelector('[data-pdone]').textContent=h.amt+' paid for '+h.item+'. A receipt is now in your payment history.';
    // update the page: mark row paid, clear balance
    h.sc='ok';h.sl='Paid';h.date='Just now';
    body.querySelector('[data-row="'+curPay+'"]').outerHTML=rowHtml(h,curPay);
    body.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(){openPay(+b.getAttribute('data-pay'));});});
    body.querySelectorAll('[data-receipt]').forEach(function(b){b.addEventListener('click',function(){toast('Receipt downloaded (mock)');});});
    if(bc){bc.classList.remove('due');set(root,'#balAmt','$0.00');set(root,'#balLab','All fees settled · nothing due');}
    if(pn)pn.style.display='none';
   },1100);
  });
  // wire triggers
  function wire(){
   body.querySelectorAll('[data-pay]').forEach(function(b){b.addEventListener('click',function(){openPay(+b.getAttribute('data-pay'));});});
   body.querySelectorAll('[data-receipt]').forEach(function(b){b.addEventListener('click',function(){toast('Receipt downloaded (mock)');});});
  }
  wire();
  if(pn)pn.addEventListener('click',function(e){e.preventDefault();var di=-1;pay.history.forEach(function(h,i){if(h.sc==='due')di=i;});if(di>=0)openPay(di);});
 }

 /* ---- documents manager ---- */
 function renderDocuments(root,P){
  var body=root.querySelector('#docBody'); if(!body)return;
  var catIc={
   Identity:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M14 10h4M14 14h4"/>',
   Business:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
   Property:'<path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/>',
   Financial:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'
  };
  var pill={ok:'ok',act:'act',rev:'rev',missing:'rej'};
  body.innerHTML=P.docs.map(function(d){
   var miss=d.sc==='missing';
   return '<tr class="drow'+(miss?' miss':'')+'" data-cat="'+d.cat+'" data-nm="'+d.nm.toLowerCase()+'">'+
    '<td><div class="f"><span class="fi c-'+d.cat+'">'+svg(catIc[d.cat]||catIc.Business)+'</span>'+
     '<div><div class="nm">'+d.nm+'</div><div class="mt">'+d.fl+'</div></div></div></td>'+
    '<td class="hidesm"><span class="catchip">'+d.cat+'</span></td>'+
    '<td class="hidesm dt">'+d.dt+'</td>'+
    '<td><span class="pill '+pill[d.sc]+'">'+d.sl+'</span></td>'+
    '<td class="ta">'+(miss?'<a class="lk warn" href="#">Upload</a>':'<a class="lk" href="#">View</a>')+'</td></tr>';
  }).join('');
  var vf=P.docs.filter(function(d){return d.sc==='ok';}).length;
  var miss=P.docs.filter(function(d){return d.sc==='missing';});
  var rev=P.docs.filter(function(d){return d.sc==='rev';}).length;
  set(root,'#dsTotal',P.docs.length); set(root,'#dsVerified',vf);
  set(root,'#dsReview',rev); set(root,'#dsMissing',miss.length);
  var cnt=root.querySelector('#docCount'); if(cnt)cnt.textContent=P.docs.length+' files';
  var co=root.querySelector('#docCallout');
  if(co){
   if(miss.length){co.style.display='flex';
    set(root,'#docCoT',miss.length+' document'+(miss.length>1?'s':'')+' requested');
    set(root,'#docCoP','Upload '+miss[0].nm.toLowerCase()+' for '+(miss[0].req||'a pending application')+' to move it forward.');
   } else co.style.display='none';
  }
 }
 function set(root,sel,v){var e=root.querySelector(sel); if(e)e.textContent=v;}

 /* ---- decorative verification QR ---- */
 function qrSvg(){var s='',seed=[1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1,1];
  for(var y=0;y<12;y++)for(var x=0;x<12;x++){var v=(seed[(x*3+y*5)%32]+((x*y)%3===0?1:0))%2;if(v)s+='<rect x="'+x*8+'" y="'+y*8+'" width="8" height="8"/>';}
  function eye(x,y){return '<rect x="'+x+'" y="'+y+'" width="30" height="30" fill="none" stroke="#0d1b26" stroke-width="7"/><rect x="'+(x+13)+'" y="'+(y+13)+'" width="8" height="8"/>';}
  return '<svg viewBox="0 0 96 96" fill="#0d1b26"><rect width="96" height="96" fill="#fff"/>'+s+'<rect x="0" y="0" width="40" height="40" fill="#fff"/><rect x="56" y="0" width="40" height="40" fill="#fff"/><rect x="0" y="56" width="40" height="40" fill="#fff"/>'+eye(3,3)+eye(63,3)+eye(3,63)+'</svg>';}

 /* ---- licences / credentials wallet ---- */
 function renderLicences(root,P){
  var grid=root.querySelector('#licGrid'); if(!grid)return;
  var cards=P.licences.map(function(l,i){
   return '<div class="lcard"><div class="top"><div class="gl"></div><div class="qr">'+qrSvg()+'</div>'+
    '<div class="ty">'+l.ty+'</div><h3>'+l.nm+'</h3><div class="rf">'+l.ref+'</div></div>'+
    '<div class="bd">'+
     '<div class="strow"><span class="pill '+l.sc+'">'+l.sl+'</span><span class="hold">'+l.hold+'</span></div>'+
     '<div class="meter"><div class="mtop"><span>Validity</span><span>'+l.expiry+'</span></div>'+
      '<div class="track"><i style="width:'+l.pct+'%"></i></div><div class="mfoot">Issued '+l.issued+' · '+l.meter+'</div></div>'+
     '<div class="lacts"><button class="pillbtn ink sm" data-lv="'+i+'">Verify</button>'+
      '<a class="pillbtn out sm" href="#">Download</a>'+
      '<button class="lmore" title="Share verification"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg></button></div>'+
    '</div></div>';
  }).join('');
  cards+='<a class="lcard lapply" href="'+withP('new-application.html')+'">'+
   '<div class="ic"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></div>'+
   '<b>Apply for another</b><span>Trade, import, trademark and more.</span>'+
   '<span class="go">Start application &rarr;</span></a>';
  grid.innerHTML=cards;
  var sum=root.querySelector('#licSum'); if(sum)sum.textContent=P.licences.length+' active credentials';

  // verification modal — opens in place instead of navigating
  var modal=document.createElement('div');modal.className='vmodal';
  modal.innerHTML='<div class="sc" data-vclose></div><div class="card">'+
   '<button class="x" data-vclose>&times;</button>'+
   '<div class="hd"><span class="ck"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg></span>'+
    '<div><b data-vst>Valid &amp; active</b><span>Confirmed against the live register just now</span></div></div>'+
   '<div class="bd"><div class="rows" data-vrows></div><div class="qr">'+qrSvg()+'</div></div>'+
   '<div class="note">A valid result means the record exists, is current, and has not been suspended or revoked. Anyone can run this check &mdash; no account needed.</div>'+
   '<div class="ft"><button class="pillbtn out sm" data-vclose>Close</button>'+
    '<a class="pillbtn ink sm" href="'+withP('verify-licence.html')+'">Open full record &rarr;</a></div></div>';
  document.body.appendChild(modal);
  function close(){modal.classList.remove('open');}
  modal.querySelectorAll('[data-vclose]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();close();});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  function row(l,v){return '<div class="r"><span class="l">'+l+'</span><span class="v">'+v+'</span></div>';}
  grid.querySelectorAll('[data-lv]').forEach(function(btn){
   btn.addEventListener('click',function(){
    var l=P.licences[+btn.getAttribute('data-lv')];
    modal.querySelector('[data-vst]').textContent=l.sl==='Registered'?'Valid & registered':(l.sl==='Confirmed'?'Valid & confirmed':'Valid & active');
    modal.querySelector('[data-vrows]').innerHTML=
     row('Type',l.ty)+row('Holder',l.hold)+row('Reference',l.ref)+row('Issued',l.issued)+row('Valid until',l.expiry);
    modal.classList.add('open');
   });
  });
 }

 /* ---- dashboard render from the active persona ---- */
 function renderDashboard(root,P){
  var pill={rev:'rev',ok:'ok',dr:'dr'};
  var stats=P.stats.map(function(s){
   return '<div class="stat2" style="--sc:'+s.sc+';--scbg:'+s.bg+'">'+
    '<div class="s-top"><span class="ic">'+svg(s.ic)+'</span></div>'+
    '<div class="big">'+s.big+'</div><div class="lab">'+s.lab+'</div>'+
    '<div class="delta">'+s.delta+'</div></div>';
  }).join('');
  var apps=P.apps.slice(0,3).map(function(a){
   return '<a class="r" href="'+withP('application-detail.html?ref='+encodeURIComponent(a.ref))+'">'+
    '<div><div class="nm">'+a.nm+'</div><div class="mt">'+a.mt+'</div></div>'+
    '<span class="ref">'+a.ref+'</span><span class="pill '+pill[a.st]+'">'+a.stl+'</span>'+
    '<span class="chev"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span></a>';
  }).join('');
  var act=P.activity.map(function(e){
   var mk=e.c==='now'?'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>':'<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg>';
   return '<div class="e '+e.c+'"><span class="mk">'+mk+'</span><div class="tx"><b>'+e.t+'</b><span>'+e.s+'</span></div></div>';
  }).join('');
  var g=root.querySelector('[data-fill=greet]'); if(g)g.textContent=P.greet;
  var st=root.querySelector('[data-fill=status]'); if(st)st.textContent=P.status;
  var sr=root.querySelector('#statrow'); if(sr)sr.innerHTML=stats;
  var al=root.querySelector('#appList'); if(al)al.innerHTML=apps;
  var ac=root.querySelector('#activity'); if(ac)ac.innerHTML=act;
  var actionEl=root.querySelector('#actionCard');
  if(actionEl)actionEl.innerHTML='<span class="ic"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg></span>'+
   '<div class="bd"><b>'+P.action.t+'</b><p>'+P.action.p+'</p>'+
   '<a class="pillbtn ink sm" href="'+withP(P.action.href)+'">'+P.action.cta+' &rarr;</a></div>';
 }
})();
