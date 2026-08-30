/* ============ M2 · modules, then a router inside the module ============
   The catalogue is the same set of module cards. Opening one does not drop
   you into a form — it asks what happened, and routes from the answer.  */
(function(){
"use strict";
var P=window.KP, I=window.KI, CAT=window.KCAT, V=window.KVERD;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var open=null;


/* what the post already holds, per module — the router should open with
   the record it is going to work from, not with a passport every time */
var HOLD={
 passport:{ic:"passport",em:"Current ePassport",big:"P44&bull;&bull;&bull;&bull;8&bull;A",ok:"On file",
   rows:[["Holder","Maria Cristina Santos Reyes"],["Expires","11 September 2022"],["Issued at","PCG Dubai"],["Jurisdiction","Dubai &amp; the Northern Emirates"]]},
 civil:{ic:"baby",em:"Your civil register",big:"Three records",ok:"Issued by this post",
   rows:[["Civil status","Single &middot; CENOMAR on file"],["Dependants","Danila R. Reyes, 6 months"],["Report of Birth","KON-26-R-0147 &middot; with this post"],["Registering post","PCG Dubai"]]},
 notary:{ic:"pen",em:"Your notarial standing",big:"Level 2 verified",ok:"Eligible at this post",
   rows:[["Notarial authority","RA 7157 &middot; VCCR Art. 5(f)"],["Signature on file","Enrolled 14 Aug 2026"],["Documents notarised","1 this year"],["Jurisdiction","Dubai &amp; the Northern Emirates"]]},
 legal:{ic:"stamp",em:"Your document vault",big:"6 documents",ok:"Encrypted",
   rows:[["Ready to certify","Passport, NBI, CENOMAR"],["Issued by this post","1 certified copy"],["Verification","QR, checkable by anyone"],["Destination","UAE &mdash; consularised, not apostilled"]]},
 citizen:{ic:"globe",em:"Your citizenship record",big:"Filipino &middot; by birth",ok:"Proved",
   /* the basis is the document that was actually read, not a PSA record this
      post has no way to see. */
   rows:[["Basis","Your passport data page, read on your device"],["Other nationality","None declared"],["Oath taken at","&mdash;"],["Jurisdiction","Dubai &amp; the Northern Emirates"]]},
 /* Nothing about UAE residence is verified. There is no link to ICA and there
    may never be one: the residence card is read on the device and held as the
    holder's word with a card behind it. The chip has to say that. */
 visa:{ic:"plane",em:"Sponsor standing",big:"Eligible to sponsor",ok:"Given by you",
   rows:[["Status in the UAE","Resident \u2014 from the card you showed, not checked with ICA"],["Applications you host","0 open"],["Interview mode","By video, from here"],["Jurisdiction","Dubai &amp; the Northern Emirates"]]},
 help:{ic:"warn",em:"Assistance record",big:"No open case",ok:"Duty officer live",
   rows:[["Emergency contact","Rafael Reyes &middot; Manila"],["Location on file","Al Qusais 2, Dubai"],["Duty line","Answered in Filipino, 24 hours"],["Jurisdiction","Dubai &amp; the Northern Emirates"]]},
 vote:{ic:"ballot",em:"Your registration",big:"Not yet registered",ok:"Eligible",
   rows:[["Voter registration","Needs your fingerprints, once"],["Nearest session","Sharjah &middot; 23 October"],["Precinct","Overseas &middot; PCG Dubai"],["Precinct roll","Overseas absentee &middot; PCG Dubai"]]}
};
var URGE={
 passport:["Travelling urgently without a passport?","An emergency travel document is a separate, faster route and the duty officer arranges it the same day.","Emergency assistance"],
 civil:["A death in the family?","Reporting a death, repatriation and the certificates that follow are handled together, and the duty officer starts it with you.","Speak to the duty officer"],
 notary:["Signing under time pressure?","If a deadline in the Philippines is days away, say so when you choose a route and the booth slot is prioritised.","Flag an urgent matter"],
 legal:["A document needed abroad this week?","Tell us the destination country first &mdash; it decides whether the document is consularised here or apostilled in Manila.","Check your destination"],
 citizen:["Losing your Filipino citizenship by naturalising?","Re-acquisition under RA 9225 restores it, and it can be started before you take the other oath.","Talk it through first"],
 visa:["Your visitor already at the airport?","A visa problem in transit is a duty-officer matter, not an application.","Emergency assistance"],
 help:["Is someone in immediate danger?","Call the duty line rather than filling anything in. It is answered in Filipino, at any hour.","Call the duty officer"],
 vote:["Registration closing soon?","Overseas registration closes months before an election. The Sharjah session on 23 October is the last one this year.","See the session"]
};

var KIND={never:"Standard route", booth:"Supervised route", reach:"Outreach route", once:"In-person route"};

function mod(c,i){
  var live=c.s.some(function(s){return s[5];});
  var n=c.s.filter(function(s){return s[5];}).length;
  return '<section class="mod'+(live?" on":"")+'">'+
    '<div class="mod-h"><span class="mt2">'+I[c.ic]+'</span>'+
      '<span><span class="st4">'+(live?"Available in this demo":"Visible · disabled")+'</span>'+
        '<h3>'+c.n+'</h3></span>'+
      '<span class="rc">'+(live?n+' live journey'+(n===1?"":"s"):"Full rollout")+'</span></div>'+
    '<p class="desc">'+c.lead+'</p>'+
    '<div class="mod-l">'+c.s.map(function(s,x){
      return '<div class="mod-s"><span class="nn">'+(x<9?"0":"")+(x+1)+'</span>'+
        '<b>'+s[0]+'</b>'+
        '<span class="fee6">'+s[3]+'</span>'+
        '<span class="tg'+(s[5]?" demo":"")+'">'+(s[5]?"Live":V[s[1]].lab)+'</span></div>';
    }).join("")+'</div>'+
    '<div class="mod-f">'+(live
      ? '<button class="go6" data-mod="'+i+'">Open this module'+I.arr+'</button>'
      : '<button class="go6 off" disabled>Listed &mdash; the journey is not built yet</button>')+
    '</div></section>';
}

function catalogue(){
  var tot=0; CAT.forEach(function(c){tot+=c.s.length;});
  return '<div class="mhead">'+
      '<div class="top3"><span class="kk3">Service catalogue</span>'+
        '<span class="badge">Stakeholder demo</span></div>'+
      '<h1>Every consular service in one system.</h1>'+
      '<p class="lede2">Eight modules, '+tot+' services. The whole platform is visible so you can see its shape — '+
      'one module is switched on in this build and the rest are specified, costed and deliberately disabled.</p>'+
    '</div>'+
    '<div class="mods">'+CAT.map(mod).join("")+'</div>';
}

function router(i){
  var c=CAT[i];
  var h=HOLD[c.id]||HOLD.passport, u=URGE[c.id]||URGE.passport;
  if(!HOLD[c.id]) console.warn("router: no holdings card for module "+c.id);
  return '<button class="rback" data-mod="back">'+I.arr+'All modules</button>'+
    '<div class="rt"><div class="rt-top">'+
      '<div><span class="kk3">'+c.n+' · service router</span>'+
        '<h1>Start with what happened, not a government form.</h1>'+
        '<p>Choose your situation once. The application opens the right legal route, the right questions and the right evidence — and asks for nothing that does not apply to you.</p></div>'+
      '<div class="pcard">'+
        '<div class="ph2"><span class="ic4">'+I[h.ic]+'</span>'+
          '<span><em>'+h.em+'</em><b>'+h.big+'</b></span>'+
          '<span class="okk">'+I.tickc+h.ok+'</span></div>'+
        h.rows.map(function(r){return '<div class="rw2"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join("")+
      '</div>'+
    '</div>'+

    '<span class="rt-kk">Choose one situation</span>'+
    '<div class="rt-q"><h2>What do you need to do?</h2>'+
      '<span class="hint3">Follow-up questions appear only where the answer changes your requirements.</span></div>'+
    '<div class="routes">'+c.s.map(function(s,si){
      var live=!!s[5], urgent=/lost|stolen|emergency|damaged/i.test(s[0]);
      return '<'+(live?'button':'div')+' class="rte'+(live?" live2":"")+(urgent&&!live?" warn2":"")+'"'+
        (live?' data-go="renew"':'')+'>'+
        '<span class="rd2"></span>'+
        '<span class="ic5">'+I[s[6]]+'</span>'+
        '<span class="kt">'+KIND[s[1]]+'</span>'+
        '<b>'+s[0]+'</b><p>'+s[2]+'</p>'+
        '<span class="fee5">'+s[3]+' · '+s[4]+'</span>'+
        '<span class="nx">'+(live?'Start this journey'+I.arr:'Listed · not in this build')+'</span>'+
      '</'+(live?'button':'div')+'>';
    }).join("")+
      '<div class="rte help2"><span class="ic5">'+I.people+'</span>'+
        '<span class="kt">Not sure?</span>'+
        '<b>Let an officer decide</b>'+
        '<p>Describe what happened in your own words and a consular officer picks the route for you, by video, usually within the hour.</p>'+
        '<span class="nx">Always available</span></div>'+
      '<i class="rfill"></i><i class="rfill"></i>'+
    '</div>'+

    '<div class="urg2">'+I.warn+
      '<span><b>'+u[0]+'</b><p>'+u[1]+'</p></span>'+
      '<span class="lk" data-go="sos">'+u[2]+I.arr+'</span></div>'+
    '</div>';
}

P.all=function(){ return open===null ? catalogue() : router(open); };

/* the nav lists the busiest modules directly, and each opens its router */
CAT.forEach(function(c,i){
  P["mod"+i]=function(){
    /* one module is live in this build. The rest are a listing — opening a
       router for them would promise journeys that are not built. */
    if(!c.s.some(function(s){return s[5];})){ open=null; return catalogue(); }
    open=i; return router(i);
  };
});

document.addEventListener("click",function(e){
  var b=e.target.closest("[data-mod]"); if(!b) return;
  var v=b.getAttribute("data-mod");
  open = (v==="back") ? null : +v;
  if(window.KRENDER) window.KRENDER("all");
});
})();
