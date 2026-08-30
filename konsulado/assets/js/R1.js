/* ============ R1 · passport renewal, end to end ============
   Registers its views into the shared table in E1.js. State lives here
   so answers survive going back and forth between steps.            */
(function(){
"use strict";
var P=window.KP, I=window.KI, R=window.KRENDER;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var TICK=I.tickc, WARN=I.warn, SHIELD=I.shield, CLOCK=I.clock;

/* ---- the record this post already holds ---- */
var REC={
  name:"MARIA CRISTINA SANTOS REYES",
  num:"P44••••8•A",
  born:"6 March 1991",
  issued:"12 September 2017",
  expires:"11 September 2022",
  /* this screen says "this post holds the record of this booklet", and the
     aside beside it says the records held are the ones printed and released in
     Dubai. A Manila-issued booklet could only be here through a DFA lookup
     that does not exist. The demo record is a PCG Dubai issuance, which is the
     only case the screen is true for; a Manila booklet takes the rq1b route
     and is photographed. */
  post:"PCG Dubai",
  pages:"44 pages · e-Passport"
};
var REF="KON-26-P-4471";

/* ---- what the applicant has told us ---- */
var S={ src:"record", why:null, book:null, photo:null, deliver:"courier", pay:null, agreed:false };

var WHY={
  expiry:"Expired, or expiring within twelve months",
  damaged:"The booklet is damaged",
  name:"My name or civil status has changed",
  lost:"It is lost or stolen"
};
var PHOTO={ camera:"Taken here, on this device", upload:"Uploaded and checked here" };
var BOOK={
  me:"I have it with me",
  employer:"My employer or agency is holding it",
  other:"Someone else is keeping it for me"
};
var DELIVER={
  courier:{t:"Courier to your address", s:"Al Qusais 2, Dubai · signature required", d:"the week of 5 October", f:25},
  post:{t:"Collect at the Consulate", s:"851 Beirut Street, Al Qusais 3 · weekdays, no appointment to collect", d:"from 2 October", f:0},
  mission:{t:"Collect at the Sharjah outreach mission", s:"Al Majaz Hall · Friday 23 October", d:"Friday 23 October", f:0}
};

/* ---- the rail ---- */
var STEPS=[
  ["rq1","Your passport","The record, or your booklet"],
  ["rq2","Why you are renewing","The ground for it"],
  ["rdet","Your details","Mostly already filled in"],
  ["rq3","The booklet","Where it is now"],
  ["rq4","Your photograph","Taken and checked here"],
  ["rq5","Delivery","Where it should go"],
  ["rrev","Check and pay","Then we file it"]
];
var MINS=[6,5,4,3,2,2,1];

var PARENT={rq1b:"rq1", rq4b:"rq4", rq4c:"rq4", rq4u:"rq4"};
function rail(key){
  key = PARENT[key] || key;
  var at=0; STEPS.forEach(function(s,i){ if(s[0]===key) at=i; });
  var sum=[];
  if(S.why) sum.push(["Ground", WHY[S.why]]);
  if(S.book) sum.push(["Old booklet", BOOK[S.book]]);
  if(S.photo) sum.push(["Photograph", PHOTO[S.photo]]);
  if(at>=5&&S.deliver) sum.push(["Delivery", DELIVER[S.deliver].t]);
  return '<div class="rail">'+
  '<p class="mstep"><b>Step '+(at+1)+' of '+STEPS.length+'</b>'+
    '<span>'+STEPS[at][1]+'</span><em>~'+MINS[at]+' min left</em></p>'+
  '<ol>'+STEPS.map(function(s,i){
    var cls=i<at?"done":(i===at?"now":"");
    return '<li class="rl '+cls+'"><span class="n">'+(i<at?I.tick:(i+1))+'</span>'+
      '<span><b>'+s[1]+'</b><small>'+s[2]+'</small></span></li>';
  }).join("")+'</ol>'+
  '<p class="left">'+CLOCK+'About '+MINS[at]+' minute'+(MINS[at]===1?"":"s")+' left</p>'+
  (sum.length?'<div class="rsum"><h6>So far</h6>'+sum.map(function(x){
    return '<div><em>'+x[0]+'</em><b>'+x[1]+'</b></div>';}).join("")+'</div>':'')+
  '</div>';
}
/* the step number is derived, never typed, so inserting a step cannot desync it */
function kick(key){
  key = PARENT[key] || key;
  var at=0; STEPS.forEach(function(s,i){ if(s[0]===key) at=i; });
  return "Step "+(at+1)+" of "+STEPS.length;
}
function note(kind,title,body){
  var ic = kind==="ok"?TICK:WARN;   /* warn and bad share the triangle; the border carries the level */
  return '<span class="ic">'+ic+'</span><span><b>'+title+'</b><p>'+body+'</p></span>';
}

function bar(sub){
  return '<div class="fbar"><div class="fb-t"><h1>Renew your passport</h1>'+
    '<p class="ref"><i></i>'+REF+'<span>·</span>'+(sub||"Started today")+'</p></div>'+
    '<div class="fb-a"><button class="k-btn ghost sm" data-go="home">Save and close</button></div></div>';
}

function shell(key, inner, sub){
  var k = PARENT[key] || key, at=0;
  STEPS.forEach(function(s,i){ if(s[0]===k) at=i; });
  var pct = Math.round(((at+1)/STEPS.length)*100);
  return '<div class="flw"><div class="flw-p"><i style="width:'+pct+'%"></i></div>'+
    '<div class="flw-h"><b>Passport renewal</b>'+
      '<span class="rf"><i></i>'+REF+'</span>'+
      '<span class="sv"><i></i>'+(sub||"Saved automatically · you can close this and come back")+'</span></div>'+
    inner+'</div>';
}

function flow(key, main, aside, sub){
  return bar()+shell(key,
    '<div class="fl'+(aside?"":" no-a")+'">'+rail(key)+
    '<div class="fl-m">'+main+'</div>'+(aside?'<aside class="fl-a">'+aside+'</aside>':'')+'</div>', sub);
}

function q(kick,title,sub,body,actions){
  var step=/^Step /.test(kick);
  return '<div class="q"><span class="qk'+(step?" stepk":"")+'">'+kick+'</span><h2>'+title+'</h2>'+
    (sub?'<p class="qs">'+sub+'</p>':'')+
    '<div class="qbody">'+body+'</div>'+
    '<div class="qa">'+actions+'</div></div>';
}
function back(to){ return '<button class="back" data-go="'+to+'">'+I.arr+'Back</button><span class="sp"></span>'; }
function next(to,label,dis){
  return '<button class="k-btn" id="cont" data-go="'+to+'"'+(dis?" disabled":"")+'>'+(label||"Continue")+A+'</button>';
}
function ac(icon,label,body,cls){
  return '<div class="ac2'+(cls?" "+cls:"")+'"><div class="h">'+icon+'<b>'+label+'</b></div>'+body+'</div>';
}

/* ================= the service page ================= */
P.renew=function(){
  var how=[
    [I.passport,"Confirm the passport","We show you the record this post holds. If we hold none, you photograph the data page and the app reads it."],
    [I.print,"Tell us why","Expiry, damage, or a change of name. Each takes a different path and a different fee."],
    [I.cert,"Confirm your details","Nine of the thirteen answers are already filled in. You type four."],
    [I.people,"Take your photograph","On this device, against the ICAO frame, checked before it is accepted."],
    [I.truck,"Say where it goes, and pay","Couriered to your door, or collected. Card, Apple Pay, transfer, or cash at an exchange house."]
  ];
  var TODAY=[
    ["A booked appointment","Free, but slots release in batches and are usually gone."],
    ["Personal appearance","Because the photograph and fingerprints are taken at the counter."],
    ["A printed form with a barcode","Plus the overseas voting form beside it."],
    ["Photocopies","Two of the data page, one of the UAE visa page, and the Emirates ID."],
    ["Cash at the cashier","No card. On the day."],
    ["A second trip to collect","Weeks later. Uncollected after six months, the booklet is cancelled."]
  ];
  var NOW=[
    ["The record this post already holds","It printed the passport, so the data page is ours."],
    ["A photograph taken on this device","Against the ICAO frame, six checks, cropped to 35 × 45."],
    ["Nine of thirteen answers pre-filled","From the record and your account. You type four."],
    ["Card, Apple Pay, transfer or cash","Cash at an exchange house, for people who hold no card."],
    ["Couriered to your door","So the second trip disappears with the first."],
    ["Nothing from another agency to file","Where a PSA record is needed for a name change you supply it, and the application says so before you start rather than after."]
  ];

  return '<div class="ph"><div><h1>Renew your passport</h1>'+
      '<p class="sub">About six minutes on this device · no appointment · no visit · nothing to photocopy</p></div>'+
      '<div class="acts"><button class="k-btn ghost" data-go="home">Back to the dashboard</button>'+
      '<button class="k-btn gold" data-go="rq1">Start the renewal'+A+'</button></div></div>'+

    '<div class="g12" style="margin-bottom:18px">'+
      '<div class="c8"><section class="card" style="height:100%"><div class="card-b">'+
        '<h3 style="font-size:16px;margin-bottom:4px">What happens, in order</h3>'+
        '<p style="margin:0 0 16px;font-size:13.5px;color:var(--ink-2)">Seven short steps, about six minutes. You can stop at any point and the answers keep.</p>'+
        '<div class="howl">'+how.map(function(h,i){
          return '<div class="how"><span class="hn">'+h[0]+'</span>'+
            '<span><b>'+h[1]+'</b><small>'+h[2]+'</small></span>'+
            '<span class="st">Step '+(i+1)+'</span></div>';
        }).join("")+'</div>'+
      '</div></section></div>'+

      '<div class="c4"><section class="card" style="height:100%"><div class="card-b">'+
        '<h3 style="font-size:16px;margin-bottom:12px">What it costs</h3>'+
        '<div class="fee" style="margin:0;border:0;box-shadow:none;padding:0">'+
          '<div class="fr"><span>Passport renewal</span><b>AED 240</b></div>'+
          '<div class="fr"><span>Courier to your address</span><b>AED 25</b></div>'+
          '<div class="fr tot"><span>Total</span><b>AED 265</b></div>'+
        '</div>'+
        '<div class="holdh"><b>What we did not change</b></div>'+
        '<p style="margin:0;font-size:12.5px;color:var(--ink-2);line-height:1.55">AED 240 is the Consulate\u2019s published fee, untouched. The courier is the only addition and it is optional — collecting at the post is free. No service charge, no priority lane, nothing to pay a fixer for.</p>'+
        '<div class="holdh"><b>How long it still takes</b></div>'+
        '<p style="margin:0;font-size:12.5px;color:var(--ink-2);line-height:1.55">'+
        '<b>Four to eight weeks</b>, the same as today. The booklet is printed in Manila and this platform cannot move that queue. '+
        'What it removes is everything on the left of the table below.</p>'+
        '<p style="margin:12px 0 0;font-size:12.5px;color:var(--ink-2);line-height:1.55">'+
        'If this post holds no record of you, that does not stop the renewal. '+
        '<a data-go="rnf" style="color:var(--pri);font-weight:600;cursor:pointer">See what happens then</a>.</p>'+
      '</div></section></div>'+
    '</div>'+

    '<section class="card" style="margin-bottom:18px"><div class="card-b">'+
      '<h3 style="font-size:16px;margin-bottom:4px">What this actually replaces</h3>'+
      '<p style="margin:0 0 16px;font-size:13.5px;color:var(--ink-2);max-width:70ch">'+
      'The left column is what the counter asks for today, taken from the Consulate\u2019s own published procedure. '+
      'The right is what stands in its place — all of it produced inside the application or by this post.</p>'+
      '<div class="vs">'+
        '<div class="vs-c now"><div class="vs-h">'+WARN+'<b>At the counter today</b><em>Six things</em></div>'+
          TODAY.map(function(t){return '<div class="vs-r">'+I.x+'<span><b>'+t[0]+'</b><small>'+t[1]+'</small></span></div>';}).join("")+
        '</div>'+
        '<div class="vs-c new"><div class="vs-h">'+TICK+'<b>On this application</b><em>None of them</em></div>'+
          NOW.map(function(t){return '<div class="vs-r">'+TICK+'<span><b>'+t[0]+'</b><small>'+t[1]+'</small></span></div>';}).join("")+
        '</div>'+
      '</div>'+
    '</div></section>'+

    '<div class="one" style="height:auto;margin-bottom:0"><span class="art"></span><div class="lead"><div>'+
      '<p class="kick">Why this is allowed</p>'+
      '<h2 style="max-width:24ch">You are not asking for an exception.</h2>'+
      '<p class="lede" style="max-width:64ch">Republic Act 11983, signed in March 2024, tells the Department of Foreign Affairs to renew passports for migrant workers abroad <b>without requiring them to appear in person</b>. The instruction is two years old. This is the first time it has been built.</p>'+
      '<p class="warrant">'+SHIELD+'<span><b>RA 11983 § 5(i).</b> No appearance required for overseas workers and applicants over sixty.</span></p>'+
    '</div></div></div>';
};

/* ================= 1 · the record, or the booklet ================= */
P.rq1=function(){
  var KEY="rq1";
  var main=q(kick(KEY),"Is this the passport you are renewing?",
    "This post holds the record of this booklet, so nothing has to be re-keyed. Check the name and the number, then confirm.",
    '<div class="rec"><div class="rec-h">'+I.passport+'<span>Republic of the Philippines · Machine readable</span></div>'+
      '<div class="rec-n">'+REC.name+'</div>'+
      '<div class="rec-g">'+
        '<div><em>Passport number</em><b class="mono">'+REC.num+'</b></div>'+
        '<div><em>Date of birth</em><b>'+REC.born+'</b></div>'+
        '<div><em>Issued</em><b>'+REC.issued+'</b></div>'+
        '<div><em>Expires</em><b>'+REC.expires+'</b></div>'+
        '<div><em>Issued at</em><b>'+REC.post+'</b></div>'+
        '<div><em>Booklet</em><b>'+REC.pages+'</b></div>'+
      '</div></div>'+
      '<p class="rec-src">'+SHIELD+'<span>The number is part-masked because you already know it and nobody looking over your shoulder needs to. The full number is never shown on screen.</span></p>',
    back("renew")+'<button class="k-btn ghost" data-go="rq1b">Not this one — use my booklet</button>'+
      '<button class="k-btn" data-go="rq2">Yes, renew this one'+A+'</button>');

  var aside=ac(I.cert,"Where this comes from",
      '<p>This post\u2019s own issuance records — the passports printed and released in Dubai. <b>Nothing was requested from another agency</b> to build this screen.</p>')+
    ac(I.passport,"If we hold no record",
      '<p>Passports issued in Manila or at another post are not held here. You photograph the data page instead and the app reads it — <b>the renewal does not depend on us having the record</b>.</p>')+
    ac(WARN,"If a detail is wrong",
      '<p>Do not correct it here. A wrong entry is fixed during the application with the officer who reviews it, so the correction is recorded and traceable.</p>');
  return flow("rq1", main, aside);
};

/* ---- 1b · read it from the booklet itself ---- */
P.rq1b=function(){
  var KEY="rq1b";
  var main=q(kick(KEY),"Photograph the data page.",
    "Lay the passport flat and fill the frame. The app reads the two machine-readable lines at the bottom of the page — the same lines an immigration desk reads.",
    '<div class="cam">'+
      '<div class="book-v"><span class="pg"></span>'+
        '<span class="fld" style="left:34%;top:26%;width:38%"></span>'+
        '<span class="fld" style="left:34%;top:35%;width:30%"></span>'+
        '<span class="fld" style="left:34%;top:44%;width:34%"></span>'+
        '<span class="fld" style="left:13%;top:24%;width:16%;height:44px;border-radius:4px"></span>'+
        '<span class="mrz"><span></span><span></span></span>'+
        '<span class="scan"></span>'+
        '<span class="cn2 a"></span><span class="cn2 b"></span><span class="cn2 c"></span><span class="cn2 d"></span>'+
      '</div>'+
      '<div class="cks">'+
        '<div class="ck pass">'+TICK+'<span>Page in frame</span><em>Held</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Glare and shadow</span><em>Clear</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Both MRZ lines legible</span><em>Read</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Check digits agree</span><em>Valid</em></div>'+
      '</div>'+
    '</div>'+
    '<p style="margin:18px 0 10px;font-size:14px;font-weight:600">Read from the page</p>'+
    '<div class="read">'+
      '<div><em>Surname, given names</em><b>REYES, MARIA CRISTINA S.</b>'+TICK+'</div>'+
      '<div><em>Passport number</em><b class="mono">P44\u2022\u2022\u2022\u20228\u2022A</b>'+TICK+'</div>'+
      '<div><em>Date of birth</em><b>6 March 1991</b>'+TICK+'</div>'+
      '<div><em>Expires</em><b>11 September 2022</b>'+TICK+'</div>'+
      '<div><em>Issued by, as printed</em><b>DFA Manila</b>'+TICK+'</div>'+
    '</div>'+
    '<div class="onote on ok">'+note("ok","The check digits agree.","The machine-readable zone carries its own arithmetic, so a mistyped or altered number fails on the spot. Nothing was asked of any system outside this application.")+'</div>',
    back("rq1")+'<button class="k-btn ghost" data-go="rq1b">Retake the photograph</button>'+
      '<button class="k-btn" data-go="rq2">These details are right'+A+'</button>');

  var aside=ac(SHIELD,"Why this is enough",
      '<p>The MRZ is printed to an international standard and carries check digits. It is the same data an immigration desk reads at a border.</p>'+
      '<p><b>It proves the booklet, not the person.</b> Your face does that, at the photograph step.</p>')+
    ac(WARN,"If the page will not read",
      '<p>A worn or damaged data page can defeat any reader. Type the details instead, or speak to an officer by video — <b>both stay inside the application</b>.</p>');
  return flow("rq1b", main, aside);
};

/* ================= 2 · the ground ================= */
P.rq2=function(){
  var KEY="rq2";
  var opts=[
    ["expiry","It has expired, or expires within twelve months","The ordinary reason. The DFA opens renewal one year before the date in the booklet.","Most renewals","rdet"],
    ["damaged","The booklet is damaged","Water, a torn page, or a data page too worn or marked to read.","Needs an affidavit","rdet"],
    ["name","My name or civil status has changed","Marriage, annulment, or a court-ordered correction of an entry.","Needs a document","rname"],
    ["lost","It is lost or stolen","This is a different service under different rules, and a different fee.","Different path","rlost"]
  ];
  var main=q(kick(KEY),"Why are you renewing?",
    "The answer changes what we need from you, so it is worth getting right.",
    '<div class="opts">'+opts.map(function(o){
      return '<button class="opt" data-rpick="'+o[0]+'" data-group="why" data-route="'+o[4]+'">'+
        '<span class="rd"></span><span><b>'+o[1]+'</b><small>'+o[2]+'</small></span>'+
        (o[3]?'<span class="tag">'+o[3]+'</span>':'<span></span>')+'</button>';
    }).join("")+'</div>'+
    '<div class="onote ok" data-for="expiry">'+note("ok","Your booklet expired on 11 September 2022.",
      "That is the ordinary ground and you are well inside it. Your old booklet was a five-year one, issued before the ten-year rule began on 1 January 2018 — the replacement lasts ten.")+'</div>'+
    '<div class="onote" data-for="damaged">'+note("warn","A damaged booklet needs one extra document.",
      "An <b>Affidavit of Mutilation</b>, sworn before a consular officer — by video, from where you are. The Consulate charges AED 100 for it. The damaged booklet is returned to us in the prepaid envelope that comes with the new one.")+'</div>'+
    '<div class="onote" data-for="name">'+note("warn","One document is required.",
      "A PSA marriage certificate, or the court order for an annulment or a correction. If you do not hold one, the application can order it for you and wait.")+'</div>'+
    '<div class="onote bad" data-for="lost">'+note("bad","A lost passport is not a renewal.",
      "It is a replacement: AED 600 rather than AED 240, an affidavit of loss, a Dubai Police report in English, and a fifteen-day clearance period the DFA requires before printing can start. We will show you that path.")+'</div>',
    back("rq1")+next("rdet","Continue",true));

  var aside=ac(I.cert,"The four grounds",
      '<ul><li>'+TICK+'<span>Expiry, from twelve months before</span></li>'+
      '<li>'+TICK+'<span>Damage or mutilation</span></li>'+
      '<li>'+TICK+'<span>Change of name or civil status</span></li>'+
      '<li>'+TICK+'<span>Loss or theft &mdash; a replacement, not a renewal</span></li></ul>')+
    ac(CLOCK,"Why almost nobody is here for expiry yet",
      '<p>The ten-year booklet began on 1 January 2018, so the earliest of those expires in 2028. Until then the people renewing are holders of the old five-year books, like yours, and the damage and name-change cases.</p>'+
      '<p><b>The application reads your actual date</b> rather than assuming one.</p>');
  return flow("rq2", main, aside);
};

/* ================= 3 · your details — the form ================= */
P.rdet=function(){
  var KEY="rdet";
  function fld(lb,vl,right,mono){
    return '<div class="fld"><span><span class="lb">'+lb+'</span>'+
      '<span class="vl'+(mono?" mono":"")+'">'+vl+'</span></span>'+(right||'<span></span>')+'</div>';
  }
  function inp(lb,ph,val){
    return '<div class="fld need"><span class="lb">'+lb+'</span>'+
      '<input class="inp" type="text" placeholder="'+ph+'"'+(val?' value="'+val+'"':'')+'></div>';
  }
  /* ss2 · the marker has to say the field is not editable, not just that a
     record exists — an icon alone read as "attach something here". */
  /* "On file" and "Verified" are not words this product uses. Everything it
     holds carries one of three tiers, and these markers now say which. */
  var held='<span class="chip hold" title="From this post\u2019s own issuance record">'+I.cert+'Issued by this post</span>';
  var ver ='<span class="chip ver">'+TICK+'Proved</span>';

  var main=q(kick(KEY),"Your details.",
    "Thirteen answers go on a passport application. Nine of them are already in this post\u2019s own record of your last one, so this is mostly confirming rather than filling.",
    '<p class="fmeta">'+SHIELD+'<span><b>9 of 13 already filled in.</b> Four need you — civil status, occupation, employer, and someone to contact in an emergency.</span></p>'+

    '<div class="fgrp"><h4>From this post\u2019s own record</h4>'+
      '<p>This post printed your last passport, so it holds the application behind it. Nothing here was requested from another agency. These cannot be edited — a change to any of them is an amendment, handled with the officer who reviews your application.</p>'+
      '<div class="flds">'+
        fld("Full name","MARIA CRISTINA SANTOS REYES",held)+
        '<div class="frow">'+fld("Date of birth","6 March 1991",held)+fld("Place of birth","Iloilo City, Iloilo",held)+'</div>'+
        '<div class="frow">'+fld("Sex","Female",held)+fld("Mother\u2019s maiden name","SANTOS, CORAZON",held)+'</div>'+
      '</div>'+
      '<p style="margin:9px 0 0;font-size:12.5px;color:var(--ink-2)">Something wrong? '+
        '<a data-go="sos" style="color:var(--pri);font-weight:600;cursor:pointer">Report a correction</a> — it is fixed during this application, not before it.</p>'+
    '</div>'+

    '<div class="fgrp"><h4>How we reach you</h4>'+
      '<p>From your account. Change any of it here and the change applies to your file, not just this application.</p>'+
      '<div class="flds">'+
        fld("Mobile","+971 50 441 8827",ver,true)+
        fld("Email","m.reyes@mail.com",'<span class="ed" data-go="rdet">Change</span>')+
        fld("Address in the UAE","Flat 1204, Al Nahda Tower B<br>Al Qusais 2, Dubai",'<span class="ed" data-go="rdet">Change</span>')+
      '</div>'+
    '</div>'+

    '<div class="fgrp"><h4>Required on the application</h4>'+
      '<p>These four are not in your old passport and not in your account, so they are the only things you have to type.</p>'+
      '<div class="flds">'+
        '<div class="fld need"><span class="lb">Civil status</span>'+
          '<span class="pills">'+["Single","Married","Widowed","Separated","Annulled"].map(function(x,i){
            return '<button class="pill'+(i===0?" on":"")+'" data-rpick="'+x.toLowerCase()+'" data-group="civil">'+x+'</button>';
          }).join("")+'</span></div>'+
        '<div class="frow">'+inp("Occupation","Household service worker")+inp("Employer or sponsor","Name on your residence visa")+'</div>'+
        '<div class="fld need"><span class="lb">Person to contact in an emergency</span>'+
          '<span style="display:grid;gap:9px">'+
            '<input class="inp" type="text" placeholder="Full name">'+
            '<div class="frow" style="background:transparent;gap:9px">'+
              '<input class="inp" type="text" placeholder="Relationship to you">'+
              '<input class="inp" type="text" placeholder="Number in the Philippines">'+
            '</div>'+
          '</span></div>'+
      '</div>'+
    '</div>'+

    '<div class="onote on ok">'+note("ok","This is the whole form.",
      "The paper version at the counter asks the same thirteen things and takes about twenty minutes, because you fill in all of them. Here you confirm nine and type four.")+'</div>',
    back("rq2")+next("rq3","Continue"));

  var aside=ac(I.cert,"Why we do not ask again",
      '<p>Anything printed in your current passport is already in the record this post holds. Asking you to type it a second time would only create a chance to disagree with it.</p>')+
    ac(SHIELD,"The emergency contact",
      '<p>Used only if something happens to you abroad and the post has to reach your family. It is not printed in the booklet and it is not shared.</p>')+
    ac(WARN,"If you have no employer",
      '<p>Write what you actually do — <b>self-employed</b>, <b>student</b>, <b>between jobs</b>. The form has never required a job, only an honest answer.</p>');
  return flow(KEY, main, aside);
};

/* ================= 3 · the booklet ================= */
P.rq3=function(){
  var KEY="rq3";
  var opts=[
    ["me","I have it with me","It stays with you until the new one arrives.","","rq4"],
    ["employer","My employer or agency is holding it","Common, and it does not stop you.","No obstacle","rq4"],
    ["other","Someone else is keeping it for me","A relative, a recruiter, a previous employer.","","rq4"]
  ];
  var main=q(kick(KEY),"Where is the booklet right now?",
    "We ask because it decides how the old passport gets back to us — not whether you can apply.",
    '<div class="opts">'+opts.map(function(o){
      return '<button class="opt" data-rpick="'+o[0]+'" data-group="book" data-route="'+o[4]+'">'+
        '<span class="rd"></span><span><b>'+o[1]+'</b><small>'+o[2]+'</small></span>'+
        (o[3]?'<span class="tag">'+o[3]+'</span>':'<span></span>')+'</button>';
    }).join("")+'</div>'+
    '<div class="onote ok" data-for="me">'+note("ok","Keep it.","Your old passport stays valid and in your hands. A prepaid envelope arrives with the new one; the old book is cancelled only after the new one is signed for.")+'</div>'+
    '<div class="onote ok" data-for="employer">'+note("ok","You do not need it today.","Nothing here asks you to produce the booklet, so you do not have to ask anyone for it. The envelope comes with the new passport and either of you can post it.")+'</div>'+
    '<div class="onote ok" data-for="other">'+note("ok","That is fine.","The prepaid envelope travels with the new passport, so whoever holds the old one can return it once you have the new one.")+'</div>',
    back("rdet")+next("rq4","Continue",true));

  var aside=ac(SHIELD,"Why we never take it first",
      '<p>The old process cancelled your passport at the counter and left you with nothing for two weeks. In the UAE that is not an inconvenience — it is a legal problem.</p>'+
      '<p><b>So we reversed it.</b> Nothing is cancelled until the new booklet is in your hands.</p>')+
    ac(WARN,"If your employer refuses to release it",
      '<p>Withholding a passport is an offence in the UAE. The duty officer can act on it. That is a separate matter from this application and it does not delay it.</p>');
  return flow("rq3", main, aside);
};

/* ================= 4 · the photograph, taken here ================= */
P.rq4=function(){
  var KEY="rq4";
  var main=q(kick(KEY),"Your photograph.",
    "A passport photograph has to meet an international standard. Rather than send you to a shop and hope, the application takes it and checks it here.",
    '<div class="opts">'+
      '<button class="opt" data-rpick="camera" data-group="photo" data-route="rq4b">'+
        '<span class="rd"></span><span><b>Take it now with this device</b>'+
        '<small>About twenty seconds. A frame shows you where to sit and the checks run as you move.</small></span>'+
        '<span class="tag">Recommended</span></button>'+
      '<button class="opt" data-rpick="upload" data-group="photo" data-route="rq4u">'+
        '<span class="rd"></span><span><b>Upload a photograph I already have</b>'+
        '<small>The same checks run on it. If it fails, we tell you exactly which rule and why.</small></span>'+
        '<span></span></button>'+
    '</div>'+
    '<div class="onote ok" data-for="camera">'+note("ok","Nothing is kept until you accept it.","The frames are processed on this device to guide you; only the photograph you approve is sent, and you can retake it as many times as you like.")+'</div>'+
    '<div class="onote" data-for="upload">'+note("warn","Most photographs from a phone gallery fail.","Usually the background, the head height, or a smile. The checks tell you which, so you can fix it rather than guess.")+'</div>'+
    '<p style="margin:20px 0 10px;font-size:14px;font-weight:600">What is checked, either way</p>'+
    '<div class="cks">'+
      [["Full face, square to the camera, eyes open"],["Neutral expression, mouth closed"],
       ["Plain light background, no shadow behind you"],["Even lighting, no glare on the face"],
       ["Head height between 32 and 36 mm of a 45 mm frame"],["No glasses; head covering only for faith"]]
      .map(function(x){return '<div class="ck wait">'+I.tick+'<span>'+x[0]+'</span><em>ICAO 9303</em></div>';}).join("")+
    '</div>',
    back("rq3")+next("rq4b","Continue",true));

  var aside=ac(I.print,"The visit this removes",
      '<p>A studio photograph was never a legal requirement. It was a habit of a paper process that had no other way to produce a compliant image.</p>'+
      '<p><b>A camera and the rules are enough</b>, and the rules are public.</p>')+
    ac(SHIELD,"Where the picture goes",
      '<p>Into this application only, attached to this reference. It is not shared with another agency and it is not used to search anything.</p>');
  return flow("rq4", main, aside);
};

/* ---- 4b · the capture itself ---- */
P.rq4b=function(){
  var KEY="rq4b";
  var main=q(kick(KEY),"Sit square to the camera.",
    "Fill the oval with your head, keep your shoulders level, and look straight at the lens. The checks update as you move.",
    '<div class="cam">'+
      '<div class="cam-v"><span class="feed"></span><span class="vig"></span>'+
        '<span class="cam-g">'+
          '<span class="ov"></span>'+
          '<span class="ln t"><span>Crown</span></span>'+
          '<span class="ln b"><span>Chin</span></span>'+
          '<span class="cn tl"></span><span class="cn tr"></span>'+
          '<span class="cn bl"></span><span class="cn br"></span>'+
        '</span>'+
        '<span class="hint2"><i></i>Hold still — all six rules pass</span>'+
      '</div>'+
      '<div class="cks">'+
        '<div class="ck pass">'+TICK+'<span>Face found and square</span><em>Pass</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Eyes open, mouth closed</span><em>Pass</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Background plain</span><em>Pass</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Lighting even</span><em>Pass</em></div>'+
        '<div class="ck pass">'+TICK+'<span>Head height</span><em>34 mm</em></div>'+
        '<div class="ck pass">'+TICK+'<span>No glasses or covering</span><em>Pass</em></div>'+
      '</div>'+
    '</div>'+
    '<div class="onote on ok">'+note("ok","Head height is the rule people fail on.","It is measured from the crown to the chin and it must sit between 32 and 36 mm once the photograph is cropped to 35 by 45. The app crops to that, so you do not have to think about it.")+'</div>',
    back("rq4")+'<button class="k-btn gold" data-go="rq4c">Take the photograph'+A+'</button>');

  var aside=ac(WARN,"If a check will not pass",
      '<p><b>Background</b> — face a plain wall, or step back from a patterned one.</p>'+
      '<p><b>Shadow</b> — turn towards a window rather than away from it.</p>'+
      '<p><b>Head height</b> — move closer or further until the oval fills.</p>')+
    ac(I.people,"Someone can help",
      '<p>Another person may hold the phone. What is not allowed is another person in the frame.</p>');
  return flow("rq4b", main, aside);
};

/* ---- 4u · upload a file, and check it honestly ---- */
P.rq4u=function(){
  var KEY="rq4u";
  var main=q(kick(KEY),"Choose a photograph.",
    "The same six rules are applied to your file. Nothing is accepted unless all six pass — that is the standard, not our preference.",
    '<div class="drop"><span class="dic">'+I.cert+'</span>'+
      '<b>Drop a photograph here</b>'+
      '<small>JPEG or PNG, at least 600 by 750 pixels. Taken within the last six months.</small>'+
      '<button class="k-btn ghost sm" data-go="rq4u">Choose a file</button></div>'+

    '<p style="margin:18px 0 10px;font-size:14px;font-weight:600">Checked</p>'+
    '<div class="file" style="margin-bottom:12px"><span class="th"></span>'+
      '<span><b>IMG_4471.jpeg</b><small>1.8 MB &middot; 1170 \u00d7 1560 &middot; taken 2 August 2026</small></span>'+
      '<span class="x" data-go="rq4u">Remove</span></div>'+
    '<div class="cks">'+
      '<div class="ck pass">'+TICK+'<span>Face found and square</span><em>Pass</em></div>'+
      '<div class="ck pass">'+TICK+'<span>Eyes open, mouth closed</span><em>Pass</em></div>'+
      '<div class="ck fail">'+WARN+'<span>Background plain</span><em>Fail</em></div>'+
      '<div class="ck pass">'+TICK+'<span>Lighting even</span><em>Pass</em></div>'+
      '<div class="ck fail">'+WARN+'<span>Head height</span><em>28 mm</em></div>'+
      '<div class="ck pass">'+TICK+'<span>No glasses or covering</span><em>Pass</em></div>'+
    '</div>'+
    '<div class="onote on bad">'+note("bad","Two rules fail, so this file cannot be used.",
      "<b>Background</b> — there is a doorway behind you. Stand closer to a plain wall. " +
      "<b>Head height</b> — your head measures 28 mm where it must be between 32 and 36. Hold the camera closer, or crop tighter.<br><br>" +
      "This is exactly why the check runs here rather than at a counter three weeks from now.")+'</div>',
    back("rq4")+'<button class="k-btn ghost" data-go="rq4u">Choose another file</button>'+
      '<button class="k-btn" data-go="rq4b">Take one with the camera instead'+A+'</button>');

  var aside=ac(WARN,"Why we do not just accept it",
      '<p>A non-compliant photograph is rejected in Manila, at the printing stage, weeks later. You would then be asked for another one and the whole application would wait.</p>'+
      '<p><b>Failing here costs you a minute.</b> Failing there costs three weeks.</p>')+
    ac(I.people,"The camera route always passes",
      '<p>The frame and the live checks make it hard to get wrong, and it takes about twenty seconds.</p>');
  return flow(KEY, main, aside);
};

/* ---- 4c · the cropped result ---- */
P.rq4c=function(){
  var KEY="rq4c";
  var main=q(kick(KEY),"This is what will be printed.",
    "Cropped to 35 by 45 millimetres, the size the booklet takes. Nothing has been retouched — the crop and the colour profile are the only changes.",
    '<div class="crop"><div class="crop-i"><span class="mm">35 \u00d7 45 mm \u00b7 600 dpi</span></div>'+
      '<div class="pho-c"><p class="t">All six rules pass</p>'+
      [["Full face, square, eyes open"],["Neutral expression, mouth closed"],
       ["Plain light background"],["Even lighting, no glare"],
       ["Head height 34 mm of 45"],["No glasses or head covering"]]
      .map(function(x){return '<div>'+TICK+'<span>'+x[0]+'</span></div>';}).join("")+
      '<p style="margin:12px 0 0;font-size:12.5px;color:var(--ink-3);line-height:1.5;grid-column:1/-1">Captured '+
      'on this device on 26 August 2026, 09:12. Stored against this application only.</p>'+
      '</div></div>',
    back("rq4b")+'<button class="k-btn ghost" data-go="rq4b">Take another</button>'+
      '<button class="k-btn" data-go="rq5">Use this photograph'+A+'</button>');

  var aside=ac(SHIELD,"Why it is not retouched",
      '<p>A passport photograph is evidence. Smoothing skin or brightening eyes changes the thing it is evidence of, so the app does neither.</p>')+
    ac(CLOCK,"How long it stays valid",
      '<p>Six months from capture. If this application is still open after that, we ask for a new one rather than send an old one to the press.</p>');
  return flow("rq4c", main, aside);
};

/* ================= 5 · delivery ================= */
P.rq5=function(){
  var KEY="rq5";
  var main=q(kick(KEY),"Where should the new passport go?",
    "Whichever you choose, the prepaid envelope for the old booklet comes with it.",
    '<div class="opts">'+
      ['courier','post','mission'].map(function(k){
        var d=DELIVER[k];
        return '<button class="opt'+(k==="courier"?" on":"")+'" data-rpick="'+k+'" data-group="deliver" data-route="rrev">'+
          '<span class="rd"></span><span><b>'+d.t+'</b><small>'+d.s+'<br>Ready '+d.d.toLowerCase()+'</small></span>'+
          '<span class="tag">'+(d.f?"AED "+d.f:"Free")+'</span></button>';
      }).join("")+'</div>'+
    '<div class="onote ok" data-for="courier">'+note("ok","Al Qusais 2, Dubai.",
      "The address you confirmed on your file. A work address is fine, and often easier if you live in shared accommodation.")+'</div>'+
    '<div class="onote" data-for="mission">'+note("warn","That is eight weeks away.",
      "Collecting at the mission is free, but the booklet may well be back before then and would simply wait for you.")+'</div>',
    back("rq4c")+next("rrev","Continue"));

  var aside=ac(I.truck,"Signature on delivery",
      '<p>A passport is handed to you and nobody else. The courier checks the name against the booklet before releasing it.</p>')+
    ac(WARN,"If you move before it arrives",
      '<p>Change the address from the application at any point before it is dispatched. After dispatch the courier will usually redirect it once; that is their policy, not ours to promise.</p>');
  return flow("rq5", main, aside);
};

/* ================= review ================= */
P.rrev=function(){
  var d=DELIVER[S.deliver]||DELIVER.courier;
  var rows=[
    ["Passport", REC.name+"<small>"+REC.num+" · issued "+REC.issued+"</small>", "rq1"],
    ["Reason", (WHY[S.why]||WHY.expiry), "rq2"],
    ["Your details", "Confirmed<small>Nine from your record and account, four answered by you</small>", "rdet"],
    ["The old booklet", (BOOK[S.book]||BOOK.me)+"<small>Returned in the prepaid envelope after the new one arrives</small>", "rq3"],
    ["Photograph", (PHOTO[S.photo]||PHOTO.camera)+"<small>Cropped to 35 \u00d7 45 mm · all six ICAO 9303 rules pass</small>", "rq4"],
    ["Delivery", d.t+"<small>"+d.s+"</small>", "rq5"]
  ];
  var main=q("Last step","Check your answers.",
    "Change anything that is wrong. Nothing is filed until you pay.",
    '<div class="sum">'+rows.map(function(r){
      return '<div class="sr"><em>'+r[0]+'</em><b>'+r[1]+'</b><a data-go="'+r[2]+'">Change</a></div>';
    }).join("")+'</div>'+
    '<div class="fee">'+
      '<div class="fr"><span>Passport renewal</span><b>AED 240</b></div>'+
      (d.f?'<div class="fr"><span>Courier</span><b>AED '+d.f+'</b></div>':'')+
      '<div class="fr tot"><span>Total</span><b>AED '+(240+d.f)+'</b></div>'+
      '<p>Set by the DFA and published. No service charge and no priority lane — paying more does not move you up.</p>'+
    '</div>'+
    '<button class="dec" id="dec"><span class="bx">'+I.tick+'</span>'+
      '<span>I confirm that what I have entered is true. <b>Making a false statement in a passport application is an offence</b> under Republic Act 11983 and the application can be refused or cancelled.</span></button>',
    back("rq5")+'<button class="k-btn" id="cont" data-go="rpay" disabled>Continue to payment'+A+'</button>');

  var aside=ac(CLOCK,"What happens after you pay",
      '<p><b>Today</b> — filed and queued for a consular officer.</p>'+
      '<p><b>Within two working days</b> — reviewed and approved here.</p>'+
      '<p><b>Four to eight weeks</b> — printed in Manila and returned in the diplomatic pouch.</p>'+
      '<p><b>'+d.d+'</b> — '+(S.deliver==="courier"?"couriered to you":"ready for you")+'.</p>')+
    ac(SHIELD,"You are not committed yet",
      '<p>Payment files the application. Before that, nothing has been submitted and nothing has been cancelled.</p>');
  return flow("rrev", main, aside, "Ready to file");
};

/* ================= payment ================= */
P.rpay=function(){
  var d=DELIVER[S.deliver]||DELIVER.courier, tot=240+d.f;
  var m=[
    ["card","Card","Visa, Mastercard, or a UAE debit card",I.coin],
    ["apple","Apple Pay","Face ID, nothing to type",I.passport],
    ["bank","Bank transfer","A reference is generated for you",I.stamp],
    ["cash","Cash at an exchange house","Al Ansari, LuLu, or Wall Street. You get a code and pay in person.",I.people]
  ];
  var main=q("Payment","AED "+tot+".",
    "The fee goes to the Consulate. Nothing is added on top of it.",
    '<div class="pays">'+m.map(function(x){
      return '<button class="pay-o" data-rpick="'+x[0]+'" data-group="pay" data-route="rdone">'+
        '<span class="ic">'+x[3]+'</span><span><b>'+x[1]+'</b><small>'+x[2]+'</small></span>'+
        '<span class="rd"></span></button>';
    }).join("")+'</div>'+
    '<div class="onote ok" data-for="cash">'+note("ok","This is why it is here.","A large share of the people this is built for do not hold a card. The code is valid for seventy-two hours and the application waits for it.")+'</div>'+
    '<div class="fee">'+
      '<div class="fr"><span>Passport renewal</span><b>AED 240</b></div>'+
      (d.f?'<div class="fr"><span>Courier</span><b>AED '+d.f+'</b></div>':'')+
      '<div class="fr tot"><span>To pay now</span><b>AED '+tot+'</b></div>'+
    '</div>',
    back("rrev")+'<button class="k-btn gold" id="cont" data-go="rdone" disabled>Pay AED '+tot+' and file'+A+'</button>');

  var aside=ac(SHIELD,"Where the money goes",
      '<p>Straight to the Consulate’s account. The receipt is issued in your name and appears under Payments within a minute.</p>')+
    ac(WARN,"If a payment fails",
      '<p>The application is held, not lost. You can pay again from Payments or switch method without answering anything twice.</p>');
  return flow("rrev", main, aside, "Payment");
};

/* ================= confirmation ================= */
P.rdone=function(){
  var d=DELIVER[S.deliver]||DELIVER.courier;
  var when=[
    ["Today, 26 August","Filed and queued for a consular officer","ok"],
    ["By 28 August","Reviewed and approved at this post","info"],
    ["4 to 8 weeks","Printed in Manila and returned in the diplomatic pouch","info"],
    [d.d,(S.deliver==="courier"?"Couriered to Al Qusais 2, signature required":"Ready for you to collect"),"info"]
  ];
  return bar("Filed")+
    '<div class="fl no-a"><div class="rail"><div class="ac2" style="background:var(--ok-soft);border-color:var(--ok-line)">'+
      '<div class="h">'+TICK+'<b>Filed</b></div>'+
      '<p>Nothing further is needed from you. We will write when it moves.</p></div>'+
      '<p class="save" style="margin-top:14px"><i></i>A receipt has been emailed to you</p></div>'+
    '<div class="fl-m"><div class="q">'+
      '<span class="qk">Application filed</span>'+
      /* the rail box already says "Nothing further is needed from you", and
         the sub-line says what that means. Saying it a third time in the
         heading was what made it wrap three ways. */
      '<h2>That is filed.</h2>'+
      '<p class="qs">Six minutes, one payment, and no appointment. Your old passport is still valid and still with you.</p>'+
      '<div class="qbody">'+
        '<div class="rec"><div class="rec-h">'+TICK+'<span>Reference · keep this</span></div>'+
          '<div class="rec-n" style="font-family:\'IBM Plex Mono\',monospace;font-size:30px;letter-spacing:.02em">'+REF+'</div>'+
          '<div class="rec-g"><div><em>Filed</em><b>26 August 2026, 09:14</b></div>'+
          '<div><em>Paid</em><b>AED '+(240+d.f)+'</b></div>'+
          '<div><em>Expected</em><b>'+d.d+'</b></div>'+
          '<div><em>Where</em><b>'+d.t+'</b></div></div></div>'+
        '<div class="apl" style="margin-top:16px">'+when.map(function(w){
          return '<div class="ap '+w[2]+'"><div class="ap-h"><span class="ic">'+(w[2]==="ok"?TICK:CLOCK)+'</span>'+
            '<span><b>'+w[1]+'</b></span><span class="rt"><em>When</em><b>'+w[0]+'</b></span></div></div>';
        }).join("")+'</div>'+
      '</div>'+
      '<div class="qa"><button class="k-btn ghost" data-go="home">Back to the dashboard</button>'+
        '<span class="sp"></span><button class="k-btn" data-go="rtrack">Track this application'+A+'</button></div>'+
    '</div></div></div>';
};

/* ================= tracking ================= */
/* the journey used to end on its own tracking screen, which held a second
   copy of the same application with different dates and a different
   reference. There is one record now, in W1.js, and this hands you to it. */
P.rtrack=function(){ return P.app1 ? P.app1() : P.apps(); };

/* ================= the branches ================= */
function branch(kick,title,sub,body,actions,aside){
  return bar(kick)+'<div class="fl'+(aside?"":" no-a")+'"><div class="rail">'+
    '<div class="ac2"><div class="h">'+WARN+'<b>'+kick+'</b></div><p>'+sub+'</p></div></div>'+
    '<div class="fl-m"><div class="q"><h2>'+title+'</h2><div class="qbody">'+body+'</div>'+
    '<div class="qa">'+actions+'</div></div></div>'+
    (aside?'<aside class="fl-a">'+aside+'</aside>':'')+'</div>';
}

P.rlost=function(){
  var reqs=[
    ["An affidavit of loss","Sworn before a consular officer. Done by video from inside this application — you do not come in for it.","ok","No visit"],
    ["A police report from Dubai Police","With an English translation, which Dubai Police issue. Photograph it and the application attaches it.","ok","No visit"],
    ["A fifteen-day clearance period","Required by the DFA so the lost booklet can be flagged before a new one is printed. It cannot be shortened, and nobody at this post can shorten it.","no","Cannot be avoided"],
    ["A higher fee","AED 600 for a lost e-Passport against AED 240 for a renewal, plus AED 100 for the affidavit of loss. Set by the DFA, not by this post.","no","AED 700 in total"]
  ];
  return branch("A different service","A lost passport is not a renewal.",
    "It has its own rules, and pretending otherwise would waste your time.",
    '<div class="reqs">'+reqs.map(function(r,i){
      return '<div class="req"><span class="rn">'+(i+1)+'</span>'+
        '<span><b>'+r[0]+'</b><small>'+r[1]+'</small>'+
        '<span class="tag2 '+r[2]+'">'+r[3]+'</span></span></div>';
    }).join("")+'</div>'+
    '<div class="onote on ok mt14">'+TICK+'<span class="um"><b>Three of the four still need no visit.</b> The affidavit is sworn by video, the police report is photographed, and the new booklet is couriered. The only thing you cannot avoid is the fifteen days.</span></div>',
    '<button class="back" data-go="rq2">'+I.arr+'Back</button><span class="sp"></span>'+
    '<button class="k-btn ghost" data-go="sos">Talk to an officer now</button>'+
    '<button class="k-btn" data-go="rlost2">Begin the report'+A+'</button>',
    ac(SHIELD,"If it was stolen","<p>File the police report first — within twenty-four hours if you can. It protects you if the booklet is used by someone else.</p>")+
    ac(CLOCK,"If you must travel urgently","<p>The post can issue a travel document valid for a single journey home. The duty officer arranges it the same day, and that does not wait fifteen days.</p>"));
};

P.rlost2=function(){
  return branch("Report started","We have opened the report.",
    "The clock on the fifteen days starts today, not when you finish the paperwork.",
    '<div class="rec"><div class="rec-h">'+TICK+'<span>Reference · keep this</span></div>'+
      '<div class="rec-n" style="font-family:\'IBM Plex Mono\',monospace;font-size:30px;letter-spacing:.02em">KON-LST-2214</div>'+
      '<div class="rec-g">'+
        '<div><em>Opened</em><b>26 August 2026</b></div>'+
        '<div><em>Clearance ends</em><b>10 September 2026</b></div>'+
        '<div><em>Fee</em><b>AED 700</b></div>'+
        '<div><em>Still to do</em><b>Two things</b></div>'+
      '</div></div>'+
    '<div class="reqs" style="margin-top:16px">'+
      '<div class="req"><span class="rn">1</span><span><b>Swear the affidavit of loss</b>'+
        '<small>A consular officer joins by video. Slots today from 14:00.</small>'+
        '<span class="tag2 ok">Book it</span></span></div>'+
      '<div class="req"><span class="rn">2</span><span><b>Attach the police report</b>'+
        '<small>Photograph it in the application. It does not have to be today.</small>'+
        '<span class="tag2 ok">Two minutes</span></span></div>'+
    '</div>'+
    '<div class="onote on">'+note("warn","Do not start a renewal as well.","If the lost booklet turns up, tell us — the report is withdrawn and the renewal takes over, at the lower fee.")+'</div>',
    '<button class="back" data-go="rlost">'+I.arr+'Back</button><span class="sp"></span>'+
    '<button class="k-btn ghost" data-go="home">Back to the dashboard</button>'+
    '<button class="k-btn" data-go="book">Book the video appointment'+A+'</button>',
    ac(CLOCK,"What happens on 10 September","<p>The clearance ends and the application moves to printing on its own. You do not have to come back and ask.</p>")+
    ac(SHIELD,"Your old number is flagged","<p>From today the lost booklet is recorded as invalid, so it cannot be used to travel by anyone.</p>"));
};

P.rname=function(){
  return branch("One document needed","Your name has changed, so we need the proof.",
    "A renewal cannot change what is printed in your passport without it.",
    '<div class="opts">'+
      '<button class="opt" data-rpick="have" data-group="doc" data-route="rdet"><span class="rd"></span>'+
        '<span><b>I have the PSA marriage certificate</b><small>Upload it now — a photograph of it is enough.</small></span>'+
        '<span class="tag">Fastest</span></button>'+
      '<button class="opt" data-rpick="order" data-group="doc" data-route="rdet"><span class="rd"></span>'+
        '<span><b>Order it for me</b><small>A clerk here posts the request to the PSA for you and attaches the copy when it arrives. It is done by hand and by post, not by any system link, so it takes about three weeks.</small></span>'+
        '<span class="tag">No visit</span></button>'+
      '<button class="opt" data-rpick="keep" data-group="doc" data-route="rdet"><span class="rd"></span>'+
        '<span><b>Keep my maiden name</b><small>You are entitled to. Nothing further is needed and the renewal continues now.</small></span>'+
        '<span></span></button>'+
    '</div>'+
    '<div class="onote ok" data-for="keep">'+note("ok","This is a real choice, not a workaround.","Philippine law does not require a married woman to change her name. Many keep it precisely to avoid re-papering every document they own.")+'</div>'+
    '<div class="onote" data-for="order">'+note("warn","Three weeks, and the renewal waits.","You can file everything else today; the application pauses at approval until the certificate lands, then continues on its own.")+'</div>',
    '<button class="back" data-go="rq2">'+I.arr+'Back</button><span class="sp"></span>'+next("rdet","Continue",true),
    ac(I.cert,"Why the PSA copy","<p>The consulate cannot take the marriage certificate on trust from a photocopy or a local registrar. The PSA copy is the one the DFA recognises.</p>")+
    ac(SHIELD,"Your CENOMAR","<p>You already have one on file, expiring 5 October. If the wedding is after that date you will need a fresh one — order it early.</p>"));
};

P.rnf=function(){
  return branch("Record not found","We hold no passport issued here in your name.",
    "This is an honest limit, and it does not stop you.",
    '<p style="font-size:15px;line-height:1.65;color:var(--ink-2);max-width:60ch;margin:0 0 18px">'+
      'This post can only search <b>its own issuance records</b> — the passports printed and released in Dubai. '+
      'If yours was issued in Manila, in another region, or at a different post, it is not held here, and no system outside the Consulate is queried to find it.</p>'+
    '<div class="onote on ok">'+note("ok","The renewal does not depend on us holding the record.","Photograph the data page and the application reads it — surname, number, date of birth and expiry, with the check digits verified. That is the same data, from the booklet in your hand.")+'</div>',
    '<button class="back" data-go="rq1">'+I.arr+'Back</button><span class="sp"></span>'+
    '<button class="k-btn ghost" data-go="sos">Talk to an officer</button>'+
    '<button class="k-btn" data-go="rq1b">Use my booklet instead'+A+'</button>',
    ac(SHIELD,"Why we do not guess","<p>A near match on a name and a birth date is not identification. Attaching you to the wrong record is worse than finding nothing.</p>")+
    ac(CLOCK,"This shrinks over time","<p>Every renewal filed here adds a record. The post\u2019s own gallery grows as a by-product of work it already does.</p>"));
};

/* ---------- picking, ticking, and unlocking Continue ---------- */
document.addEventListener("click",function(e){
  var el=e.target.closest("[data-rpick]");
  if(el){
    var g=el.getAttribute("data-group"), v=el.getAttribute("data-rpick");
    if(S.hasOwnProperty(g)) S[g]=v;
    var sib=el.parentNode.querySelectorAll("[data-rpick]");
    for(var i=0;i<sib.length;i++) sib[i].classList.toggle("on", sib[i]===el);
    var body=el.closest(".qbody");
    if(body){
      var notes=body.querySelectorAll(".onote[data-for]");
      for(var j=0;j<notes.length;j++) notes[j].classList.toggle("on", notes[j].getAttribute("data-for")===v);
    }
    var c=document.getElementById("cont");
    if(c){ c.disabled=false; var r=el.getAttribute("data-route"); if(r) c.setAttribute("data-go", r); }
    return;
  }
  var d=e.target.closest("#dec");
  if(d){
    S.agreed=!S.agreed;
    d.classList.toggle("on", S.agreed);
    var cc=document.getElementById("cont"); if(cc) cc.disabled=!S.agreed;
  }
});
})();
