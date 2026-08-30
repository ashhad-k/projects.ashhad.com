/* ============ FX · cross-cutting behaviour ============
   Wraps the renderer rather than editing every page: transitions, counters
   that count, bars that fill, copy-to-clipboard with feedback, an offline
   banner, and a real error screen instead of a white one.              */
(function(){
"use strict";
var I=window.KI;
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- toast ---- */
var toast=document.createElement("div"); toast.id="ktoast"; document.body.appendChild(toast);
var tt=null;
function say(msg){
  toast.innerHTML=I.tickc+"<span>"+msg+"</span>";
  toast.classList.add("on");
  clearTimeout(tt); tt=setTimeout(function(){ toast.classList.remove("on"); },2600);
}
window.KTOAST=say;

/* ---- the controls a prototype cannot actually perform -----------------
   Downloading a PDF, emailing an employer, attaching a file, exporting or
   closing an account all need a server. They were doing nothing at all,
   which in a live demo reads as broken rather than as out of scope. Each
   now says what it would do. Anything with real behaviour — the filters,
   the wizard, the composer — is untouched; this is only for the ones that
   genuinely end at the edge of the prototype. */
var SAYS=[
  ["Download a PDF","The PDF is generated from the record itself, not scanned. Not wired in this demo."],
  ["Send to my employer","Sends a check link, never the document. The employer verifies it against this post."],
  ["Attach","Opens your camera or files. Not wired in this demo."],
  ["Send","Posted to the officer handling this ticket."],
  ["Export everything","A machine-readable copy of your whole record, sent to your verified email."],
  ["Close this account","Asks for your face, then a consular officer confirms. Not wired in this demo."],
  ["Remove","Removes this device. Signing in again re-adds it."],
  ["Share a check link","A link anyone can open to verify this document against the post."],
  ["Replace this document","Starts the service that reissues it."]
];
document.addEventListener("click",function(e){
  var el=e.target.closest("button,a"); if(!el||el.disabled) return;
  /* anything already wired handles itself */
  if(el.hasAttribute("data-go")||el.hasAttribute("href")) return;
  for(var i=0;i<el.attributes.length;i++) if(/^data-/.test(el.attributes[i].name)) return;
  var t=(el.textContent||"").trim();
  for(var j=0;j<SAYS.length;j++){
    if(t.indexOf(SAYS[j][0])===0){ say(SAYS[j][1]); return; }
  }
});

/* ---- offline ---- */
var off=document.createElement("div"); off.id="koff";
off.innerHTML=I.alert+'<span>You are offline. Everything already loaded still works — anything you start will be sent when you are back.</span>';
document.body.appendChild(off);
function net(){
  var down=navigator.onLine===false;
  off.classList.toggle("on",down);
  document.body.classList.toggle("offline",down);
}
window.addEventListener("online",function(){ net(); say("Back online — nothing was lost."); });
window.addEventListener("offline",net);
net();

/* ---- counters count, bars fill ---- */
function animate(root){
  if(reduce) return;
  root.querySelectorAll(".umet b, .cdown b, .big5, .score .big2 b").forEach(function(el){
    var m=(el.textContent||"").match(/^(\D*)(\d[\d,]*)(.*)$/);
    if(!m) return;
    var end=parseInt(m[2].replace(/,/g,""),10);
    if(!(end>0)||end>100000) return;
    var pre=m[1], post=m[3], t0=null, dur=Math.min(760,220+end*16);
    function tick(t){
      if(!t0) t0=t;
      var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,3);
      el.textContent=pre+Math.round(end*e).toLocaleString()+post;
      if(k<1) requestAnimationFrame(tick);
    }
    el.textContent=pre+"0"+post;
    requestAnimationFrame(tick);
  });
  root.querySelectorAll(".vlife i, .spr .sb i, .dl .lifebar i, .urh i, .score .bar3 i").forEach(function(el){
    var w=el.style.width, f=el.style.flex;
    if(w){ el.style.width="0"; requestAnimationFrame(function(){ requestAnimationFrame(function(){ el.style.width=w; }); }); }
    else if(f){ el.style.transition="none"; el.style.flexGrow="0";
      requestAnimationFrame(function(){ el.style.transition="flex-grow .8s var(--ease)"; el.style.flexGrow=f.split(" ")[0]; }); }
  });
}

/* ---- copy a reference, and say so ---- */
document.addEventListener("click",function(e){
  var el=e.target.closest("[data-copy]");
  if(!el) return;
  var v=el.getAttribute("data-copy");
  try{
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(v);
    else{ var ta=document.createElement("textarea"); ta.value=v; document.body.appendChild(ta);
          ta.select(); document.execCommand("copy"); ta.remove(); }
    say(v+" copied");
  }catch(err){ say("Could not copy — the reference is "+v); }
});

/* the fade at the foot of the sidebar only means "there is more" while
   there actually is more */
(function(){
  var nav=document.getElementById("nav");
  if(!nav) return;
  function m(){ nav.classList.toggle("atend", nav.scrollTop + nav.clientHeight >= nav.scrollHeight - 2); }
  nav.addEventListener("scroll",m,{passive:true});
  window.addEventListener("resize",m);
  m();
})();

/* ---- wrap the renderer ---- */
var base=window.KRENDER, page=document.getElementById("page");
if(base&&page){
  window.KRENDER=function(n,fromHash){
    try{
      /* forward every argument: the router uses the second one to tell a
         hash-driven render from a click, and swallowing it made the back
         button push a new entry instead of consuming one */
      base(n,fromHash);
    }catch(err){
      page.innerHTML='<div class="kfail"><span class="fi">'+I.alert+'</span>'+
        '<h2>That screen did not open.</h2>'+
        '<p>Nothing you have done was lost — this is a display fault, not a data one. Your applications, documents and payments are untouched.</p>'+
        '<code>'+String(err&&err.message||err).replace(/</g,"&lt;")+'</code>'+
        '<div class="vacts"><button class="k-btn" data-go="home">Back to the dashboard</button>'+
        '<button class="k-btn ghost" data-go="ask">Tell us it happened</button></div></div>';
      if(window.console&&console.error) console.error(err);
      return;
    }
    animate(page);
  };
  /* first paint happens here, last, so every module has registered the
     data the dashboard counts */
  /* the single-file prototype lives one folder down, so every link out of the
     application has to climb before it resolves */
  if(window.KSITE) document.querySelectorAll("[data-site]").forEach(function(a){
    a.setAttribute("href", window.KSITE(a.getAttribute("data-site")));
  });
  if(window.KFIRST) window.KFIRST(); else animate(page);
}
})();
