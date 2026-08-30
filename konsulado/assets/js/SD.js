/* ============ SD · search ============
   Plain language over the catalogue, the vault and the applications. A
   service that is not built in this demo is listed in the results and is
   not clickable, rather than opening a page that would have to apologise.  */
(function(){
"use strict";
var P=window.KP, I=window.KI, CAT=window.KCAT, V=window.KVERD;
var A=I.arr.replace("<svg",'<svg class="k-arr"');


/* ---------- search ---------- */
var q="", SUG=["renew my passport","my child was born here","sell my land back home","I lost my passport",
               "NBI clearance","get married","vote"];
var SYN={ "renew":"renew passport", "born":"birth report child", "child":"birth child minor",
          "sell":"power attorney land", "lost":"lost stolen replace", "married":"marriage wedding",
          "vote":"voter registration election", "nbi":"clearance police", "die":"death repatriation",
          "job":"employment worker oec", "money":"fee payment" };

function score(hay,terms){
  var n=0; hay=hay.toLowerCase();
  terms.forEach(function(t){ if(t.length>2 && hay.indexOf(t)>-1) n++; });
  return n;
}
function results(){
  var terms=q.toLowerCase().split(/\s+/).filter(Boolean);
  terms.forEach(function(t){ if(SYN[t]) terms=terms.concat(SYN[t].split(" ")); });
  var svc=[];
  CAT.forEach(function(c,ci){ c.s.forEach(function(s,si){
    var n=score(s[0]+" "+s[2]+" "+c.n,terms);
    if(n) svc.push({n:n,t:s[0],sub:c.n+" · "+s[3]+" · "+V[s[1]].lab,
                    go:s[5]?"renew":null, tag:s[5]?"Live":"Listed", ic:s[6]});
  });});
  svc.sort(function(a,b){return b.n-a.n;});
  var doc=(window.KVAULT||[]).filter(function(d){return score(d.n+" "+d.ref,terms);})
    .map(function(d){return {t:d.n,sub:d.ref+" · "+d.ex,go:"dc"+d.id,ic:d.ic};});
  var app=(window.KAPPS||[]).filter(function(a){return score(a.svc+" "+a.ref,terms);})
    .map(function(a){return {t:a.svc,sub:a.ref+" · "+a.chip[1],go:"ap"+a.id,ic:a.ic};});
  return {svc:svc.slice(0,8),doc:doc,app:app};
}

function group(title,items){
  if(!items.length) return "";
  return '<div class="ush"><h2>'+title+'</h2><span class="cnt">'+items.length+'</span></div>'+
    '<div class="ulist">'+items.map(function(r){
      var live=!!r.go, tag=r.tag?'<span class="k-chip '+(r.tag==="Live"?"ok":"mute")+'">'+r.tag+'</span>':'';
      return '<'+(live?'button':'div')+' class="uli"'+(live?' data-go="'+r.go+'"':'')+'>'+
        '<span class="uic">'+(I[r.ic]||I.grid)+'</span>'+
        '<span class="um"><b>'+r.t+'</b><small>'+r.sub+'</small></span>'+
        '<span class="uend">'+tag+(live?I.arr.replace("<svg",'<svg class="uarr"'):'')+'</span>'+
      '</'+(live?'button':'div')+'>';}).join("")+'</div>';
}

P.find=function(){
  var r=q?results():null, tot=r?r.svc.length+r.doc.length+r.app.length:0;
  return '<div class="uh"><div><span class="kk">Search</span>'+
      '<h1>Say it the way you would say it.</h1>'+
      '<p class="lede">Type what happened rather than what the document is called. The application finds the service, the document or the application it belongs to.</p></div></div>'+
    '<div class="fsearch">'+I.search+
      '<input type="text" value="'+q.replace(/"/g,"&quot;")+'" placeholder="my child was born here" aria-label="Search"><kbd>esc</kbd></div>'+
    '<p class="fhint">Searches your services, your documents and your applications. Never anyone else’s.</p>'+
    (q
      ? (tot
        ? group("Services",r.svc)+group("Your documents",r.doc)+group("Your applications",r.app)
        : '<div class="uempty"><span class="ue-i">'+I.magni+'</span>'+
          '<b>Nothing matched “'+q+'”</b>'+
          '<p>Try describing what happened rather than what the document is called — or ask in your own words and an officer will answer.</p>'+
          '<button class="k-btn" data-go="ask">Ask instead'+A+'</button></div>')
      : '<div class="fq">'+SUG.map(function(s){
          return '<button data-q="'+s+'">'+s+'</button>';}).join("")+'</div>'+
        '<div class="unote">'+I.shield+'<span><b>Searching does not search you.</b>'+
        '<p>The catalogue is public and the same for everyone. Your documents and applications are matched on this device against your own record only — a search never reaches anyone else’s file.</p></span></div>');
};

document.addEventListener("click",function(e){
  var el=e.target.closest("[data-q]");
  if(el){ q=el.getAttribute("data-q"); window.KRENDER("find"); }
});
document.addEventListener("input",function(e){
  if(e.target.closest(".fsearch")){ q=e.target.value; var s=e.target.selectionStart;
    window.KRENDER("find");
    var i=document.querySelector(".fsearch input"); if(i){ i.focus(); i.setSelectionRange(s,s); } }
});
document.addEventListener("keydown",function(e){
  if(e.key==="/"&&!/input|textarea/i.test((e.target.tagName||""))){
    e.preventDefault(); window.KRENDER("find");
    var i=document.querySelector(".fsearch input"); if(i) i.focus(); }
});
})();
