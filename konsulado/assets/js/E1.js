(function(){
"use strict";
var I=window.KI, EV=window.KEVENTS, ACTS=window.KACTS, FEED=window.KFEED, SLA=window.KSLA;

var NAV=[
  ["Overview",[["home","Home",I.home,""],["ready","My readiness",I.shield,""]]],
  ["Consular services",[
     ["all","All services",I.grid,(window.KCAT?window.KCAT.reduce(function(n,c){return n+c.s.length;},0):0)+"q"],
     ["sos","Emergency help",I.warn,""]]],
  ["My workspace",[["apps","Applications",I.grid,"2"],["docs","Documents",I.cert,"6q"],
     ["book","Appointments",I.cal,""],["ask","Ask Konsulado",I.chat||I.people,""],
     ["sup","Support",I.life||I.people,"1"],["pay","Payments",I.card||I.coin,""]]],
  ["Account",[["fam","Family profiles",I.people,"3q"],["me","Profile & security",I.shield,""],
     ["set","Settings",I.cog||I.grid,""]]]
];
var cur="home";
var A=I.arr.replace("<svg",'<svg class="k-arr"');

/* --- the horizon scale: the near term earns more room than next year --- */
/* the greeting shows the real date — a prototype dated last week is the
   first thing a stakeholder notices */
function today(){
  var d=new Date();
  var DW=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var MO=["January","February","March","April","May","June","July","August","September","October","November","December"];
  return DW[d.getDay()]+" "+d.getDate()+" "+MO[d.getMonth()]+" "+d.getFullYear();
}
function pos(d){ return d<=60 ? (d/60)*62 : 62 + ((d-60)/305)*36; }

function ribbon(){
  var ticks=[[30,"1 month"],[60,"2 months"],[182,"6 months"],[365,"1 year"]];
  function at(p){ return "calc(46px + (100% - 92px) * "+(p/100).toFixed(4)+")"; }
  var bands="";
  [[0,30],[60,182]].forEach(function(b){
    bands+='<span class="hz-month" style="left:'+at(pos(b[0]))+';width:calc('+at(pos(b[1]))+' - '+at(pos(b[0]))+')"></span>';
  });
  /* stacking only ever happens upward, so the ribbon keeps one predictable height */
  /* The day count is derived, so sort on the derived value; and pack the
     flags into lanes rather than into two fixed rows. Five events inside a
     forty-day window collided into one stack when this only had up/down. */
  var MIN=19, stacked=false;
  var LANES=[["up",0],["dn",0],["up",1],["dn",1]];
  var last=LANES.map(function(){ return -999; });
  var evs=EV.map(function(e){ var o={}; for(var k in e) o[k]=e[k];
                              o._d=e.on?window.KDAYS(e.on):e.d; return o; })
            .sort(function(a,b){ return a._d-b._d; });
  var flags=evs.map(function(e){
    var p=pos(e._d), li=0;
    for(var j=0;j<LANES.length;j++){ if(p-last[j]>=MIN){ li=j; break; } li=LANES.length-1; }
    last[li]=p;
    var side=LANES[li][0], row=LANES[li][1];
    if(row) stacked=true;
    var flag='<span class="flag"><span class="fi">'+I[e.k]+'</span>'+
             '<span class="fx"><b>'+e.t+'</b><time>'+e.date+'</time></span></span>';
    var inner = side==="up"
      ? flag+'<span class="stem"></span><span class="dot"></span>'
      : '<span class="dot"></span><span class="stem"></span>'+flag;
    return '<button class="ev '+side+' r'+row+' '+e.s+'" style="left:'+at(p)+'" data-tip="'+e.t+'|'+e.note+'">'+inner+'</button>';
  }).join("");
  return '<section class="hz"><div class="hz-h"><h3>Your next twelve months</h3>'+
    '<span class="hint">Everything with a date on it. Hover a card for detail.</span></div>'+
    '<div class="hz-scroll"><div class="hz-track'+(stacked?" r1":"")+'">'+bands+
      '<span class="hz-band" style="left:46px;width:calc('+at(pos(41))+' - 46px)"></span>'+
      '<span class="hz-axis"></span>'+
      ticks.map(function(t){return '<span class="hz-tick" style="left:'+at(pos(t[0]))+'"><i></i><span>'+t[1]+'</span></span>';}).join("")+
      '<span class="hz-now" style="left:'+at(0)+'"></span>'+flags+
    '</div></div>'+
    '<div class="hz-legend">'+
      '<span><i style="background:var(--bad)"></i>Expires or needs you</span>'+
      '<span><i style="background:var(--ok)"></i>Arriving</span>'+
      '<span><i style="background:var(--blue)"></i>In progress</span>'+
      '<span><i style="background:var(--gold-fill)"></i>Expiring later</span>'+
      '<span><i style="background:var(--ink-4)"></i>For information</span>'+
    '</div></section>';
}

function annrow(){
  var A2=[
    {k:"urgent",ic:I.warn,kk:"Needs you",t:"Your CENOMAR expires 5 October",
     p:window.KDAYS("2026-10-05")+" days, and before your wedding. Ordering today leaves "+
       Math.max(0,window.KDAYS("2026-10-05")-23)+" days of margin.",go:"Order a replacement",to:"all"},
    {k:"notice",ic:I.cal,kk:"Closed on Monday",t:"The post is shut for National Heroes' Day",
     p:"Monday 31 August. Anything you file online that day is picked up first thing on Tuesday.",go:"See the calendar",to:"book"},
    {k:"good",ic:I.tickc,kk:"New this month",t:"Powers of attorney, signed in a supervised session",
     p:"A twelve-minute video call with a consular officer, then digital issuance. No counter, same day.",go:"Sign one now",to:"soon"}
  ];
  return '<div class="annrow">'+A2.map(function(a){
    return '<button class="ann '+a.k+'" data-go="'+a.to+'">'+
      '<span class="annt"><span class="ic">'+a.ic+'</span><span class="kk">'+a.kk+'</span></span>'+
      '<b>'+a.t+'</b><p>'+a.p+'</p>'+
      '<span class="go2">'+a.go+A+'</span></button>';
  }).join("")+'</div>';
}

function apptWidget(){
  return '<section class="apw"><div class="apw-h"><b>Next appointment</b>'+
    '<span class="k-chip mute">Optional</span></div>'+
    '<div class="apw-b">'+
      '<div class="apw-date"><div class="apw-cal"><div class="m">Oct</div>'+
        '<div class="d"><b>23</b><small>Friday</small></div></div>'+
        '<div class="apw-w"><b>Outreach mission · Sharjah</b>'+
        '<small>Al Majaz Hall, walk in any time between 08:00 and 17:00.</small></div></div>'+
      '<div class="apw-facts">'+
        '<div>'+I.tickc+'<span>No slot to book and none to miss</span></div>'+
        '<div>'+I.tickc+'<span>Bring nothing — we hold your record</span></div>'+
        '<div>'+I.tickc+'<span>Covers all four in one session</span></div>'+
      '</div>'+
    '</div>'+
    '<div class="apw-f"><button class="k-btn" data-go="book">Book an appointment'+A+'</button>'+
      '<button class="alt" data-go="book">Or talk to an officer by video</button></div>'+
  '</section>';
}

function one(){
  return '<section class="one"><div class="lead"><span class="art"></span>'+
    '<div><p class="kick">The service most people come for</p>'+
      '<h2>Renew your passport without coming in.</h2>'+
      '<p class="lede">Nothing to photocopy, no appointment, and it is couriered to your door.</p>'+
      '<div class="specs">'+
        '<span class="sp"><b>6 min</b><em>on this device</em></span>'+
        '<span class="sp"><b>AED 240</b><em>the published fee</em></span>'+
        '<span class="sp"><b>No visit</b><em>couriered to you</em></span>'+
      '</div>'+
      '<p class="warrant">'+I.shield+'<span><b>Already the law.</b> RA 11983 gives you renewal from abroad without appearing in person.</span></p>'+
      '</div>'+
    '<div class="cta"><button class="k-btn gold" data-go="renew">Start the renewal'+A+'</button></div>'+
  '</div></section>';
}

/* the four numbers are counted from the same data the pages behind them
   show, so the dashboard cannot drift out of step with them */
function facts(){
  var apps=window.KAPPS||[], vault=window.KVAULT||[];
  var live=apps.filter(function(a){return a.state==="live";});
  var need=apps.filter(function(a){return a.chip[0]==="warn";});
  var soon=vault.filter(function(d){return d.state==="bad"||d.state==="warn";});
  var F1=[
    ["bad", I.warn,  "Waiting on you", String(need.length||0), "",
      need.length?"A clearer photograph, Report of Birth":"Nothing at all","apps"],
    ["info",I.clock, "With this post", String(Math.max(0,live.length-need.length)), "",
      "Nothing for you to do on it","apps"],
    ["ok",  I.truck, "Next delivery", String(Math.max(1,Math.round(window.KDAYS("2026-10-09")/7))),"weeks",
      "Passport renewal, 9\u201323 October","app1"],
    ["warn",I.cert,  "Documents held", String(vault.length||0), "",
      soon.length+" expire within six months","docs"]
  ];
  return '<div class="facts">'+F1.map(function(f){
    return '<button class="fact '+f[0]+'" data-go="'+(f[6]||"apps")+'"><span class="lbl">'+f[1]+f[2]+'</span>'+
      '<span class="v"><b>'+f[3]+'</b>'+(f[4]?'<span>'+f[4]+'</span>':'')+'</span>'+
      '<p>'+f[5]+'</p></button>';
  }).join("")+'</div>';
}

/* the dashboard reads the same applications the Applications page does —
   two sources of truth is how a demo contradicts itself in the room */
function liveapps(){
  var src=(window.KAPPS||[]).filter(function(a){return a.state==="live";}).map(function(a){
    var at=0; a.steps.forEach(function(st,i){ if(st[1]!=="wait") at=i; });
    return {s:a.chip[0]==="warn"?"warn":"info", k:a.ic, t:a.svc, r:a.ref,
      lab:a.chip[0]==="warn"?"Needs you":"Expected",
      d:a.chip[0]==="warn"?"held "+window.KDAYS_SINCE("2026-08-23")+" days":a.next.when.replace(/^Expected /,""),
      stage:at, go:"ap"+a.id,
      steps:a.short||a.steps.map(function(st){return st[0].split(" ")[0];}),
      nx:"<b>"+(a.chip[0]==="warn"?"Needs you:":"Next:")+"</b> "+a.next.t.charAt(0).toLowerCase()+a.next.t.slice(1)};
  });
  return '<section class="card"><div class="card-h"><h3>Active applications</h3>'+
    '<a data-go="apps">All applications</a></div><div class="card-b"><div class="apl">'+
    src.map(function(a){
      return '<div class="ap '+a.s+'"><div class="ap-h"><span class="ic">'+I[a.k]+'</span>'+
        '<span><b>'+a.t+'</b><small>'+a.r+'</small></span>'+
        '<span class="rt"><em>'+a.lab+'</em><b>'+a.d+'</b></span></div>'+
        '<div class="ap-steps">'+a.steps.map(function(st,x){
          var c=x<a.stage?"done":(x===a.stage?"now":"");
          return '<span class="s '+c+'"><span class="d">'+I.tick+'</span><small>'+st+'</small></span>';
        }).join("")+'</div>'+
        '<div class="ap-nx"><span>'+a.nx+'</span>'+
        '<button class="lnk2" data-go="'+(a.go||"apps")+'">Open'+A+'</button></div></div>';
    }).join("")+'</div></div></section>';
}

var TIERW={proved:"Proved",given:"Given by you",issued:"Issued by this post"};
var DLI='<svg viewBox="0 0 24 24" fill="none"><path d="M12 3.5v12M7.5 11.5l4.5 4.5 4.5-4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 19.5h15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
function library(){
  var src=(window.KVAULT||[]).map(function(d){
    /* the vault has THREE tiers and this card had two, so the passport —
       read off its data page and matched to a live face — was labelled
       "Given by you" here and "Proved" one click away. One map, one set of
       words, and the dashboard now says the same thing as the vault. */
    return {t:d.n,f:d.kind==="issued"?"PDF":"IMG",lk:TIERW[d.kind]||TIERW.given,
            d:d.ex,z:d.flag,go:"dc"+d.id,ic:d.ic};
  });
  return '<section class="card"><div class="card-h"><h3>Your documents</h3>'+
    '<a data-go="docs">Open the vault</a></div><div class="card-b">'+
    '<div class="libbar"><button class="on" data-vt="all">All</button>'+
    '<button data-vt="proved">Proved</button>'+
    '<button data-vt="issued">Issued by this post</button>'+
    '<button data-vt="given">Given by you</button><span class="n2">'+src.length+' documents · nothing on your phone</span></div>'+
    '<div class="dlist">'+src.map(function(f){
      return '<button class="dr2" data-go="'+(f.go||"docs")+'">'+
        '<span class="th2">'+(I[f.ic]||I.cert)+'<em>'+f.f+'</em></span>'+
        '<span><b>'+f.t+'</b><small>'+f.d+'</small></span>'+
        '<span class="lk">'+f.lk+'</span>'+
        '<span class="sz">'+f.z+'</span>'+
        '<span class="dl3">'+DLI+'</span></button>';
    }).join("")+'</div>'+
    '<p class="libfoot">Kept encrypted for as long as your record exists, so you are never asked for the same paper twice.</p>'+
    '</div></section>';
}

/* six more, each pointing at its own page in the catalogue rather than
   at a dead "coming soon" */
/* the six most-asked-for services after the passport. They are listed in
   the catalogue and not built in this demo, so the link goes to the
   catalogue rather than to a page that would have to apologise. */
var MORE=[
  ["Report of Birth","baby","all"],["Dual citizenship","shield","all"],
  ["NBI clearance","cert","all"],["Travel document","passport","all"],
  ["Certified true copy","stamp","all"],["Affidavit or oath","pen","all"]
];
function services(){
  var hero=ACTS[0], rest=ACTS.slice(1);
  return '<section class="card"><div class="card-h"><h3>Apply for a service</h3><a data-go="all">All '+(window.KCAT?window.KCAT.reduce(function(n,c){return n+c.s.length;},0):"")+'</a></div>'+
    '<div class="card-b"><div class="svc">'+
      '<button class="ac hot" data-go="renew"><span class="ic">'+I[hero.k]+'</span>'+
        '<span class="tx"><b>'+hero.t+'</b><small>'+hero.s+'</small></span>'+A+'</button>'+
      rest.map(function(a){
        return '<button class="ac'+(a.sos?" sos":"")+'" data-go="'+(a.go||"all")+'">'+
          '<span class="ic">'+I[a.k]+'</span><b>'+a.t+'</b><small>'+a.s+'</small></button>';
      }).join("")+
    '</div>'+
    '<div class="svc-more">'+MORE.map(function(m){
      return '<button class="smore" data-go="'+(m[2]||"all")+'"><span>'+m[0]+'</span>'+A+'</button>';
    }).join("")+'</div>'+
    '</div></section>';
}

function feed(){
  return '<section class="card"><div class="card-h"><h3>Recent activity</h3><a data-go="apps">History</a></div>'+
    '<div class="card-b"><div class="fee">'+FEED.map(function(f){
      return '<div class="fe '+f.s+'"><span class="dot">'+I[f.k]+'</span>'+
        '<span><b>'+f.t+'</b><p>'+f.p+'</p><span class="rw"><time>'+f.w+'</time>'+
        (f.act?'<span class="mini" data-go="'+(f.go||"apps")+'">'+f.act+'</span>':'')+'</span></span></div>';
    }).join("")+'</div></div></section>';
}

function sla(){
  return '<section class="card"><div class="card-h"><h3>Processing times</h3><span class="hint">At this post</span></div>'+
    '<div class="card-b"><div class="sla">'+SLA.map(function(s){
      return '<div class="slar"><span class="n">'+s[0]+'</span><span class="k-chip '+s[2]+'">'+
        (s[2]==="ok"?I.tickc:I.clock)+s[1]+'</span></div>';
    }).join("")+'</div>'+
    '<p style="margin:13px 0 0;font-size:11.5px;color:var(--ink-3);line-height:1.5">Updated daily. Updated daily from the post’s own records.</p>'+
    '</div></section>';
}

function promo(){
  var C=["Ten fingerprints and a photograph","National ID enrolment",
         "Voter registration or transfer","Police clearance prints"];
  return '<div class="promo ptk">'+
    '<div class="tk-stub"><span class="m">Oct</span><b>23</b><small>Friday</small>'+
      '<span class="tm">08:00 – 17:00</span></div>'+
    '<div class="tk-body"><span class="tkart"></span>'+
      '<span class="lbl">Coming to your emirate</span>'+
      '<h3>An outreach mission is coming to Sharjah.</h3>'+
      '<p>Walk in any time — no slot to book. If you ever need fingerprints, a national ID or '+
        'voter registration, this is the day, and it saves the day off and the drive to Dubai.</p>'+
      '<div class="tk-chips">'+C.map(function(c){
        return '<span>'+I.tickc+c+'</span>';}).join("")+'</div>'+
      '<button class="k-btn gold" data-go="book">See what it covers'+A+'</button>'+
      '<span class="tk-serial"><span class="bars"></span>'+
        '<span class="ref">KON · OM · 231026 · SHJ</span></span>'+
    '</div></div>';
}

function foot(){
  return '<div class="foot">'+
    '<div class="fc fbrand"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10.4" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="12" r="7.4" stroke="currentColor" stroke-width=".7" opacity=".55"/><path d="M12 4.2v15.6M4.2 12h15.6M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width=".8" opacity=".55"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>'+
      '<span><b>Konsulado</b><small>Philippine Consulate General · Dubai</small></span></div>'+
    '<div class="fc"><b>The Consulate</b><p>851 Beirut Street, Al Qusais 3, Dubai<br>P.O. Box 94778 · +971 4 220 7100</p><a data-go="book">Book an appointment</a></div>'+
    /* the homepage publishes a 24-hour duty number and the portal published
       only the switchboard, under a heading that promised somebody answers at
       any hour. Both numbers are still unconfirmed with the post — see
       _build/lib/emgdata.js and ROADMAP item 18. */
    '<div class="fc"><b>In an emergency</b><p>+971 56 501 5756 &mdash; the 24-hour duty officer<br>+971 4 220 7100 &mdash; the switchboard, office hours</p><a data-go="sos">What the post can and cannot do</a></div>'+
    '<div class="fc"><b>Your data</b><p>Every look at your file is logged and shown to you.</p><a data-go="me">See who has looked</a><a data-go="sos">Report a problem</a></div>'+
    '</div>'+
    '<p class="footnote">Operated by the Philippine Consulate General, Dubai. Consular fees are set by the DFA and published — there is no service charge and no priority lane.</p>';
}

var P=window.KP={};
P.home=function(){
  return '<div class="ph"><div><h1>Kumusta, Maria.</h1>'+
    '<p class="sub">'+today()+'<span class="live"><i></i>LIVE</span></p></div>'+
    '<div class="acts"><button class="k-btn ghost" data-go="all">Browse services</button>'+
    '<button class="k-btn" data-go="renew">Renew your passport'+A+'</button></div></div>'+
    '<div class="g12" style="margin-bottom:18px">'+
      '<div class="c8">'+one()+'</div>'+
      '<div class="c4">'+apptWidget()+'</div>'+
    '</div>'+
    facts()+ribbon()+
    '<div class="annwrap"><div class="annh"><h3>What is happening</h3>'+
      '<span class="hint">Three things worth a minute of your time.</span></div>'+
      annrow()+'</div>'+
    '<div class="g12">'+
      '<div class="c8">'+liveapps()+'</div>'+
      '<div class="c4">'+services()+'</div>'+
      '<div class="c8">'+library()+'</div>'+
      '<div class="c4">'+feed()+'</div>'+
      '<div class="c4">'+sla()+'</div>'+
      '<div class="c8">'+promo()+'</div>'+
    '</div>'+foot();
};
["apps","docs","pay","all","renew","book","fam","me","sos","soon"].forEach(function(k){
  var T={apps:["Applications","Everything you have filed, and where it is"],
    docs:["Documents","Issued by this post, and everything you have submitted"],
    pay:["Payments","Every consular fee, with a receipt against it"],
    all:["All services","Every consular service, searchable in your own words"],
    renew:["Renew a passport","Six minutes, no visit, nothing to photocopy"],
    book:["Appointments","Video calls and the one in-person visit"],
    fam:["Family profiles","Danila Reyes is linked to your file"],
    me:["Profile & security","No password — your phone and your face are the account"],
    sos:["Emergency help","The duty officer answers, any hour"],
    soon:["Coming next","Built from the same parts"]};
  P[k]=function(){
    return '<div class="ph"><div><h1>'+T[k][0]+'</h1><p class="sub">'+T[k][1]+'</p></div>'+
      '<div class="acts"><button class="k-btn ghost" data-go="home">Back to the dashboard</button></div></div>'+
      '<section class="card"><div class="card-b" style="padding:44px 24px;text-align:center">'+
      '<p style="margin:0 auto;max-width:44ch;font-size:14px;color:var(--ink-2);line-height:1.6">'+
      'This section is not designed yet. We are settling the dashboard first — once you sign it off, every section is built on it.</p>'+
      '</div></section>'+foot();
  };
});

/* ---------- shell ---------- */
var page=document.getElementById("page"), nav=document.getElementById("nav"), dnav=document.getElementById("dnav"),
    tabs=document.getElementById("tabs"), pop=document.getElementById("pop"),
    scrim=document.getElementById("scrim"), drawer=document.getElementById("drawer");
var TAB={home:"home",ready:"home",apps:"apps",pay:"apps",all:"apps",renew:"apps",book:"apps",soon:"apps",
         ask:"apps",sup:"apps",docs:"docs",fam:"me",me:"me",set:"me",sos:"me"};

/* ---- which sidebar row owns each view -------------------------------
   The sidebar only ever matched a row when the view WAS that row, so on
   every sub-page — a document, a receipt, a ticket, a booking step, an
   assistance case — nothing was highlighted and you lost your place.
   Rules are tried in order and the first prefix that matches wins, so the
   specific ones (rcr, rqdoc, soon) sit above the general ones they would
   otherwise be swallowed by. Anything unmatched keeps its own name, and
   the assertion below fails loudly in the console rather than quietly
   un-highlighting a row if a new prefix is ever added. ------------------ */
var OWNS=[
  ["rcr","pay"],                                  /* receipts  — before "r" */
  ["rqdoc","apps"],                               /* the retake — before "rq" */
  ["soon","all"],                                 /* — before "so" */
  ["dc","docs"],["dv","docs"],
  ["bka","book"],["bk","book"],
  ["tk","sup"],
  ["pe","fam"],
  ["so","sos"],
  ["mod","all"],
  ["ap","apps"],
  ["r","all"]                                     /* the renewal journey */
];
function owner(n){
  if(NAVKEYS[n]) return n;
  for(var i=0;i<OWNS.length;i++) if(n.indexOf(OWNS[i][0])===0) return OWNS[i][1];
  return n;
}
var NAVKEYS={};
NAV.forEach(function(g){g[1].forEach(function(r){NAVKEYS[r[0]]=1;});});
function navHTML(){
  var own=owner(cur);
  return NAV.map(function(g){
    return '<h6>'+g[0]+'</h6>'+g[1].map(function(n){
      var b=n[3], q=/q$/.test(b);
      return '<button class="sn'+(own===n[0]?" on":"")+'" data-go="'+n[0]+'">'+n[2]+
        '<span class="t">'+n[1]+'</span>'+(b?'<span class="b'+(q?" q":"")+'">'+b.replace("q","")+'</span>':'')+'</button>';
    }).join("");
  }).join("");
}
function render(n,fromHash){
  if(!P[n]) n="home";
  cur=n;
  /* the address bar carries the view, so the homepage can link straight at
     Emergency or Ask, a person can bookmark where they were, and the browser
     back button behaves the way every other website does */
  if(!fromHash){
    var want="#"+n;
    if(location.hash!==want){
      try{ history.pushState({v:n},"",n==="home"?location.pathname:want); }catch(e){}
    }
  }
  page.innerHTML=P[n]();
  nav.innerHTML=navHTML(); if(dnav) dnav.innerHTML=navHTML();
  if(tabs){var t=TAB[owner(n)]||TAB[n]||"home";
    tabs.querySelectorAll(".tb").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-tab")===t);});}
  close(); if(pop) pop.classList.remove("on");
  window.scrollTo({top:0,behavior:"auto"});
}
function close(){ if(scrim){scrim.classList.remove("on");drawer.classList.remove("on");document.body.style.overflow="";} }
document.addEventListener("click",function(e){
  var el;
  if(e.target.closest("#burg")){scrim.classList.add("on");drawer.classList.add("on");document.body.style.overflow="hidden";return;}
  if(e.target.closest("#dx")||e.target===scrim){close();return;}
  if(e.target.closest("#bell")){pop.classList.toggle("on");return;}
  if(pop&&pop.classList.contains("on")&&!e.target.closest("#pop")&&!e.target.closest("#bell"))pop.classList.remove("on");
  if((el=e.target.closest("[data-go]"))){render(el.getAttribute("data-go"));}
});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){close();if(pop)pop.classList.remove("on");}});
if(document.getElementById("popb")){
  document.getElementById("popb").innerHTML='<div class="fee">'+FEED.slice(0,4).map(function(f){
    return '<div class="fe '+f.s+'"><span class="dot">'+I[f.k]+'</span><span><b>'+f.t+'</b><p>'+f.p+'</p>'+
      '<span class="rw"><time>'+f.w+'</time></span></span></div>';}).join("")+'</div>';
}
window.KRENDER=render;
window.KCUR=function(){ return cur; };
/* NOT here. E1.js loads before W1/V1/PY define KAPPS, KVAULT and KRCPT,
   so painting the dashboard from inside this file showed every counter at
   zero and fell back to a stale copy of the applications. FX.js loads last
   and does the first paint. */
/* A view name in the address bar wins over the default. Anything else — an
   old link, a typo — falls through to home rather than to a blank page. */
function fromHash(){ return (location.hash||"").replace(/^#/,""); }
addEventListener("popstate",function(){ render(fromHash()||"home",true); });
addEventListener("hashchange",function(){ render(fromHash()||"home",true); });
window.KFIRST=function(){ render(fromHash()||"home",true); };

/* the portal is one page of a site, not an island: the crest goes back to the
   homepage, and it has to work from /prototypes/ too, where the rest of the
   site is one level up */
window.KSITE=function(f){
  return (/\/prototypes\//.test(location.pathname)?"../":"")+f;
};
})();
