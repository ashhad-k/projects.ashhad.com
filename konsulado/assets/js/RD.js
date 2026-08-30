/* ============ RD · my readiness ============
   What the post can already do for you without you appearing, what it
   cannot yet, and the one thing that would change that.               */
(function(){
"use strict";
var P=window.KP, I=window.KI, CAT=window.KCAT;
var A=I.arr.replace("<svg",'<svg class="k-arr"');

/* read from the vault rather than kept here, so the two can never disagree */
function docs(){
  return (window.KVAULT||[]).map(function(d){
    return [d.ic,d.n,d.ref,d.ex,d.state==="mute"?"info":d.state,d.life];
  });
}
var COL={ok:"var(--ok)",warn:"var(--gold-fill)",bad:"var(--bad)",info:"var(--blue)"};

P.ready=function(){
  var tot=0,nv=0,booth=0,once=0;
  CAT.forEach(function(c){c.s.forEach(function(s){tot++;
    if(s[1]==="never")nv++; else if(s[1]==="booth"||s[1]==="reach")booth++; else once++;});});

  return '<div class="rd2h">'+
      '<div><span class="kk3">Your standing with this post</span>'+
        '<h1>What we can already do without seeing you.</h1>'+
        '<p>Your identity is verified and this post holds your record, so most of the catalogue is open to you from where you are. This page says exactly how much, and what would open the rest.</p>'+
        '<div class="rdfacts">'+
          '<div><em>Verified since</em><b>14 August 2026</b><small>Document check, liveness, face match</small></div>'+
          '<div><em>Held for you</em><b>'+docs().length+' documents</b><small>Encrypted, never asked for twice</small></div>'+
          '<div><em>Visits in 2026</em><b>None</b><small>Everything so far was done from home</small></div>'+
        '</div></div>'+
      '<div class="score"><em>Services open to you</em>'+
        '<div class="big2"><b>'+nv+'</b><span>of '+tot+' need no visit</span></div>'+
        '<div class="bar3"><i style="flex:'+nv+';background:var(--ok)"></i>'+
          '<i style="flex:'+booth+';background:var(--gold-fill)"></i>'+
          '<i style="flex:'+once+';background:rgba(255,255,255,.28)"></i></div>'+
        '<div class="lg2"><span><i style="background:var(--ok)"></i>'+nv+' no visit</span>'+
          '<span><i style="background:var(--gold-fill)"></i>'+booth+' short session</span>'+
          '<span><i style="background:rgba(255,255,255,.28)"></i>'+once+' one visit</span></div>'+
        '<p class="nxt"><b>One twenty-minute enrolment</b> at the Sharjah mission on 23 October moves the '+once+' services that need your fingerprints, taking you to '+(nv+once)+' of '+tot+'. The remaining '+booth+' need a supervised session, and a DFA issuance would move most of those too.</p>'+
      '</div>'+
    '</div>'+

    '<div class="rdgrid">'+
      '<section class="card"><div class="card-b">'+
        '<h3 style="font-size:16px;margin-bottom:3px">Your documents, and how long they last</h3>'+
        '<p style="margin:0 0 14px;font-size:13px;color:var(--ink-2)">Held encrypted, so you are never asked for the same paper twice.</p>'+
        '<div class="doclife">'+docs().map(function(d){
          return '<div class="rdl'+(d[4]==="bad"?" bad2":"")+'"><span class="ic6">'+I[d[0]]+'</span>'+
            '<span class="dlm"><b>'+d[1]+'</b>'+
              '<span class="lifebar"><i style="width:'+d[5]+'%;background:'+COL[d[4]]+'"></i></span>'+
              '<small>'+d[3]+'</small></span>'+
            '<span class="rt4">'+d[2]+'</span></div>';
        }).join("")+'</div>'+
        '<p style="margin:13px 0 0;font-size:12.5px;color:var(--ink-2);line-height:1.55">'+
        '<b>Your CENOMAR expires in '+window.KDAYS("2026-10-05")+' days</b>, and your wedding is on 21 November. This post requests a replacement from the PSA for you.</p>'+
      '</div></section>'+

      '<section class="card"><div class="card-b">'+
        '<h3 style="font-size:16px;margin-bottom:3px">What your identity level unlocks</h3>'+
        '<p style="margin:0 0 14px;font-size:13px;color:var(--ink-2)">Verified level 2 since 14 August 2026 — document check, liveness and face match, all done in the application.</p>'+
        '<div class="unlock">'+
          '<div class="ul yes">'+I.tickc+'<span class="ulm"><b>Everything that needs no appearance</b><small>Renewals, registrations, certifications, legalisation, assistance.</small></span><span class="cn3">'+nv+'</span></div>'+
          '<div class="ul yes">'+I.tickc+'<span class="ulm"><b>Anything sworn in a supervised session</b><small>Powers of attorney and affidavits — a video call, or five minutes at an outreach mission.</small></span><span class="cn3">'+booth+'</span></div>'+
          '<div class="ul no">'+I.clock+'<span class="ulm"><b>Anything needing your fingerprints</b><small>First passports, minors and biometric enrolment. Taken once, never repeated.</small></span><span class="cn3">'+once+'</span></div>'+
        '</div>'+
        '<p style="margin:13px 0 0;font-size:12.5px;color:var(--ink-2);line-height:1.55">'+
        'Nothing here depends on another agency. Your level was established by this post and it is this post that honours it.</p>'+
        '<div class="lvlup"><span class="lu-i">'+I.finger+'</span>'+
          '<span class="ulm"><b>Level 3 &mdash; biometrics on file</b>'+
            '<small>Ten prints and a live photograph, taken once. It moves '+once+' services out of the queue for good and never expires.</small></span>'+
          '<span class="lk" data-go="book">Where to do it'+A+'</span></div>'+
      '</div></section>'+
    '</div>'+

    '<div class="promo ptk">'+
      '<div class="tk-stub"><span class="m">Oct</span><b>23</b><small>Friday</small>'+
        '<span class="tm">08:00 – 17:00</span></div>'+
      '<div class="tk-body"><span class="tkart"></span>'+
        '<span class="lbl">The one thing that would change this</span>'+
        '<h3>Twenty minutes in Sharjah takes you to '+(nv+once)+' of '+tot+'.</h3>'+
        '<p>Fingerprints, national ID and voter registration in a single session, walk in any time. After it, the only things left are the twelve that need a supervised session — and a DFA issuance on remote notarisation would move most of those as well.</p>'+
        '<div class="tk-chips">'+["Ten fingerprints and a photograph","National ID enrolment","Voter registration","Police clearance prints"]
          .map(function(c){return '<span>'+I.tickc+c+'</span>';}).join("")+'</div>'+
        '<button class="k-btn gold" data-go="book">Book the session'+A+'</button>'+
        '<span class="tk-serial"><span class="bars"></span>'+
          '<span class="ref">KON · OM · 231026 · SHJ</span></span>'+
      '</div></div>';
};
})();
