/* ============ shared model — the things a user actually needs ============ */
(function(){
"use strict";
var S=function(p,vb){return '<svg viewBox="0 0 '+(vb||24)+' '+(vb||24)+'" fill="none">'+p+'</svg>';};
window.KI={
  passport:S('<rect x="4.5" y="2.5" width="15" height="19" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9.6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8.6 17h6.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  cert:S('<path d="M5.5 3h9l4 4v14h-13z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14.5 3v4h4M9 12h6M9 15.6h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'),
  baby:S('<circle cx="12" cy="8.8" r="4.3" stroke="currentColor" stroke-width="1.6"/><path d="M5 20.5c0-3.2 3.1-5.2 7-5.2s7 2 7 5.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  shield:S('<path d="M12 2.6 19.4 5.4v5.9c0 4.5-3.2 7.7-7.4 8.8-4.2-1.1-7.4-4.3-7.4-8.8V5.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'),
  clock:S('<circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="1.6"/><path d="M12 6.9V12l3.5 2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  warn:S('<path d="M12 3.2 21.6 20H2.4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 9.6v4.2M12 16.8v.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'),
  tick:S('<path d="m5 12.6 4.6 4.6L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'),
  tickc:S('<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="m8 12.3 2.8 2.8L16 9.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
  arr:S('<path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  plane:S('<path d="M2.5 13.4 21 5l-4.4 8.6L21 19l-8.5-3.2L8.8 21l-.5-5.3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'),
  truck:S('<path d="M2 6.5h11v9H2zM13 9.5h4l3.4 3.3v2.7H13z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><circle cx="6.4" cy="17.6" r="1.7" stroke="currentColor" stroke-width="1.5"/><circle cx="16.6" cy="17.6" r="1.7" stroke="currentColor" stroke-width="1.5"/>'),
  print:S('<path d="M7 8V3.5h10V8M7 18.5v2h10v-2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="3.4" y="8" width="17.2" height="9" rx="1.8" stroke="currentColor" stroke-width="1.6"/>'),
  pen:S('<path d="M16.4 3.6a2.4 2.4 0 0 1 3.4 3.4L8.4 18.4l-4.6 1.2 1.2-4.6z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'),
  stamp:S('<path d="M7 10.4c0-3 1.3-4.3 1.3-6.1a3.7 3.7 0 1 1 7.4 0c0 1.8 1.3 3.1 1.3 6.1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="4" y="13.6" width="16" height="3.4" rx="1.3" stroke="currentColor" stroke-width="1.6"/><path d="M5 20.4h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  people:S('<circle cx="9" cy="8.4" r="3.2" stroke="currentColor" stroke-width="1.6"/><circle cx="16.6" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M3.2 19.4c0-3.2 2.6-5 5.8-5s5.8 1.8 5.8 5M16 15c2.8.1 4.8 1.6 4.8 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  coin:S('<circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="1.6"/><path d="M12 6.4v11.2M9 9h4.6a2 2 0 0 1 0 4H10h4a2 2 0 0 1 0 4H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  bell:S('<path d="M6 9.8a6 6 0 0 1 12 0c0 4.3 1.8 5.9 1.8 5.9H4.2S6 14.1 6 9.8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.8 19.4a2.4 2.4 0 0 0 4.4 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  search:S('<circle cx="11" cy="11" r="6.6" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4.4 4.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
  home:S('<path d="M3.6 10.6 12 3.8l8.4 6.8V20a1 1 0 0 1-1 1H4.6a1 1 0 0 1-1-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'),
  grid:S('<rect x="3.4" y="3.4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="1.6"/><rect x="13.6" y="3.4" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="1.6"/><rect x="3.4" y="13.6" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="1.6"/><rect x="13.6" y="13.6" width="7" height="7" rx="1.6" stroke="currentColor" stroke-width="1.6"/>'),
  cal:S('<rect x="3.4" y="5" width="17.2" height="15.6" rx="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M3.4 9.6h17.2M8 2.8v4M16 2.8v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>'),
  menu:S('<path d="M4 6.5h16M4 12h16M4 17.5h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
  x:S('<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>'),
  chev:S('<path d="m8.5 5 7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>')
};

/* the four things a person opening this actually wants to know */
/* everything with a date, over the coming year */
/* `on` is the real date; the day count is worked out from today at render
   time, so the prototype never shows a stale "in 40 days". */
window.KEVENTS=[
  {on:"2026-10-05", t:"CENOMAR expires",       s:"bad",  k:"cert",   note:"Before your wedding · order a replacement",            date:"5 October"},
  {on:"2026-10-09", t:"Report of Birth registered", s:"info", k:"baby", note:"Danila Reyes · when the officer signs it",           date:"9 October"},
  {on:"2026-10-16", t:"Passport delivered",    s:"ok",   k:"truck",  note:"Couriered to Al Qusais 2, signature required",           date:"9–23 October"},
  {on:"2026-10-23", t:"Mission · Sharjah",     s:"mute", k:"people", note:"Walk in, 08:00–17:00. Danila's biometrics are booked",  date:"23 October"},
  {on:"2027-02-14", t:"NBI clearance expires", s:"warn", k:"shield", note:"Valid one year from issue",                            date:"14 February 2027"}
];
window.KDAYS_SINCE=function(iso){
  var a=new Date(), b=new Date(iso+"T00:00:00");
  return Math.max(0,Math.round((new Date(a.getFullYear(),a.getMonth(),a.getDate())-b)/86400000));
};
window.KDAYS=function(iso){
  var a=new Date(), b=new Date(iso+"T00:00:00");
  return Math.max(0,Math.round((b-new Date(a.getFullYear(),a.getMonth(),a.getDate()))/86400000));
};

window.KACTS=[
  {t:"Renew a passport", s:"Six minutes · no visit", k:"passport", hot:true, go:"renew"},
  {t:"Power of attorney", s:"Signed in a supervised session", k:"pen", go:"all"},
  {t:"Order a certificate", s:"Birth, marriage, CENOMAR", k:"cert", go:"all"},
  {t:"Legalise a document", s:"Courier in, courier out", k:"stamp", go:"all"},
  {t:"Book an appointment", s:"Video, or the one visit", k:"cal", go:"book"},
  {t:"Emergency help", s:"Duty officer, any hour", k:"warn", sos:true, go:"sos"}
];

/* every line here has to match the application, document or receipt it
   refers to — a feed that disagrees with the record it summarises is the
   fastest way to lose a room */
window.KFEED=[
  {k:"warn",  s:"bad",  t:"The Report of Birth needs one photograph again",
   p:"The birth weight line is cut off in the hospital record.", w:"23 August", act:"Retake it", go:"rqdoc"},
  {k:"print", s:"info", t:"Your passport reached the printers in Manila",
   p:"The only part of this no post controls.", w:"18 August", go:"app1"},
  {k:"tickc", s:"ok",   t:"Approved by a consular officer",
   p:"Officer A. Salvador. No queries raised.", w:"15 August", go:"app1"},
  {k:"coin",  s:"info", t:"You paid AED 265",
   p:"Receipt KON-R-88431.", w:"14 August", go:"rcr1"},
  {k:"shield",s:"info", t:"Signed in on a new device",
   p:"MacBook Pro · Dubai. Approved from your iPhone.", w:"2 August", go:"me"}
];

window.KSLA=[["Passport renewal","4–8 weeks","warn"],["Civil registry","4 weeks","warn"],
             ["Notarial / SPA","Same day","ok"],["Legalisation","3 days","ok"]];

/* tooltip */
var tip=document.createElement("div"); tip.id="ktip"; document.body.appendChild(tip);
document.addEventListener("mouseover",function(e){var t=e.target.closest("[data-tip]");if(!t)return;
  var p=t.getAttribute("data-tip").split("|");tip.innerHTML='<b>'+p[0]+'</b>'+(p[1]||"");tip.classList.add("on");});
document.addEventListener("mousemove",function(e){if(!tip.classList.contains("on"))return;
  var x=e.clientX+14,y=e.clientY+16;if(x+250>innerWidth)x=e.clientX-254;tip.style.left=x+"px";tip.style.top=y+"px";});
document.addEventListener("mouseout",function(e){if(e.target.closest("[data-tip]"))tip.classList.remove("on");});
})();
