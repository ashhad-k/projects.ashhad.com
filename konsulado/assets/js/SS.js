/* ============ SS · emergency help ============ */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');

/* one tap, or Escape, and this is the dashboard */
function xbar(){
  return '<div class="xbar">'+I.shield+
    '<span class="xt">If someone can see your screen, leave this page instantly. Nothing you have read is kept in the history.</span>'+
    '<kbd>esc</kbd><button class="xb" data-exit>'+I.x+'Leave now</button></div>';
}

/* Each case carries a SLUG as well as a number, and the slug is what the
   public homepage links to. The two lists were built at different times and
   in different orders, so #so2 on the homepage ("In hospital or injured")
   was landing on "Your employer has your passport", and three more besides.
   A number is a position; a slug is a meaning, and on the emergency path the
   wrong landing is the one mistake that actually costs somebody something.
   _build/checks/handoff.js now fails the build if a card opens a case whose
   words have nothing to do with it. */
var CASES=[
 {id:"1",slug:"held",ic:"scale",t:"Arrest, detention or a police case",
  s:"A consular officer must be allowed to see you. Tell us where you are and we go.",
  can:["Visit you in detention, and keep visiting","Give you a list of lawyers, and interpret","Tell your family, if you want them told","Raise ill-treatment with the authorities directly"],
  cant:["Get you released, or interfere with a case","Pay your fine, your bail or your lawyer","Give legal advice or represent you in court"],
  first:[["Say nothing you do not understand","You are entitled to an interpreter. Ask for one before you sign anything, in any language."],
         ["Ask them to call this consulate","They are obliged to. If they do not, whoever is reading this should call us instead."],
         ["Tell us where you are being held","Station, city, and the name of anyone who has spoken to you. That is enough for us to find you."]]},
 {id:"2",slug:"work",ic:"hands",t:"Your employer has your passport",
  s:"It is a crime here. It is also the single most common thing this post is called about.",
  can:["Write to the employer, formally, on the post's letterhead","Refer the case to MoHRE and follow it","Issue you a replacement passport whatever the employer says","Shelter you while it is resolved"],
  cant:["Enter the premises or seize the document","Force an employer to pay what they owe you in a day"],
  first:[["Do not sign anything to get it back","A resignation or a debt letter signed under pressure makes the case harder, not easier."],
         ["Photograph what you can","A contract, a message, a payslip, the accommodation. Anything with a date on it."],
         ["Tell us today, not when you are leaving","A case opened early is a case with options. One opened at the airport is not."]]},
 {id:"3",slug:"death",ic:"urn",t:"A death in the family, here or at home",
  s:"Repatriation, the certificates and the paperwork are handled together, by one officer.",
  can:["Register the death and issue the Report of Death","Arrange repatriation of remains, and advise on the assistance available towards the cost","Deal with the hospital, the police and the airline for you","Help the family in the Philippines through the other end"],
  cant:["Pay funeral costs in full","Override a UAE post-mortem or an ongoing investigation"],
  first:[["Call before anything is signed","Hospitals and agents will present forms. Some of them cost you options later."],
         ["Keep every document you are handed","Even the ones in Arabic. We will read them."],
         ["Do not travel yet","Most of this is done from here, and you may be needed to sign."]]},
 {id:"4",slug:"home",ic:"ship",t:"You want to go home and cannot",
  s:"Repatriation is a programme, not a favour. It has a route and this post runs it.",
  can:["Assess you for assisted repatriation and pay the fare where you qualify","Issue a travel document if you have no passport","Deal with an absconding report or an exit ban","Arrange shelter until the flight"],
  cant:["Clear a debt or a court judgment against you","Guarantee a date before the exit permit is issued"],
  first:[["Start it here, not at the airport","An exit ban found at immigration takes weeks. Found now, it often takes days."],
         ["Bring nothing but yourself","Every document this needs is already in your vault. Nothing has to be fetched from another agency, because nothing here depends on one."],
         ["Say if you are not safe where you are","Shelter comes first and the rest follows. It is not a separate application."]]},
 {id:"5",slug:"wages",ic:"magni",t:"Unpaid wages or an unfair dismissal",
  s:"There is a labour system here and it works — but only if the claim is filed properly.",
  can:["Prepare and file the MoHRE complaint with you","Provide an interpreter for every hearing","Write to the employer formally","Support you while the claim runs"],
  cant:["Decide the claim, or fix the amount","Recover money the labour court does not award"],
  first:[["Do not accept a part payment to sign a release","It usually ends the claim for everything else."],
         ["Gather dates","Start date, last day worked, last payslip, what was promised. Dates decide these cases."],
         ["Come before you leave the country","A claim filed from the Philippines is far harder to run."]]},
 {id:"6",slug:"lost",ic:"plane",t:"Your passport lost or stolen, and no way to travel",
  s:"An emergency travel document is a separate, faster route with a slot held open every day.",
  can:["Issue an emergency travel document, usually the same day","Contact your family and arrange money transfer","Deal with the police report for a stolen passport","Arrange shelter, where a place is available"],
  cant:["Lend you money from the post","Replace a UAE visa — that is immigration's, not ours"],
  first:[["Report the theft to Dubai Police first","Even without it we can act, but the report speeds everything that follows."],
         ["Do not buy a ticket yet","The travel document has to exist before a booking is any use."],
         ["Come in, or call — either works","The application will hold a same-day slot for you the moment you say it is this."]]},
 /* The homepage has advertised this case from the beginning and the portal had
    no screen behind it, so the card landed on somebody else's problem. A work
    injury recorded as an ordinary accident loses the compensation route, and
    that is decided in the first day. */
 {id:"7",slug:"hurt",ic:"cross",t:"In hospital, or injured at work",
  s:"An officer can come to the hospital, and can speak to people who will not speak to you.",
  can:["Come to the hospital, and keep coming","Speak to the hospital, your insurer and your employer for you","Tell your family at home, and keep them told","Press for a work injury to be recorded as one, which is what decides the compensation"],
  cant:["Pay a medical bill, or guarantee one","Direct your treatment, or move you to another hospital"],
  first:[["Say it happened at work, if it did","A work injury has its own route and its own compensation. Written down as an ordinary accident, it quietly loses both."],
         ["Do not sign a discharge or a settlement you cannot read","Signing away a claim is the most expensive thing that happens in these cases, and it happens at the bedside."],
         ["Give us the hospital and the ward","That is enough. We do not need a file number and we are not going to wait for one."]]}
];

P.sos=function(){
  return xbar()+
    '<div class="sosh"><div class="sos-m"><em><i></i>Duty officer · on now</em>'+
      '<h1>Someone answers this, at any hour, in Filipino.</h1>'+
      '<p>Not a form and not a queue. If you are in danger, ring — everything else on this page can wait until after you have.</p></div>'+
    /* the heading promises somebody answers at any hour and the only number
       under it was the switchboard, which does not. The homepage has published
       a separate 24-hour duty line all along. Both numbers still need
       confirming with the post \u2014 see _build/lib/emgdata.js and ROADMAP 18. */
    '<div class="sos-n"><span class="l2">24-hour duty officer</span>'+
      '<a class="num" href="tel:+971565015756">+971 56 501 5756</a>'+
      '<small>Answered at any hour, in Filipino. This is the number to ring if somebody is detained, in hospital, or not safe.</small>'+
      '<div class="sos-alt">'+I.chat+'<span><b>In office hours</b>'+
        '<p>The switchboard on <b>+971 4 220 7100</b> reaches the same people, and so does a message here \u2014 which also keeps a record.</p></span></div>'+
      '<button class="k-btn" data-go="ask">Message the duty officer'+A+'</button></div></div>'+

    '<div class="ush"><h2>Or tell us what has happened</h2>'+
      '<p>Each of these opens with what this post can actually do — and, just as usefully, what it cannot.</p></div>'+
    '<div class="sgrid">'+CASES.map(function(c){
      return '<button class="scase" data-go="so'+c.id+'"><span class="si">'+I[c.ic]+'</span>'+
        '<b>'+c.t+'</b><small>'+c.s+'</small>'+
        '<span class="sgo">What we can do'+I.arr+'</span></button>';}).join("")+'</div>'+

    '<div class="u2 mt20"><div>'+
      '<div class="upan"><div class="upan-h"><h3>Your emergency contacts</h3>'+
        '<button class="lk" data-go="me">Edit'+I.arr+'</button></div><div class="upan-b">'+
        '<div class="ukv"><div><span>In the Philippines</span><b>Rafael A. Reyes · brother</b></div>'+
          '<div><span>In the UAE</span><b>Not set</b></div>'+
          '<div><span>Language they speak</span><b>Filipino, English</b></div>'+
          '<div><span>Told automatically</span><b>Only if you say so, at the time</b></div></div>'+
        '<div class="unote mt16">'+I.shield+'<span><b>Nobody is told without you.</b>'+
          '<p>Even in a detention case the officer asks first. Telling a family can be the wrong thing, and only you know that.</p></span></div>'+
      '</div></div>'+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>Where you are</h3></div><div class="upan-b">'+
        '<p class="nxp mt0">Sharing your location attaches it to an assistance case and nothing else. It is not stored, not tracked, and is deleted when the case closes.</p>'+
        '<button class="k-btn wide" data-go="ask">Share my location'+A+'</button>'+
        '<p class="paidon">Last shared: never.</p></div></div>'+
      '<div class="unote bad">'+I.alert+'<span><b>If someone is in immediate danger</b>'+
        '<p>Call 999 for the UAE police or ambulance first, then this post. We would rather be second than have you wait.</p></span></div>'+
    '</div></div>';
};

function scase(c){
  return xbar()+
    '<button class="uback" data-go="sos">'+I.arr+'Emergency help</button>'+
    '<div class="uh"><div><span class="kk">Assistance</span><h1>'+c.t+'</h1>'+
      '<p class="lede">'+c.s+'</p></div>'+
      '<div class="uacts"><button class="k-btn" data-go="ask">Open a case now'+A+'</button></div></div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>Do these three things first</h3>'+
        '<span class="lbl">Before anything else</span></div>'+
        '<div class="upan-b"><div class="first">'+c.first.map(function(f,i){
          return '<div><span class="fn">'+(i+1)+'</span><span class="um"><b>'+f[0]+'</b><p>'+f[1]+'</p></span></div>';
        }).join("")+'</div></div></div>'+
      '<div class="ush"><h2>What this post can do</h2></div>'+
      '<div class="upan"><div class="upan-b">'+c.can.map(function(x){
        return '<div class="pline ok">'+I.tickc+'<span class="um">'+x+'</span></div>';}).join("")+'</div></div>'+
      '<div class="ush"><h2>What it cannot</h2><p>Said plainly, because a promise that cannot be kept costs more than a refusal.</p></div>'+
      '<div class="upan"><div class="upan-b">'+c.cant.map(function(x){
        return '<div class="pline mute">'+I.x+'<span class="um">'+x+'</span></div>';}).join("")+'</div></div>'+
    '</div><div class="urail">'+
      '<div class="akesc"><em>Consulate switchboard</em><b>+971 4 220 7100</b>'+
        '<p>Answered at any hour, in Filipino. Opening a case here does the same thing and keeps a record — but if it is urgent, ring.</p>'+
        '<button class="k-btn gold" data-go="ask">Open a case'+A+'</button></div>'+
      '<div class="upan"><div class="upan-h"><h3>What happens after you tell us</h3></div><div class="upan-b">'+
        '<div class="urail-v">'+
        [["An officer is assigned and named to you","A person, not a queue. You are told who has it."],
         ["You are never asked to repeat it","Whatever you have already said goes with the case."],
         ["You can see the case moving","The same tracking as any other application, with the officer's updates on it."],
         ["It stays open until it is actually over","Not until a form is closed."]].map(function(s,i){
          return '<div class="ust '+(i===0?"now":"wait")+'"><span class="udot"></span>'+
            '<span class="um"><b>'+s[0]+'</b><p>'+s[1]+'</p></span></div>';}).join("")+
        '</div></div></div>'+
    '</div></div>';
}
/* registered under both: the slug is what the homepage links to and what
   anything new should use; the number stays so old links do not break. */
CASES.forEach(function(c){
  var v=function(){ return scase(c); };
  P["so"+c.id]=v;
  if(c.slug) P["so-"+c.slug]=v;
});

document.addEventListener("click",function(e){
  if(e.target.closest("[data-exit]")) window.KRENDER("home");
});
document.addEventListener("keydown",function(e){
  if(e.key!=="Escape") return;
  if(/^(sos|so\d+|so-[a-z]+)$/.test(window.KCUR&&window.KCUR()||"")) window.KRENDER("home");
});
})();
