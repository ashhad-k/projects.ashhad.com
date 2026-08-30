/* ═══════════════════════════════════════════════════════════════
   Portal — app shell + page renderers.
   Every signed-in page is a thin HTML shell; this file builds the
   role-aware chrome and renders the page body.
   ═══════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var P=window.PORTAL; if(!P)return;
var R=P.R, ROLE=P.ROLE, svg=P.svg, badge=P.badge, AFN=P.AFN, withR=P.withR, I=P.I;

/* ───────── toast ───────── */
var tEl=null;
function toast(msg,sub){
 if(!tEl){tEl=document.createElement('div');tEl.className='toast';document.body.appendChild(tEl);}
 tEl.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-11"/></svg><span>'+msg+(sub?' <em>'+sub+'</em>':'')+'</span>';
 tEl.classList.add('show');clearTimeout(tEl._t);tEl._t=setTimeout(function(){tEl.classList.remove('show');},2800);
}
window.toast=toast;
document.addEventListener('click',function(e){
 var t=e.target.closest('[data-toast]');
 if(t){e.preventDefault();toast(t.getAttribute('data-toast'),t.getAttribute('data-toast-sub'));}
 var u=e.target.closest('[data-upload]');
 if(u){e.preventDefault();openUpload(u.getAttribute('data-upload'));}
 var sv=e.target.closest('[data-sitevisit]');
 if(sv){e.preventDefault();openSiteVisit();}
});
function openSiteVisit(){
 var picks=P.OPPS.slice(0,3);
 openMdl('<button class="x" data-mx>&times;</button><div style="padding:26px">'+
  '<h3 style="font-size:20px;font-weight:600;letter-spacing:-.03em">Request site visits</h3>'+
  '<p style="color:var(--mut);font-size:13.5px;line-height:1.55;margin:6px 0 16px">Your officer, Nadia Amiri, will arrange access and confirm dates for the projects on your shortlist.</p>'+
  '<div class="rev" style="margin-bottom:16px">'+picks.map(function(o){
   return '<div class="r"><span class="lab">'+o.n+'</span><span class="val">'+o.prov+'</span></div>';}).join('')+'</div>'+
  '<div class="fld"><label>Preferred window</label><div class="ip"><select><option>As soon as possible</option><option>Within two weeks</option><option>Next month</option></select></div></div>'+
  '<div style="display:flex;gap:9px;margin-top:6px"><button class="pillbtn out sm" data-mx style="flex:1">Cancel</button>'+
  '<button class="pillbtn ink sm" data-mx data-toast="Site visits requested" data-toast-sub="Nadia Amiri will confirm within one working day." style="flex:1">Send request</button></div></div>');
}
window.openSiteVisit=openSiteVisit;

/* ───────── modal ───────── */
var mEl=null;
function openMdl(html,cls){
 if(!mEl){mEl=document.createElement('div');mEl.className='vmodal';document.body.appendChild(mEl);}
 mEl.className='vmodal'+(cls?' '+cls:'');
 mEl.innerHTML='<div class="sc" data-mx></div><div class="card">'+html+'</div>';
 mEl.classList.add('open');
 mEl.querySelectorAll('[data-mx]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();closeMdl();});});
}
function closeMdl(){if(mEl)mEl.classList.remove('open');}
window.openMdl=openMdl;window.closeMdl=closeMdl;
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMdl();});

/* ───────── shared upload dialog ───────── */
function openUpload(name){
 openMdl('<button class="x" data-mx>&times;</button><div style="padding:26px">'+
  '<h3 style="font-size:20px;font-weight:600;letter-spacing:-.03em">Upload a document</h3>'+
  '<p style="color:var(--mut);font-size:13.5px;line-height:1.55;margin:6px 0 18px">'+
   (name?'For <b style="color:var(--ink)">'+name+'</b>. ':'Attach a file to your record. ')+'PDF, JPG or PNG · up to 10 MB.</p>'+
  '<div class="drop" data-updrop><div class="ic">'+svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>')+'</div>'+
  '<div class="tx"><b>Choose a file or drag it here</b><span>Nothing leaves this prototype.</span></div></div>'+
  '<div style="display:flex;gap:9px;margin-top:8px"><button class="pillbtn out sm" data-mx style="flex:1">Cancel</button>'+
  '<button class="pillbtn ink sm" data-updo style="flex:1" disabled>Upload</button></div></div>');
 var drop=document.querySelector('[data-updrop]'),go=document.querySelector('[data-updo]');
 if(drop)drop.addEventListener('click',function(){drop.classList.add('filled');
  drop.querySelector('.tx b').textContent=(name?name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''):'document')+'.pdf';
  drop.querySelector('.tx span').textContent='1.2 MB · ready to upload';
  drop.querySelector('.ic').innerHTML=svg('<path d="M5 12l5 5 9-11"/>');
  if(go)go.disabled=false;});
 if(go)go.addEventListener('click',function(){closeMdl();toast('Document uploaded','Your officer has been notified.');});
}
window.openUpload=openUpload;

/* ───────── shell ───────── */
function navHtml(page){
 var s='';
 R.nav.forEach(function(g){
  s+='<div class="navk">'+g.k+'</div>';
  g.items.forEach(function(it){
   s+='<a class="nav'+(it.h===page?' on':'')+'" href="'+withR(it.h)+'">'+svg(it.i)+'<span>'+it.t+'</span>'+
      (it.badge?'<span class="badge">'+it.badge+'</span>':'')+'</a>';
  });
 });
 s+='<div style="flex:1"></div>';
 s+='<div class="side-help"><b>Need a hand?</b><p>'+(ROLE==='investor'?'Nadia Amiri is your named officer.':'Talk to your named facilitation officer.')+'</p>'+
    '<a href="'+withR(ROLE==='investor'?'i-messages.html':'b-messages.html')+'">Message &rarr;</a></div>';
 s+='<div class="navk">Account</div>';
 R.foot.forEach(function(it){
  s+='<a class="nav'+(it.h===page?' on':'')+'" href="'+withR(it.h)+'">'+svg(it.i)+'<span>'+it.t+'</span>'+
     (it.badge?'<span class="badge">'+it.badge+'</span>':'')+'</a>';
 });
 return s;
}

function buildShell(content,page){
 var logo='<a class="lg lt" href="../index.html"><img class="logoimg" src="../media/logo_white.png" alt="Invest in Afghanistan" width="691" height="289"></a>';
 var side=document.createElement('aside');side.className='side';
 side.innerHTML=logo+'<nav>'+navHtml(page)+'</nav>'+
  '<div class="side-foot"><a class="uchip" href="'+withR(ROLE==='investor'?'i-profile.html':'b-profile.html')+'">'+
   '<span class="av">'+R.user.ini+'</span><span class="nm"><b>'+R.user.name+'</b><span>'+R.user.role+'</span></span>'+
   '<span class="cog">'+svg(I.usr)+'</span></a></div>';
 var other=ROLE==='investor'?'business':'investor';
 var swap='<a class="rswap" href="'+P.ROLES[other].home+'?role='+other+'" title="Switch account view">'+
   '<span class="rl">Viewing</span><b>'+R.label+'</b>'+
   '<span class="sw">'+svg('<path d="M7 16V4M7 4L4 7M7 4l3 3"/><path d="M17 8v12M17 20l3-3M17 20l-3-3"/>')+'</span></a>';
 var topbar='<header class="topbar">'+
  '<button class="mburg" data-mnav><svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>'+
  '<div class="search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>'+
  '<input placeholder="Search applications, licences, documents…" data-search></div>'+
  '<div class="tb-r">'+swap+
   '<a class="ico" href="'+withR('notifications.html')+'" title="Notifications">'+svg(I.bell)+'<span class="dot"></span></a>'+
   '<a class="av" href="'+withR(ROLE==='investor'?'i-profile.html':'b-profile.html')+'">'+R.user.ini+'</a>'+
  '</div></header>';
 var main=document.createElement('div');main.className='main';main.innerHTML=topbar;
 var app=document.createElement('div');app.className='app';
 content.parentNode.insertBefore(app,content);
 main.appendChild(content);app.appendChild(side);app.appendChild(main);
 var mnav=document.createElement('div');mnav.className='mnav';
 mnav.innerHTML='<div class="sc" data-mnc></div><div class="pan">'+logo+'<nav style="margin-top:22px">'+navHtml(page)+'</nav></div>';
 document.body.appendChild(mnav);
 document.querySelectorAll('[data-mnav]').forEach(function(b){b.addEventListener('click',function(){mnav.classList.add('open');});});
 document.querySelectorAll('[data-mnc]').forEach(function(b){b.addEventListener('click',function(){mnav.classList.remove('open');});});
 var si=main.querySelector('[data-search]');
 if(si)si.addEventListener('keydown',function(e){if(e.key==='Enter'&&si.value.trim())toast('Searching “'+si.value.trim()+'”','Demo — results in the next build.');});
}

/* ───────── shared fragments ───────── */
function pageHead(title,sub,bc,cta){
 return '<div class="pagehead">'+(bc?'<div class="bc">'+bc+'</div>':'')+
  '<div class="row"><div><h1>'+title+'</h1>'+(sub?'<p class="sub">'+sub+'</p>':'')+'</div>'+(cta||'')+'</div></div>';
}
function statRow(stats){
 return '<div class="statrow">'+stats.map(function(s){
  return '<div class="stat2" style="--sc:'+s.sc+';--scbg:'+s.bg+'">'+
   '<div class="s-top"><span class="ic">'+svg(s.ic)+'</span></div>'+
   '<div class="big"'+(s.small?' style="font-size:24px"':'')+'>'+s.v+'</div><div class="lab">'+s.l+'</div>'+
   '<div class="delta">'+s.n+'</div></div>';
 }).join('')+'</div>';
}
function appRow(a,href){
 return '<a class="r" data-s="'+a.st+'" href="'+withR(href+'?ref='+encodeURIComponent(a.ref))+'">'+
  '<div><div class="nm">'+a.n+'</div><div class="mt">'+a.co+' · '+a.dt+'</div></div>'+
  '<span class="ref">'+a.ref+'</span>'+
  '<span class="prog" title="'+a.pct+'% complete"><i style="width:'+a.pct+'%"></i></span>'+
  badge(a.st)+'<span class="chev">'+svg('<path d="M9 6l6 6-6 6"/>')+'</span></a>';
}
function tlHtml(tl){
 return '<div class="tl">'+tl.map(function(e){
  var mk=e[0]==='done'?'<path d="M5 12l5 5 9-11"/>':'<circle cx="12" cy="12" r="4"/>';
  return '<div class="e '+e[0]+'"><span class="mk">'+svg(mk)+'</span><div class="tx"><b>'+e[1]+'</b><span>'+e[2]+'</span></div></div>';
 }).join('')+'</div>';
}
function qrSvg(){
 var c='',seed=[1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,0,1,0,0,1,1,0,1,1];
 for(var y=0;y<16;y++)for(var x=0;x<16;x++){var v=(seed[(x*3+y*5)%32]+((x*y)%3===0?1:0))%2;if(v)c+='<rect x="'+x*6+'" y="'+y*6+'" width="6" height="6"/>';}
 function eye(x,y){return '<rect x="'+x+'" y="'+y+'" width="30" height="30" fill="none" stroke="#0d1b26" stroke-width="6"/><rect x="'+(x+12)+'" y="'+(y+12)+'" width="6" height="6"/>';}
 return '<svg viewBox="0 0 96 96" fill="#0d1b26"><rect width="96" height="96" fill="#fff"/>'+c+
  '<rect x="0" y="0" width="42" height="42" fill="#fff"/><rect x="54" y="0" width="42" height="42" fill="#fff"/>'+
  '<rect x="0" y="54" width="42" height="42" fill="#fff"/>'+eye(3,3)+eye(63,3)+eye(3,63)+'</svg>';
}
function getRef(){var m=location.search.match(/[?&]ref=([^&]+)/);return m?decodeURIComponent(m[1]):null;}
function findApp(){var ref=getRef(),f=null;R.apps.forEach(function(a){if(a.ref===ref)f=a;});return f||R.apps[0];}

/* ───────── DASHBOARD ───────── */
function vDash(){
 var isInv=ROLE==='investor';
 var cta='<a class="pillbtn lime" href="'+withR(isInv?'i-opportunities.html':'b-apply.html')+'">'+
   (isInv?'Browse opportunities →':'Start a new application →')+'</a>';
 var h='<div class="dhero"><div class="gl"></div><div><div class="hi">Your portal</div>'+
  '<h1>'+R.greet+'</h1><p class="st">'+R.status+'</p></div>'+cta+'</div>'+statRow(R.stats);

 var left='';
 if(isInv){
  left+='<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>Matched to your mandate</b>'+
   '<a href="'+withR('i-opportunities.html')+'">All opportunities →</a></div><div class="panel-p">'+
   '<div class="oppgrid two">'+P.OPPS.slice(0,2).map(oppCard).join('')+'</div></div></div>';
 }
 left+='<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>'+(isInv?'Your requests':'Applications in progress')+'</b>'+
  '<a href="'+withR(isInv?'i-requests.html':'b-applications.html')+'">View all →</a></div>'+
  '<div class="applist">'+R.apps.slice(0,3).map(function(a){return appRow(a,isInv?'i-request.html':'b-application.html');}).join('')+'</div></div>';

 var pend=null;R.apps.forEach(function(a){if(!pend&&a.st==='pend')pend=a;});
 if(pend){
  left+='<div class="callout"><span class="ic">'+svg(I.doc)+'</span><div class="bd">'+
   '<b>Action needed — '+pend.n+'</b><p>'+pend.tl.filter(function(e){return e[0]==='now';})[0][2]+' ('+pend.ref+').</p>'+
   '<a class="pillbtn ink sm" href="'+withR(isInv?'i-documents.html':'b-documents.html')+'">Upload document →</a></div></div>';
 }

 var right='';
 if(isInv){
  right+='<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Your officer</b>'+
   '<div style="display:flex;gap:13px;align-items:center;margin:14px 0 12px">'+
   '<span class="offav">'+R.officer.ini+'</span><div><b style="font-size:15px">'+R.officer.n+'</b>'+
   '<div style="font-size:12.5px;color:var(--mut)">'+R.officer.t+'</div></div></div>'+
   '<p style="font-size:13px;color:var(--mut);line-height:1.6;margin-bottom:14px">'+R.officer.bio+'</p>'+
   '<a class="pillbtn ink sm" style="width:100%" href="'+withR('i-messages.html')+'">Send a message →</a></div>'+
   '<div class="panel panel-p"><b style="font-size:15px">Next steps</b><div style="margin-top:14px">'+tlHtml(R.next)+'</div></div>';
 }else{
  right+='<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>Quick actions</b></div><div class="panel-p"><div class="qa">'+
   [['b-apply.html',I.plus,'Start an application','15 services online'],
    ['b-licences.html',I.lic,'My licences','View, renew or amend'],
    ['b-documents.html',I.doc,'Documents','Everything issued to you'],
    ['b-payments.html',I.pay,'Fees & payments','See what’s due']].map(function(q){
     return '<a href="'+withR(q[0])+'"><span class="ic">'+svg(q[1])+'</span><b>'+q[2]+'</b><span>'+q[3]+'</span></a>';
    }).join('')+'</div></div></div>'+
   '<div class="panel"><div class="panel-h"><b>Your licences</b><a href="'+withR('b-licences.html')+'">All →</a></div><div class="panel-p">'+
   R.lics.map(function(l){
    return '<div class="licmini"><div><b>'+l.n+'</b><span>'+l.no+'</span></div>'+badge(l.st)+'</div>';
   }).join('')+'</div></div>';
 }
 return h+'<div class="dgrid"><div>'+left+'</div><div>'+right+'</div></div>';
}

/* ───────── OPPORTUNITIES ───────── */
function oppCard(o){
 return '<div class="opp" data-opp="'+P.esc(o.n)+'">'+
  '<div class="im'+(o.img?' hasimg':'')+'"'+(o.img?' style="background-image:url(\''+o.img+'\'),linear-gradient(135deg,#0d1b26,#0f5a67)"':'')+'><span class="tg">'+o.s+'</span><span class="pv">'+o.prov+'</span></div>'+
  '<div class="ct"><h4>'+o.n+'</h4><p>'+o.d+'</p>'+
  '<div class="mt"><div><b>'+o.sz+'</b><span>Indicative size</span></div>'+
  '<div><b>'+o.irr+'</b><span>Target IRR</span></div></div></div></div>';
}
function bindOpps(root){
 root.querySelectorAll('[data-opp]').forEach(function(el){
  el.addEventListener('click',function(){
   var n=el.getAttribute('data-opp'),o=null;
   P.OPPS.forEach(function(x){if(x.n===n)o=x;});if(!o)return;
   openMdl('<button class="x" data-mx>&times;</button>'+
    '<div class="opphero'+(o.img?' hasimg':'')+'"'+(o.img?' style="background-image:url(\''+o.img+'\'),linear-gradient(135deg,#0d1b26,#0f5a67)"':'')+'><span class="tg">'+o.s+'</span><span class="pv">'+o.prov+'</span></div>'+
    '<div style="padding:24px 26px 26px">'+
    '<h3 style="font-size:22px;font-weight:600;letter-spacing:-.03em;margin:0 0 8px">'+o.n+'</h3>'+
    '<p style="color:var(--mut);font-size:14px;line-height:1.6;margin-bottom:18px">'+o.d+'</p>'+
    '<div class="rev">'+
     [['Indicative size',o.sz],['Target IRR',o.irr],['Province',o.prov],
      ['Structure','Joint venture or wholly foreign owned'],
      ['Land','Allocated, inside a designated industrial zone'],
      ['Permitting','Documented path, 30–45 days'],
      ['Officer','Nadia Amiri, Investment Facilitation Unit']].map(function(r){
       return '<div class="r"><span class="lab">'+r[0]+'</span><span class="val">'+r[1]+'</span></div>';}).join('')+
    '</div><div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:18px">'+
    '<button class="pillbtn ink sm" data-mx data-toast="Added to shortlist" data-toast-sub="Your officer has been notified.">Add to shortlist</button>'+
    '<button class="pillbtn out sm" data-mx data-toast="Memorandum requested" data-toast-sub="Sent to your email within one working day.">Request memorandum</button>'+
    '<a class="pillbtn out sm" href="'+withR('i-messages.html')+'">Message officer</a></div></div>');
  });
 });
}
function vOpps(){
 var secs=['All sectors'];P.OPPS.forEach(function(o){if(secs.indexOf(o.s)<0)secs.push(o.s);});
 return pageHead('Investment opportunities.','Projects prepared with the relevant ministry and provincial authority. Each one has a named officer and a documented permitting path.')+
  '<div class="filt" id="oppFilt">'+secs.map(function(s,i){
   return '<button class="'+(i?'':'on')+'" data-f="'+P.esc(s)+'">'+s+'</button>';}).join('')+'</div>'+
  '<div class="oppgrid" id="oppGrid">'+P.OPPS.map(oppCard).join('')+'</div>';
}
function vShortlist(){
 return pageHead('My shortlist.','Three projects saved. Your officer sees this list and prepares the site visits around it.',null,
  '<button class="pillbtn lime" data-sitevisit>Request site visits →</button>')+
  '<div class="oppgrid">'+P.OPPS.slice(0,3).map(oppCard).join('')+'</div>';
}

/* ───────── APPLICATIONS / REQUESTS ───────── */
function vApps(){
 var isInv=ROLE==='investor';
 var title=isInv?'My requests':'My applications';
 var sub=isInv?'Site visits, memoranda, meetings and registrations — with live status.':'Everything you’ve filed, with progress, reference numbers and decision times.';
 var cta='<a class="pillbtn ink" href="'+withR(isInv?'i-services.html':'b-apply.html')+'">+ New '+(isInv?'request':'application')+'</a>';
 var counts={all:R.apps.length,rev:0,pend:0,ok:0,draft:0};
 R.apps.forEach(function(a){counts[a.st]=(counts[a.st]||0)+1;});
 var f=[['all','All ('+counts.all+')'],['rev','In review'],['pend','Action needed'],['ok','Approved'],['draft','Draft']];
 return pageHead(title,sub,null,cta)+
  '<div class="filt" id="appFilt">'+f.map(function(x,i){
   return '<button class="'+(i?'':'on')+'" data-f="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>'+
  '<div class="panel"><div class="applist" id="appList">'+
   R.apps.map(function(a){return appRow(a,isInv?'i-request.html':'b-application.html');}).join('')+'</div></div>';
}
function vAppDetail(){
 var a=findApp(),isInv=ROLE==='investor';
 var back=isInv?'i-requests.html':'b-applications.html';
 var bc='<a href="'+withR(isInv?'i-dashboard.html':'b-dashboard.html')+'">Dashboard</a> / <a href="'+withR(back)+'">'+(isInv?'Requests':'Applications')+'</a> / <span>'+a.ref+'</span>';
 var stage=a.st==='draft'?'Draft — not yet submitted':(a.st==='ok'?'Complete':(a.st==='pend'?'Action needed from you':'In review'));
 return pageHead(a.n,'Reference '+a.ref+' · '+a.co+(a.dt?' · '+a.dt:''),bc,
   '<span class="pill '+P.ST[a.st][0]+'" style="font-size:13px;padding:8px 14px">'+P.ST[a.st][1]+'</span>')+
  '<div class="det"><div>'+
   '<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>Progress</b>'+
    '<span style="font-size:13px;color:var(--mut)">'+stage+' · '+a.pct+'%</span></div>'+
    '<div class="panel-p"><div class="progbar"><i style="width:'+a.pct+'%"></i></div>'+tlHtml(a.tl)+'</div></div>'+
   '<div class="panel"><div class="panel-h"><b>Attached documents</b>'+
    '<a href="'+withR(isInv?'i-documents.html':'b-documents.html')+'">All documents →</a></div><div class="panel-p">'+
    R.docs.slice(0,3).map(function(d){
     return '<div class="docrow"><span class="fi">'+svg(I.doc)+'</span><div><div>'+d[0]+'</div><div class="mt">'+d[1]+'</div></div>'+
      '<a href="#" data-toast="Opening document" data-toast-sub="Demo — viewer in the next build.">View</a></div>';
    }).join('')+'</div></div>'+
  '</div><div>'+
   '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Summary</b><div class="rev" style="margin-top:12px;border:0">'+
    [['Reference',a.ref],['Entity',a.co],['Province',a.prov],['Fee',a.fee?AFN(a.fee):'No fee'],['Submitted',a.dt]].map(function(r){
     return '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">'+r[0]+'</span><span class="val">'+r[1]+'</span></div>';}).join('')+
   '</div></div>'+
   '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Actions</b>'+
    '<div style="display:grid;gap:9px;margin-top:12px">'+
    (a.st==='draft'?'<a class="pillbtn ink sm" href="'+withR('b-apply.html')+'">Continue this draft →</a>':'')+
    (a.st==='pend'?'<a class="pillbtn ink sm" href="'+withR(isInv?'i-documents.html':'b-documents.html')+'">Upload the document →</a>':'')+
    '<button class="pillbtn out sm" data-msg>Message the officer</button>'+
    '<button class="pillbtn out sm" data-toast="Copy downloaded" data-toast-sub="A PDF summary of this file.">Download summary</button>'+
    (a.st!=='ok'?'<button class="pillbtn out sm" data-wd>Withdraw</button>':'')+
    '</div></div>'+
   (a.officer!=='—'?'<div class="panel panel-p"><b style="font-size:15px">Assigned officer</b>'+
    '<div style="display:flex;align-items:center;gap:12px;margin-top:12px"><span class="offav sm">'+a.officer.replace(/[^A-Z]/g,'').slice(0,2)+'</span>'+
    '<div><b style="font-size:14px">'+a.officer+'</b><div style="font-size:12.5px;color:var(--mut)">'+
    (a.prov!=='—'?a.prov+' desk':'Ministry')+'</div></div></div></div>':'')+
  '</div></div>';
}

/* ───────── SERVICES CATALOGUE ───────── */
function svCards(f){
 var list=P.SVCS.filter(function(s){
  if(ROLE==='investor'&&f==='all')return s.c==='inv'||s.c==='rec';
  return f==='all'||s.c===f;});
 return list.map(function(s){
  return '<div class="sv" data-svc="'+P.esc(s.n)+'"><span class="ic">'+svg(I.app)+'</span>'+
   '<h4>'+s.n+'</h4><p>'+s.d+'</p>'+
   '<div class="ft"><span>'+s.t+' · '+AFN(s.f)+'</span>'+(s.tag?'<b>'+s.tag+'</b>':'')+'</div></div>';
 }).join('');
}
function vServices(){
 var isInv=ROLE==='investor';
 var cats=isInv?P.CATS.filter(function(c){return c[0]==='all'||c[0]==='inv'||c[0]==='rec';}):P.CATS;
 return pageHead(isInv?'Investor services.':'All services.',
  'Every Ministry service that can be completed online, with the fee and the working-day commitment shown before you start.')+
  '<div class="cat2"><div class="catl" id="catl">'+
   cats.map(function(c,i){
    return '<button class="catb'+(i?'':' on')+'" data-f="'+c[0]+'"><span>'+c[1]+'</span><em>'+c[2]+'</em></button>';}).join('')+
   '<div class="guide"><b>Not sure which one?</b><p>Answer four questions and we’ll route you to the right application.</p>'+
   '<button class="pillbtn lime sm" style="width:100%" data-guide>Guide me →</button></div></div>'+
  '<div class="svgrid" id="svgrid">'+svCards('all')+'</div></div>';
}
function guideMdl(){
 openMdl('<button class="x" data-mx>&times;</button><div style="padding:26px">'+
  '<h3 style="font-size:21px;font-weight:600;letter-spacing:-.03em">Find the right service.</h3>'+
  '<p style="color:var(--mut);font-size:14px;margin:6px 0 18px">Four questions, about thirty seconds.</p>'+
  '<div class="af">'+
  [['What do you want to do?',['Start a new business','Change something on an existing licence','Protect a name or a mark','Get a document or a certificate']],
   ['Where will the business operate?',['One province','Nationwide','Export only']],
   ['Who owns it?',['Afghan nationals only','Includes foreign ownership','Branch of a foreign company']],
   ['Do you already have a reserved trade name?',['No, I need one','Yes, reserved']]].map(function(q){
    return '<div class="fld"><label>'+q[0]+'</label><div class="ip"><select>'+
     q[1].map(function(o){return '<option>'+o+'</option>';}).join('')+'</select></div></div>';}).join('')+
  '<button class="pillbtn ink" style="width:100%;margin-top:6px" data-mx data-goapply>Show my route →</button>'+
  '</div></div>');
 var b=document.querySelector('[data-goapply]');
 if(b)b.addEventListener('click',function(){location.href=withR(ROLE==='investor'?'i-apply.html':'b-apply.html')+'&svc='+encodeURIComponent('New Trade Licence');});
}

/* ───────── APPLY WIZARD (8 steps) ───────── */
var WSTEPS=[['Service','What you are applying for'],['Business activity','What the company will do'],
 ['Trade name','Search and reserve'],['Structure & owners','Legal form and shareholders'],
 ['Address','Where it operates'],['Documents','Upload the files'],['Review','Check before paying'],['Payment','Fee and receipt']];
var wizStep=0,wizSvc=null;
function svcByName(n){var f=null;P.SVCS.forEach(function(s){if(s.n===n)f=s;});return f;}
function vApply(){
 var m=location.search.match(/[?&]svc=([^&]+)/);
 if(!wizSvc)wizSvc=svcByName(m?decodeURIComponent(m[1]):(ROLE==='investor'?'Investment Registration':'New Trade Licence'))||P.SVCS[0];
 return '<div id="wizMount"></div>';
}
function renderWiz(){
 var s=wizSvc,i=wizStep,isInv=ROLE==='investor';
 var body='';
 if(i===0){
  var list=P.SVCS.filter(function(x){return isInv?(x.c==='inv'||x.c==='rec'):true;});
  body='<span class="ckk">Choose a service</span><div class="svc2">'+list.map(function(x){
   return '<label><input type="radio" name="wsvc" value="'+P.esc(x.n)+'"'+(x.n===s.n?' checked':'')+'>'+
    '<div class="b"><b>'+x.n+'</b><p>'+x.d+'</p><span class="fee">'+x.t+' · '+AFN(x.f)+'</span></div>'+
    '<span class="tick">'+svg('<path d="M5 12l5 5 9-11"/>')+'</span></label>';}).join('')+'</div>';
 }else if(i===1){
  body='<span class="ckk">Business activity</span><div class="wz-h">What will the company do?</div>'+
   '<div class="wz-d">Pick the activities you need on the licence. You can add more later by filing an amendment.</div><div class="af">'+
   '<div class="fld"><label>Primary sector</label><div class="ip"><select><option>Agriculture &amp; agri-processing</option><option>Manufacturing</option><option>Mining &amp; extractives</option><option>Energy</option><option>Trade &amp; logistics</option><option>Services</option></select></div></div>'+
   '<div class="fld"><label>Activities</label><div class="chips">'+
    ['Cold storage','Agri-processing','Export','Import','Wholesale','Packaging','Transport'].map(function(c,n){
     return '<label><input type="checkbox"'+(n<3?' checked':'')+'><span class="c">'+c+'</span></label>';}).join('')+'</div></div>'+
   '<div class="fld"><label>Brief description</label><div class="ip"><input value="Refrigerated warehousing and grading for agricultural produce."></div></div></div>';
 }else if(i===2){
  body='<span class="ckk">Trade name</span><div class="wz-h">Search and reserve a name</div>'+
   '<div class="wz-d">We check the live register instantly. A reservation holds the name for thirty days.</div><div class="af">'+
   '<div class="fld"><label>Proposed name</label><div class="ip"><input id="tnIn" value="Herat Cold Chain Ltd"></div>'+
   '<div class="hint" id="tnMsg" style="color:var(--ok);font-weight:600">✓ Available — no conflicting name on the register</div></div>'+
   '<div class="fld"><label>Alternative (optional)</label><div class="ip"><input placeholder="Second choice"></div></div></div>';
 }else if(i===3){
  body='<span class="ckk">Structure &amp; owners</span><div class="wz-h">Legal form and shareholders</div>'+
   '<div class="wz-d">Ownership determines which approvals apply. Foreign ownership is permitted up to 100%.</div><div class="af">'+
   '<div class="fld"><label>Legal form</label><div class="ip"><select><option>Limited Liability Company (LLC)</option><option>Sole Proprietorship</option><option>Corporation</option><option>Partnership</option><option>Branch of a foreign company</option></select></div></div>'+
   '<div class="fld row2"><div><label>Share capital</label><div class="ip"><input value="AFN 5,000,000"></div></div>'+
   '<div><label>Shareholders</label><div class="ip"><select><option>1</option><option selected>2</option><option>3+</option></select></div></div></div>'+
   '<div class="fld"><label>Owners</label><div class="ownlist">'+
    [['Ahmad Rasooli','Afghanistan · 60%'],['Gulf Capital Partners','United Arab Emirates · 40%']].map(function(o){
     return '<div class="own"><span class="oi">'+o[0].split(' ').map(function(w){return w[0];}).join('').slice(0,2)+'</span>'+
      '<div><b>'+o[0]+'</b><span>'+o[1]+'</span></div><a href="#" data-toast="Owner details">Edit</a></div>';}).join('')+
    '<button class="own add" data-toast="Add an owner" data-toast-sub="Mock in this prototype.">+ Add an owner</button></div></div></div>';
 }else if(i===4){
  body='<span class="ckk">Address</span><div class="wz-h">Where does it operate?</div>'+
   '<div class="wz-d">Give the operating premises. Inside a designated industrial park, utilities and inspections are coordinated for you.</div><div class="af">'+
   '<div class="fld row2"><div><label>Province</label><div class="ip"><select><option>Herat</option><option>Kabul</option><option>Balkh</option><option>Kandahar</option><option>Nangarhar</option></select></div></div>'+
   '<div><label>District</label><div class="ip"><input value="Guzara"></div></div></div>'+
   '<div class="fld"><label>Premises</label><div class="ip"><select><option>Inside an industrial park</option><option>Commercial premises</option><option>Home-based</option></select></div></div>'+
   '<div class="fld"><label>Plot / address</label><div class="ip"><input value="Herat Industrial Park, Plot 42"></div></div></div>';
 }else if(i===5){
  body='<span class="ckk">Documents</span><div class="wz-h">Upload the files</div>'+
   '<div class="wz-d">Anything already on your account is reused automatically.</div><div class="af">'+
   s.need.map(function(nd,n){
    var onFile=n===2;
    if(onFile)return '<div class="fld"><label>'+nd+' <span style="color:var(--mut)">· on file</span></label>'+
     '<div class="drop filled" style="cursor:default"><div class="ic">'+svg('<path d="M5 12l5 5 9-11"/>')+'</div>'+
     '<div class="tx"><b>'+nd+'</b><span>Reused from your account</span></div></div></div>';
    return '<div class="fld"><label>'+nd+' <span style="color:var(--acc)">· required</span></label>'+
     '<div class="drop" data-filed="'+nd+' uploaded"><div class="ic">'+svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>')+'</div>'+
     '<div class="tx"><b>'+nd+'</b><span>Click to upload · PDF, JPG or PNG</span></div></div></div>';
   }).join('')+'</div>';
 }else if(i===6){
  body='<span class="ckk">Review</span><div class="wz-h">Check before paying</div>'+
   '<div class="wz-d">Nothing is charged until you submit.</div><div class="rev">'+
   [['Service',s.n],['Activities','Cold storage, agri-processing, export'],['Trade name','Herat Cold Chain Ltd'],
    ['Legal form','Limited Liability Company'],['Address','Herat Industrial Park, Plot 42'],
    ['Documents',s.need.length+' attached'],['Decision time',s.t],['Fee',AFN(s.f)]].map(function(r){
     return '<div class="r"><span class="lab">'+r[0]+'</span><span class="val">'+r[1]+'</span></div>';}).join('')+
   '</div><label class="consent" style="margin-top:16px"><input type="checkbox" checked><span>I confirm the information is accurate and I am authorised to submit this application.</span></label>';
 }else{
  body='<span class="ckk">Payment</span><div class="wz-h">Fee and receipt</div>'+
   '<div class="wz-d">'+(s.f?'Pay the published fee to submit. A receipt is issued immediately.':'This service is free of charge — submit to file it.')+'</div>'+
   '<div class="paysum"><span>Amount due</span><b>'+AFN(s.f)+'</b></div>'+
   (s.f?'<div class="pm-methods" style="padding:0;margin-top:14px">'+
    [['Bank transfer','Da Afghanistan Bank · ····3021',1],['Card','Visa ending 4242',0],['Mobile money','HesabPay · +93 7·· ··· ·34',0]].map(function(m){
     return '<label class="pm-opt"><input type="radio" name="wpm"'+(m[2]?' checked':'')+'>'+
      '<span class="mi">'+svg(I.pay)+'</span><span class="mt"><b>'+m[0]+'</b><span>'+m[1]+'</span></span><span class="rk"></span></label>';}).join('')+
    '</div>':'');
 }
 var segs='<div class="wzsegs">'+WSTEPS.map(function(w,n){
  return '<div class="sg '+(n<i?'done':(n===i?'on':''))+'" title="'+w[0]+'"><div class="bar"></div></div>';}).join('')+'</div>';
 var last=i===WSTEPS.length-1;
 var html=pageHead(s.n+'.','Step '+(i+1)+' of 8 · '+WSTEPS[i][1]+' — your answers save automatically as a draft.',
   '<a href="'+withR(ROLE==='investor'?'i-dashboard.html':'b-dashboard.html')+'">Dashboard</a> / <a href="'+withR(ROLE==='investor'?'i-services.html':'b-services.html')+'">Services</a> / <span>'+s.n+'</span>',
   '<button class="pillbtn out sm" data-saveexit>Save &amp; exit</button>')+
  '<div class="n3grid"><div class="n3main">'+segs+body+
   '<div class="wz-acts"><button class="lnk" data-wback'+(i===0?' disabled':'')+'>← Back</button><div class="grow"></div>'+
   '<button class="pillbtn ink" data-wnext>'+(last?(s.f?'Pay '+AFN(s.f)+' &amp; submit':'Submit application'):'Continue →')+'</button></div>'+
  '</div><aside class="n3side"><div class="sumcard"><div class="gl"></div>'+
   '<div class="k">Selected service</div><h3>'+s.n+'</h3>'+
   '<div class="row"><span class="l">Fee</span><span class="v">'+AFN(s.f)+'</span></div>'+
   '<div class="row"><span class="l">Decision time</span><span class="v">'+s.t+'</span></div>'+
   '<div class="row"><span class="l">Category</span><span class="v">'+P.CATS.filter(function(c){return c[0]===s.c;})[0][1]+'</span></div>'+
   '<div class="needs"><div class="nt">What you’ll need</div>'+s.need.map(function(nd){
    return '<div class="ni">'+svg('<path d="M5 12l5 5 9-11"/>')+nd+'</div>';}).join('')+'</div>'+
   '<div class="foot">'+svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>')+'Everything you upload is encrypted and reviewed only by authorised officers.</div>'+
  '</div></aside></div>';
 document.getElementById('wizMount').innerHTML=html;
 bindWiz();
}
function bindWiz(){
 var root=document.getElementById('wizMount');
 root.querySelectorAll('input[name="wsvc"]').forEach(function(r){
  r.addEventListener('change',function(){wizSvc=svcByName(r.value)||wizSvc;renderWiz();});});
 root.querySelectorAll('.drop:not(.filled)').forEach(function(d){
  d.addEventListener('click',function(){d.classList.add('filled');
   d.querySelector('.tx b').textContent=d.getAttribute('data-filed');
   d.querySelector('.tx span').textContent='sample.pdf · 1.2 MB · click to replace';
   d.querySelector('.ic').innerHTML=svg('<path d="M5 12l5 5 9-11"/>');});});
 var b=root.querySelector('[data-wback]');
 if(b)b.addEventListener('click',function(){if(wizStep>0){wizStep--;renderWiz();scrollTop();}});
 var n=root.querySelector('[data-wnext]');
 if(n)n.addEventListener('click',function(){
  if(wizStep<WSTEPS.length-1){wizStep++;renderWiz();scrollTop();}
  else{
   var s=wizSvc;
   openMdl('<button class="x" data-mx>&times;</button><div class="pm-done"><div class="circ">'+svg('<path d="M5 12l5 5 9-11"/>')+'</div>'+
    '<b>Application submitted</b><p>'+s.n+' has been filed. Reference <b>'+newRef()+'</b> — a decision is expected within '+s.t+'.'+
    (s.f?' A receipt for '+AFN(s.f)+' is in your documents.':'')+'</p>'+
    '<a class="pillbtn ink sm" href="'+withR(ROLE==='investor'?'i-requests.html':'b-applications.html')+'">Track it →</a></div>');
  }});
 var se=document.querySelector('[data-saveexit]');
 if(se)se.addEventListener('click',function(){toast('Draft saved','Come back any time from My applications.');
  setTimeout(function(){location.href=withR(ROLE==='investor'?'i-requests.html':'b-applications.html');},700);});
}
function newRef(){return (ROLE==='investor'?'IV':'TL')+'-2026-00'+(4000+Math.floor(wizSvc.n.length*137%900));}
function scrollTop(){var c=document.querySelector('.content');if(c)c.scrollTo({top:0,behavior:'smooth'});}

/* ───────── LICENCES ───────── */
function vLics(){
 var isInv=ROLE==='investor';
 return pageHead(isInv?'My registrations.':'My licences.',
  'Issued records with a public verification code — anyone can confirm they are valid without contacting you.',null,
  '<a class="pillbtn ink" href="'+withR(isInv?'i-services.html':'b-apply.html')+'">+ New application</a>')+
  '<div class="lgrid">'+R.lics.map(function(l,i){
   return '<div class="lcard"><div class="top"><div class="gl"></div><div class="qr">'+qrSvg()+'</div>'+
    '<div class="ty">'+l.type+'</div><h3>'+l.n+'</h3><div class="rf">'+l.no+'</div></div>'+
    '<div class="bd"><div class="strow">'+badge(l.st)+'<span class="hold">'+l.prov+'</span></div>'+
    '<div class="lact">'+l.act+'</div>'+
    '<div class="meter"><div class="mtop"><span>Valid until</span><span>'+l.exp+'</span></div>'+
     '<div class="track"><i style="width:'+l.pct+'%"></i></div>'+
     '<div class="mfoot">Issued '+l.iss+(l.st==='exp'?' · renew soon':'')+'</div></div>'+
    '<div class="lacts"><a class="pillbtn ink sm" href="'+withR((isInv?'i':'b')+'-licence.html?no='+encodeURIComponent(l.no))+'">Digital licence</a>'+
     '<button class="pillbtn out sm" data-lv="'+i+'">Verify</button>'+
     '<button class="lmore" data-lmore="'+i+'" title="More actions">'+svg('<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>')+'</button></div>'+
    '</div></div>';
  }).join('')+
  '<a class="lcard lapply" href="'+withR(isInv?'i-services.html':'b-apply.html')+'"><div class="ic">'+svg('<path d="M12 5v14M5 12h14"/>')+'</div>'+
   '<b>Apply for another</b><span>15 services available online.</span><span class="go">Browse services →</span></a></div>';
}
function bindLics(root){
 root.querySelectorAll('[data-lv]').forEach(function(b){
  b.addEventListener('click',function(){
   var l=R.lics[+b.getAttribute('data-lv')];
   openMdl('<button class="x" data-mx>&times;</button>'+
    '<div class="hd"><span class="ck">'+svg('<path d="M5 12l5 5 9-11"/>')+'</span>'+
    '<div><b>Valid &amp; active</b><span>Confirmed against the live register just now</span></div></div>'+
    '<div class="bd"><div class="rows">'+
     [['Type',l.type],['Holder',l.n],['Reference',l.no],['Issued',l.iss],['Valid until',l.exp],['Province',l.prov]].map(function(r){
      return '<div class="r"><span class="l">'+r[0]+'</span><span class="v">'+r[1]+'</span></div>';}).join('')+
    '</div><div class="qr">'+qrSvg()+'</div></div>'+
    '<div class="note">A valid result means the record exists, is current, and has not been suspended or revoked. Anyone can run this check — no account needed.</div>'+
    '<div class="ft"><button class="pillbtn out sm" data-mx>Close</button>'+
    '<button class="pillbtn ink sm" data-mx data-toast="Verification link copied" data-toast-sub="Share it with a bank or counterparty.">Share verification</button></div>');
  });});
 root.querySelectorAll('[data-lmore]').forEach(function(b){
  b.addEventListener('click',function(){
   var l=R.lics[+b.getAttribute('data-lmore')];
   openMdl('<button class="x" data-mx>&times;</button><div style="padding:24px">'+
    '<b style="font-size:17px;font-weight:600">'+l.n+'</b>'+
    '<p style="font-size:13px;color:var(--mut);margin:5px 0 16px">'+l.no+'</p>'+
    '<div style="display:grid;gap:9px">'+
    '<a class="pillbtn out sm" href="'+withR((ROLE==='investor'?'i':'b')+'-apply.html?svc='+encodeURIComponent('Licence Renewal'))+'">Renew this licence</a>'+
    '<a class="pillbtn out sm" href="'+withR((ROLE==='investor'?'i':'b')+'-apply.html?svc='+encodeURIComponent('Licence Amendment'))+'">Amend details</a>'+
    '<button class="pillbtn out sm" data-mx data-toast="Extract requested" data-toast-sub="A certified extract will appear in Documents within the hour.">Request certified extract</button>'+
    '<button class="pillbtn out sm" data-mx data-toast="Certificate downloaded">Download certificate (PDF)</button>'+
    '</div></div>');
  });});
}
function vLicence(){
 var m=location.search.match(/[?&]no=([^&]+)/),no=m?decodeURIComponent(m[1]):null;
 var l=R.lics[0];R.lics.forEach(function(x){if(x.no===no)l=x;});
 var isInv=ROLE==='investor';
 return pageHead('Digital licence.','This is the issued record. The QR resolves to a public verification page.',
  '<a href="'+withR(isInv?'i-dashboard.html':'b-dashboard.html')+'">Dashboard</a> / <a href="'+withR((isInv?'i':'b')+'-licences.html')+'">Licences</a> / <span>'+l.no+'</span>')+
  '<div class="licpage"><div class="cert"><div class="gl"></div>'+
   '<div class="ch"><div><div class="cm">Islamic Emirate of Afghanistan</div>'+
   '<div class="cmm">Ministry of Industry &amp; Commerce</div></div><div class="cq">'+qrSvg()+'</div></div>'+
   '<div class="cty">'+l.type+'</div><h2>'+l.n+'</h2><div class="cno">'+l.no+'</div>'+
   '<div class="cgrid">'+
    [['Activities',l.act],['Province',l.prov],['Issued',l.iss],['Valid until',l.exp],['Status',P.ST[l.st][1]]].map(function(r){
     return '<div class="cr"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join('')+
   '</div><div class="cft">Verify at investinafghanistan.af/verify · '+l.no+'</div></div>'+
   '<div class="lside">'+
    '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Actions</b><div style="display:grid;gap:9px;margin-top:12px">'+
    '<button class="pillbtn ink sm" data-toast="Certificate downloaded">Download PDF</button>'+
    '<a class="pillbtn out sm" href="'+withR((isInv?'i':'b')+'-apply.html?svc='+encodeURIComponent('Licence Renewal'))+'">Renew</a>'+
    '<a class="pillbtn out sm" href="'+withR((isInv?'i':'b')+'-apply.html?svc='+encodeURIComponent('Licence Amendment'))+'">Amend</a>'+
    '<button class="pillbtn out sm" data-toast="Extract requested" data-toast-sub="Available in Documents within the hour.">Request extract</button>'+
    '<button class="pillbtn out sm" data-toast="Verification link copied">Share verification link</button></div></div>'+
    '<div class="panel panel-p"><b style="font-size:15px">Who can verify this?</b>'+
    '<p style="font-size:13px;color:var(--mut);line-height:1.6;margin-top:8px">Anyone. A bank, a buyer or a customs officer can scan the code or enter the number at the public verification page — no account and no fee.</p>'+
    '<a class="pillbtn out sm" style="width:100%;margin-top:12px" href="'+withR('verify-licence.html')+'">Open the verifier →</a></div>'+
   '</div></div>';
}

/* ───────── DOCUMENTS ───────── */
function vDocs(){
 var cats=['All','Issued','Uploaded','Requested'];
 var pend0=R.docs.filter(function(d){return d[3]==='pend';})[0];
 return pageHead('Documents.','Everything issued to you and everything you have uploaded, in one place.',null,
  '<button class="pillbtn ink" data-upload>+ Upload a document</button>')+
  (pend0?
   '<div class="callout"><span class="ic">'+svg(I.doc)+'</span><div class="bd"><b>1 document requested</b>'+
   '<p>'+pend0[0]+' is needed to continue an open application.</p>'+
   '<button class="pillbtn ink sm" data-upload="'+P.esc(pend0[0])+'">Upload document →</button></div></div>':'')+
  '<div class="filt" id="docFilt">'+cats.map(function(c,i){
   return '<button class="'+(i?'':'on')+'" data-f="'+c+'">'+c+'</button>';}).join('')+'</div>'+
  '<div class="panel"><div class="panel-h"><b>All documents</b><span style="font-size:13px;color:var(--mut)">'+R.docs.length+' files</span></div>'+
  '<div class="applist" id="docList">'+R.docs.map(function(d){
   var kind=d[3]==='pend'?'Requested':(/Issued|Valid|Prepared|Registered|Shortlisted/.test(d[1])?'Issued':'Uploaded');
   return '<div class="r doc" data-k="'+kind+'"><div><div class="nm">'+d[0]+'</div><div class="mt">'+d[1]+'</div></div>'+
    '<span class="ref">'+d[2]+'</span>'+badge(d[3])+
    (d[3]==='pend'
      ?'<button class="chev" data-upload="'+P.esc(d[0])+'">'+svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>')+'</button>'
      :'<a class="chev" href="#" data-toast="Opening document">'+svg('<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>')+'</a>')+'</div>';
  }).join('')+'</div></div>';
}

/* ───────── PAYMENTS ───────── */
function vPay(){
 var p=R.pay;
 return pageHead('Fees &amp; payments.','Every fee is published up front — no surprise charges. Here is what you have paid and anything outstanding.')+
  '<div class="paytop">'+
   '<div class="balcard'+(p.due?' due':'')+'"><div class="gl"></div><div class="lab">Outstanding balance</div>'+
   '<div class="amt">'+p.out+'</div><div class="st">'+p.outLab+'</div>'+
   (p.due?'<button class="pillbtn lime paybtn" data-payall>Pay now →</button>':'')+'</div>'+
   '<div class="paycard tp"><div class="ic">'+svg('<path d="M20 6L9 17l-5-5"/>')+'</div>'+
   '<div class="big">'+p.paid+'</div><div class="lab">Paid this year</div><div class="sub">'+p.paidN+'</div></div>'+
   '<div class="paycard nf"><div class="ic">'+svg(I.cal)+'</div>'+
   '<div class="fname">'+p.next.n+'</div><div class="fnote">'+p.next.note+'</div><span class="famt">'+p.next.a+'</span></div>'+
  '</div>'+
  '<div class="pcols"><div class="panel"><div class="panel-h"><b>Payment history</b>'+
   '<a href="#" data-toast="Statement exported">Export</a></div>'+
   '<div style="overflow-x:auto"><table class="ptbl"><thead><tr><th>Item</th><th class="hidesm">Reference</th>'+
   '<th class="hidesm">Date</th><th>Amount</th><th>Status</th><th></th></tr></thead><tbody id="payBody">'+
   p.hist.map(payRow).join('')+'</tbody></table></div></div>'+
   '<div class="panel panel-p"><b style="font-size:15px">Payment methods</b><div style="margin-top:6px">'+
    [['Bank transfer','Da Afghanistan Bank · ····3021',1],['Card','Visa ending 4242',0],['Mobile money','HesabPay · +93 7·· ··· ·34',0]].map(function(m){
     return '<div class="pmeth"><span class="mi">'+svg(I.pay)+'</span><div class="mt"><b>'+m[0]+'</b><span>'+m[1]+'</span></div>'+
      (m[2]?'<span class="mdef">Default</span>':'<a class="lk" href="#" data-managepm="'+P.esc(m[0])+'|'+P.esc(m[1])+'">Manage</a>')+'</div>';}).join('')+
    '<button class="pmeth add" data-addpm><span class="mi">'+
    svg('<path d="M12 5v14M5 12h14"/>')+'</span><b>Add a payment method</b></button></div></div></div>';
}
function payRow(h,i){
 var due=h.st==='due';
 return '<tr'+(due?' class="due"':'')+' data-row="'+i+'">'+
  '<td><div class="pf"><span class="pfi'+(due?' warn':'')+'">'+
   svg(due?'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>':I.pay)+'</span>'+
   '<span class="pnm">'+h.i+'</span></div></td>'+
  '<td class="hidesm ref">'+h.r+'</td><td class="hidesm dt">'+h.d+'</td>'+
  '<td class="amt">'+h.a+'</td><td>'+badge(h.st)+'</td>'+
  '<td class="ta">'+(due?'<button class="lk" data-pay="'+i+'">Pay now</button>':
   '<button class="lk" data-toast="Receipt downloaded">Receipt</button>')+'</td></tr>';
}
function bindPay(root){
 var p=R.pay,body=root.querySelector('#payBody');if(!body)return;
 function openPay(i){
  var h=p.hist[i];
  openMdl('<button class="x" data-mx>&times;</button><div class="pm-wrap">'+
   '<div class="pm-hd"><b>Pay a fee</b><span>'+h.i+' · '+h.r+'</span></div>'+
   '<div class="pm-amt"><span>Amount due</span><b>'+h.a+'</b></div>'+
   '<div class="pm-mk">Pay with</div><div class="pm-methods">'+
   [['Bank transfer','Da Afghanistan Bank · ····3021',1],['Card','Visa ending 4242',0],['Mobile money','HesabPay · +93 7·· ··· ·34',0]].map(function(m){
    return '<label class="pm-opt"><input type="radio" name="pmeth"'+(m[2]?' checked':'')+'>'+
     '<span class="mi">'+svg(I.pay)+'</span><span class="mt"><b>'+m[0]+'</b><span>'+m[1]+'</span></span><span class="rk"></span></label>';}).join('')+
   '</div><div class="pm-ft"><button class="pillbtn out sm" data-mx>Cancel</button>'+
   '<button class="pillbtn ink sm" data-pdo>Pay '+h.a+'</button></div></div>','paymodal');
  var pd=document.querySelector('[data-pdo]');
  pd.addEventListener('click',function(){
   pd.disabled=true;pd.textContent='Processing…';
   setTimeout(function(){
    h.st='paid';h.d='Just now';
    body.querySelector('[data-row="'+i+'"]').outerHTML=payRow(h,i);wire();
    var bc=root.querySelector('.balcard');
    if(bc){bc.classList.remove('due');bc.querySelector('.amt').textContent='AFN 0';
     bc.querySelector('.st').textContent='All fees settled · nothing due';
     var pb=bc.querySelector('.paybtn');if(pb)pb.remove();}
    openMdl('<div class="pm-done" style="padding:34px 26px 28px"><div class="circ">'+svg('<path d="M5 12l5 5 9-11"/>')+'</div>'+
     '<b>Payment received</b><p>'+h.a+' paid for '+h.i+'. A receipt is now in your documents.</p>'+
     '<button class="pillbtn ink sm" data-mx>Done</button></div>','paymodal');
   },1100);
  });
 }
 function wire(){
  body.querySelectorAll('[data-pay]').forEach(function(b){
   b.addEventListener('click',function(){openPay(+b.getAttribute('data-pay'));});});
 }
 wire();
 var pa=root.querySelector('[data-payall]');
 if(pa)pa.addEventListener('click',function(){var di=-1;p.hist.forEach(function(h,i){if(h.st==='due')di=i;});if(di>=0)openPay(di);});
 root.querySelectorAll('[data-managepm]').forEach(function(b){
  b.addEventListener('click',function(e){e.preventDefault();openManagePm(b.getAttribute('data-managepm'));});});
 var addb=root.querySelector('[data-addpm]');
 if(addb)addb.addEventListener('click',function(){openAddPm();});
}
function openManagePm(v){
 var parts=(v||'').split('|'),nm=parts[0]||'Payment method',det=parts[1]||'';
 openMdl('<button class="x" data-mx>&times;</button><div style="padding:24px">'+
  '<b style="font-size:17px;font-weight:600">'+nm+'</b>'+
  '<p style="font-size:13px;color:var(--mut);margin:5px 0 16px">'+det+'</p>'+
  '<div style="display:grid;gap:9px">'+
  '<button class="pillbtn out sm" data-mx data-toast="Set as default" data-toast-sub="'+nm+' is now your default method.">Set as default</button>'+
  '<button class="pillbtn out sm" data-mx data-toast="Details updated" data-toast-sub="Mock in this prototype.">Edit details</button>'+
  '<button class="pillbtn out sm" data-mx data-toast="Payment method removed">Remove this method</button>'+
  '</div></div>');
}
function openAddPm(){
 openMdl('<button class="x" data-mx>&times;</button><div style="padding:24px">'+
  '<b style="font-size:17px;font-weight:600">Add a payment method</b>'+
  '<p style="font-size:13px;color:var(--mut);margin:5px 0 16px">Choose a type to add to your account.</p>'+
  '<div class="pm-methods">'+
   [['Bank transfer','Da Afghanistan Bank account'],['Card','Visa or Mastercard'],['Mobile money','HesabPay, MyMoney']].map(function(m,i){
    return '<label class="pm-opt"><input type="radio" name="addpm"'+(i===0?' checked':'')+'>'+
     '<span class="mi">'+svg(I.pay)+'</span><span class="mt"><b>'+m[0]+'</b><span>'+m[1]+'</span></span><span class="rk"></span></label>';}).join('')+
  '</div><div style="display:flex;gap:9px;margin-top:16px"><button class="pillbtn out sm" data-mx style="flex:1">Cancel</button>'+
  '<button class="pillbtn ink sm" data-mx data-toast="Payment method added" data-toast-sub="You can now use it to pay fees." style="flex:1">Add method</button></div></div>');
}

/* ───────── MESSAGES ───────── */
function vMsg(){
 var t=R.thread;
 return pageHead('Messages.','Direct line to the desk handling your file. Replies within one working day.')+
  '<div class="msgrid"><div class="panel"><div class="panel-h"><b>'+t.title+'</b>'+badge(t.st)+'</div>'+
   '<div class="panel-p"><div class="chat" id="chat">'+t.msgs.map(msgBubble).join('')+'</div>'+
   '<div class="chatin"><input id="msgin" placeholder="Write a reply…">'+
   '<button class="pillbtn ink sm" data-send>Send</button></div></div></div>'+
   '<div class="panel"><div class="panel-h"><b>Other threads</b></div><div class="applist">'+
    t.others.map(function(o){
     return '<a class="r" href="#" data-toast="Thread opened" data-toast-sub="Demo — full thread in the next build."><div>'+
      '<div class="nm">'+o[0]+'</div><div class="mt">'+o[1]+'</div></div><span class="ref">'+o[2]+'</span>'+
      '<span class="chev">'+svg('<path d="M9 6l6 6-6 6"/>')+'</span></a>';}).join('')+
   '</div></div></div>';
}
function msgBubble(m){
 var me=m[0]==='me',sys=m[0]==='sys';
 if(sys)return '<div class="sysmsg">'+m[2]+' · '+m[3]+'</div>';
 return '<div class="bub'+(me?' me':'')+'"><b>'+m[1]+'</b><span>'+m[2]+'</span><time>'+m[3]+'</time></div>';
}
function bindMsg(root){
 var inp=root.querySelector('#msgin'),chat=root.querySelector('#chat');
 var send=root.querySelector('[data-send]');
 function doSend(){
  var v=(inp.value||'').trim();if(!v)return;
  chat.insertAdjacentHTML('beforeend',msgBubble(['me','You',P.esc(v),'Just now']));
  inp.value='';chat.scrollTop=chat.scrollHeight;
  setTimeout(function(){
   chat.insertAdjacentHTML('beforeend','<div class="sysmsg">Delivered · the desk usually replies within one working day.</div>');
   chat.scrollTop=chat.scrollHeight;},600);
 }
 if(send)send.addEventListener('click',doSend);
 if(inp)inp.addEventListener('keydown',function(e){if(e.key==='Enter')doSend();});
}

/* ───────── NOTIFICATIONS ───────── */
function vNotifs(){
 return pageHead('Notifications.','Status changes, requests and reminders across your applications and records.',null,
  '<button class="pillbtn out sm" id="markAll">Mark all as read</button>')+
  '<div class="panel" id="notifWrap"></div>';
}
function bindNotifs(root){
 function draw(){
  var groups={},order=[];
  R.notifs.forEach(function(n){if(!groups[n.g]){groups[n.g]=[];order.push(n.g);}groups[n.g].push(n);});
  root.querySelector('#notifWrap').innerHTML=order.map(function(g){
   return '<div class="ndate">'+g+'</div><div class="nlist">'+groups[g].map(function(n){
    var ic=n.c==='ok'?'<path d="M5 12l5 5 9-11"/>':(n.c==='warn'?'<path d="M12 8v5M12 16h.01"/><circle cx="12" cy="12" r="9"/>':'<circle cx="12" cy="12" r="4"/>');
    return '<div class="n '+n.c+(n.u?' unread':'')+'"><span class="ic">'+svg(ic)+'</span>'+
     '<div class="bd"><b>'+n.t+'</b><p>'+n.s+'</p></div><span class="tm">'+n.tm+'</span>'+(n.u?'<span class="u"></span>':'')+'</div>';
   }).join('')+'</div>';}).join('');
 }
 draw();
 var m=root.querySelector('#markAll');
 if(m)m.addEventListener('click',function(){R.notifs.forEach(function(n){n.u=false;});draw();
  var b=document.querySelector('.side a.nav[href*="notifications"] .badge');if(b)b.remove();
  toast('All notifications marked as read');});
}

/* ───────── PROFILE ───────── */
function vProfile(){
 var u=R.user,isInv=ROLE==='investor';
 var left='<div class="panel" style="margin-bottom:16px"><div class="panel-h"><b>Account holder</b>'+
  '<span class="pill ok">'+u.level.split('—')[0].trim()+' verified</span></div><div class="panel-p"><div class="af">'+
  '<div class="fld row2"><div><label>First name</label><div class="ip"><input value="'+u.person.split(' ')[0]+'"></div></div>'+
  '<div><label>Family name</label><div class="ip"><input value="'+u.person.split(' ').slice(1).join(' ')+'"></div></div></div>'+
  '<div class="fld"><label>Email</label><div class="ip"><input value="'+u.email+'"></div></div>'+
  '<div class="fld"><label>Mobile</label><div class="ip"><input value="'+u.phone+'"></div></div>'+
  '<div class="fld"><label>Preferred language</label><div class="ip"><select><option>English</option><option>دری</option><option>پښتو</option></select></div></div>'+
  '<button class="pillbtn ink" data-toast="Saved" data-toast-sub="Your profile has been updated.">Save changes</button></div></div></div>';

 if(isInv){
  left+='<div class="panel"><div class="panel-h"><b>Your investment mandate</b>'+
   '<a href="#" data-toast="Mandate updated" data-toast-sub="Your officer has been notified.">Edit</a></div><div class="panel-p">'+
   '<div class="rev" style="border:0">'+R.mandate.map(function(r){
    return '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">'+r[0]+'</span><span class="val">'+r[1]+'</span></div>';}).join('')+
   '</div></div></div>';
 }else{
  left+='<div class="panel"><div class="panel-h"><b>Companies you act for</b>'+
   '<a href="#" data-toast="Request sent" data-toast-sub="An authorisation request went to the company owner.">+ Add a company</a></div>'+
   '<div class="applist">'+R.lics.map(function(l){
    return '<a class="r" href="'+withR('b-licences.html')+'"><div><div class="nm">'+l.n+'</div><div class="mt">'+l.no+'</div></div>'+
     '<span class="ref">'+l.prov+'</span><span class="pill act">Authorised signatory</span>'+
     '<span class="chev">'+svg('<path d="M9 6l6 6-6 6"/>')+'</span></a>';}).join('')+'</div></div>';
 }

 var right='<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Verification</b>'+
  '<div class="rev" style="margin-top:12px;border:0">'+
  [['Identity',isInv?'Passport · verified':'Tazkira · verified'],['Level',u.level],['Verified on',u.verified],['Next review','Not required']].map(function(r){
   return '<div class="r" style="padding-left:0;padding-right:0"><span class="lab">'+r[0]+'</span><span class="val">'+r[1]+'</span></div>';}).join('')+
  '</div></div>'+
  (isInv?'<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Your officer</b>'+
   '<div style="display:flex;gap:12px;align-items:center;margin-top:12px"><span class="offav sm">'+R.officer.ini+'</span>'+
   '<div><b style="font-size:14px">'+R.officer.n+'</b><div style="font-size:12.5px;color:var(--mut)">'+R.officer.t+'</div></div></div>'+
   '<a class="pillbtn out sm" style="width:100%;margin-top:12px" href="'+withR('i-messages.html')+'">Message →</a></div>':'')+
  '<div class="panel panel-p" style="margin-bottom:16px"><b style="font-size:15px">Notifications</b><div style="margin-top:10px">'+
   [['Status changes on my applications',1],['Documents requested',1],['Payment receipts',1],
    ['Renewal reminders — 60 and 30 days',1],[isInv?'New matching opportunities':'New services and schemes',isInv?1:0]].map(function(n){
    return '<div class="setrow"><div class="tx"><b>'+n[0]+'</b></div><button class="sw'+(n[1]?' on':'')+'" data-sw></button></div>';}).join('')+
  '</div></div>'+
  '<div class="panel panel-p"><b style="font-size:15px">Security</b><div style="margin-top:12px;display:grid;gap:9px">'+
  '<a class="pillbtn out sm" href="reset.html">Change password</a>'+
  '<button class="pillbtn out sm" data-toast="Trusted devices">Manage trusted devices</button>'+
  '<a class="pillbtn out sm" href="login.html">Sign out everywhere</a></div></div>';

 return pageHead('Profile.','Your verified identity, '+(isInv?'your mandate':'the companies you can act for')+', and how you get notified.')+
  '<div class="det"><div>'+left+'</div><div>'+right+'</div></div>';
}


/* ───────── PUBLIC VERIFIER ───────── */
function vVerify(){
 var l=R.lics[0];
 return pageHead('Verify a licence.','Enter any Ministry reference to confirm it is genuine and current. Banks, buyers and partners can use this too — no account needed.')+
  '<div class="vwrap"><div class="vbar"><input id="vin" value="'+l.no+'" aria-label="Reference number">'+
   '<button class="pillbtn ink" id="vgo">Verify</button></div>'+
   '<div class="vres" id="vres"><div class="hd"><span class="ck">'+svg('<path d="M5 12l5 5 9-11"/>')+'</span>'+
   '<div><b>Valid &amp; active</b><span>Confirmed against the live register just now</span></div></div>'+
   '<div class="bd"><div class="rows">'+
    [['Type',l.type],['Holder',l.n],['Reference',l.no],['Issued',l.iss],['Valid until',l.exp],['Province',l.prov]].map(function(r){
     return '<div class="r"><span class="l">'+r[0]+'</span><span class="v">'+r[1]+'</span></div>';}).join('')+
   '</div><div class="qr">'+qrSvg()+'</div></div>'+
   '<div class="note">A valid result means the record exists, is current, and has not been suspended or revoked.</div>'+
   '<div class="ft"><button class="pillbtn out sm" data-toast="Verification link copied">Share this result</button>'+
   '<button class="pillbtn ink sm" data-toast="Certificate downloaded">Download certificate</button></div></div>'+
   '<p style="font-size:12.5px;color:var(--mut);margin-top:16px;line-height:1.5">Verification checks the record against the Ministry register in real time.</p></div>';
}
function bindVerify(root){
 var go=root.querySelector('#vgo'),res=root.querySelector('#vres');
 if(go)go.addEventListener('click',function(){
  res.style.transition='none';res.style.opacity='0';res.style.transform='translateY(8px)';
  requestAnimationFrame(function(){res.style.transition='.4s var(--easeO)';res.style.opacity='1';res.style.transform='none';});
  toast('Record verified','Checked against the live register.');});
}

/* ───────── router ───────── */
var VIEWS={
 dashboard:vDash, applications:vApps, application:vAppDetail, services:vServices, apply:vApply,
 licences:vLics, licence:vLicence, documents:vDocs, payments:vPay, messages:vMsg,
 profile:vProfile, notifications:vNotifs, opportunities:vOpps, shortlist:vShortlist,
 requests:vApps, request:vAppDetail, verify:vVerify
};

document.addEventListener('DOMContentLoaded',function(){
 var content=document.querySelector('main.content[data-view]');
 if(!content)return;
 var view=content.getAttribute('data-view');
 var page=content.getAttribute('data-page')||'';
 buildShell(content,page);
 var f=VIEWS[view];
 content.innerHTML=f?f():'<div class="panel panel-p">Coming soon.</div>';

 // generic bindings
 content.querySelectorAll('.drop:not(.filled)').forEach(function(d){
  d.addEventListener('click',function(){d.classList.add('filled');
   var b=d.querySelector('.tx b'),s=d.querySelector('.tx span');
   if(b)b.textContent=d.getAttribute('data-filed')||'Uploaded';
   if(s)s.textContent='sample.pdf · 1.2 MB · click to replace';
   d.querySelector('.ic').innerHTML=svg('<path d="M5 12l5 5 9-11"/>');});});
 content.querySelectorAll('[data-sw]').forEach(function(s){
  s.addEventListener('click',function(){s.classList.toggle('on');toast('Preference updated');});});

 // list filters
 var af=content.querySelector('#appFilt'),al=content.querySelector('#appList');
 if(af&&al)af.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
  af.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
  var f=b.getAttribute('data-f');
  al.querySelectorAll('.r').forEach(function(r){r.style.display=(f==='all'||r.getAttribute('data-s')===f)?'':'none';});});});
 var df=content.querySelector('#docFilt'),dl=content.querySelector('#docList');
 if(df&&dl)df.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
  df.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
  var f=b.getAttribute('data-f');
  dl.querySelectorAll('.r').forEach(function(r){r.style.display=(f==='All'||r.getAttribute('data-k')===f)?'':'none';});});});
 var of_=content.querySelector('#oppFilt'),og=content.querySelector('#oppGrid');
 if(of_&&og)of_.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){
  of_.querySelectorAll('button').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
  var f=b.getAttribute('data-f');
  og.innerHTML=P.OPPS.filter(function(o){return f==='All sectors'||o.s===f;}).map(oppCard).join('');
  bindOpps(og);});});

 // services catalogue
 var cl=content.querySelector('#catl'),sg=content.querySelector('#svgrid');
 if(cl&&sg){cl.querySelectorAll('.catb').forEach(function(b){b.addEventListener('click',function(){
  cl.querySelectorAll('.catb').forEach(function(x){x.classList.remove('on');});b.classList.add('on');
  sg.innerHTML=svCards(b.getAttribute('data-f'));bindSvc(content);});});
  bindSvc(content);
  var g=content.querySelector('[data-guide]');if(g)g.addEventListener('click',guideMdl);}

 if(view==='apply'){wizStep=0;renderWiz();}
 if(view==='licences')bindLics(content);
 if(view==='payments')bindPay(content);
 if(view==='messages')bindMsg(content);
 if(view==='notifications')bindNotifs(content);
 if(view==='opportunities'||view==='shortlist'||view==='dashboard')bindOpps(content);
 if(view==='application'||view==='request')bindDetail(content);
 if(view==='verify')bindVerify(content);
});

function bindSvc(root){
 root.querySelectorAll('[data-svc]').forEach(function(el){
  el.addEventListener('click',function(){
   location.href=withR((ROLE==='investor'?'i':'b')+'-apply.html')+'&svc='+encodeURIComponent(el.getAttribute('data-svc'));});});
}
function bindDetail(root){
 var a=findApp();
 var mb=root.querySelector('[data-msg]');
 if(mb)mb.addEventListener('click',function(){
  openMdl('<button class="x" data-mx>&times;</button><div style="padding:24px">'+
   '<b style="font-size:18px;font-weight:600">Message the officer</b>'+
   '<p style="font-size:13px;color:var(--mut);margin:6px 0 14px">About '+a.ref+' · '+a.officer+'</p>'+
   '<textarea rows="4" placeholder="Type your message…" style="width:100%;border:1px solid var(--line);border-radius:12px;padding:12px 14px;font-family:inherit;font-size:14px;resize:vertical;outline:0"></textarea>'+
   '<div style="display:flex;gap:9px;margin-top:14px"><button class="pillbtn out sm" data-mx style="flex:1">Cancel</button>'+
   '<button class="pillbtn ink sm" data-mx data-toast="Message sent to '+a.officer+'" style="flex:1">Send message</button></div></div>');});
 var wd=root.querySelector('[data-wd]');
 if(wd)wd.addEventListener('click',function(){
  openMdl('<button class="x" data-mx>&times;</button><div style="padding:24px">'+
   '<b style="font-size:18px;font-weight:600">Withdraw this application?</b>'+
   '<p style="font-size:13.5px;color:var(--mut);line-height:1.6;margin:8px 0 16px">'+a.ref+' will be closed. Any fee already paid is not refunded. You can file again at any time.</p>'+
   '<div style="display:flex;gap:9px"><button class="pillbtn out sm" data-mx style="flex:1">Keep it open</button>'+
   '<button class="pillbtn ink sm" data-mx data-toast="Withdrawal submitted" style="flex:1">Withdraw</button></div></div>');});
}
})();
