/* ============ ST · support and ticketing ============
   Everything that goes wrong needs somewhere to go that is not a phone
   number. A ticket carries the thing it is about, so nobody is asked to
   quote a reference or explain twice.                                  */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var cat=0, filt="open";

var CATS=[
 ["Something is wrong with an application","magni","A delay, a query you do not understand, a decision you want explained.","apps"],
 ["A fee, a refund or a receipt","card","Charged twice, charged the wrong amount, or a receipt you need for an employer.","pay"],
 ["A document is wrong or will not verify","stamp","A spelling, a date, or a check link that comes back as not found.","docs"],
 ["An appointment or the outreach mission","cal","Moving it, missing it, or getting there and being turned away.","book"],
 ["Something else","chat","Anything the four above do not cover. An officer reads it either way.",null]
];

var TICKETS=[
 {id:"1", ref:"KON-T-0511", sub:"My employer is holding my passport",
  st:"pri", stat:"With the duty officer", state:"open", ic:"alert",
  opened:"Today, 09:41", who:"Assistance · duty officer", sla:["Called back within","2 hours","82"],
  about:["Assistance case","sos"],
  thread:[
   {k:"sys",n:"Konsulado",r:"Referred automatically",w:"Today, 09:41",
    p:["Referred from Ask Konsulado. The whole of that conversation went with it, so nothing has to be explained again.",
       "Withholding a worker's passport is a criminal matter in the UAE and a protection case for this post — it is not something the application answers."]},
   {k:"off",n:"Duty officer J. Bautista",r:"Consular assistance",w:"Today, 10:02",
    p:["I have your file open and I can see the renewal went to Manila in the pouch on 18 August, so you are not without a record.",
       "Two questions before I write to the employer. Do you have a copy of your contract, and are you safe where you are staying tonight? If the answer to the second is no, say so and we deal with that first."]}
  ]},
 {id:"2", ref:"KON-T-0442", sub:"The courier could not find my building",
  st:"", stat:"With consular assistance", state:"open", ic:"truck",
  opened:"24 August, 18:20", who:"A. Salvador · consular assistant", sla:["Replied within","1 working day","46"],
  about:["Application KON-26-P-4471","app1"],
  thread:[
   {k:"you",n:"You",r:"",w:"24 August, 18:20",
    p:["The courier tried twice and left a card both times. Al Nahda Building 2 has two entrances and they are going to the wrong one. Can the address on the application say 'entrance B, opposite the pharmacy'?"],
    att:"Photograph of the courier card · 1.1 MB"},
   {k:"off",n:"A. Salvador",r:"Consular assistant",w:"25 August, 08:35",
    p:["Yes — I have added it as a delivery note rather than changing the address, because the address on a passport application has to match the one on the application itself.",
       "The booklet has not left Manila yet, so this will be on the label when it does. You do not need to do anything else."]},
   {k:"you",n:"You",r:"",w:"25 August, 09:02",
    p:["Thank you. Can I switch to collecting it instead if the courier fails again?"]},
   {k:"off",n:"A. Salvador",r:"Consular assistant",w:"25 August, 09:15",
    p:["You can switch to pickup at any point until it is dispatched, from the application itself. After dispatch we would have to wait for it to come back to us first."]}
  ]},
 {id:"3", ref:"KON-T-0398", sub:"Charged twice for the notarial fee",
  st:"", stat:"Resolved · refunded", state:"done", ic:"card",
  opened:"12 July, 11:04", who:"Closed 13 July", sla:["Resolved in","1 working day","100"],
  about:["Receipt KON-R-81002","rcr2"],
  thread:[
   {k:"you",n:"You",r:"",w:"12 July, 11:04",
    p:["My card was charged AED 190 twice for the same power of attorney. Only one document was issued."]},
   {k:"off",n:"M. Ilagan",r:"Consul",w:"12 July, 15:40",
    p:["You are right, and I am sorry. The first attempt timed out at the gateway and was captured anyway. I have authorised the refund of the duplicate."]},
   {k:"sys",n:"Konsulado",r:"Automatic",w:"13 July, 09:12",
    p:["AED 190 refunded to Visa •••• 4417. It reaches the card in three to five working days and the receipt in your documents has been reissued showing one charge."]}
  ]}
];
window.KTICKETS=TICKETS;

function row(t){
  return '<button class="tk'+(t.st?" "+t.st:"")+'" data-go="tk'+t.id+'">'+
    '<span class="ti">'+I[t.ic]+'</span>'+
    '<span class="um"><b>'+t.sub+'</b><small>'+t.ref+' · opened '+t.opened+' · '+t.who+'</small></span>'+
    '<span class="tend"><span class="k-chip '+(t.state==="done"?"ok":t.st==="pri"?"bad":"info")+'">'+
      (t.state==="done"?I.tickc:t.st==="pri"?I.alert:I.clock)+t.stat+'</span>'+
      I.arr.replace("<svg",'<svg class="uarr"')+'</span></button>';
}

P.sup=function(){
  var open=TICKETS.filter(function(t){return t.state==="open";});
  var done=TICKETS.filter(function(t){return t.state==="done";});
  var show=filt==="open"?open:filt==="done"?done:TICKETS;
  return '<div class="uh"><div><span class="kk">My workspace</span>'+
      '<h1>When something goes wrong, it goes somewhere.</h1>'+
      '<p class="lede">A ticket carries the application, the receipt or the document it is about, so no one is ever asked to quote a reference or tell the story twice. Every one is answered by a named person.</p></div>'+
      '<div class="uacts"><button class="k-btn" data-go="tknew">Raise a ticket'+A+'</button></div></div>'+

    '<div class="umets mb20">'+
      '<div class="umet"><em>Open</em><b>'+open.length+'</b><small>One with the duty officer</small></div>'+
      '<div class="umet ok"><em>Answered within</em><b>2h</b><small>Median this year, all categories</small></div>'+
      '<div class="umet"><em>Resolved</em><b>'+done.length+'</b><small>All within one working day</small></div>'+
      '<div class="umet"><em>Times you repeated yourself</em><b>0</b><small>The case carries the record</small></div>'+
    '</div>'+

    '<div class="ufilt">'+[["open","Open",open.length],["done","Resolved",done.length],["all","Everything",TICKETS.length]]
      .map(function(f){return '<button class="uf'+(filt===f[0]?" on":"")+'" data-tfilt="'+f[0]+'">'+f[1]+
        '<span class="n">'+f[2]+'</span></button>';}).join("")+'</div>'+

    (show.length
      ? '<div class="ulist">'+show.map(row).join("")+'</div>'
      : '<div class="uempty"><span class="ue-i">'+I.tickc+'</span><b>Nothing open</b>'+
        '<p>Everything you have raised has been answered and closed.</p>'+
        '<button class="k-btn ghost" data-tfilt="all">Show everything</button></div>')+

    '<div class="u2 mt20"><div>'+
      '<div class="ush"><h2>Answered without a ticket</h2>'+
        '<p>The four things this post is asked most often, with the answer rather than a link to a page about it.</p></div>'+
      '<div class="ulist">'+
      [["Why does printing take four to eight weeks?","Because it happens at the DFA in Manila, in daily batches. No post can move that queue, and any post that says it can is selling you something.","app1"],
       ["Can I pay to be seen faster?","No. There is no priority lane in this application and no service charge on top of the published fee.","pay"],
       ["What if I have no card?","A payment code is generated and paid in cash at an exchange house. The application waits seventy-two hours for it.","pay"],
       ["Can someone else collect for me?","Yes, under a delegation with a scope and an expiry — not by handing over your phone.","fam"]]
      .map(function(f){
        return '<button class="uli" data-go="'+f[2]+'"><span class="uic">'+I.magni+'</span>'+
          '<span class="um"><b>'+f[0]+'</b><small>'+f[1]+'</small></span>'+
          '<span class="uend">'+I.arr.replace("<svg",'<svg class="uarr"')+'</span></button>';}).join("")+'</div>'+
    '</div><div class="urail">'+
      '<div class="akesc"><em>Not a support matter</em><b>If you are in danger, do not raise a ticket.</b>'+
        '<p>A ticket is answered in hours. The duty officer answers now, at any hour, in Filipino.</p>'+
        '<button class="k-btn gold" data-go="sos">Emergency help'+A+'</button></div>'+
      '<div class="unote">'+I.shield+'<span><b>An officer sees the case, not your whole file.</b>'+
        '<p>Opening a ticket about a receipt shows the officer that receipt and the application it belongs to. It does not open your passport, your documents or your family. Every access is on your log either way.</p>'+
        '<span class="lk" data-go="me">See who has looked'+I.arr+'</span></span></div>'+
    '</div></div>';
};

function ticket(t){
  return '<button class="uback" data-go="sup">'+I.arr+'All tickets</button>'+
    '<div class="apd-h"><div><h1>'+t.sub+'</h1>'+
      '<div class="rf2"><span>'+t.ref+'</span><span>·</span><span>Opened '+t.opened+'</span>'+
        '<button data-copy="'+t.ref+'">'+I.newdoc+'Copy reference</button></div></div>'+
      '<div class="apd-a"><span class="k-chip '+(t.state==="done"?"ok":t.st==="pri"?"bad":"info")+'">'+
        (t.state==="done"?I.tickc:t.st==="pri"?I.alert:I.clock)+t.stat+'</span></div></div>'+

    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>The conversation</h3>'+
        '<span class="lbl">'+t.thread.length+' messages</span></div>'+
        '<div class="upan-b"><div class="thr">'+t.thread.map(function(m){
          return '<div class="msg '+m.k+'"><span class="mav">'+
            (m.k==="you"?"MR":m.k==="sys"?I.shield:m.n.split(" ").slice(-1)[0].slice(0,2).toUpperCase())+'</span>'+
            '<span class="mb"><span class="mh"><b>'+m.n+'</b>'+
              (m.r?'<span class="role">'+m.r+'</span>':'')+'<time>'+m.w+'</time></span>'+
            '<span class="mtxt">'+m.p.map(function(x){return '<p>'+x+'</p>';}).join("")+'</span>'+
            (m.att?'<span class="mattach">'+I.cert+m.att+'</span>':'')+
            '</span></div>';}).join("")+'</div></div>'+
        (t.state==="open"
        ? '<div class="reply"><div class="rin"><textarea rows="3" placeholder="Write a reply. The officer sees it immediately." aria-label="Reply"></textarea></div>'+
          '<div class="racts"><button class="k-btn">Send'+A+'</button>'+
          '<button class="k-btn ghost sm">'+I.cert+'Attach</button>'+
          '<span class="hint4">Answered by a person, not a queue.</span></div></div>'
        : '<div class="upan-f"><span>Closed '+t.who.replace("Closed ","")+'</span>'+
          '<button class="lk" data-go="tknew">Raise a new ticket'+I.arr+'</button></div>')+
      '</div>'+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>'+(t.state==="done"?"How it went":"Where it stands")+'</h3></div>'+
        '<div class="upan-b"><div class="sla2">'+
          '<div class="row"><span>'+t.sla[0]+'</span><b>'+t.sla[1]+'</b></div>'+
          '<div class="bar4"><i style="width:'+t.sla[2]+'%;background:'+
            (t.state==="done"?"var(--ok)":t.st==="pri"?"var(--bad)":"var(--pri)")+'"></i></div>'+
        '</div>'+
        '<div class="ukv mt16"><div><span>Handled by</span><b>'+t.who+'</b></div>'+
          '<div><span>About</span><b>'+t.about[0]+'</b></div>'+
          '<div><span>Raised</span><b>'+t.opened+'</b></div>'+
          '<div><span>Language</span><b>English</b></div></div>'+
        '<button class="k-btn ghost wide" data-go="'+t.about[1]+'">Open what this is about'+A+'</button>'+
        (t.state==="open"?'<button class="lk mt10" data-go="sos">Escalate to the duty officer'+I.arr+'</button>':'')+
      '</div></div>'+
      '<div class="unote'+(t.st==="pri"?" bad":"")+'">'+(t.st==="pri"?I.alert:I.shield)+
        '<span><b>'+(t.st==="pri"?"This one is not a support ticket":"Nothing here was retyped")+'</b>'+
        '<p>'+(t.st==="pri"
          ? "It was referred by the assistant the moment it recognised a protection case, and it sits with the duty officer rather than with support. If it is urgent, ring rather than wait."
          : "The officer opened this with your application, your receipt and your delivery address already in front of them. You were not asked for any of it.")+'</p>'+
        (t.st==="pri"?'<span class="lk" data-go="sos">The duty officer’s number'+I.arr+'</span>':'')+'</span></div>'+
    '</div></div>';
}
TICKETS.forEach(function(t){ P["tk"+t.id]=function(){ return ticket(t); }; });

P.tknew=function(){
  var c=CATS[cat];
  return '<button class="uback" data-go="sup">'+I.arr+'Support</button>'+
    '<div class="uh"><div><span class="kk">Raise a ticket</span>'+
      '<h1>What has gone wrong?</h1>'+
      '<p class="lede">Choose the closest one. It decides which officer picks it up and what the ticket carries with it — you will not be asked to attach anything the post already holds.</p></div></div>'+
    '<div class="tcat">'+CATS.map(function(x,i){
      return '<button class="tc'+(cat===i?" on":"")+'" data-tcat="'+i+'"><span class="ci">'+I[x[1]]+'</span>'+
        '<span class="um"><b>'+x[0]+'</b><small>'+x[2]+'</small></span></button>';}).join("")+'</div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>Tell us what happened</h3>'+
        '<span class="lbl">In your own words</span></div>'+
        '<div class="upan-b">'+
        '<div class="rin tall"><textarea rows="5" placeholder="What happened, and what you would like done about it. Filipino or English." aria-label="What happened"></textarea></div>'+
        '<div class="racts mt16"><button class="k-btn ghost sm">'+I.cert+'Attach a photograph</button>'+
          '<span class="hint4">Up to five files. Nothing you have already given us is needed again.</span></div>'+
        '</div></div>'+
      '<div class="vacts mt20"><button class="k-btn" data-go="tkdone">Raise the ticket'+A+'</button>'+
        '<button class="k-btn ghost" data-go="ask">Ask the assistant first</button></div>'+
    '</div><div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>What goes with it</h3></div><div class="upan-b">'+
        '<div class="needs">'+
        (c[3]
          ? [[1,"The record this is about","Attached automatically, so the officer opens with it"],
             [1,"Your identity","Already verified — nothing to prove again"],
             [1,"Everything you have already said","Including anything you asked the assistant"],
             [0,"Your other documents","Not shared. The officer sees the case, not the file."]]
          : [[1,"Your identity","Already verified — nothing to prove again"],
             [1,"Everything you have already said","Including anything you asked the assistant"],
             [0,"Your other documents","Not shared. The officer sees the case, not the file."]]
        ).map(function(n){
          return '<div class="'+(n[0]?"":"no")+'">'+(n[0]?I.tickc:I.x)+
            '<span class="um"><b>'+n[1]+'</b><small>'+n[2]+'</small></span></div>';}).join("")+'</div>'+
        (c[3]?'<button class="k-btn ghost wide" data-go="'+c[3]+'">Pick which one'+A+'</button>':'')+
      '</div></div>'+
      '<div class="unote">'+I.clock+'<span><b>When you will hear back</b>'+
        '<p>Within one working day for everything on this page, and within two hours for a fee or a refund. If it slips, the officer tells you before you have to ask.</p></span></div>'+
    '</div></div>';
};

P.tkdone=function(){
  return '<div class="uh"><div><span class="kk">Raised</span>'+
      '<h1>That is with an officer.</h1>'+
      '<p class="lede">Reference KON-T-0524. You do not need to keep it — the ticket is in your support list and you will get a message when it moves.</p></div></div>'+
    '<div class="u2"><div>'+
      '<div class="upan"><div class="upan-h"><h3>What happens now</h3></div><div class="upan-b">'+
      '<div class="urail-v">'+
      [["Read by a person within the hour","Not triaged by a machine. A named consular assistant opens it."],
       ["Answered within one working day","Sooner for a fee or a refund. You are told who has it."],
       ["It stays open until it is actually over","Not until a form is closed. You decide when it is resolved."]]
      .map(function(s,i){return '<div class="ust '+(i===0?"now":"wait")+'"><span class="udot"></span>'+
        '<span class="um"><b>'+s[0]+'</b><p>'+s[1]+'</p></span></div>';}).join("")+
      '</div></div></div>'+
      '<div class="vacts mt20"><button class="k-btn" data-go="sup">See your tickets'+A+'</button>'+
        '<button class="k-btn ghost" data-go="home">Back to the dashboard</button></div>'+
    '</div><div class="urail">'+
      '<div class="unote ok">'+I.tickc+'<span><b>Nothing was attached by you.</b>'+
        '<p>The ticket carries the record it is about, your identity and everything you had already said. That is the whole point of it living inside the application rather than in an inbox.</p></span></div>'+
    '</div></div>';
};

document.addEventListener("click",function(e){
  var el;
  if((el=e.target.closest("[data-tfilt]"))){ filt=el.getAttribute("data-tfilt"); window.KRENDER("sup"); return; }
  if((el=e.target.closest("[data-tcat]"))){ cat=+el.getAttribute("data-tcat"); window.KRENDER("tknew"); return; }
});
})();
