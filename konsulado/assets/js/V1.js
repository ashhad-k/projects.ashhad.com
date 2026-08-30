/* ============ V1 · the document vault ============
   Two kinds live here: what this post has issued you, which anyone can
   verify without contacting us, and what you gave us, which you should
   never have to give again.                                            */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var tab="all";

/* a QR block drawn as a grid, so it is a real mark and not a picture */
var QRSEED="1101001011010110010110100101101011001011010010110101100101101001011010110010110100101101011001011010";
function qr(seed,n){
  n=n||9;
  var cells="", s=(seed||"")+QRSEED;
  for(var y=0;y<n;y++)for(var x=0;x<n;x++){
    var corner=(x<3&&y<3)||(x>n-4&&y<3)||(x<3&&y>n-4);
    var on=corner ? !((x===1&&y===1)||(x===n-2&&y===1)||(x===1&&y===n-2))
                  : s.charCodeAt((y*n+x)%s.length)%2===1;
    if(on) cells+='<rect x="'+x+'" y="'+y+'" width="1" height="1"/>';
  }
  return '<svg viewBox="0 0 '+n+' '+n+'" fill="currentColor" shape-rendering="crispEdges">'+cells+'</svg>';
}

window.KQR=qr;

/* id, icon, name, reference, kind, state, life%, expiry line, blurb
   kind is the tier, and it is the whole trust model of this product:
     proved  — read off the document itself on the device and matched to a
               live face. Evidence. Nothing outside this post had to answer.
     given   — you typed it or uploaded it. Useful, reusable, and never
               treated as evidence of anything.
     issued  — this post sealed it. Anyone can check it in seconds.
   Every row in the vault says which of the three it is, because a record
   that does not say what it rests on is worth nothing at a counter. */
var DOCS=[
 {id:"1",ic:"passport",n:"Philippine passport",ref:"P44••••8•A",kind:"proved",state:"bad",life:0,
  ex:"Expired 11 September 2022",flag:"Expired",
  blurb:"A five-year booklet. Your renewal is filed and the replacement will be a ten-year one.",
  src:"Read from your booklet and matched to your face · 14 Aug 2026"},
 {id:"2",ic:"key",n:"Special power of attorney",ref:"KON-D-2026-0442",kind:"issued",state:"ok",life:100,
  ex:"No expiry · revocable by you",flag:"Verifiable",
  blurb:"Notarised by video on 8 July 2026 and entered in the notarial register.",
  src:"Issued by PCG Dubai · folio 2026-0442"},
 {id:"3",ic:"stamp",n:"Certified true copy · birth certificate",ref:"KON-D-2026-0311",kind:"issued",state:"ok",life:100,
  ex:"No expiry",flag:"Verifiable",
  blurb:"Certified against the record this post holds and signed digitally.",
  src:"Issued by PCG Dubai · 12 May 2026"},
 {id:"4",ic:"cert",n:"NBI clearance",ref:"NBI-2026-88214",kind:"given",state:"warn",life:46,
  ex:"Expires 14 February 2027",flag:"6 months left",
  blurb:"Accepted as evidence for the notarial application. Renewable from here when it lapses.",
  src:"Given by you · 3 Jul 2026"},
 {id:"5",ic:"rings",n:"CENOMAR",ref:"PSA-CEN-773401",kind:"given",state:"bad",life:11,
  ex:"Expires 5 October 2026",flag:window.KDAYS("2026-10-05")+" days left",
  blurb:"Needed for your wedding. The PSA issues it; this post requests it for you.",
  src:"Given by you · 5 Apr 2026"},
 {id:"6",ic:"baby",n:"Report of Birth · Danila R. Reyes",ref:"KON-26-R-0147",kind:"issued",state:"mute",life:60,
  ex:"In progress with Manila",flag:"Not yet issued",
  blurb:"Issued into this vault when the officer signs it. The PSA's own registered copy is a separate thing, ordered from them when you need it \u2014 this post is not told when it exists.",
  src:"Application KON-26-R-0147"}
];
window.KVAULT=DOCS;
var COL={ok:"var(--ok)",warn:"var(--gold-fill)",bad:"var(--bad)",mute:"var(--line-3)"};
var TIER={proved:"Proved",given:"Given by you",issued:"Issued by this post"};

/* The expiry meter, chosen from _options/ss5-vault.html. Most of what is in
   this vault is a date rather than a yes-or-no, so the state is measured
   rather than colour-coded, and the date and the word for it sit on one row
   under the bar. The blurb is gone: it repeated the document's own name and
   pushed the thing you actually came to read below the fold on a phone. */
function card(d){
  return '<button class="vc '+d.state+'" data-go="dc'+d.id+'">'+
    '<span class="vc-t"><span class="vi">'+I[d.ic]+'</span>'+
      '<span class="vc-n"><b>'+d.n+'</b><span class="vr">'+d.ref+'</span></span></span>'+
    '<span class="vc-b">'+
      '<span class="vlife"><i style="width:'+d.life+'%;background:'+COL[d.state]+'"></i></span>'+
      '<span class="vmr"><b class="vex'+(d.state==="bad"?" bad":"")+'">'+d.ex+'</b>'+
        '<em class="vflag '+d.state+'">'+d.flag+'</em></span></span>'+
    '<span class="vc-f"><span class="vqr">'+qr(d.ref)+'</span>'+
      '<span class="vsrc tier-'+d.kind+'">'+TIER[d.kind]+'</span>'+
      '<span class="vgo">Open'+I.arr+'</span></span>'+
  '</button>';
}

P.docs=function(){
  var iss=DOCS.filter(function(d){return d.kind==="issued";});
  var giv=DOCS.filter(function(d){return d.kind==="given";});
  var prv=DOCS.filter(function(d){return d.kind==="proved";});
  var show=tab==="issued"?iss:tab==="given"?giv:tab==="proved"?prv:DOCS;

  return '<div class="uh"><div><span class="kk">My workspace</span>'+
      '<h1>Held once, so you are never asked for it twice.</h1>'+
      '<p class="lede">Every entry says what it rests on. <b>Proved</b> was read off the document on your own phone and matched to your face. <b>Issued by this post</b> carries our seal and anyone can check it in seconds without contacting us. <b>Given by you</b> is reused instead of re-collected, and is never treated as evidence.</p></div>'+
      '<div class="uacts"><div class="useg">'+
        [["all","Everything",DOCS.length],["proved","Proved",prv.length],
         ["issued","Issued to you",iss.length],["given","Given by you",giv.length]]
        .map(function(t){return '<button class="'+(tab===t[0]?"on":"")+'" data-tab2="'+t[0]+'">'+t[1]+'</button>';}).join("")+
      '</div></div></div>'+

    '<div class="umets mb20">'+
      '<div class="umet"><em>In your vault</em><b>'+DOCS.length+'</b><small>Nothing stored on your phone</small></div>'+
      '<div class="umet"><em>Proved, not declared</em><b>'+prv.length+'</b><small>Read on the device, matched to your face</small></div>'+
      '<div class="umet ok"><em>Verifiable by anyone</em><b>'+iss.length+'</b><small>QR checked in about three seconds</small></div>'+
      '<div class="umet bad"><em>Expiring soon</em><b>1</b><small>CENOMAR, in eleven days</small></div>'+
      '<div class="umet"><em>Asked for twice</em><b>0</b><small>Reused across four applications</small></div>'+
    '</div>'+

    '<div class="vgrid">'+show.map(card).join("")+'</div>'+

    '<div class="unote mt20">'+I.shield+
      '<span><b>Why a QR and not a stamp.</b>'+
      '<p>A wet stamp can be photographed and reused. Each document issued here carries a code that resolves to this post’s own record and shows what the document says — so a bank in Manila or an employer in Sharjah can check it against us, not against the paper in their hand.</p>'+
      '<span class="lk" data-go="dc2">See how a document is checked'+I.arr+'</span></span></div>';
};

/* ---------- the detail ---------- */
var BODY={
 "1":[["Full name","Maria Cristina Santos Reyes"],["Date of birth","6 March 1991"],["Place of birth","Iloilo City, Philippines"],
      ["Passport number","P44••••8•A"],["Issued","12 September 2017 · DFA Manila"],
      ["Validity","Five years — booklets issued before 1 January 2018"],["Expired","11 September 2022"]],
 "2":[["Principal","Maria Cristina Santos Reyes"],["Attorney-in-fact","Rafael A. Reyes, brother"],
      ["Purpose","Sale of registered land, Quezon City"],["Sworn","8 July 2026, by video"],
      ["Register","PCG Dubai notarial register, folio 2026-0442"],["Revocation","At any time, from this application"]],
 "3":[["Subject","Danila R. Reyes"],["Document certified","Certificate of live birth"],
      ["Certified against","The record held by PCG Dubai"],["Certified","12 May 2026"],
      ["Signed by","M. Ilagan, Consul"],["Validity","No expiry — the certification is of the record, not the paper"]],
 "4":[["Full name","Maria Cristina Santos Reyes"],["Clearance number","NBI-2026-88214"],
      ["Purpose","Travel / employment abroad"],["Issued","14 February 2026"],["Expires","14 February 2027"]],
 "5":[["Full name","Maria Cristina Santos Reyes"],["Certificate","No record of marriage"],
      ["Registry","Philippine Statistics Authority"],["Issued","5 April 2026"],["Expires","5 October 2026"]],
 "6":[["Child","Danila R. Reyes"],["Born","2 February 2026, Dubai"],["Mother","Maria Cristina Santos Reyes"],
      ["Father","Elias M. Bautista"],["Paternity","Acknowledged by affidavit, 9 August 2026"],
      ["Status","Held at PCG Dubai pending one document"]]
};
var HIST={
 "1":[["Read into your vault","Nothing was uploaded — the data page was read in the application","14 Aug 2026",1],
      ["Used as evidence","Renewal KON-26-P-4471","14 Aug 2026",0]],
 "2":[["Issued","Notarised by video and entered in the register","8 Jul 2026",1],
      ["Couriered","Signed for by R. Reyes, Quezon City","11 Jul 2026",0],
      ["Verified by a third party","Registry of Deeds, Quezon City · QR checked","14 Jul 2026",0]],
 "3":[["Issued","Certified and signed digitally","12 May 2026",1],
      ["Verified by a third party","Emirates NBD, Dubai · QR checked","3 Jun 2026",0]],
 "4":[["Given by you","Photographed in the application","3 Jul 2026",1],
      ["Reused","Notarial application KON-26-N-2210","3 Jul 2026",0]],
 "5":[["Given by you","Photographed in the application","5 Apr 2026",1],
      ["Expiry warning raised",window.KDAYS("2026-10-05")+" days left","24 Aug 2026",0]],
 "6":[["Application lodged","Report of Birth started","9 Aug 2026",1],
      ["Query raised","Hospital record needs a clearer photograph","23 Aug 2026",0]]
};

function chk(d){
  var n=(HIST[d.id]||[]).filter(function(h){return /third party/i.test(h[0]);}).length;
  return n? (n===1?"Checked once by a third party so far":"Checked "+n+" times by third parties so far")
          : "Not yet checked by anyone";
}
function detail(d){
  var issued=d.kind==="issued" && d.state!=="mute";
  return '<button class="uback" data-go="docs">'+I.arr+'All documents</button>'+
    '<div class="apd-h"><div><h1>'+d.n+'</h1>'+
      '<div class="rf2"><span>'+d.ref+'</span><span>·</span><span>'+d.src+'</span>'+
        '<button data-copy="'+d.ref+'">'+I.newdoc+'Copy reference</button></div></div>'+
      '<div class="apd-a"><span class="k-chip '+(d.state==="mute"?"mute":d.state)+'">'+
        (d.state==="ok"?I.tickc:d.state==="mute"?I.clock:I.alert)+d.flag+'</span></div></div>'+

    '<div class="vd"><div>'+
      '<div class="upaper vsheet">'+
        '<div class="vhead"><span class="vseal">'+I.shield+'</span>'+
          '<span class="vorg"><b>Embassy of the Republic of the Philippines</b>'+
            '<small>Philippine Consulate General · Dubai</small></span></div>'+
        '<h2>'+d.n+'</h2>'+
        '<p class="vsub">'+(issued
          ? "Issued by this post. The record behind it is held by this post, and this document is a view of that record — not a copy that can drift from it."
          : "Held for you by this post. It was read once, is stored encrypted, and is offered to an application instead of being asked for again.")+'</p>'+
        '<div class="vbody"><div class="ukv">'+BODY[d.id].map(function(r){
          return '<div><span>'+r[0]+'</span><b class="'+(/number|folio|N-|P4/.test(r[1])?"mono":"")+'">'+r[1]+'</b></div>';
        }).join("")+'</div></div>'+
        (issued?'<div class="vsign"><div><span class="nm">'+(d.id==="2"?"A. Salvador":"M. Ilagan")+'</span>'+
          '<small>Consul · signed with the post’s key, not a scanned signature</small></div>'+
          '<div class="qr">'+qr(d.ref)+'</div></div>':'')+
      '</div>'+

      '<div class="vacts">'+
        '<button class="k-btn">'+I.print+'Download a PDF</button>'+
        '<button class="k-btn ghost" data-go="dv'+d.id+'">Share a check link</button>'+
        (issued?'<button class="k-btn ghost" data-go="all">Order a fresh copy</button>':
                '<button class="k-btn ghost" data-go="all">Replace this document</button>')+
      '</div>'+
    '</div>'+

    '<div>'+
      (issued
      ? '<div class="upan"><div class="upan-h"><h3>How anyone checks this in three seconds</h3></div>'+
        '<div class="upan-b"><div class="vver">'+
          '<div class="vst"><span class="vn">1</span><span class="um"><b>They scan the code</b>'+
            '<p>Any phone camera. No app, no account, and nothing to install.</p></span></div>'+
          '<div class="vst"><span class="vn">2</span><span class="um"><b>Our record answers, not the paper</b>'+
            '<p>The code resolves to this post. What comes back is what our register says today — including whether it has since been revoked.</p></span></div>'+
          '<div class="vst"><span class="vn">3</span><span class="um"><b>They see only what they need</b>'+
            '<p>A bank checking a power of attorney sees that it is valid and what it authorises. It does not see your passport, your address or anything else in your file.</p></span></div>'+
        '</div></div>'+
        '<div class="upan-f"><span>'+chk(d)+'</span>'+
          '<button class="lk" data-go="dv'+d.id+'">See what they saw'+I.arr+'</button></div></div>'
      : '<div class="upan"><div class="upan-h"><h3>What this is used for</h3></div>'+
        '<div class="upan-b"><p class="nxp" style="margin-top:0">'+d.blurb+'</p>'+
        '<div class="unote ok" style="margin-top:14px">'+I.shield+
          '<span><b>You were not asked for this twice.</b>'+
          '<p>It was read once and offered to every application that needed it since. If it expires, the application that needs it tells you before it becomes a problem.</p></span></div>'+
        '</div></div>')+

      '<div class="ush"><h2>Everything that has happened to it</h2></div>'+
      '<div class="upan"><div class="upan-b"><div class="vhist">'+HIST[d.id].map(function(h){
        return '<div class="'+(h[3]?"now":"")+'"><i></i><span class="um"><b>'+h[0]+'</b><small>'+h[1]+'</small></span>'+
          '<time>'+h[2]+'</time></div>';}).join("")+'</div></div></div>'+

      (d.state==="bad"?'<div class="unote bad mt20">'+I.alert+
        '<span><b>This expires in eleven days.</b><p>A replacement is ordered from here, costs nothing to request, and needs no visit. It arrives in your vault.</p>'+
        '<span class="lk" data-go="all">See it in the catalogue'+I.arr+'</span></span></div>':'')+
    '</div></div>';
}
DOCS.forEach(function(d){ P["dc"+d.id]=function(){ return detail(d); }; });

/* ---------- what a third party sees ---------- */
function verifier(d){
  return '<button class="uback" data-go="dc'+d.id+'">'+I.arr+'Back to the document</button>'+
    '<div class="uh"><div><span class="kk">The check link</span>'+
      '<h1>What the other side sees.</h1>'+
      '<p class="lede">This is the whole of it. No login, no account, no app — and nothing about you beyond the one fact they are checking.</p></div></div>'+
    '<div class="vd"><div class="upaper vsheet">'+
      '<div class="vhead"><span class="vseal">'+I.shield+'</span>'+
        '<span class="vorg"><b>Verified by the Philippine Consulate General, Dubai</b>'+
          '<small>Checked just now · '+d.ref+'</small></span></div>'+
      '<h2 style="font-size:24px">'+d.n+'</h2>'+
      '<div class="unote ok" style="margin-top:16px">'+I.tickc+
        '<span><b>Valid and not revoked.</b><p>This document is current in the register of this post as of this moment.</p></span></div>'+
      '<div class="vbody"><div class="ukv">'+BODY[d.id].slice(0,3).map(function(r){
        return '<div><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join("")+
        '<div><span>Everything else in the holder’s file</span><b>Not shown</b></div>'+
      '</div></div>'+
    '</div>'+
    '<div>'+
      '<div class="upan"><div class="upan-h"><h3>Why this is the fraud answer</h3></div><div class="upan-b">'+
        '<div class="vver">'+
        '<div class="vst"><span class="vn">'+I.magni+'</span><span class="um"><b>A forgery has nothing to resolve to</b>'+
          '<p>A convincing photocopy still has to answer to a code that points at our register. There is no record behind a forged one, so the check fails outright rather than looking plausible.</p></span></div>'+
        '<div class="vst"><span class="vn">'+I.clock+'</span><span class="um"><b>Revocation is instant</b>'+
          '<p>Revoke a power of attorney here and the next check anywhere in the world says revoked. Paper cannot be recalled; this can.</p></span></div>'+
        '<div class="vst"><span class="vn">'+I.shield+'</span><span class="um"><b>The holder sees who checked</b>'+
          '<p>Every check is logged against the document, with who ran it and when. You see it in the history — so a document being checked by someone you did not expect is visible to you.</p></span></div>'+
        '</div></div></div>'+
      '<div class="unote mt20">'+I.build+
        '<span><b>Nothing outside this system is involved.</b>'+
        '<p>The code, the register and the check page all belong to this post. There is no third-party verifier, no external identity provider and no dependency on another agency’s uptime.</p></span></div>'+
    '</div></div>';
}
DOCS.forEach(function(d){ P["dv"+d.id]=function(){ return verifier(d); }; });

document.addEventListener("click",function(e){
  var t=e.target.closest("[data-tab2]");
  if(t){ tab=t.getAttribute("data-tab2"); window.KRENDER("docs"); return; }
  /* the dashboard's document widget carries the same three filters. They used
     to be three inert buttons on the most-looked-at screen in the app; they
     open the vault with that filter already applied. */
  var v=e.target.closest("[data-vt]");
  if(v){ tab=v.getAttribute("data-vt"); window.KRENDER("docs"); }
});
})();
