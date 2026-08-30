/* ============ PY · payments ============
   A consular fee is a public charge. It should be itemised, receipted and
   checkable — and never taken in cash across a counter.                 */
(function(){
"use strict";
var P=window.KP, I=window.KI;
var A=I.arr.replace("<svg",'<svg class="k-arr"');

var R=[
 {id:"r1",ref:"KON-R-88431",svc:"Renew your passport",ic:"renew",d:"14 August 2026",amt:"265",
  app:["Application KON-26-P-4471","app1"],
  lines:[["Consular fee · regular processing","AED 240","Set by the DFA schedule, not by this post"],
         ["Courier to Al Qusais 2, Dubai","AED 25","Optional — pickup is free"]],
  method:"Visa •••• 4417", state:"ok"},
 {id:"r2",ref:"KON-R-81002",svc:"Special power of attorney",ic:"key",d:"3 July 2026",amt:"190",
  app:["Application KON-26-N-2210","apn1"],
  lines:[["Notarial fee","AED 100","Per notarial act"],
         ["Courier to Quezon City","AED 90","Tracked, signed for on delivery"]],
  method:"Visa •••• 4417", state:"ok"},
 {id:"r3",ref:"KON-R-77420",svc:"Certified true copy · birth certificate",ic:"stamp",d:"12 May 2026",amt:"100",
  app:["Application KON-26-C-1188","apc1"],
  lines:[["Certification fee","AED 100","Per certified copy"]],
  method:"Apple Pay", state:"ok"},
 {id:"r4",ref:"KON-R-00000",svc:"Report of Birth · Danila R. Reyes",ic:"baby",d:"9 August 2026",amt:"0",
  app:["Application KON-26-R-0147","apr1"],
  lines:[["Report of Birth within twelve months","Free","No fee is charged in the first year"]],
  method:"—", state:"free"}
];
window.KRCPT=R;

P.pay=function(){
  var tot=R.reduce(function(a,r){return a+ +r.amt;},0);
  return '<div class="uh"><div><span class="kk">My workspace</span>'+
      '<h1>Every fee itemised, receipted, and never in cash.</h1>'+
      '<p class="lede">A consular fee is a public charge. You should be able to see what it was for, who set it, and prove you paid it — without keeping a paper slip in a drawer for two years.</p></div>'+
      '<div class="uacts"><button class="k-btn ghost" data-go="all">See what things cost</button>'+
        '<button class="k-btn" id="addpay">'+I.plus+'Add a payment method</button></div></div>'+

    '<div class="umets mb20">'+
      '<div class="umet"><em>Paid in 2026</em><b>AED '+tot+'</b><small>Across four applications</small></div>'+
      '<div class="umet ok"><em>Handled in cash</em><b>None</b><small>No counter, no queue, no change</small></div>'+
      '<div class="umet"><em>Receipts held</em><b>'+R.length+'</b><small>Each one verifiable by QR</small></div>'+
      '<div class="umet"><em>Overcharged</em><b>0</b><small>Every fee is read from the published schedule</small></div>'+
    '</div>'+

    '<div class="u2"><div>'+
      '<div class="ush"><h2>Receipts</h2><span class="cnt">'+R.length+' this year</span></div>'+
      '<div class="ulist">'+R.map(function(r){
        return '<button class="rcpt" data-go="rc'+r.id+'"><span class="ri">'+I[r.ic]+'</span>'+
          '<span class="um"><b>'+r.svc+'</b><small>'+r.ref+' · '+r.method+'</small></span>'+
          '<span class="amt">'+(r.amt==="0"?"Free":"AED "+r.amt)+'<em>'+r.d+'</em></span>'+
          I.arr.replace("<svg",'<svg class="rarr"')+'</button>';}).join("")+'</div>'+

      '<div class="ush"><h2>Where it went</h2><p>The largest single line is the DFA’s own passport fee, which this post collects and remits. It sets none of it, and adds nothing to it.</p></div>'+
      '<div class="upan"><div class="upan-b"><div class="spend">'+
        (function(){
          var dfa=240, courier=0, post=0;
          R.forEach(function(r){ r.lines.forEach(function(l){
            var v=parseInt(String(l[1]).replace(/\D/g,""),10)||0;
            if(/courier/i.test(l[0])) courier+=v; else if(/consular fee/i.test(l[0])) return; else post+=v;
          });});
          var rows=[["Department of Foreign Affairs · passport",dfa,"var(--navy)"],
                    ["Consular fees retained by this post",post,"var(--pri)"],
                    ["Courier, at your choice",courier,"var(--gold-fill)"],
                    ["Service charges added by us",0,"var(--line-3)"]];
          var max=Math.max.apply(null,rows.map(function(r){return r[1];}))||1;
          return rows.map(function(l){
            return '<div class="spr"><span>'+l[0]+'</span><b>AED '+l[1]+'</b>'+
              '<span class="sb"><i style="width:'+Math.round(l[1]/max*100)+'%;background:'+l[2]+'"></i></span></div>';}).join("");
        })()+
      '</div></div>'+
      '<div class="upan-f"><span>Nothing on this page was set by the application</span>'+
        '<span>Fees follow the published DFA schedule</span></div></div>'+
    '</div>'+

    '<div class="urail">'+
      '<div class="upan"><div class="upan-h"><h3>How you pay</h3></div><div class="upan-b">'+
        '<div class="pmeth"><span class="pi">'+I.card+'</span>'+
          '<span class="um"><b>Visa · personal</b><small>•••• 4417 · expires 09/29</small></span>'+
          '<span class="k-chip ok">'+I.tickc+'Default</span></div>'+
        '<div class="pmeth"><span class="pi">'+I.coin+'</span>'+
          '<span class="um"><b>Apple Pay</b><small>Face ID · same device key</small></span>'+
          '<span class="lk">Use</span></div>'+
        '<div class="pmeth"><span class="pi">'+I.build+'</span>'+
          '<span class="um"><b>UAE bank transfer</b><small>For fees above AED 1,000</small></span>'+
          '<span class="lk" id="addpay2">Add</span></div>'+
        '<button class="pmadd" id="addpay3">'+I.plus+'Add a payment method</button>'+
      '</div></div>'+
      '<div class="unote ok">'+I.shield+'<span><b>A receipt is a document, not an email.</b>'+
        '<p>Each one sits in your vault with the same QR any other document carries, so an employer reimbursing you can check it against this post rather than take your word for it.</p>'+
        '<span class="lk" data-go="docs">Open your documents'+I.arr+'</span></span></div>'+
      '<div class="unote">'+I.alert+'<span><b>If a fee was taken wrongly</b>'+
        '<p>Say so from the receipt itself. A refund is decided by an officer, not by a form, and it goes back to the card it came from — never in cash.</p></span></div>'+
    '</div></div>';
};

function receipt(r){
  var tot=r.amt==="0"?"Free":"AED "+r.amt;
  return '<button class="uback" data-go="pay">'+I.arr+'All receipts</button>'+
    '<div class="apd-h"><div><h1>Receipt · '+r.svc+'</h1>'+
      '<div class="rf2"><span>'+r.ref+'</span><span>·</span><span>'+r.d+'</span>'+
        '<button data-copy="'+r.ref+'">'+I.newdoc+'Copy reference</button></div></div>'+
      '<div class="apd-a"><span class="k-chip '+(r.state==="free"?"mute":"ok")+'">'+I.tickc+
        (r.state==="free"?"No fee charged":"Paid in full")+'</span></div></div>'+
    /* The Ink masthead, chosen from _options/ss13c-masthead-colour.html.
       The seal and the total carry the authority, so the body underneath can
       stay plain white and the figures are the easiest thing on the page.
       Navy is left to mean one thing on this screen: something you can press. */
    '<div class="vd"><div class="vsheet ink">'+
      '<div class="vhead"><span class="vseal">'+I.shield+'</span>'+
        '<span class="vorg"><b>Official receipt</b><small>Philippine Consulate General · Dubai</small></span>'+
        '<span class="vtot"><em>Total paid</em><b>'+tot+'</b></span></div>'+
      '<p class="vsub">'+r.svc+' · paid '+r.d+(r.method!=="—"?" by "+r.method:"")+'.</p>'+
      '<div class="vbody"><div class="apfee">'+r.lines.map(function(l){
        return '<div><span>'+l[0]+'<small class="why">'+l[2]+'</small></span><b>'+l[1]+'</b></div>';}).join("")+
        '<div class="tot"><span>Total</span><b>'+tot+'</b></div></div></div>'+
      '<div class="vsign"><div class="qr">'+(window.KQR?window.KQR(r.ref,13):"")+'</div>'+
        '<div><span class="nm">PCG Dubai · '+r.ref+'</span>'+
        '<small>Issued automatically at the moment of payment. Anyone you show this to can check it against the post — no officer keys it in, and nothing here can be edited afterwards.</small></div></div>'+
    '</div>'+
    '<div>'+
      '<div class="upan"><div class="upan-h"><h3>What this belongs to</h3></div><div class="upan-b">'+
        '<div class="ukv"><div><span>Application</span><b>'+r.app[0]+'</b></div>'+
          '<div><span>Paid</span><b>'+r.d+'</b></div>'+
          '<div><span>Method</span><b>'+r.method+'</b></div>'+
          '<div><span>Refundable</span><b>'+(r.state==="free"?"—":"Until the officer begins review")+'</b></div></div>'+
        '<button class="k-btn ghost wide" data-go="'+r.app[1]+'">Open the application'+A+'</button>'+
      '</div></div>'+
      '<div class="upan"><div class="upan-h"><h3>Who set this fee</h3></div><div class="upan-b">'+
        '<p class="nxp mt0">'+(r.id==="r1"
          ? "AED 240 is the Department of Foreign Affairs’ own regular-processing fee. This post collects it and remits it; it cannot raise it, discount it or add to it. The AED 25 courier is optional and was your choice — collecting in person is free."
          : r.state==="free"
          ? "There is no fee. A Report of Birth lodged within twelve months of the birth is free under the published schedule, and the application will not accept a payment for it."
          : "Set by the published schedule of consular fees. This post adds no service charge of its own, and the application refuses any fee not on the schedule.")+'</p>'+
        '<div class="unote ok mt16">'+I.tickc+'<span><b>Nothing was added at the counter.</b>'+
          '<p>Every amount here was read from the published schedule at the moment of payment, not typed by a person.</p></span></div>'+
      '</div></div>'+
      '<div class="vacts"><button class="k-btn">'+I.print+'Download a PDF</button>'+
        '<button class="k-btn ghost">Send to my employer</button></div>'+
    '</div></div>';
}

/* ---- ss12 · adding a payment method, in a drawer ---------------------
   The card is never keyed into a consular form: the panel states plainly
   that the number goes to the payment processor and this post is told only
   the last four. That is the honest version of an "add a card" screen and
   it is the reason to show one at all. ------------------------------- */
function paydrawer(){
  var d=document.getElementById("paydrw");
  if(d) return d;
  d=document.createElement("aside");
  d.className="pdrw"; d.id="paydrw"; d.setAttribute("role","dialog");
  d.setAttribute("aria-modal","true"); d.setAttribute("aria-label","Add a payment method");
  d.innerHTML=
    '<div class="pdrw-h"><h3>Add a payment method</h3>'+
      '<button class="pdrw-x" id="pdx" aria-label="Close">'+I.x+'</button></div>'+
    '<div class="pdrw-b">'+
      '<span class="pdrw-k">Choose one</span>'+
      '<div class="pdrw-o">'+
        '<button class="pdo on" data-pay="card"><span class="pi">'+I.card+'</span>'+
          '<span class="um"><b>Card</b><small>Visa, Mastercard or a UAE debit card</small></span>'+
          '<span class="rd"></span></button>'+
        '<button class="pdo" data-pay="apple"><span class="pi">'+I.coin+'</span>'+
          '<span class="um"><b>Apple Pay or Google Pay</b><small>Confirmed with the same face you sign in with</small></span>'+
          '<span class="rd"></span></button>'+
        '<button class="pdo" data-pay="bank"><span class="pi">'+I.build+'</span>'+
          '<span class="um"><b>UAE bank transfer</b><small>For fees above AED 1,000. Clears in one working day</small></span>'+
          '<span class="rd"></span></button>'+
      '</div>'+
      '<div class="pdrw-f" id="pdf">'+
        '<label><span>Name on the card</span><input type="text" value="Maria Cristina Santos Reyes"></label>'+
        '<label><span>Card number</span><input type="text" inputmode="numeric" placeholder="0000 0000 0000 0000"></label>'+
        '<div class="pdrw-2"><label><span>Expires</span><input type="text" placeholder="MM / YY"></label>'+
          '<label><span>Security code</span><input type="text" inputmode="numeric" placeholder="123"></label></div>'+
        '<label class="pdchk"><input type="checkbox" checked><span>Use this by default</span></label>'+
      '</div>'+
      '<div class="unote ok mt14">'+I.shield+'<span><b>The number never reaches this post.</b>'+
        '<p>It goes straight to the payment processor. The consulate is told the last four digits and nothing else, which is all a receipt or a refund needs.</p></span></div>'+
    '</div>'+
    '<div class="pdrw-a"><button class="k-btn ghost" id="pdc">Cancel</button>'+
      '<button class="k-btn" id="pds">Save this method</button></div>';
  document.body.appendChild(d);
  var sc=document.createElement("div"); sc.className="pscrim"; sc.id="pscrim";
  document.body.appendChild(sc);
  return d;
}
function payopen(){ paydrawer(); document.getElementById("paydrw").classList.add("on");
  document.getElementById("pscrim").classList.add("on"); document.body.style.overflow="hidden"; }
function payclose(){ var d=document.getElementById("paydrw"); if(!d) return;
  d.classList.remove("on"); document.getElementById("pscrim").classList.remove("on");
  document.body.style.overflow=""; }
document.addEventListener("click",function(e){
  if(e.target.closest("#addpay,#addpay2,#addpay3")){ payopen(); return; }
  if(e.target.closest("#pdx,#pdc,#pscrim")){ payclose(); return; }
  var o=e.target.closest(".pdo[data-pay]");
  if(o){ o.parentNode.querySelectorAll(".pdo").forEach(function(x){x.classList.toggle("on",x===o);});
    var f=document.getElementById("pdf"); if(f) f.hidden = o.getAttribute("data-pay")!=="card"; return; }
  if(e.target.closest("#pds")){ payclose(); return; }
});
document.addEventListener("keydown",function(e){ if(e.key==="Escape") payclose(); });

R.forEach(function(r){ P["rc"+r.id]=function(){ return receipt(r); }; });
})();
