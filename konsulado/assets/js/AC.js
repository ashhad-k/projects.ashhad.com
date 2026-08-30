/* ============ AC · account ============
   Family profiles and delegation, and the account model: no password, a
   visible access log, and an honest answer to losing your phone.       */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');

var PEOPLE=[
 {id:"1",n:"Danila R. Reyes",mono:"DR",col:"g",rel:"Daughter · 6 months old",loc:"Lives with you, Al Qusais 2",
  mand:"You act for her as parent",
  lines:[["warn","Report of Birth is with Manila — one photograph still needed"],
         ["mute","No passport yet · her first application opens at the October mission"],
         ["ok","Her record is linked to yours, so nothing is asked twice"]],
  docs:[["baby","Report of Birth","In progress · KON-26-R-0147"],
        ["cert","Hospital record of birth","Queried — needs a clearer photograph"]],
  apps:[["Report of Birth","Needs you","apr1"]],
  scope:[["What you may do","Everything a parent may do — apply, sign, pay, collect"],
         ["Until","Her eighteenth birthday, 2 February 2044"],
         ["Established by","Her Report of Birth naming you as mother, and your own record"],
         ["She will inherit","Her own account at 18, with this record already in it"]]},
 {id:"2",n:"Rafael A. Reyes",mono:"RR",col:"",rel:"Brother · 39",loc:"Quezon City, Philippines",
  mand:"He acts for you, under a signed mandate",
  lines:[["ok","Holds your special power of attorney, active since 8 July 2026"],
         ["ok","Used it once — Registry of Deeds, Quezon City, 14 July"],
         ["mute","Has no sight of anything else in your file"]],
  docs:[["key","Special power of attorney","KON-D-2026-0442 · active"]],
  apps:[["Special power of attorney","Issued","apn1"]],
  scope:[["What he may do","Sell one registered parcel in Quezon City, on your behalf"],
         ["What he may not do","See your passport, your address, your other documents or your applications"],
         ["Until","Revoked by you, or the sale completes"],
         ["Revocation","Immediate. The next check anywhere returns revoked."]]},
 {id:"3",n:"Corazon S. Reyes",mono:"CR",col:"t",rel:"Mother · 68",loc:"Al Nahda, Sharjah",
  mand:"You act for her, at her request",
  lines:[["ok","Her consent was recorded on video, 12 March 2026"],
         ["mute","Nothing open at the moment"],
         ["ok","She can withdraw it herself, at any post, without asking you"]],
  docs:[["cert","Recorded consent","12 March 2026 · video, retained"]],
  apps:[],
  scope:[["What you may do","Act for her in this post\u2019s jurisdiction \u2014 certifications, notarials, assistance"],
         ["What you may not do","Change her details, or act on anything not listed"],
         ["Until","12 March 2027, then it lapses unless she renews it"],
         ["She keeps control","She sees every use of it, and can end it at any Philippine post"]]}
];

function person(p){
  return '<button class="percard" data-go="pe'+p.id+'">'+
    '<span class="percard-t"><span class="mono2 '+p.col+'">'+p.mono+'</span>'+
      '<span class="um"><b>'+p.n+'</b><small>'+p.rel+' · '+p.loc+'</small></span></span>'+
    '<span class="percard-b">'+p.lines.map(function(l){
      return '<span class="pline '+l[0]+'">'+(l[0]==="ok"?I.tickc:l[0]==="warn"?I.alert:I.clock)+
        '<span class="um">'+l[1]+'</span></span>';}).join("")+'</span>'+
    '<span class="percard-f"><span class="mand">'+p.mand+'</span>'+
      '<span class="pgo">Open'+I.arr+'</span></span></button>';
}

P.fam=function(){
  return '<div class="uh"><div><span class="kk">Account</span>'+
      '<h1>The people you act for, and the one who acts for you.</h1>'+
      '<p class="lede">Consular work is rarely done alone. A parent files for a child, a sibling in Manila signs for someone in Dubai, an elderly parent asks for help. Every one of those is a delegation with a scope and an end date — not a shared password.</p></div>'+
      '<div class="uacts"><button class="k-btn ghost" data-go="all">Add someone'+A+'</button></div></div>'+
    '<div class="pgrid">'+PEOPLE.map(person).join("")+'</div>'+
    '<div class="unote mt20">'+I.shield+
      '<span><b>Nobody here can see your file.</b>'+
      '<p>A delegation carries exactly the authority written into it and nothing else. Your brother can sell one parcel of land; he cannot see your passport. Your mother can be helped; she can also end that help herself, from any Philippine post, without going through you.</p>'+
      '<span class="lk" data-go="me">How your account is protected'+I.arr+'</span></span></div>';
};

function pdetail(p){
  return '<button class="uback" data-go="fam">'+I.arr+'Family profiles</button>'+
    '<div class="apd-h"><div><h1>'+p.n+'</h1>'+
      '<div class="rf2"><span>'+p.rel+'</span><span>·</span><span>'+p.loc+'</span></div></div>'+
      '<div class="apd-a"><span class="k-chip info">'+I.people+p.mand+'</span></div></div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>Exactly what the mandate allows</h3>'+
        '<span class="lbl">Written, not assumed</span></div>'+
        '<div class="upan-b"><div class="ukv">'+p.scope.map(function(s){
          return '<div><span>'+s[0]+'</span><b>'+s[1]+'</b></div>';}).join("")+'</div></div>'+
        '<div class="upan-f"><span>Every use of this mandate is logged on both sides</span>'+
          '<button class="lk" data-go="me">See the log'+I.arr+'</button></div></div>'+
      '<div class="ush"><h2>Documents</h2></div>'+
      '<div class="upan"><div class="upan-b">'+p.docs.map(function(d){
        return '<div class="apdoc"><span class="di">'+I[d[0]]+'</span>'+
          '<span class="um"><b>'+d[1]+'</b><small>'+d[2]+'</small></span>'+
          '<button class="lk" data-go="docs">Open'+I.arr+'</button></div>';}).join("")+'</div></div>'+
      (p.apps.length?'<div class="ush"><h2>Open with this post</h2></div>'+
        '<div class="ulist">'+p.apps.map(function(a){
          return '<button class="uli" data-go="'+a[2]+'"><span class="uic">'+I.grid+'</span>'+
            '<span class="um"><b>'+a[0]+'</b><small>'+a[1]+'</small></span>'+
            '<span class="uend">'+I.arr.replace("<svg",'<svg class="uarr"')+'</span></button>';}).join("")+'</div>':"")+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-b">'+
        '<span class="lbl">Actions</span>'+
        '<button class="k-btn wide" data-go="all">Start something for '+p.n.split(" ")[0]+A+'</button>'+
        '<button class="k-btn ghost wide" data-go="me">See every use of this mandate</button>'+
        '<button class="lk mt10" data-go="ask">'+(p.id==="2"?"Revoke the power of attorney":"End this arrangement")+I.arr+'</button>'+
      '</div></div>'+
      '<div class="unote'+(p.id==="1"?" warn":"")+'">'+(p.id==="1"?I.alert:I.shield)+
        '<span><b>'+(p.id==="1"?"One thing is waiting on you":"This is reversible, immediately")+'</b>'+
        '<p>'+(p.id==="1"
          ? "Her Report of Birth is held for a clearer photograph of the hospital record. Nothing else in it has to be redone, and the officer picks it up the same day."
          : "Ending a delegation takes effect at once, everywhere. There is no notice period and nothing to post — the next check anyone runs comes back revoked.")+'</p>'+
        (p.id==="1"?'<span class="lk" data-go="rqdoc">Retake the photograph'+I.arr+'</span>':"")+'</span></div>'+
    '</div></div>';
}
PEOPLE.forEach(function(p){ P["pe"+p.id]=function(){ return pdetail(p); }; });

/* ---------- profile & security ---------- */
var LOG=[
 ["flag","Officer A. Salvador opened your file","To review passport renewal KON-26-P-4471. Saw: your passport record, your photograph, your application.","15 Aug 2026 · 09:22"],
 ["","Officer M. Ilagan opened Danila's file","To review the Report of Birth. Saw: the hospital record and the physician's certificate. Did not open your file.","11 Aug 2026 · 14:05"],
 ["you","You verified your identity","Face match on this iPhone. No officer was involved.","14 Aug 2026 · 19:04"],
 ["","Registry of Deeds, Quezon City","Checked your special power of attorney against our register. Saw: that it is valid, and what it authorises. Nothing else.","14 Jul 2026 · 10:40"],
 ["you","You signed in on a new device","MacBook Pro · Dubai. Approved from your iPhone.","2 Aug 2026 · 20:15"]
];

P.me=function(){
  return '<div class="uh"><div><span class="kk">Account</span>'+
      '<h1>Your face is the account. There is no password to steal.</h1>'+
      '<p class="lede">Your phone number is who you are, your face is the proof, and the key lives in your device’s secure element. Nothing is typed, so nothing can be guessed, phished, reused or sold.</p></div>'+
      '<div class="uacts"><span class="k-chip ok">'+I.tickc+'Verified · level 2</span></div></div>'+

    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>Your identity level</h3>'+
        '<span class="lbl">Established by this post, honoured by this post</span></div>'+
        '<div class="upan-b flush"><div class="lvl">'+
        '<div class="lv on"><span class="ln">1</span><span class="um"><b>A verified phone number</b>'+
          '<small>Establishes that someone can be reached. Enough to browse and to ask.</small></span>'+
          '<span class="k-chip ok">'+I.tickc+'Done</span></div>'+
        '<div class="lv on"><span class="ln">2</span><span class="um"><b>Document check, liveness and face match</b>'+
          '<small>Your data page read, a live capture matched against it, all inside the application. Since 14 August 2026.</small></span>'+
          '<span class="k-chip ok">'+I.tickc+'Done</span></div>'+
        '<div class="lv next"><span class="ln">3</span><span class="um"><b>Biometrics on file</b>'+
          '<small>Ten fingerprints and a photograph, taken once, in person. Opens twelve more services and never expires.</small></span>'+
          '<button class="k-chip warn" data-go="book">'+I.clock+'23 October</button></div>'+
        '</div></div>'+
        '<div class="upan-f"><span>No level here depends on another agency’s system</span>'+
          '<button class="lk" data-go="ready">What each level unlocks'+I.arr+'</button></div></div>'+

      '<div class="ush"><h2>Who has opened your record</h2>'+
        '<p>Every access, including by consular staff, with the reason and exactly what was visible. This is the part most systems do not show you.</p></div>'+
      '<div class="upan"><div class="upan-b"><div class="alog">'+LOG.map(function(l){
        return '<div class="alr '+l[0]+'"><i></i><span class="um"><b>'+l[1]+'</b><small>'+l[2]+'</small></span>'+
          '<time>'+l[3]+'</time></div>';}).join("")+'</div></div>'+
        '<div class="upan-f"><span>Held for six years, and exportable</span>'+
          '<button class="lk" data-go="ask">Something here looks wrong'+I.arr+'</button></div></div>'+

      '<div class="ush"><h2>Devices holding your key</h2></div>'+
      '<div class="upan"><div class="upan-b"><div class="devs">'+
        '<div class="dev"><span class="dvi">'+I.finger+'</span>'+
          '<span class="um"><b>iPhone 15 · this device</b><small>Face ID · Dubai · added 14 Aug 2026</small></span>'+
          '<span class="k-chip ok">'+I.tickc+'Primary</span></div>'+
        '<div class="dev"><span class="dvi">'+I.build+'</span>'+
          '<span class="um"><b>MacBook Pro</b><small>Touch ID · Dubai · last used 24 Aug 2026</small></span>'+
          '<button class="lk">Remove</button></div>'+
      '</div></div></div>'+
    '</div>'+

    '<div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>If you lose your phone</h3></div><div class="upan-b">'+
        '<p class="nxp mt0">The honest answer, because this is the question every no-password system has to survive.</p>'+
        '<div class="vver mt16">'+
          [["Nothing on the phone is your account","The key on it is one of several. Losing the phone loses that key, not your record — which lives here, not there."],
           ["You re-verify the way you first did","Your number, then a live face match against the record this post already holds. Two minutes, from any device."],
           ["A duty officer confirms it is you","For a lost device, the face match alone is not enough. A short video call with an officer completes it — the same officer standard as a counter."],
           ["The old key is dead the moment the new one lives","And the access log shows the whole thing, so you can see nobody else tried."]]
          .map(function(v,i){return '<div class="vst"><span class="vn">'+(i+1)+'</span>'+
            '<span class="um"><b>'+v[0]+'</b><p>'+v[1]+'</p></span></div>';}).join("")+
        '</div></div></div>'+

      '<div class="upan"><div class="upan-h"><h3>What is held about you</h3></div><div class="upan-b">'+
        '<div class="ukv">'+
          '<div><span>Documents</span><b>6</b></div>'+
          '<div><span>Applications</span><b>4</b></div>'+
          '<div><span>Biometric templates</span><b>1 · face</b></div>'+
          '<div><span>Shared with another agency</span><b>None</b></div>'+
          '<div><span>Sold or used for anything else</span><b>Never</b></div>'+
        '</div>'+
        '<div class="vacts"><button class="k-btn ghost sm">Export everything</button>'+
          '<button class="k-btn ghost sm">Close this account</button></div>'+
        '<p class="paidon">Closing removes your record here. It does not remove a document already issued — those stay in the register, because a bank that checked one has to keep being able to.</p>'+
      '</div></div>'+

      '<div class="unote ok">'+I.shield+'<span><b>Nothing here depends on PhilSys or UAE PASS.</b>'+
        '<p>The identity was established by this post and is honoured by this post. If a national system is connected later it becomes another way in — never the only one, and never a reason someone cannot be served today.</p></span></div>'+
    '</div></div>';
};
})();
