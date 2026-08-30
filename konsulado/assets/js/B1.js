/* ============ B1 · appointments and booking ============
   Two kinds exist: a video call, which is most of them, and the one visit
   that genuinely needs your body in a room. The booking flow says which
   it is before it asks for anything.                                    */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var mode="video", day=0, slot=null, who=0;
function tot(){ return (window.KCAT||[]).reduce(function(n,c){return n+c.s.length;},0); }
function nv(){ var n=0; (window.KCAT||[]).forEach(function(c){c.s.forEach(function(s){if(s[1]==="never")n++;});}); return n; }

var APPT=[
 {id:"a1",kind:"video",t:"Swearing the affidavit of support",svc:"Affidavit of support and guarantee",
  mo:"Sep",dy:"04",wd:"Friday",hr:"14:20 – 14:35",when:"Friday 4 September, 14:20",
  who:"Consul M. Ilagan",in:String(window.KDAYS("2026-09-04"))+" days",
  p:"A twelve-minute call. The officer reads the affidavit back to you, you swear to it on camera, and it is notarised while you are still on the line.",
  ready:["Your phone, with a working camera","Somewhere quiet, and no one else in shot","Nothing to print, nothing to bring"]},
 {id:"a2",kind:"person",t:"Biometrics for Danila's first passport",svc:"Passport for a child",
  mo:"Oct",dy:"23",wd:"Friday",hr:"08:00 – 17:00",when:"Friday 23 October, walk in any time",
  who:"Outreach mission · Sharjah",in:String(window.KDAYS("2026-10-23"))+" days",
  p:"The outreach mission comes to Sharjah for one day. Fingerprints, the photograph and identity binding for Danila all happen in the same twenty minutes, and your own level 3 enrolment can be done in the same visit.",
  ready:["Danila, in person","Her Report of Birth — in progress; it need not be finished first","Nothing else; the forms are already filled"]}
];
window.KAPPT=APPT;

var PAST=[
 ["Sworn the special power of attorney","8 July 2026 · 15:00","video","12 minutes · Consul A. Salvador"],
 ["Identity verification call","14 August 2026 · 19:01","video","3 minutes · automated, no officer needed"],
 ["Document check — NBI clearance","3 July 2026 · 11:05","video","6 minutes · Consul M. Ilagan"]
];

/* fifteen-minute slots, 09:00–16:45, with a plausible pattern of taken ones */
/* a real calendar: 27 Aug 2026 is a Thursday, the 29th and 30th are the
   weekend, and the 31st is National Heroes' Day — which the dashboard
   announces, so the booking screen has to know about it too. */
var DAYS=[["Thu","27","Aug",1],["Fri","28","Aug",1],["Sat","29","Aug",0],["Sun","30","Aug",0],
          ["Mon","31","Aug",0],["Tue","01","Sep",1],["Wed","02","Sep",1],["Thu","03","Sep",1],
          ["Fri","04","Sep",1]];
function times(seed){
  var out=[];
  for(var h=9;h<17;h++)for(var m=0;m<60;m+=15){
    var s=(h*60+m+seed*37)%100;
    out.push([(h<10?"0":"")+h+":"+(m<10?"0":"")+m, s>34]);
  }
  return out;
}

function heroTicket(a){
  return '<div class="bkhero">'+
    '<div class="bk-s"><span class="mo">'+a.mo+'</span><span class="dy">'+a.dy+'</span>'+
      '<span class="wd">'+a.wd+'</span><span class="hr">'+a.hr+'</span></div>'+
    '<div class="bk-m"><span class="kk4">Your next appointment</span>'+
      '<h2>'+a.t+'</h2><p>'+a.p+'</p>'+
      '<div class="bk-tags">'+a.ready.map(function(r){return '<span>'+I.tickc+r+'</span>';}).join("")+'</div></div>'+
    '<div class="bk-j"><span class="cd">Starts in</span>'+
      '<span class="big5">'+a.in+'</span>'+
      '<button class="k-btn'+(a.kind==="person"?" ghost":"")+'" data-go="bk'+a.id+'">'+
        (a.kind==="video"?"Open the appointment":"See what to expect")+A+'</button>'+
      '<button class="lk" data-go="bk'+a.id+'">Reschedule or cancel'+I.arr+'</button></div></div>';
}

P.book=function(){
  return '<div class="uh"><div><span class="kk">My workspace</span>'+
      '<h1>Most appointments happen wherever you are.</h1>'+
      '<p class="lede">A consular officer on video is still a consular officer. The authority is already there under RA 7157 and the Vienna Convention; what this asks the Department for is permission to exercise it down a camera. The one appointment that needs you in a room is the one that takes your fingerprints, and we bring that closer to you rather than the other way round.</p></div>'+
      '<div class="uacts"><button class="k-btn" data-go="bk1">Book an appointment'+A+'</button></div></div>'+

    heroTicket(APPT[0])+

    '<div class="ush"><h2>Also booked</h2><span class="cnt">'+(APPT.length-1)+' upcoming</span></div>'+
    '<div class="ulist">'+
      APPT.slice(1).map(function(x){ return x.id==="a2"?"":'<button class="uli" data-go="bk'+x.id+'"><span class="uic">'+I.cal+'</span><span class="um"><b>'+x.t+'</b><small>'+x.when+'</small></span><span class="uend"><span class="k-chip ok">Booked</span></span></button>'; }).join("")+
      '<button class="uli" data-go="bka2"><span class="uic">'+I.finger+'</span>'+
        '<span class="um"><b>'+APPT[1].t+'</b><small>'+APPT[1].when+' · '+APPT[1].who+'</small></span>'+
        '<span class="uend"><span class="k-chip mute">In person</span>'+
          '<span class="uref">in '+APPT[1].in+'</span>'+I.arr.replace("<svg",'<svg class="uarr"')+'</span></button>'+
    '</div>'+

    '<div class="ush"><h2>What you have already done</h2><span class="cnt">3 this year · 22 minutes in total</span></div>'+
    '<div class="ulist">'+PAST.map(function(p){
      return '<div class="uli"><span class="uic">'+I.tickc+'</span>'+
        '<span class="um"><b>'+p[0]+'</b><small>'+p[3]+'</small></span>'+
        '<span class="uend"><span class="uref">'+p[1]+'</span></span></div>';}).join("")+'</div>'+

    '<div class="unote mt20">'+I.clock+
      '<span><b>Nobody queues for a slot they do not need.</b>'+
      '<p>'+nv()+' of the '+tot()+' services in the catalogue need no appointment at all. The application decides whether one is required from what you have already told it — you are never sent to book something and then turned away.</p>'+
      '<span class="lk" data-go="ready">See what needs a visit and what does not'+I.arr+'</span></span></div>';
};

/* ---------- appointment detail ---------- */
function apptDetail(a){
  return '<button class="uback" data-go="book">'+I.arr+'All appointments</button>'+
    '<div class="apd-h"><div><h1>'+a.t+'</h1>'+
      '<div class="rf2"><span>'+a.when+'</span><span>·</span><span>'+a.who+'</span></div></div>'+
      '<div class="apd-a"><span class="k-chip '+(a.kind==="video"?"info":"mute")+'">'+
        (a.kind==="video"?I.people:I.finger)+(a.kind==="video"?"Video call":"In person")+'</span></div></div>'+

    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>What happens on the call</h3>'+
        '<span class="lbl">'+(a.kind==="video"?"About 12 minutes":"About 20 minutes")+'</span></div>'+
        '<div class="upan-b"><p class="nxp mt0">'+a.p+'</p>'+
        '<div class="urail-v mt16">'+
          (a.kind==="video"
          ? [["You join from here","No app to install. The button on this page becomes live ten minutes before."],
             ["The officer confirms it is you","Face match against the record, the same check the application uses."],
             ["You swear to the document on camera","The officer reads it back first. If a word is wrong, it is corrected before you swear."],
             ["It is notarised while you wait","Entered in the register and issued into your documents before the call ends."]]
          : [["Walk in at any time on the day","No slot to hold. The mission runs 08:00 to 17:00 and the queue is measured, not guessed."],
             ["Ten fingerprints and a photograph","Danila's, and yours if you want level 3 in the same visit."],
             ["Identity bound to the record","Twenty minutes, once. It never expires and never has to be repeated."],
             ["Everything else was already done here","The application, the evidence and the fee are settled before you arrive."]]
          ).map(function(s,i){
            return '<div class="ust '+(i===0?"now":"wait")+'"><span class="udot"></span>'+
              '<span class="um"><b>'+s[0]+'</b><p>'+s[1]+'</p></span></div>';}).join("")+
        '</div></div></div>'+

      '<div class="ush"><h2>What to have with you</h2></div>'+
      '<div class="upan"><div class="upan-b"><div class="vver">'+a.ready.map(function(r,i){
        return '<div class="vst"><span class="vn">'+(i+1)+'</span><span class="um"><b>'+r+'</b></span></div>';
      }).join("")+'</div></div></div>'+
    '</div>'+

    '<div class="urail">'+
      '<div class="upan"><div class="upan-b">'+
        '<span class="lbl">'+(a.kind==="video"?"The call opens in":"The mission opens in")+'</span>'+
        '<div class="cdown mt10"><b>'+a.in+'</b><span>'+a.when+'</span></div>'+
        (a.kind==="video"
          ? '<button class="k-btn wide" disabled>Join — opens 10 minutes before</button>'
          : '<button class="k-btn wide" data-go="ready">See what the mission covers'+A+'</button>')+
        '<button class="k-btn ghost wide" data-go="bk1">Reschedule</button>'+
        '<button class="lk mt10" data-go="ask">Cancel this appointment'+I.arr+'</button>'+
      '</div></div>'+
      '<div class="upan"><div class="upan-h"><h3>Who you will speak to</h3></div>'+
        '<div class="upan-b"><div class="ukv">'+
          '<div><span>Officer</span><b>'+a.who+'</b></div>'+
          '<div><span>Language</span><b>Filipino or English</b></div>'+
          '<div><span>Recorded</span><b>'+(a.kind==="video"?"Yes, retained 5 years":"No")+'</b></div>'+
          '<div><span>Jurisdiction</span><b>PCG Dubai</b></div>'+
        '</div></div></div>'+
      '<div class="unote">'+I.alert+
        '<span><b>If something goes wrong on the day</b>'+
        '<p>A dropped call does not lose the appointment. Rejoin from this page and the officer picks up where you stopped — nothing is re-sworn and nothing is re-paid.</p></span></div>'+
    '</div></div>';
}
APPT.forEach(function(a){ P["bk"+a.id]=function(){ return apptDetail(a); }; P["bka"+a.id.slice(1)]=P["bk"+a.id]; });

/* ---------- the booking flow ---------- */
var SVCS=[["Swear an affidavit or a power of attorney","video","Most notarial work is sworn on a call under the 2025 e-notarisation rules.","pen"],
          ["Have a document checked before you file","video","Six minutes with an officer, so nothing is rejected later.","magni"],
          ["Biometrics — fingerprints and photograph","person","The one thing that genuinely needs you in a room.","finger"],
          ["Collect a finished passport","person","A named ten-minute slot, or have it couriered instead.","box"]];
var pick=0;
var WHO=[["Me","Maria Cristina Santos Reyes · verified level 2","people"],
         ["Danila R. Reyes","Daughter, 6 months. You act for her as parent.","baby"],
         ["Corazon S. Reyes","Mother, 68, Al Nahda, Sharjah. You act for her at her request.","child"]];

P.bk1=function(){
  return '<button class="uback" data-go="book">'+I.arr+'Appointments</button>'+
    '<div class="uh"><div><span class="kk">Step 1 of 3</span>'+
      '<h1>What is the appointment for?</h1>'+
      '<p class="lede">The answer decides whether you need to travel at all. Two of these four are done from wherever you are.</p></div></div>'+
    '<div class="bmode">'+SVCS.map(function(s,i){
      return '<button class="bm'+(pick===i?" on":"")+'" data-pick="'+i+'"><span class="bi">'+I[s[3]]+'</span>'+
        '<span class="um"><b>'+s[0]+'</b><small>'+s[2]+'</small>'+
        '<span class="tagm">'+(s[1]==="video"?"No visit needed":"In person")+'</span></span></button>';}).join("")+'</div>'+
    '<div class="ush"><h2>Who is it for?</h2><p>An appointment for someone else needs them present, and needs you to already act for them. Both are true here.</p></div>'+
    '<div class="bmode">'+WHO.map(function(w,i){
      return '<button class="bm'+(who===i?" on":"")+'" data-who="'+i+'"><span class="bi">'+I[w[2]]+'</span>'+
        '<span class="um"><b>'+w[0]+'</b><small>'+w[1]+'</small></span></span></button>';}).join("")+'</div>'+
    '<div class="unote">'+I.shield+'<span><b>Nothing is booked yet.</b>'+
      '<p>Choosing here only decides which slots you are shown. Nothing is held and no fee is taken until you confirm on the last step.</p></span></div>'+
    '<div class="vacts mt20"><button class="k-btn" data-go="bk2">Choose a time'+A+'</button>'+
      '<button class="k-btn ghost" data-go="book">Not now</button></div>';
};

P.bk2=function(){
  var s=SVCS[pick], isv=s[1]==="video";
  var ts=times(day);
  return '<button class="uback" data-go="bk1">'+I.arr+'Back a step</button>'+
    '<div class="uh"><div><span class="kk">Step 2 of 3</span>'+
      '<h1>'+(isv?"Pick a time for the call.":"Pick a day to come in.")+'</h1>'+
      '<p class="lede">'+s[0]+'. '+(isv
        ? "Fifteen-minute slots, Dubai time. You will be told which officer before you confirm."
        : "The counter runs 07:30 to 15:30, Monday to Thursday, and to 12:00 on Friday. The queue length shown is measured from the last four weeks, not estimated.")+'</p></div>'+
      '<div class="uacts"><span class="k-chip '+(isv?"ok":"mute")+'">'+(isv?I.tickc:I.finger)+(isv?"From wherever you are":"Al Hudaiba, Dubai")+'</span></div></div>'+

    '<div class="upan"><div class="upan-h"><h3>Choose a day</h3><span class="lbl">Dubai time · GMT+4</span></div>'+
      '<div class="upan-b">'+
      '<div class="slotd">'+DAYS.map(function(d,i){
        var free=d[3]?times(i).filter(function(t){return t[1];}).length:0;
        return '<button class="'+(day===i?"on":"")+'" data-day="'+i+'"'+(d[3]===0?" disabled":"")+'>'+
          '<span class="wd2">'+d[0]+'</span><span class="dd">'+d[1]+'</span>'+
          '<span class="fr'+(d[3]===0?" none":"")+'">'+(d[3]===0?(d[1]==="31"?"holiday":"closed"):free+" free")+'</span></button>';}).join("")+'</div>'+
      (isv?'<div class="slots">'+ts.map(function(t,i){
        return '<button class="'+(slot===i?"on":"")+'" data-slot="'+i+'"'+(t[1]?"":" disabled")+'>'+t[0]+'</button>';
      }).join("")+'</div>'
       :'<div class="unote">'+I.clock+'<span><b>There is no slot to hold.</b>'+
         '<p>The counter runs all day and the queue position is on your phone, so you can wait outside. Pick the day and come whenever suits you.</p></span></div>')+
      '</div>'+
      '<div class="upan-f"><span>'+(isv?ts.filter(function(t){return t[1];}).length+' of '+ts.length+' slots free on ':'Open all day on ')+DAYS[day][0]+' '+DAYS[day][1]+' '+DAYS[day][2]+'</span>'+
        '<span>'+(isv?'Greyed slots are already taken':'Closed at weekends and on public holidays')+'</span></div></div>'+

    '<div class="vacts mt20"><button class="k-btn" data-go="bk3">Continue'+A+'</button>'+
      '<button class="k-btn ghost" data-go="bk1">Back</button></div>';
};

P.bk3=function(){
  var s=SVCS[pick], isv=s[1]==="video";
  var ts=times(day), t=slot!==null&&ts[slot]?ts[slot][0]:"10:15";
  var d=DAYS[day];
  return '<button class="uback" data-go="bk2">'+I.arr+'Back a step</button>'+
    '<div class="uh"><div><span class="kk">Step 3 of 3</span>'+
      '<h1>Confirm, and put it in your calendar.</h1>'+
      '<p class="lede">Nothing has been held until you press confirm. After that you can move it or cancel it from the appointment itself, without ringing anyone.</p></div></div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>What you are booking</h3></div><div class="upan-b">'+
      '<div class="ukv">'+
        '<div><span>For</span><b>'+s[0]+'</b></div>'+
        '<div><span>Who it is for</span><b>'+WHO[who][0]+'</b></div>'+
        '<div><span>When</span><b>'+d[0]+" "+d[1]+" "+d[2]+' 2026, '+t+'</b></div>'+
        '<div><span>How</span><b>'+(isv?"Video call, from this application":"In person · Al Hudaiba, Dubai")+'</b></div>'+
        '<div><span>Expected length</span><b>'+(isv?"12–15 minutes":"20 minutes")+'</b></div>'+
        '<div><span>Officer</span><b>Assigned the day before</b></div>'+
        '<div><span>Fee</span><b>Nothing to pay for the appointment itself</b></div>'+
      '</div></div></div>'+
      '<div class="ush"><h2>Have this ready</h2></div>'+
      '<div class="upan"><div class="upan-b"><div class="vver">'+
        (isv?[["Your phone or laptop, with a camera","No app to install — the call runs in this application."],
              ["A quiet ten minutes","An oath cannot be sworn with someone else in shot."],
              ["Nothing printed","The document is already here. You will see it on screen as the officer reads it."]]
            :[["The person the appointment is for",(who?WHO[who][0].split(" ")[0]+" has to be there in person.":"Only you.")],
              ["Nothing else","The application, the evidence and the fee are already settled."],
              ["Your phone","The queue position is shown on it, so you can wait outside."]])
        .map(function(r,i){return '<div class="vst"><span class="vn">'+(i+1)+'</span>'+
          '<span class="um"><b>'+r[0]+'</b><p>'+r[1]+'</p></span></div>';}).join("")+
      '</div></div></div>'+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-b">'+
        '<span class="lbl">Ready to confirm</span>'+
        '<div class="cdown mt10"><b>'+d[1]+'</b><span>'+d[2]+' · '+t+'</span></div>'+
        '<button class="k-btn wide" data-go="bkdone">Confirm the appointment'+A+'</button>'+
        '<button class="k-btn ghost wide" data-go="bk2">Choose another time</button></div></div>'+
      '<div class="unote">'+I.cal+'<span><b>It goes in your calendar</b>'+
        '<p>Confirming adds it to your phone calendar with the join link in it, and reminds you the evening before and ten minutes before.</p></span></div>'+
    '</div></div>';
};

P.bkdone=function(){
  var s=SVCS[pick], d=DAYS[day], ts=times(day), t=slot!==null&&ts[slot]?ts[slot][0]:"10:15";
  /* the booking joins the list it came from, so the loop visibly closes */
  if(!APPT.some(function(a){return a.id==="a3";})){
    APPT.unshift({id:"a3",kind:s[1]==="video"?"video":"person",t:s[0],svc:s[0],
      mo:d[2],dy:d[1],wd:{Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"}[d[0]]||d[0],
      hr:t,when:d[0]+" "+d[1]+" "+d[2]+", "+t,who:"Assigned the day before",in:"just booked",
      p:s[2], ready:["Your phone, with a working camera","Somewhere quiet","Nothing to print"]});
    P["bka3"]=function(){ return apptDetail(APPT[0]); };
    P["bka3"].K=1;
  }
  return '<div class="uh"><div><span class="kk">Booked</span>'+
      '<h1>That is held for you.</h1>'+
      '<p class="lede">You will get a reminder the evening before and ten minutes before it starts. Nothing else is needed from you until then.</p></div></div>'+
    '<div class="bkhero"><div class="bk-s"><span class="mo">'+d[2]+'</span><span class="dy">'+d[1]+'</span>'+
      '<span class="wd">'+d[0]+'</span><span class="hr">'+t+'</span></div>'+
      '<div class="bk-m"><span class="kk4">Confirmed</span><h2>'+s[0]+'</h2>'+
      '<p>'+(s[1]==="video"?"The join button on the appointment becomes live ten minutes before the call.":"Walk in at any time during opening hours. Your place in the queue is held from the moment you arrive.")+'</p>'+
      '<div class="bk-tags"><span>'+I.tickc+'Added to your calendar</span><span>'+I.tickc+'Reminder set</span>'+
        '<span>'+I.tickc+'Nothing to bring</span></div></div>'+
      '<div class="bk-j"><span class="cd">Reference</span><span class="big5" style="font-size:20px">KON-B-9042</span>'+
        '<button class="k-btn" data-go="book">See all appointments'+A+'</button></div></div>'+
    '<div class="vacts"><button class="k-btn ghost" data-go="home">Back to the dashboard</button>'+
      '<button class="k-btn ghost" data-go="all">Start something else</button></div>';
};

document.addEventListener("click",function(e){
  var el;
  if((el=e.target.closest(".bm[data-pick]"))){ pick=+el.getAttribute("data-pick"); window.KRENDER("bk1"); return; }
  if((el=e.target.closest(".bm[data-who]"))){ who=+el.getAttribute("data-who"); window.KRENDER("bk1"); return; }
  if((el=e.target.closest("[data-day]"))){ day=+el.getAttribute("data-day"); slot=null; window.KRENDER("bk2"); return; }
  if((el=e.target.closest("[data-slot]"))){ slot=+el.getAttribute("data-slot"); window.KRENDER("bk2"); return; }
});
})();
