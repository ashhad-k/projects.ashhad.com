/* ============ AK · ask the consulate ============
   Not a chatbot bolted on. It answers only from this post's own published
   rules and this user's own record, shows both, and hands the whole thread
   to a duty officer the moment the question stops being an information
   question.                                                              */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');
var thread=[], lang="en", typed="", rated={};

function cit(t){ return '<span class="cit">'+t+'</span>'; }

var Q=[
{ q:"When can I renew my passport?",
  fl:"English",
  fact:["Your booklet expired on 11 September 2022.","You filed the renewal on 14 August, and it went to Manila in the pouch on 18 August."],
  a:["<b>You already have — it is in progress.</b> Application KON-26-P-4471 was filed on 14 August and approved the next morning. It went to the DFA in Manila on 18 August, which is the one part no post controls — and no post is told where a booklet is in that queue. The Department’s own published estimate is four to eight weeks "+cit("DFA · turnaround")+".",
     "You did not have to appear for it. As a migrant worker you fall inside the no-appearance route "+cit("RA 11983")+" — a photograph taken in the application, thirteen answers of which nine came off your data page and this post's own record, and AED 240 "+cit("Fee schedule")+".",
     "The booklet that expired was a five-year one, issued before the ten-year rule began on 1 January 2018 "+cit("RA 10928")+". The replacement will last ten."],
  act:[["Track the application","app1"],["See the receipt","rcr1"]],
  src:[["Your passport record","Expired 11 September 2022 · renewal filed 14 August","Your file",1],
       ["Republic Act 11983","No personal appearance for migrant workers and applicants aged sixty and over","2024",0],
       ["DFA schedule of consular fees","Regular processing, AED 240","2026",0],
       ["DFA published turnaround","Four to eight weeks, regular processing","DFA",0]] },

{ q:"Can my brother sell my land in Quezon City for me?",
  fl:"English",
  fact:["You already hold a special power of attorney for exactly this.","KON-D-2026-0442, notarised 8 July 2026, naming Rafael A. Reyes — and it has not been revoked."],
  a:["<b>Yes, and you do not need a new one.</b> The special power of attorney you had notarised in July already names your brother and already covers the sale of registered land in Quezon City. The Registry of Deeds checked it against our register on 14 July, so they have seen it and it held.",
     "If the terms have changed — a different parcel, a different price ceiling, a different attorney-in-fact — that needs a fresh instrument, not an amendment. It is sworn on a twelve-minute video call "+cit("RA 7157 · VCCR 5(f)")+" and costs AED 100 plus courier "+cit("Fee schedule")+".",
     "You can also revoke the existing one from here at any time. Revocation is immediate: the next check anyone runs against that document comes back revoked, wherever in the world they run it."],
  act:[["Open the document","dc2"],["See it in the catalogue","all"]],
  src:[["Your notarial register entry","Folio 2026-0442 · special power of attorney · active","Your file",1],
       ["Republic Act 7157 & VCCR Art. 5(f)","A consular officer already acts as notary for this jurisdiction. Doing it down a camera is a DFA issuance away, not a new law.","Standing",0],
       ["Third-party check log","Registry of Deeds, Quezon City · 14 July 2026","Your file",0],
       ["Notarial fee schedule","AED 100 · courier to the Philippines AED 90","2026",0]] },

{ q:"Magkano ang bayad sa Report of Birth ni Danila?",
  fl:"Filipino",
  fact:["Wala kayong babayaran.","Ipinanganak siya noong 2 Pebrero 2026 at naisumite ang aplikasyon noong 9 Agosto — nasa loob ng labindalawang buwan."],
  a:["<b>Libre po ito.</b> Walang singil ang Report of Birth kapag naisumite sa loob ng labindalawang buwan mula sa kapanganakan, at ang inyong aplikasyon ay nakapasok na "+cit("Fee schedule")+".",
     "Ang natitira na lang po ay isang bagay: kulang sa linaw ang larawan ng hospital record — putol ang linya ng timbang ng bata. Kapag kinuhanan ninyo ulit dito sa app, sasagutin agad ito ng opisyal sa parehong araw. Walang kailangang ulitin sa iba pang naisumite ninyo.",
     "Ang sertipikong inilalabas ng puwestong ito ay lilitaw mismo sa inyong Documents pagkapirma ng opisyal — hindi na kailangang bumalik dito o magpadala ng courier. Ipadadala rin ito sa Maynila para sa rehistro ng PSA, ngunit hindi po iyon nakikita ng puwestong ito at may sariling takbo ng panahon."],
  act:[["Kunan ulit ang larawan","rqdoc"],["Buksan ang aplikasyon","apr1"]],
  src:[["Ang inyong aplikasyon","KON-26-R-0147 · naisumite 9 Agosto 2026","Your file",1],
       ["Schedule of consular fees","Report of Birth — walang bayad sa loob ng 12 buwan","2026",0],
       ["Ang query ng opisyal","23 Agosto 2026 · Consul M. Ilagan","Your file",0]] },

{ q:"Is my power of attorney still valid?",
  fl:"English", doc:"2",
  fact:["Yes. KON-D-2026-0442, still active.","Last checked by the Registry of Deeds in Quezon City on 14 July."],
  a:["<b>It is valid and it has not been revoked.</b> I am reading the register entry itself, not a copy of the document — folio 2026-0442, sworn on 8 July, naming Rafael A. Reyes for the sale of one registered parcel in Quezon City.",
     "Someone has already relied on it: the Registry of Deeds ran the check code on 14 July and it came back valid. That check is on the document’s own history, so you can see who looked and when.",
     "You can end it from here at any moment. Revocation is immediate — the next check anyone runs, anywhere, comes back revoked."],
  act:[["Open the document","dc2"],["See what a checker sees","dv2"]],
  src:[["Your notarial register entry","Folio 2026-0442 · active · not revoked","Your file",1],
       ["Third-party check log","Registry of Deeds, Quezon City · 14 July 2026","Your file",0],
       ["Republic Act 7157 & VCCR Art. 5(f)","The authority this post notarised it under","Standing",0]] },

{ q:"My employer is holding my passport and won't give it back.",
  fl:"English",
  esc:1,
  fact:["This is not a question I should answer.","A duty officer has been told, and the whole of this thread went with it."],
  a:["<b>I have handed this to a duty officer rather than answering it.</b> Withholding a worker's passport is a criminal matter in the UAE and a protection case for this post, not something to be handled by an application. An officer is being paged now.",
     "You do not have to explain any of it again. Everything on this page went with the referral, including who you are and where you are — so the officer opens with what you have already said.",
     "If you are in immediate danger, do not wait for the callback. The duty line is answered in Filipino at any hour, and the number is on the emergency page."],
  act:[["Emergency help","sos"],["Call the duty officer now","sos"]],
  src:[["Referred to a duty officer","Assistance case opened · you will be called back","Just now",1],
       ["What this post can do","Repatriation, legal referral, shelter, wage claims","Assistance",0],
       ["What I did not do","No advice was given. Nothing was assessed. A human is handling it.","Policy",0]] }
];

function fresh(){
  return '<div class="akhi"><span class="sun">'+I.shield+'</span>'+
    '<h2>Ask this post anything, in your own words.</h2>'+
    '<p>It answers from two things only: the rules this post publishes, and the record this post holds about you. It shows you both beside every answer. Where a question stops being an information question, it stops answering and fetches a person.</p>'+
    '<div class="akchips">'+Q.map(function(q,i){
      return '<button data-ask="'+i+'">'+q.q+'<span class="fl2">'+q.fl+'</span></button>';}).join("")+'</div>'+
  '</div>';
}

function exchange(qi,pos){
  var q=Q[qi], r=rated[qi];
  return '<div class="akq">'+q.q+'</div>'+
    '<div class="aka"><span class="av2">'+I.shield+'</span>'+
      '<span class="akb"><span class="kd">'+(q.esc?"Referred, not answered":"Answered from your record and the rules")+'</span>'+
        (q.doc?'<div class="akdoc">'+I.cert+'<span class="um">Read from your documents · '+
          ((window.KVAULT||[]).filter(function(d){return d.id===q.doc;})[0]||{n:"a document"}).n+'</span></div>':'')+
        '<div class="akfact">'+(q.esc?I.alert:I.tickc)+'<span class="um"><b>'+q.fact[0]+'</b>'+q.fact[1]+'</span></div>'+
        q.a.map(function(p){return '<p>'+p+'</p>';}).join("")+
        '<div class="akdo">'+q.act.map(function(c,i){
          return '<button class="k-btn'+(i?" ghost":"")+' sm" data-go="'+c[1]+'">'+c[0]+(i?"":A)+'</button>';}).join("")+
        '</div>'+
        '<div class="akrate">'+
          (r ? '<span class="done2">'+I.tickc+(r==="up"?"Thank you — that is recorded against the answer, not against you."
                                                     :"Noted. An officer reads every answer marked unhelpful.")+'</span>'
             : '<span class="q2">Did that answer it?</span>'+
               '<button class="rb" data-rate="'+qi+':up" aria-label="Yes">'+I.up+'Yes</button>'+
               '<button class="rb" data-rate="'+qi+':down" aria-label="No">'+I.down+'No</button>'+
               '<button class="rb esc" data-go="tknew">Ask a person instead</button>')+
        '</div>'+
      '</span></div>';
}

function follow(){
  var left=Q.map(function(_,i){return i;}).filter(function(i){return thread.indexOf(i)<0;});
  if(!left.length) return '';
  return '<div class="akchips"><span class="fup">Or ask</span>'+left.map(function(i){
    return '<button data-ask="'+i+'">'+Q[i].q+'<span class="fl2">'+Q[i].fl+'</span></button>';}).join("")+'</div>';
}

P.ask=function(){
  var last=thread.length?Q[thread[thread.length-1]]:null, q=last;
  /* ss10 · a chat is not an article. The tall marketing head said the same
     thing the thread's own empty state says two hundred pixels lower, and it
     pushed the composer off the fold. One compact bar instead, and the page
     fills the window from here down. */
  return '<div class="akhead"><span class="akh-t"><span class="akh-i">'+I.chat+'</span>'+
      '<span><b>Ask Konsulado</b><small>Answers from this post\u2019s published rules and your own record</small></span></span>'+
      '<span class="akh-s">'+I.tickc+'Answering now</span>'+
      '<button class="k-btn ghost sm" data-go="sos">Talk to a person'+A+'</button></div>'+

    '<div class="ak"><div class="akthread">'+
      '<div class="akwrap" id="akwrap">'+(thread.length?thread.map(exchange).join(""):fresh())+
        (thread.length?follow():"")+
      '</div>'+
      '<div class="akbar">'+
        '<span class="akin">'+I.search+
          '<input type="text" id="akq" value="'+typed.replace(/"/g,"&quot;")+'" placeholder="'+
          (lang==="fil"?"Magtanong sa sarili ninyong salita…":"Type your question in English or Filipino…")+
          '" aria-label="Ask a question">'+
          '<button class="akic" data-clip aria-label="Attach a document">'+I.clip+'</button>'+
          '<button class="akic" data-mic aria-label="Ask by voice">'+I.mic+'</button></span>'+
        '<span class="aklang"><button class="'+(lang==="en"?"on":"")+'" data-lang="en">EN</button>'+
          '<button class="'+(lang==="fil"?"on":"")+'" data-lang="fil">FIL</button></span>'+
        '<button class="aksend" data-send aria-label="Send">'+I.arr+'</button>'+
      '</div>'+
    '</div>'+

    '<div class="akrail">'+
      '<div class="akr"><div class="akr-h">'+I.magni+'<b>'+(q?"What this answer is built on":"What it will use")+'</b></div>'+
        '<div class="akr-b">'+(q
        ? '<div class="src">'+q.src.map(function(s){
            return '<div class="'+(s[3]?"hot":"")+'"><span class="um"><b>'+s[0]+'</b><small>'+s[1]+'</small></span>'+
              '<span class="rr">'+s[2]+'</span></div>';}).join("")+'</div>'
        : '<div class="src">'+
            '<div><span class="um"><b>Your own record</b><small>Passport, documents, applications, identity level — nothing about anyone else</small></span><span class="rr">Your file</span></div>'+
            '<div><span class="um"><b>The law this post applies</b><small>RA 11983, RA 11032, RA 7157, the Vienna Convention, the DFA fee schedule</small></span><span class="rr">Published</span></div>'+
            '<div><span class="um"><b>This post’s own procedures</b><small>What each service needs, what it costs, how long it takes</small></span><span class="rr">PCG Dubai</span></div>'+
          '</div>')+
        '</div>'+
        '<div class="upan-f"><span>Every claim above is traceable</span>'+
          '<button class="lk" data-go="me">How your data is used'+I.arr+'</button></div></div>'+

      '<div class="akr"><div class="akr-h">'+I.alert+'<b>What it will never do</b></div>'+
        '<div class="akr-b"><div class="akno">'+
          [["Guess. If a rule is not published, it says so and fetches an officer."],
           ["Decide your application — only a consular officer does that."],
           ["Speak about anyone but you, even your own family."],
           ["Handle a protection case. Detention, abuse and repatriation go straight to a person."]]
          .map(function(n){return '<span>'+I.x+'<span class="um">'+n[0]+'</span></span>';}).join("")+
        '</div></div></div>'+

      '<div class="akesc"><em>'+(q&&q.esc?"Already done":"If it cannot answer")+'</em>'+
        '<b>'+(q&&q.esc?"A duty officer has the whole thread.":"A person picks it up, with everything already said.")+'</b>'+
        '<p>'+(q&&q.esc
          ? "Paged just now. You will be called back on the number on your file, and you will not be asked to explain any of this twice."
          : "No re-typing, no reference number to quote, no starting again. The officer opens the same page you are looking at.")+'</p>'+
        '<button class="k-btn gold" data-go="'+(q&&q.esc?"tk1":"tknew")+'">'+(q&&q.esc?"Open the case that was raised":"Raise it with a person")+A+'</button></div>'+
    '</div></div>';
};

/* the composer matches what is typed against the questions this build can
   answer. A demo where the input does nothing is a demo the room notices. */
function match(text){
  var t=(text||"").toLowerCase(); if(t.length<3) return -1;
  var best=-1, score=0;
  Q.forEach(function(q,i){
    var n=0, hay=(q.q+" "+q.a.join(" ")).toLowerCase();
    t.split(/\s+/).forEach(function(w){ if(w.length>3 && hay.indexOf(w)>-1) n++; });
    if(/passport|renew/.test(t) && i===0) n+=2;
    if(/brother|land|attorney|sell|quezon/.test(t) && i===1) n+=2;
    if(/bayad|magkano|birth|danila|anak/.test(t) && i===2) n+=2;
    if(/valid|revok|check/.test(t) && i===3) n+=2;
    if(/employer|passport.*hold|hold.*passport|amo/.test(t) && i===4) n+=3;
    if(n>score){ score=n; best=i; }
  });
  return score>=2?best:-1;
}
function ask(i){
  if(thread.indexOf(i)<0) thread.push(i);
  typed=""; window.KRENDER("ask");
  var w=document.getElementById("akwrap"); if(w) w.scrollTop=w.scrollHeight;
}
function send(){
  var i=match(typed);
  if(i<0){
    if(window.KTOAST) window.KTOAST("This build answers five questions — try one of the suggestions.");
    return;
  }
  ask(i);
}

document.addEventListener("click",function(e){
  var el;
  if((el=e.target.closest("[data-ask]"))){ ask(+el.getAttribute("data-ask")); return; }
  if((el=e.target.closest("[data-lang]"))){ lang=el.getAttribute("data-lang"); window.KRENDER("ask"); return; }
  if((el=e.target.closest("[data-rate]"))){ var r=el.getAttribute("data-rate").split(":");
    rated[r[0]]=r[1]; window.KRENDER("ask"); return; }
  if(e.target.closest("[data-send]")){ send(); return; }
  if(e.target.closest("[data-mic]")){ if(window.KTOAST) window.KTOAST("Voice input is specified, not built in this demo."); return; }
  if(e.target.closest("[data-clip]")){ if(window.KTOAST) window.KTOAST("Your documents are already readable by the assistant — try asking whether your power of attorney is still valid."); return; }
});
document.addEventListener("input",function(e){ if(e.target.id==="akq") typed=e.target.value; });
document.addEventListener("keydown",function(e){
  if(e.target.id==="akq" && e.key==="Enter"){ e.preventDefault(); typed=e.target.value; send(); }
});
})();
