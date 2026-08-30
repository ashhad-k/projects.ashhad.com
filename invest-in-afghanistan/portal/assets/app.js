/* ═══════════════════════════════════════════════════════════════
   Invest in Afghanistan — Portal application layer.

   Two complete journeys behind one system:
     • BUSINESS  — licensing, records, filings for a company
     • INVESTOR  — opportunities, shortlist, facilitation, approvals

   Each role has its own navigation and its own pages (b-*.html / i-*.html).
   Fees are in AFN, matching the Ministry's published schedule.
   ═══════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ───────── helpers ───────── */
var AFN=function(n){return n?'AFN '+n.toLocaleString('en-US'):'No fee';};
var ST={ok:['ok','Approved'],pend:['rev','Action needed'],rev:['rev','In review'],
        draft:['dr','Draft'],exp:['rej','Expiring'],open:['act','Open'],paid:['ok','Paid'],due:['rev','Due']};
function badge(k){return ST[k]?'<span class="pill '+ST[k][0]+'">'+ST[k][1]+'</span>':'';}
function svg(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>';}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}

var I={
 dash:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
 app:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/>',
 plus:'<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
 svc:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 lic:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="12" r="2.4"/><path d="M14 10h4M14 14h4"/>',
 doc:'<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
 pay:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
 vfy:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
 msg:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
 bell:'<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
 usr:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/>',
 opp:'<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/>',
 star:'<path d="M12 2l3 6.5 7 .9-5 4.9 1.2 7L12 18l-6.2 3.3L7 14.3l-5-4.9 7-.9z"/>',
 land:'<rect x="3" y="8" width="7" height="13"/><rect x="14" y="4" width="7" height="17"/>',
 cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18M8 2v4M16 2v4"/>'
};

/* ───────── service catalogue (15 services, 5 categories) ───────── */
var CATS=[['all','All services','Everything available online'],
 ['lic','Licensing','New, renew, amend, cancel'],
 ['name','Names & marks','Reservation and trademarks'],
 ['rec','Records & extracts','Certified documents'],
 ['inv','Investor services','Facilitation and approvals']];

var SVCS=[
 {n:'New Trade Licence',d:'The core authorisation to trade, issued digitally with a verification QR.',t:'5–7 days',tag:'Most used',c:'lic',f:8000,
  need:['Reserved trade name','Articles of association','Owner ID (Tazkira/passport)','Premises lease or title']},
 {n:'Licence Renewal',d:'Pre-filled from your record — confirm what changed and pay.',t:'1–2 days',tag:'Fast track',c:'lic',f:5500,
  need:['Existing licence','Tax clearance','Updated premises proof']},
 {n:'Licence Amendment',d:'Change activities, address, capital or ownership on an active licence.',t:'2–4 days',tag:'',c:'lic',f:4500,
  need:['Existing licence','Board resolution','Supporting evidence for the change']},
 {n:'Licence Cancellation',d:'Close a licence cleanly with the tax and chamber steps included.',t:'3–5 days',tag:'',c:'lic',f:2000,
  need:['Existing licence','Tax clearance','Shareholder resolution']},
 {n:'Branch Registration',d:'Register a foreign company branch or representative office.',t:'5–7 days',tag:'Foreign',c:'lic',f:15000,
  need:['Parent incorporation certificate','Board resolution','Power of attorney','Passport of representative']},
 {n:'Trade Name Reservation',d:'Search the live register and hold a name for thirty days.',t:'Same day',tag:'Instant check',c:'name',f:1000,
  need:['Proposed names (up to 3)','Owner ID']},
 {n:'Trademark Registration',d:'National protection with publication and an opposition window.',t:'30–90 days',tag:'Protected',c:'name',f:12000,
  need:['Mark or logo file','Goods & services class','Applicant ID']},
 {n:'Trade Name Amendment',d:'Change a reserved or registered trade name.',t:'2–3 days',tag:'',c:'name',f:1500,
  need:['Existing reservation','Owner ID']},
 {n:'Trademark Renewal',d:'Extend protection for a further ten-year term.',t:'10–20 days',tag:'',c:'name',f:9000,
  need:['Existing registration number']},
 {n:'Company Extract',d:'Signed extract accepted by banks and counterparties.',t:'Same day',tag:'Digital',c:'rec',f:500,
  need:['Licence number']},
 {n:'Duplicate Licence',d:'Reissue a lost or damaged licence certificate.',t:'Same day',tag:'Digital',c:'rec',f:700,
  need:['Licence number','Declaration of loss']},
 {n:'Verification Certificate',d:'Confirm a licence is valid — open to anyone.',t:'Instant',tag:'Free',c:'rec',f:0,
  need:['Licence or reference number']},
 {n:'Investment Registration',d:'Register a qualifying investment for incentives and land access.',t:'7–10 days',tag:'Incentives',c:'inv',f:0,
  need:['Passport or incorporation certificate','Project brief','Source of funds']},
 {n:'Industrial Land Allocation',d:'Apply for serviced plots inside a designated industrial park.',t:'15–30 days',tag:'',c:'inv',f:0,
  need:['Investment registration','Business plan','Proof of funds']},
 {n:'Investor Meeting Request',d:'Request a session with the Investment Facilitation Unit.',t:'2 days',tag:'Free',c:'inv',f:0,
  need:['Brief note on your interest']}
];

/* ───────── investment opportunities ───────── */
/* Opportunity imagery.
   Prototype images are generated art hosted on a CDN so the cards render out of the box.
   Images are localised in assets/img/ (fetched via assets/img/fetch-images.sh),
   so CDNB points at the local folder for a fully offline, self-contained build. */
var CDNB='assets/img/';
var OPPS=[
 {n:'Herat Cold Chain Network',s:'Agri-processing',d:'Refrigerated storage and grading hubs along the Herat–Islam Qala corridor, serving saffron, fruit and vegetable exporters.',sz:'USD 6.5M',irr:'18%',prov:'Herat',img:CDNB+'hf_20260730_220313_bdc0e64c-a591-413e-94ad-da0c16b0ee33_min.webp'},
 {n:'Kajaki Solar Extension',s:'Energy',d:'A 40 MW extension with an existing offtake and a grid connection already built.',sz:'USD 22M',irr:'14%',prov:'Helmand',img:CDNB+'hf_20260730_220315_b4bde463-938e-4cb2-bd08-d5cfa8aab5e6_min.webp'},
 {n:'Aynak Downstream Processing',s:'Mining',d:'Copper concentrate processing close to the deposit, cutting export costs and adding local value.',sz:'USD 45M',irr:'21%',prov:'Logar',img:CDNB+'hf_20260730_220318_9a8fab6b-70ee-4f1a-9b18-6780fb270b62_min.webp'},
 {n:'Mazar Textile Cluster',s:'Manufacturing',d:'Serviced plots, power and a trained workforce for cotton spinning and garment assembly.',sz:'USD 8M',irr:'16%',prov:'Balkh',img:CDNB+'hf_20260730_220326_d70274ac-cec1-423e-af8e-d7b33d472822_min.webp'},
 {n:'Kabul Cargo Terminal',s:'Logistics',d:'Bonded warehousing and handling at the main air freight gateway.',sz:'USD 12M',irr:'15%',prov:'Kabul',img:CDNB+'hf_20260730_220328_f3a5de94-39e3-411e-88db-d060cdbc951a_min.webp'},
 {n:'Bamyan Potato Storage',s:'Agri-processing',d:'Controlled-atmosphere storage that lets growers sell out of season instead of at harvest.',sz:'USD 3.2M',irr:'19%',prov:'Bamyan',img:CDNB+'hf_20260730_220331_56cf774e-eda0-4695-96e2-9a1bfd788007_min.webp'}
];

/* ───────── the two roles ───────── */
var ROLES={
 business:{
  key:'business',label:'Business',home:'b-dashboard.html',
  user:{name:'Herat Cold Chain Ltd',person:'Ahmad Rasooli',role:'Business owner',ini:'AR',
        email:'ahmad.rasooli@heratcoldchain.af',phone:'+93 79 000 0000',level:'Level 2 — full filing rights',verified:'28 Jul 2026'},
  greet:'Good morning, Ahmad.',
  status:'One application needs a document from you. Everything else is moving.',
  stats:[
   {v:'4',l:'Active applications',n:'1 needs your action',sc:'#176f7e',bg:'rgba(0,180,204,.12)',ic:I.app},
   {v:'2',l:'Valid licences',n:'1 expires in 38 days',sc:'#3f9e4d',bg:'rgba(140,224,95,.16)',ic:I.lic},
   {v:'21K',l:'Fees paid this year',n:'AFN, across 5 filings',sc:'#0d1b26',bg:'rgba(13,27,38,.06)',ic:I.pay},
   {v:'4.2',l:'Avg decision time',n:'working days on your files',sc:'#b7791f',bg:'rgba(245,165,36,.16)',ic:I.cal}],
  nav:[
   {k:'Overview',items:[{h:'b-dashboard.html',t:'Dashboard',i:I.dash}]},
   {k:'Applications',items:[
     {h:'b-applications.html',t:'My applications',i:I.app,badge:'4'},
     {h:'b-services.html',t:'All services',i:I.svc},
     {h:'b-apply.html',t:'Start an application',i:I.plus}]},
   {k:'My records',items:[
     {h:'b-licences.html',t:'My licences',i:I.lic},
     {h:'b-documents.html',t:'Documents',i:I.doc}]},
   {k:'Billing & tools',items:[
     {h:'b-payments.html',t:'Fees & payments',i:I.pay},
     {h:'verify-licence.html',t:'Verify a licence',i:I.vfy}]}],
  foot:[{h:'b-messages.html',t:'Messages',i:I.msg,badge:'2'},
        {h:'notifications.html',t:'Notifications',i:I.bell,badge:'3'},
        {h:'b-profile.html',t:'Profile',i:I.usr}],
  apps:[
   {ref:'TL-2026-004182',n:'New Trade Licence',co:'Herat Cold Chain Ltd',st:'rev',pct:65,dt:'22 Jul 2026',fee:8000,prov:'Herat',officer:'M. Sadat',
    tl:[['done','Application submitted','22 Jul 2026, 09:14'],['done','Completeness check passed','Routed to Herat licensing desk'],['now','Provincial review','Expected decision 4 August 2026'],['','Decision &amp; issue','Digital licence issued on approval']]},
   {ref:'TN-2026-011907',n:'Trade Name Reservation',co:'Herat Cold Chain Ltd',st:'ok',pct:100,dt:'14 Jul 2026',fee:1000,prov:'Herat',officer:'S. Noori',
    tl:[['done','Application submitted','14 Jul 2026'],['done','Register searched','No conflicting name found'],['done','Name reserved','Held until 13 Aug 2026'],['done','Certificate issued','Available in Documents']]},
   {ref:'TM-2026-000734',n:'Trademark Registration',co:'Herat Cold Chain Ltd',st:'pend',pct:30,dt:'25 Jul 2026',fee:12000,prov:'—',officer:'S. Noori',
    tl:[['done','Application submitted','25 Jul 2026'],['now','Document requested','Upload a signed lease for the Herat facility'],['','Examination','Begins once complete'],['','Publication &amp; opposition','30-day window']]},
   {ref:'DR-2026-000098',n:'Licence Amendment',co:'Herat Cold Chain Ltd',st:'draft',pct:15,dt:'26 Jul 2026',fee:4500,prov:'Herat',officer:'—',
    tl:[['done','Draft created','Saved 26 Jul 2026'],['now','Complete &amp; submit','2 sections left'],['','Review','Begins once submitted'],['','Decision','—']]}],
  lics:[
   {no:'AF-MOIC-2024-118432',n:'Herat Cold Chain Ltd',type:'Limited Liability Company',act:'Cold storage, agri-processing, export',iss:'12 Mar 2024',exp:'11 Mar 2027',prov:'Herat',st:'ok',pct:62},
   {no:'AF-MOIC-2022-094117',n:'Sabz Trading Co.',type:'Sole Proprietorship',act:'General trading, import & export',iss:'04 Sep 2022',exp:'03 Sep 2026',prov:'Kabul',st:'exp',pct:11}],
  docs:[
   ['Trade licence — Herat Cold Chain Ltd','Issued by MoIC · 12 Mar 2024','PDF · 240 KB','ok'],
   ['Receipt RCT-2026-88104','Payment AFN 8,000 · 22 Jul 2026','PDF · 88 KB','ok'],
   ['Trade name reservation certificate','Valid to 13 Aug 2026','PDF · 112 KB','ok'],
   ['Lease agreement — Herat facility','Uploaded 22 Jul 2026','PDF · 1.4 MB','ok'],
   ['Articles of association','Uploaded 22 Jul 2026','PDF · 640 KB','ok'],
   ['Capital declaration','Awaiting your upload','—','pend']],
  pay:{out:'AFN 12,000',outLab:'Trademark fee due',due:true,paid:'AFN 21,000',paidN:'5 filings · 2026',
   next:{n:'Licence renewal — Sabz Trading Co.',note:'Due before 03 Sep 2026',a:'AFN 5,500'},
   hist:[
    {i:'Trademark registration fee',r:'TM-2026-000734',d:'Due now',a:'AFN 12,000',st:'due'},
    {i:'Trade licence fee',r:'TL-2026-004182',d:'22 Jul 2026',a:'AFN 8,000',st:'paid'},
    {i:'Trade name reservation',r:'TN-2026-011907',d:'14 Jul 2026',a:'AFN 1,000',st:'paid'},
    {i:'Company extract',r:'RC-2026-00421',d:'02 Jul 2026',a:'AFN 500',st:'paid'},
    {i:'Licence renewal — 2025',r:'TL-2025-003940',d:'11 Mar 2025',a:'AFN 5,500',st:'paid'}]},
  thread:{title:'Herat licensing desk · TL-2026-004182',st:'open',
   msgs:[['them','M. Sadat · Reviewer','Your file is complete and under review. No action needed from you at this stage.','25 Jul, 09:12'],
         ['me','You','Thank you. Is the industrial park plot reference enough, or do you also need the allocation letter?','25 Jul, 10:04'],
         ['them','M. Sadat · Reviewer','The plot reference is sufficient. We can see the allocation on the park registry directly.','25 Jul, 11:38'],
         ['sys','System','Provincial review started. Expected decision 4 August 2026.','25 Jul, 11:40']],
   others:[['Investment Facilitation Unit','Nadia Amiri · about the Herat site visit','2 days ago'],
           ['Trademark examination','Publication window opens 6 August','5 days ago'],
           ['Chamber of Commerce','Membership confirmation','2 weeks ago']]},
  notifs:[
   {c:'info',g:'Today',u:true,t:'Reviewer assigned',s:'TL-2026-004182 is now with the Herat provincial licensing desk.',tm:'2h ago'},
   {c:'warn',g:'Today',u:true,t:'Document requested',s:'Upload a signed lease for the Herat facility to continue TM-2026-000734.',tm:'5h ago'},
   {c:'ok',g:'Earlier',u:true,t:'Trade name confirmed',s:'“Herat Cold Chain Ltd” is reserved until 13 Aug 2026.',tm:'Yesterday'},
   {c:'ok',g:'Earlier',u:false,t:'Payment received',s:'AFN 1,000 received for TN-2026-011907. Receipt available.',tm:'5 days ago'},
   {c:'warn',g:'Earlier',u:false,t:'Renewal due',s:'Sabz Trading Co. licence expires 03 Sep 2026.',tm:'1 week ago'}]
 },

 investor:{
  key:'investor',label:'Investor',home:'i-dashboard.html',
  user:{name:'Gulf Capital Partners',person:'Layla Al Mansouri',role:'Investor · UAE',ini:'LA',
        email:'layla@gulfcapital.example',phone:'+971 50 000 0000',level:'Level 2 — full filing rights',verified:'19 Jul 2026'},
  greet:'Welcome, Layla.',
  status:'Your officer has added two projects that match your mandate in agri-processing and cold chain.',
  stats:[
   {v:'3',l:'Shortlisted projects',n:'Across 2 sectors',sc:'#176f7e',bg:'rgba(0,180,204,.12)',ic:I.star},
   {v:'1',l:'Meetings scheduled',n:'4 August, 10:00 Kabul',sc:'#3f9e4d',bg:'rgba(140,224,95,.16)',ic:I.cal},
   {v:'N. Amiri',l:'Assigned officer',n:'Investment Facilitation Unit',sc:'#0d1b26',bg:'rgba(13,27,38,.06)',ic:I.usr,small:true},
   {v:'$4M',l:'Indicative ticket',n:'Stated in your mandate',sc:'#b7791f',bg:'rgba(245,165,36,.16)',ic:I.opp}],
  nav:[
   {k:'Overview',items:[{h:'i-dashboard.html',t:'Dashboard',i:I.dash}]},
   {k:'Invest',items:[
     {h:'i-opportunities.html',t:'Opportunities',i:I.opp},
     {h:'i-shortlist.html',t:'My shortlist',i:I.star,badge:'3'},
     {h:'i-requests.html',t:'My requests',i:I.app}]},
   {k:'Services',items:[
     {h:'i-services.html',t:'Investor services',i:I.svc},
     {h:'i-documents.html',t:'Documents',i:I.doc}]},
   {k:'Billing & tools',items:[
     {h:'i-payments.html',t:'Fees & payments',i:I.pay},
     {h:'verify-licence.html',t:'Verify a licence',i:I.vfy}]}],
  foot:[{h:'i-messages.html',t:'Messages',i:I.msg,badge:'2'},
        {h:'notifications.html',t:'Notifications',i:I.bell,badge:'3'},
        {h:'i-profile.html',t:'Profile',i:I.usr}],
  officer:{n:'Nadia Amiri',t:'Senior Investment Officer',ini:'NA',
   bio:'One point of contact for permits, land, utilities and introductions to provincial authorities.'},
  mandate:[['Sectors','Agri-processing, cold chain'],['Ticket size','USD 3–6M'],['Horizon','12–24 months'],['Structure','JV or wholly foreign owned'],['Registered','19 July 2026']],
  next:[['done','Mandate registered','Agri-processing, cold chain, USD 3–6M'],
        ['done','Officer assigned','Nadia Amiri, 19 July'],
        ['now','Project shortlist review','3 projects awaiting your feedback'],
        ['','Site visits','Herat, provisional 12–14 August'],
        ['','Company registration','Handled inside this portal when you’re ready']],
  apps:[
   {ref:'IR-2026-00218',n:'Site visit — Herat Industrial Park',co:'Gulf Capital Partners',st:'rev',pct:60,dt:'24 Jul 2026',fee:0,prov:'Herat',officer:'N. Amiri',
    tl:[['done','Request submitted','24 Jul 2026'],['done','Officer reviewed','Nadia Amiri'],['now','Scheduling with the park','Provisional 12–14 August'],['','Visit confirmed','Itinerary sent by email']]},
   {ref:'IR-2026-00191',n:'Information memorandum — Kajaki solar',co:'Gulf Capital Partners',st:'ok',pct:100,dt:'19 Jul 2026',fee:0,prov:'Helmand',officer:'N. Amiri',
    tl:[['done','Request submitted','19 Jul 2026'],['done','Prepared by the unit','Reviewed with the energy ministry'],['done','Memorandum sent','Available in Documents'],['done','Complete','—']]},
   {ref:'IR-2026-00204',n:'Meeting with MoIC investment unit',co:'Gulf Capital Partners',st:'ok',pct:100,dt:'21 Jul 2026',fee:0,prov:'Kabul',officer:'N. Amiri',
    tl:[['done','Request submitted','21 Jul 2026'],['done','Slot offered','4 August, 10:00 Kabul'],['done','Confirmed','Calendar invitation sent'],['done','Complete','—']]},
   {ref:'IV-2026-00077',n:'Investment Registration',co:'Gulf Capital Partners',st:'pend',pct:45,dt:'25 Jul 2026',fee:0,prov:'Herat',officer:'R. Sadat',
    tl:[['done','Application submitted','25 Jul 2026'],['now','Source of funds requested','A bank letter is needed to continue'],['','Assessment','Begins once complete'],['','Certificate issued','Unlocks incentives and land access']]}],
  lics:[
   {no:'AF-MOIC-IR-2026-0091',n:'Investment Registration — cold chain',type:'Registered investment',act:'Agri-processing, cold storage',iss:'20 Jul 2026',exp:'20 Jul 2029',prov:'Herat',st:'ok',pct:97}],
  docs:[
   ['Information memorandum — Kajaki Solar','Prepared by the Investment Facilitation Unit','PDF · 3.2 MB','ok'],
   ['Mandate summary — Gulf Capital Partners','Registered 19 Jul 2026','PDF · 96 KB','ok'],
   ['Herat Cold Chain Network — project brief','Shortlisted 22 Jul 2026','PDF · 1.8 MB','ok'],
   ['Certificate of incorporation','Uploaded 19 Jul 2026','PDF · 420 KB','ok'],
   ['Passport — L. Al Mansouri','Verified 19 Jul 2026','PDF · 180 KB','ok'],
   ['Source of funds letter','Awaiting your upload','—','pend']],
  pay:{out:'AFN 0',outLab:'All fees settled · nothing due',due:false,paid:'AFN 0',paidN:'Investor services are free of charge',
   next:{n:'Industrial land allocation',note:'Assessed after the site visit',a:'By assessment'},
   hist:[
    {i:'Investment registration',r:'IV-2026-00077',d:'25 Jul 2026',a:'No fee',st:'paid'},
    {i:'Investor meeting request',r:'IR-2026-00204',d:'21 Jul 2026',a:'No fee',st:'paid'},
    {i:'Information memorandum',r:'IR-2026-00191',d:'19 Jul 2026',a:'No fee',st:'paid'}]},
  thread:{title:'Investment Facilitation Unit · Nadia Amiri',st:'open',
   msgs:[['them','N. Amiri · Senior Investment Officer','I have added two projects that fit your mandate — the Herat cold chain network and the Bamyan storage scheme.','24 Jul, 08:40'],
         ['me','You','Thank you. We are most interested in Herat. Can we see the site in August?','24 Jul, 09:15'],
         ['them','N. Amiri · Senior Investment Officer','Yes — I am holding 12–14 August with the park administration. I will confirm the itinerary this week.','24 Jul, 10:02'],
         ['sys','System','Site visit request IR-2026-00218 opened on your behalf.','24 Jul, 10:03']],
   others:[['Herat Industrial Park','Park administration · plot availability','3 days ago'],
           ['Licensing desk','About your investment registration','6 days ago'],
           ['Chamber of Commerce','Investor briefing invitation','2 weeks ago']]},
  notifs:[
   {c:'ok',g:'Today',u:true,t:'Two projects matched',s:'Herat Cold Chain Network and Bamyan Potato Storage fit your mandate.',tm:'3h ago'},
   {c:'warn',g:'Today',u:true,t:'Source of funds requested',s:'A bank letter is needed to complete investment registration IV-2026-00077.',tm:'5h ago'},
   {c:'info',g:'Today',u:true,t:'Site visit being scheduled',s:'Herat Industrial Park, provisional 12–14 August.',tm:'1d ago'},
   {c:'ok',g:'Earlier',u:false,t:'Meeting confirmed',s:'4 August, 10:00 Kabul with the MoIC investment unit.',tm:'21 Jul'},
   {c:'ok',g:'Earlier',u:false,t:'Officer assigned',s:'Nadia Amiri is your point of contact.',tm:'19 Jul'}]
 }
};

/* ───────── role resolution ───────── */
function currentRole(){
 var m=location.search.match(/[?&]role=(investor|business)/);
 if(m)return m[1];
 if(/^i-/.test(location.pathname.split('/').pop()))return 'investor';
 return 'business';
}
var ROLE=currentRole(), R=ROLES[ROLE];

function withR(h){
 if(!h||/^(https?:|\.\.\/|#|mailto:|tel:)/.test(h))return h;
 if(h.indexOf('role=')>=0)return h;
 return h+(h.indexOf('?')>=0?'&':'?')+'role='+ROLE;
}

window.PORTAL={AFN:AFN,badge:badge,svg:svg,esc:esc,I:I,CATS:CATS,SVCS:SVCS,OPPS:OPPS,
 ROLES:ROLES,ROLE:ROLE,R:R,withR:withR,ST:ST};
})();
