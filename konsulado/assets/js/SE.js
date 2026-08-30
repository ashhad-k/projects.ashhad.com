/* ============ SE · settings ============
   Everything a person can change about how this behaves, in one place,
   with the things they cannot change explained rather than hidden.    */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');

var TAB=[["you","Your details","people"],["notify","Notifications","bell"],
         ["lang","Language & access","globe"],["privacy","Privacy & data","shield"],
         ["security","Sign-in & devices","key"]];
var tab="you";

var S={ sms:1, push:1, email:1, whatsapp:0, quiet:1, lang:"en", fmt:"dmy",
        bigger:0, motion:0, contrast:0, analytics:0, research:1 };
var N=[
 ["An application moves","Filed, queried, approved, dispatched",{sms:1,push:1,email:1},0],
 ["Something needs you","A query, a document, a fee",{sms:1,push:1,email:1},1],
 ["An appointment","Confirmed, reminder, changed",{sms:1,push:1,email:0},0],
 ["A document expires","Sixty days, thirty days, seven days",{sms:0,push:1,email:1},0],
 ["A support ticket is answered","A reply from an officer",{sms:0,push:1,email:1},0],
 ["Your record is opened","Any officer, any reason",{sms:0,push:1,email:1},0],
 ["An outreach mission near you","Announced, and the week before",{sms:0,push:1,email:0},0]
];

function tog(k,label){
  return '<button class="tog'+(S[k]?" on":"")+'" data-tog="'+k+'" role="switch" aria-checked="'+(S[k]?"true":"false")+'" aria-label="'+label+'"></button>';
}
function seg(k,opts){
  return '<span class="seg2">'+opts.map(function(o){
    return '<button class="'+(S[k]===o[0]?"on":"")+'" data-set="'+k+':'+o[0]+'">'+o[1]+'</button>';}).join("")+'</span>';
}
function row(t,s,ctl){ return '<div class="srow"><span class="um"><b>'+t+'</b><small>'+s+'</small></span>'+ctl+'</div>'; }

var PANEL={};

PANEL.you=function(){
  return '<div class="upan"><div class="upan-h"><h3>Your details</h3>'+
    '<span class="lbl">What the post holds about you</span></div><div class="upan-b">'+
    row("Full name","Maria Cristina Santos Reyes. Changing this is a civil-registry matter, not a settings one — it needs the record behind it.",'<span class="val"><button class="lk" data-go="all">Change by application'+I.arr+'</button></span>')+
    row("Mobile number","This is also how you sign in. Changing it re-verifies you on the new number first, so you can never be locked out.",'<span class="val mono">+971 50 ••• 4417</span>')+
    row("Email","Used for receipts and nothing else. It is never the way you sign in.",'<span class="val mono">m.reyes@••••.com</span>')+
    row("Address in the UAE","Where a passport or a document is couriered. Flat 1204, Al Nahda Tower B, Al Qusais 2, Dubai.",'<span class="val"><button class="lk" data-go="me">Edit'+I.arr+'</button></span>')+
    row("Emergency contact","Rafael A. Reyes, brother, Quezon City. Told only if you say so, at the time.",'<span class="val"><button class="lk" data-go="sos">Edit'+I.arr+'</button></span>')+
    '</div></div>'+
    '<div class="unote mt20">'+I.shield+'<span><b>Some of this is not yours to change here, and that is deliberate.</b>'+
    '<p>A name, a date of birth or a civil status is a registry fact. Letting it be edited in a settings screen is how a consular record stops being worth anything. Each one has an application behind it that produces the document to match.</p></span></div>';
};

PANEL.notify=function(){
  return '<div class="upan"><div class="upan-h"><h3>What you are told, and how</h3>'+
    '<span class="lbl">Dubai time</span></div><div class="upan-b">'+
    '<table class="ntab"><thead><tr><th>Event</th><th>SMS</th><th>Push</th><th>Email</th></tr></thead><tbody>'+
    N.map(function(n,i){
      return '<tr><td><b>'+n[0]+'</b><small>'+n[1]+'</small></td>'+
        ["sms","push","email"].map(function(ch){
          var on=n[2][ch], locked=n[3];
          return '<td><button class="ck2'+(on?" on":"")+'" data-n="'+i+':'+ch+'"'+(locked?' disabled':'')+
            ' role="checkbox" aria-checked="'+(on?"true":"false")+'" aria-label="'+n[0]+' by '+ch+'">'+I.tick+'</button></td>';
        }).join("")+'</tr>';}).join("")+
    '</tbody></table>'+
    '<div class="unote mt16">'+I.alert+'<span><b>One row cannot be turned off.</b>'+
    '<p><em>Something needs you</em> stays on, on every channel. An application that stalls because a message was muted is the failure this whole platform exists to remove.</p></span></div>'+
    '</div></div>'+
    '<div class="upan mt20"><div class="upan-h"><h3>How they arrive</h3></div><div class="upan-b">'+
    row("Quiet hours","Nothing between 22:00 and 07:00 unless it is a protection case or the duty officer.",tog("quiet","Quiet hours"))+
    row("WhatsApp","Not yet. It would put your consular record on a third party's servers, which this platform does not do.",'<span class="val"><span class="k-chip mute">Not offered</span></span>')+
    row("Language of messages","Messages follow the language you set below, not the language of the officer writing them.",'<span class="val">Follows your setting</span>')+
    '</div></div>';
};

PANEL.lang=function(){
  return '<div class="upan"><div class="upan-h"><h3>Language and region</h3></div><div class="upan-b">'+
    row("Language","Everything in the application, every message, and the officer you are put through to on a call.",
        seg("lang",[["en","English"],["fil","Filipino"],["ceb","Cebuano"]]))+
    row("Dates","Consular documents always print the long form regardless — this is only how dates are shown to you.",
        seg("fmt",[["dmy","27 Aug 2026"],["mdy","Aug 27, 2026"]]))+
    row("Time zone","Appointments, slots and quiet hours are all Dubai time.",'<span class="val">Dubai · GMT+4</span>')+
    row("Currency","Fees are set by the DFA in pesos and charged in dirhams at the post's published rate.",'<span class="val">AED</span>')+
    '</div></div>'+
    '<div class="upan mt20"><div class="upan-h"><h3>Access</h3>'+
    '<span class="lbl">These apply immediately</span></div><div class="upan-b">'+
    row("Larger text","Raises everything by about 15%. Layouts reflow rather than clip.",tog("bigger","Larger text"))+
    row("Reduce motion","Turns off the page transitions, the counters and the drifting rays. Also follows your device setting automatically.",tog("motion","Reduce motion"))+
    row("Higher contrast","Darkens secondary text and thickens borders. Everything already meets AA; this is for bright sunlight.",tog("contrast","Higher contrast"))+
    row("Screen reader","Every control is labelled and every view announces its heading. Nothing here needs turning on.",'<span class="val"><span class="k-chip ok">'+I.tickc+'Always on</span></span>')+
    '</div></div>';
};

PANEL.privacy=function(){
  return '<div class="upan"><div class="upan-h"><h3>What is held, and who sees it</h3></div><div class="upan-b">'+
    '<div class="ukv">'+
      '<div><span>Documents</span><b>6</b></div>'+
      '<div><span>Applications</span><b>4</b></div>'+
      '<div><span>Support tickets</span><b>3</b></div>'+
      '<div><span>Biometric templates</span><b>1 · face</b></div>'+
      '<div><span>Shared with another agency</span><b>None</b></div>'+
      '<div><span>Used for anything other than serving you</span><b>Never</b></div>'+
    '</div>'+
    '<div class="vacts"><button class="k-btn ghost sm">Export everything</button>'+
      '<button class="k-btn ghost sm" data-go="me">See who has looked</button></div>'+
    '</div></div>'+
    '<div class="upan mt20"><div class="upan-h"><h3>What you can switch off</h3></div><div class="upan-b">'+
    row("Anonymous usage statistics","Which screens are used and where people stop. No content, no identifiers, and off by default.",tog("analytics","Usage statistics"))+
    row("Being asked to take part in research","Occasionally, about a service you have used. Declining changes nothing about how you are served.",tog("research","Research invitations"))+
    row("Retention","Applications and tickets are kept six years, as the record requires. Your documents stay until you remove them.",'<span class="val">Six years</span>')+
    '</div></div>'+
    '<div class="danger mt20"><b>Close this account</b>'+
    '<p>Your record here is removed. Documents already issued stay in the post’s register, because a bank or a registry that checked one has to keep being able to. You can open an account again at any time and the register will still know you.</p>'+
    '<button class="k-btn ghost sm">Close the account</button></div>';
};

PANEL.security=function(){
  return '<div class="upan"><div class="upan-h"><h3>How you sign in</h3>'+
    '<span class="lbl">No password exists</span></div><div class="upan-b">'+
    row("Your number, then your face","The number identifies you, the face proves it, and the key lives in the device. Nothing is typed, so nothing can be phished.",'<span class="val"><span class="k-chip ok">'+I.tickc+'Level 2</span></span>')+
    row("This device","iPhone 15 · Face ID · added 14 August 2026.",'<span class="val"><span class="k-chip ok">Primary</span></span>')+
    row("Other devices","MacBook Pro · Touch ID · last used 24 August 2026.",'<span class="val"><button class="lk">Remove'+I.arr+'</button></span>')+
    row("If you lose your phone","Re-verify on any device, then a short video call with a duty officer. The old key dies the moment the new one lives.",'<span class="val"><button class="lk" data-go="me">How it works'+I.arr+'</button></span>')+
    '</div></div>'+
    '<div class="upan mt20"><div class="upan-h"><h3>Who may act for you</h3></div><div class="upan-b">'+
    row("Rafael A. Reyes","Holds your special power of attorney for one parcel of land in Quezon City. He cannot see anything else.",'<span class="val"><button class="lk" data-go="pe2">Review'+I.arr+'</button></span>')+
    row("Danila R. Reyes","You act for her as parent, until her eighteenth birthday.",'<span class="val"><button class="lk" data-go="pe1">Review'+I.arr+'</button></span>')+
    row("Corazon S. Reyes","You act for her at her recorded request, until 12 March 2027.",'<span class="val"><button class="lk" data-go="pe3">Review'+I.arr+'</button></span>')+
    '</div></div>'+
    '<div class="unote mt20">'+I.shield+'<span><b>Every one of these is visible on both sides.</b>'+
    '<p>A delegation is not a shared password. Each person can see what they are allowed to do, each use is logged to you, and either side can end it immediately.</p>'+
    '<span class="lk" data-go="fam">Family profiles'+I.arr+'</span></span></div>';
};

P.set=function(){
  return '<div class="uh"><div><span class="kk">Account</span>'+
      '<h1>Settings.</h1>'+
      '<p class="lede">How this behaves, what it tells you and what it holds. Anything that is a registry fact rather than a preference says so, and points at the application that changes it properly.</p></div>'+
      '<div class="uacts"><button class="k-btn ghost" data-go="me">Profile & security'+A+'</button></div></div>'+
    '<div class="setnav">'+TAB.map(function(t){
      return '<button class="'+(tab===t[0]?"on":"")+'" data-stab="'+t[0]+'">'+I[t[2]]+t[1]+'</button>';}).join("")+'</div>'+
    PANEL[tab]();
};

document.addEventListener("click",function(e){
  var el;
  if((el=e.target.closest("[data-stab]"))){ tab=el.getAttribute("data-stab"); window.KRENDER("set"); return; }
  if((el=e.target.closest("[data-tog]"))){ var k=el.getAttribute("data-tog"); S[k]=S[k]?0:1;
    window.KRENDER("set"); if(window.KTOAST) window.KTOAST(S[k]?"Turned on":"Turned off"); return; }
  if((el=e.target.closest("[data-set]"))){ var v=el.getAttribute("data-set").split(":"); S[v[0]]=v[1];
    window.KRENDER("set"); return; }
  if((el=e.target.closest("[data-n]"))){ if(el.hasAttribute("disabled")) return;
    var a=el.getAttribute("data-n").split(":"); N[+a[0]][2][a[1]]=N[+a[0]][2][a[1]]?0:1;
    window.KRENDER("set"); return; }
});
})();
