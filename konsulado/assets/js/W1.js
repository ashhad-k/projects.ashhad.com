/* ============ W1 · applications ============
   An application is a thing moving through an institution. The list says
   where each one physically is and what happens next; the detail says who
   touched it, when, and what it cost.                                   */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var filt="live";

/* stage: [name, state]  state: done | now | wait
   who:   who is holding it at this stage                                */
var APPS=[
 {id:"p1", ref:"KON-26-P-4471", svc:"Renew your passport", ic:"renew", state:"live",
  /* This post has no link to the DFA. It knows the date it put a booklet in
     the pouch and it knows the date one comes back; it does not know where
     anything is in Manila's queue in between. So the tracker reports the last
     thing THIS POST did, and gives the DFA's published turnaround as an
     estimate rather than a position. */
  opened:"14 August 2026", chip:["info","Sent to Manila"],
  short:["Identity","Photograph","Signed","Paid","Reviewed","Printing","Courier"],
  where:["truck","Sent to <b>DFA Manila</b> in the pouch on 18 August","Day "+window.KDAYS_SINCE("2026-08-18")+" against the DFA\u2019s published 28\u201356"],
  next:{lbl:"What happens next",t:"Your booklet is printed and couriered",
        p:"Manila prints in batches, and this post is told when a pouch comes back rather than while it is there. The courier reference appears here the moment your booklet leaves Dubai, and you can switch to pickup until then.",
        when:"Expected 9–23 October", cta:null},
  steps:[
   ["Identity confirmed","done","Konsulado","14 Aug 2026 · 19:04","Your passport data page read on your own phone, its check digits verified, and a live face matched to the printed portrait. Nothing was uploaded and nothing was asked of any system outside this post."],
   ["Photograph accepted","done","Konsulado","14 Aug 2026 · 19:07","Taken in the application. ICAO geometry, background and glare all checked before it was accepted."],
   ["Application signed","done","You","14 Aug 2026 · 19:11","Thirteen answers, nine of them already answered by the data page and by this post\u2019s own issuance record. Signed with your device key."],
   ["Fee paid","done","You","14 Aug 2026 · 19:12","AED 265 · receipt KON-R-88431"],
   ["Reviewed by a consular officer","done","PCG Dubai","15 Aug 2026 · 09:22","Officer A. Salvador. Approved without a query."],
   ["Dispatched to Manila","now","PCG Dubai","18 Aug 2026 · 16:40","Sent to the DFA in the daily pouch. What happens after that is the DFA\u2019s, and this post is not told where a booklet sits in their queue \u2014 the twenty-eight to fifty-six days is their published estimate, not a position anybody here can see."],
   ["Couriered to you","wait","Konsulado",null,"To the address on file, or a ten-minute pickup slot if you would rather collect."]],
  docs:[["passport","Current passport P44••••8•A","Data page read on your device — nothing uploaded"],
        ["cert","Photograph","Captured 14 Aug 2026, 35 × 45 mm, accepted"],
        ["pen","Signed application","Signed with your device key, 14 Aug 2026"]],
  fee:[["Consular fee (regular processing)","AED 240"],["Courier to Al Qusais 2","AED 25"]],
  feeTot:"AED 265", paid:"14 August 2026 · KON-R-88431"},

 {id:"r1", ref:"KON-26-R-0147", svc:"Report of Birth · Danila R. Reyes", ic:"baby", state:"live",
  opened:"9 August 2026", chip:["warn","Needs you"],
  short:["Started","Evidence","Reviewed","Queried","Sent on","Issued"],
  where:["warn","Waiting on <b>one document</b> from you","Held 3 days"],
  next:{lbl:"This one needs you",t:"The hospital record needs a clearer photograph",
        p:"The birth weight line is cut off in the image you sent. Retake it in the app and the officer picks it up the same day — nothing else has to be redone.",
        when:"Held since 23 August", cta:["Retake the photograph","rqdoc"]},
  steps:[
   ["Started","done","You","9 Aug 2026 · 21:30","The child's details and both parents. What this post already holds about you filled most of it."],
   ["Evidence submitted","done","You","9 Aug 2026 · 21:44","Hospital record and the attending physician's certificate."],
   ["First review","done","PCG Dubai","11 Aug 2026 · 14:05","Officer M. Ilagan. Everything accepted except the hospital record."],
   ["Query raised","now","PCG Dubai","23 Aug 2026 · 10:12","The birth weight line is cut off. A clearer photograph is all that is needed."],
   ["Sent to Manila for registration","wait","PCG Dubai",null,"Forwarded once the officer signs. The PSA registers it in its own time and does not report back to this post \u2014 the certificate below is the one this post issues, and it is the one you use."],
   ["Certificate issued","wait","Konsulado",null,"Issued into your documents, verifiable by anyone with the QR."]],
  docs:[["cert","Hospital record of birth","Queried — the birth weight line is cut off"],
        ["cert","Physician's certificate","Accepted 11 Aug 2026"],
        ["pen","Acknowledgement of paternity","Sworn by Elias M. Bautista, 9 Aug 2026"]],
  fee:[["Report of Birth (within one year)","Free"]],
  feeTot:"Free", paid:"No fee is charged within twelve months of birth"},

 {id:"n1", ref:"KON-26-N-2210", svc:"Special power of attorney", ic:"key", state:"done",
  opened:"3 July 2026", chip:["ok","Issued"],
  short:["Drafted","Reviewed","Sworn","Notarised","Couriered"],
  where:["tickc","Issued and couriered to <b>Quezon City</b>","Closed 11 July"],
  next:{lbl:"Outcome",t:"Issued and delivered",
        p:"Notarised by video on 8 July, couriered to your brother in Quezon City and signed for on 11 July.",
        when:"Closed 11 July 2026", cta:["Open the document","dc2"]},
  steps:[
   ["Drafted","done","You","3 Jul 2026 · 18:20","Guided drafting — the clauses were assembled from your answers."],
   ["Reviewed","done","PCG Dubai","6 Jul 2026 · 11:40","Officer A. Salvador."],
   ["Sworn by video","done","You","8 Jul 2026 · 15:00","Twelve-minute booth call. Recording retained for the statutory period."],
   ["Notarised","done","PCG Dubai","8 Jul 2026 · 15:14","Entered in the notarial register, folio 2026-0442."],
   ["Couriered","done","Konsulado","11 Jul 2026 · 09:05","Signed for by R. Reyes, Quezon City."]],
  docs:[["key","Special power of attorney","Issued 8 July 2026 · verifiable"],
        ["cert","Notarial register entry","Folio 2026-0442"]],
  fee:[["Notarial fee","AED 100"],["Courier to the Philippines","AED 90"]],
  feeTot:"AED 190", paid:"3 July 2026 · KON-R-81002"},

 {id:"c1", ref:"KON-26-C-1188", svc:"Certified true copy · birth certificate", ic:"stamp", state:"done",
  opened:"12 May 2026", chip:["ok","Issued"],
  short:["Requested","Certified","Issued"],
  where:["tickc","Issued digitally, <b>no visit</b>","Closed the same day"],
  next:{lbl:"Outcome",t:"Issued the same day",
        p:"Certified against the record this post holds and signed digitally. Anyone can check it against the QR without contacting us.",
        when:"Closed 12 May 2026", cta:["Open the document","dc3"]},
  steps:[
   ["Requested","done","You","12 May 2026 · 08:12","One tap — the source document was already in your vault."],
   ["Certified","done","PCG Dubai","12 May 2026 · 10:30","Officer M. Ilagan."],
   ["Issued","done","Konsulado","12 May 2026 · 10:31","Into your documents, verifiable by QR."]],
  docs:[["stamp","Certified true copy","Issued 12 May 2026 · verifiable"]],
  fee:[["Certification fee","AED 100"]],
  feeTot:"AED 100", paid:"12 May 2026 · KON-R-77420"}
];
window.KAPPS=APPS;

function chip(c){
  var ic=c[0]==="ok"?I.tickc:c[0]==="warn"?I.clock:I.truck;
  return '<span class="k-chip '+c[0]+'">'+ic+c[1]+'</span>';
}

/* the rail names only the stage it is on. Naming all seven cropped every
   label to three words and said nothing. */
function rail(a){
  var at=0, now=a.steps[0];
  a.steps.forEach(function(s,i){ if(s[1]!=="wait"){at=i+1;} if(s[1]==="now"){now=s;} });
  if(a.state==="done"){ at=a.steps.length; now=a.steps[a.steps.length-1]; }
  return '<div class="urh">'+a.steps.map(function(s){
      return '<i class="'+(s[1]==="done"?"done":s[1]==="now"?"now":"")+'"></i>';}).join("")+'</div>'+
    '<div class="apnow"><span class="stp">Step '+at+' of '+a.steps.length+'</span>'+
      '<span class="nm'+(a.state==="done"?" ok":"")+'">'+now[0]+'</span>'+
      (now[3]?'<span class="tm">'+now[3]+'</span>':'')+'</div>';
}

function card(a){
  var n=a.next;
  return '<article class="apc">'+
    '<button class="apc-m" data-go="ap'+a.id+'">'+
      '<span class="apc-t"><span class="ai2">'+I[a.ic]+'</span>'+
        '<span class="tt"><h3>'+a.svc+'</h3>'+
          '<span class="rf"><span>'+a.ref+'</span><i></i><span>Opened '+a.opened+'</span></span></span>'+
        chip(a.chip)+'</span>'+
      '<span class="aprail">'+rail(a)+'</span>'+
      '<span class="aplog">'+a.steps.filter(function(s){return s[1]!=="wait";}).slice(-2).reverse()
        .map(function(s){
          return '<span class="lgr"><i class="'+(s[1]==="now"?"now":"")+'"></i>'+
            '<span class="lgt"><b>'+s[0]+'</b><small>'+s[4]+'</small></span>'+
            '<time>'+(s[3]||"")+'</time></span>';}).join("")+'</span>'+
      '<span class="apwhere"><span class="wi">'+I[a.where[0]]+'</span>'+
        '<span class="wt">'+a.where[1]+'</span><span class="el">'+a.where[2]+'</span>'+
        '<span class="opn">Open the record'+I.arr+'</span></span>'+
    '</button>'+
    '<div class="apc-n'+(n.cta&&a.state==="live"?" act":"")+'"><em>'+n.lbl+'</em>'+
      '<b>'+n.t+'</b><p>'+n.p+'</p>'+
      '<span class="when">'+I.cal+n.when+'</span>'+
      (n.cta
        ? '<button class="k-btn'+(a.state==="done"?" ghost":"")+'" data-go="'+n.cta[1]+'">'+n.cta[0]+A+'</button>'
        : '<button class="k-btn ghost" data-go="ap'+a.id+'">Open the full record'+A+'</button>')+
    '</div></article>';
}

P.apps=function(){
  var live=APPS.filter(function(a){return a.state==="live";});
  var done=APPS.filter(function(a){return a.state==="done";});
  var need=APPS.filter(function(a){return a.chip[0]==="warn";});
  var show=filt==="live"?live:filt==="need"?need:filt==="done"?done:APPS;

  return '<div class="uh"><div><span class="kk">My workspace</span>'+
      '<h1>Everything you have filed, and exactly where it is.</h1>'+
      '<p class="lede">No reference numbers to keep, no counter to ring. Each application says who is holding it right now, what happens next, and the date it should happen by.</p></div>'+
      '<div class="uacts"><button class="k-btn ghost" data-go="all">Start a new application'+A+'</button></div></div>'+

    '<div class="umets mb20">'+
      '<div class="umet"><em>In progress</em><b>'+live.length+'</b><small>Opened this year</small></div>'+
      '<div class="umet gold"><em>Waiting on you</em><b>'+need.length+'</b><small>One clearer photograph</small></div>'+
      '<div class="umet ok"><em>Completed</em><b>'+done.length+'</b><small>All issued without a visit</small></div>'+
      '<div class="umet"><em>Average to close</em><b>6d</b><small>Excluding printing in Manila</small></div>'+
    '</div>'+

    '<div class="ufilt">'+
      [["live","In progress",live.length],["need","Needs you",need.length],
       ["done","Completed",done.length],["all","Everything",APPS.length]].map(function(f){
        return '<button class="uf'+(filt===f[0]?" on":"")+'" data-filt="'+f[0]+'">'+f[1]+
          '<span class="n">'+f[2]+'</span></button>';}).join("")+'</div>'+

    (show.length
      ? show.map(card).join("")
      : '<div class="uempty"><span class="ue-i">'+I.box+'</span>'+
        '<b>Nothing here</b><p>No application matches this filter. Everything you have filed is still listed under <em>Everything</em>.</p>'+
        '<button class="k-btn ghost" data-filt="all">Show everything</button></div>')+

    '<div class="unote mt20">'+I.shield+
      '<span><b>Nothing here was filed twice.</b>'+
      '<p>Every one of these was opened from a record this post already holds. Where a document was needed it came out of your vault, not out of a folder at home.</p></span></div>';
};

/* ---------- the detail ---------- */
function detail(a){
  var stateOf={done:I.tick,now:null,wait:null};
  return '<button class="uback" data-go="apps">'+I.arr+'All applications</button>'+
    '<div class="apd-h"><div><h1>'+a.svc+'</h1>'+
      '<div class="rf2"><span>'+a.ref+'</span><span>·</span><span>Opened '+a.opened+'</span>'+
        '<button data-copy="'+a.ref+'">'+I.newdoc+'Copy reference</button></div></div>'+
      '<div class="apd-a">'+chip(a.chip)+
        (a.state==="live"?'<button class="k-btn ghost sm" data-go="ask">Ask about this'+A+'</button>':'')+'</div></div>'+

    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>What has happened</h3>'+
        '<span class="lbl">'+a.steps.filter(function(s){return s[1]==="done";}).length+' of '+a.steps.length+' complete</span></div>'+
        '<div class="upan-b"><div class="urail-v">'+a.steps.map(function(s){
          return '<div class="ust '+s[1]+'"><span class="udot">'+(s[1]==="done"?I.tick:"")+'</span>'+
            '<span class="um"><b>'+s[0]+'</b><p>'+s[4]+'</p>'+
              '<time>'+(s[3]||"Not yet")+(s[2]?" · "+s[2]:"")+'</time></span></div>';
        }).join("")+'</div></div>'+
        (a.state==="live"?'<div class="upan-f"><span>Every line here is written by the system that did the thing, not typed by anyone.</span></div>':'')+
      '</div>'+

      '<div class="ush"><h2>What it is built from</h2></div>'+
      '<div class="upan"><div class="upan-b">'+a.docs.map(function(d){
        return '<div class="apdoc"><span class="di">'+I[d[0]]+'</span>'+
          '<span class="um"><b>'+d[1]+'</b><small>'+d[2]+'</small></span>'+
          '<button class="lk" data-go="docs">Open'+I.arr+'</button></div>';}).join("")+'</div></div>'+
    '</div>'+

    '<div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>'+a.next.lbl+'</h3></div>'+
        '<div class="upan-b"><b style="font-size:15px;display:block;line-height:1.35">'+a.next.t+'</b>'+
          '<p style="margin:7px 0 0;font-size:13px;color:var(--ink-2);line-height:1.55">'+a.next.p+'</p>'+
          '<span class="when" style="display:inline-flex;align-items:center;gap:7px;margin-top:13px;font-family:\'IBM Plex Mono\',monospace;font-size:11px;color:var(--ink-2);background:var(--paper);border:1px solid var(--line);border-radius:999px;padding:5px 11px">'+I.cal+a.next.when+'</span>'+
          (a.next.cta?'<button class="k-btn" style="width:100%;margin-top:14px" data-go="'+a.next.cta[1]+'">'+a.next.cta[0]+A+'</button>':'')+
        '</div></div>'+

      '<div class="upan"><div class="upan-h"><h3>What it cost</h3></div>'+
        '<div class="upan-b"><div class="apfee">'+
          a.fee.map(function(f){return '<div><span>'+f[0]+'</span><b>'+f[1]+'</b></div>';}).join("")+
          '<div class="tot"><span>Total</span><b>'+a.feeTot+'</b></div></div>'+
          '<p class="paidon">'+a.paid+'</p>'+
          '<button class="lk mt10" data-go="pay">Open the receipt'+I.arr+'</button>'+
        '</div></div>'+

      '<div class="unote'+(a.state==="live"?"":" ok")+'">'+(a.state==="live"?I.alert:I.tickc)+
        '<span><b>'+(a.state==="live"?"If this stalls":"This is final")+'</b>'+
        '<p>'+(a.state==="live"
          ? "Nothing here needs chasing. If a stage runs past its date the duty officer is told before you are, and you get a message with the reason — not a status page that stopped moving."
          : "Issued, delivered and closed. The record stays in your documents for as long as you want it, and can be re-verified by anyone at any time.")+'</p>'+
        '<span class="lk" data-go="'+(a.state==="live"?"ask":"docs")+'">'+(a.state==="live"?"Ask about this application":"Open your documents")+I.arr+'</span></span></div>'+
    '</div></div>';
}
APPS.forEach(function(a){ P["ap"+a.id]=function(){ return detail(a); }; });

/* the one thing this application is waiting for. It used to link to the
   passport crop screen, which showed a 35x45 portrait and a passport
   reference — the wrong journey entirely. */
P.rqdoc=function(){
  return '<button class="uback" data-go="apr1">'+I.arr+'Report of Birth</button>'+
    '<div class="uh"><div><span class="kk">One document</span>'+
      '<h1>Photograph the hospital record again.</h1>'+
      '<p class="lede">Only this one page, and only because the birth weight line is cut off in the image you sent. Everything else in the application stands — nothing is being re-checked and nothing is being re-paid.</p></div></div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>What the officer could not read</h3>'+
        '<span class="lbl">Query raised 23 August</span></div><div class="upan-b">'+
        '<div class="unote warn">'+I.alert+'<span><b>“Birth weight: ____ ”</b>'+
          '<p>The line runs off the bottom edge of the photograph. The PSA will not register a Report of Birth without it, so the officer held the application rather than sending it on and having it come back.</p></span></div>'+
        '<div class="vver mt16">'+
        [["Lay the page flat, in daylight","A window is better than a lamp. Avoid the shadow of your own hand."],
         ["Get the whole page in the frame","All four corners visible, including the line at the bottom."],
         ["Hold still until the frame turns green","The application checks legibility, glare and crop before it accepts anything."],
         ["Nothing else is needed","The physician’s certificate and the acknowledgement of paternity were both accepted on 11 August."]]
        .map(function(v,i){return '<div class="vst"><span class="vn">'+(i+1)+'</span>'+
          '<span class="um"><b>'+v[0]+'</b><p>'+v[1]+'</p></span></div>';}).join("")+
        '</div>'+
        '<div class="vacts mt20"><button class="k-btn" data-go="apr1">'+I.magni+'Open the camera</button>'+
          '<button class="k-btn ghost" data-go="apr1">Upload a photograph instead</button></div>'+
      '</div></div>'+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>What happens after</h3></div><div class="upan-b">'+
        '<div class="urail-v">'+
        [["The officer picks it up the same day","M. Ilagan has the application open; it goes back into her queue, not to the end of a new one."],
         ["Sent to Manila for registration","Once she signs. That is the PSA's own timetable and this post is not told when it completes."],
         ["Issued into your documents","Verifiable by anyone with the code, without contacting this post."]]
        .map(function(x,i){return '<div class="ust '+(i===0?"now":"wait")+'"><span class="udot"></span>'+
          '<span class="um"><b>'+x[0]+'</b><p>'+x[1]+'</p></span></div>';}).join("")+
        '</div></div></div>'+
      '<div class="unote ok">'+I.tickc+'<span><b>Nothing else has to be redone.</b>'+
        '<p>The fee was nil, the evidence was accepted and the child\u2019s details are already registered against your record. This is one photograph.</p></span></div>'+
    '</div></div>';
};

document.addEventListener("click",function(e){
  var f=e.target.closest("[data-filt]");
  if(f){ filt=f.getAttribute("data-filt"); window.KRENDER("apps"); }
});
})();
