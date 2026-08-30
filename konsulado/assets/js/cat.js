/* ============ the consular catalogue, two levels deep ============
   Eight categories. Inside each, the services that belong to it —
   including the variants that were previously listed as if they were
   separate services of their own.
   v: never | booth | reach | once   (the scope review's verdict)     */
window.KCAT=[
{id:"passport", n:"Passports and travel", ic:"passport",
 lead:"Everything to do with the booklet itself — renewing it, replacing it, and the document that gets you home without one.",
 s:[
  ["Renew your passport","never","Confirmed against the record this post holds, or read from your data page. Photograph taken and checked here.","AED 240","4–8 weeks",1,"renew"],
  ["Renew if you are not an overseas worker","once","Everything online except the biometric capture, which becomes a ten-minute appointment.","AED 240","4–8 weeks",0,"renew"],
  ["Apply for your first passport","once","Application, documents and eligibility all settled before you arrive. The visit is biometrics and identity binding.","AED 240","4–8 weeks",0,"newdoc"],
  ["Passport for a child","reach","Family booking with adjacent slots, or satisfied at an outreach mission closer to home.","AED 240","4–8 weeks",0,"child"],
  ["Replace a lost passport","once","Affidavit sworn by video, police report photographed, and the fifteen-day clearance shown as a live countdown instead of silence.","AED 600","6–10 weeks",0,"magni"],
  ["Replace a damaged passport","once","Damage assessed from photographs before anyone travels, so nobody is turned away at the counter.","AED 340","4–8 weeks",0,"broken"],
  ["Collect a finished passport","never","Couriered to the address on file, or a named ten-minute pickup slot, with a message when it is ready.","Free","—",0,"box"],
  ["Emergency travel document","once","Applied for and assessed online with a same-day slot held open. One journey home, thirty days.","AED 120","Same day",0,"plane"]
 ]},
{id:"civil", n:"Births, marriages and deaths", ic:"baby",
 lead:"Registering the things that happen to a family abroad, so they exist on the Philippine record too.",
 s:[
  ["Register a birth","never","The UAE birth certificate is already authenticated by the UAE government — that is the evidence, not the parent's presence. Free within twelve months of the birth.","Free · 12 mo","5 working days",0,"baby"],
  ["Register a marriage","never","The UAE marriage certificate is already attested by the UAE government. Same reasoning, same route.","AED 100","5 working days",0,"rings"],
  ["Register a death","never","Filed online by the family with the UAE death certificate, at the worst possible time to be queueing.","AED 100","5 working days",0,"urn"],
  ["Correct an entry on a record","booth","The error is flagged against the existing record before anything is filed, so it is fixed once.","AED 100","5 working days",0,"pen"],
  ["Order a PSA certificate — birth, marriage or CENOMAR","never","Requested from the PSA in Manila on your behalf and delivered into your vault. This post cannot shorten the PSA’s own queue and says so.","AED 100","2–3 weeks",0,"cert"],
  ["Certificate of legal capacity to marry","booth","Documents and eligibility settled online; the sworn affidavit and witness signatures done in the booth.","AED 100","Same day",0,"cert"],
  ["Acknowledge paternity","booth","One civil-registry flow rather than a portal of its own.","AED 100","Same day",0,"people"],
  ["Use the father's surname","booth","Drafted from the acknowledgement already on file; signed in the same booth session.","AED 100","Same day",0,"pen"],
  ["Legitimation by subsequent marriage","booth","Drafted automatically from the marriage record the post already holds.","AED 100","5 working days",0,"rings"],
  ["No objection certificate for remains","never","Bundled into one job with repatriation of remains and tracked as a single case.","Free","24 hours",0,"stamp"],
  ["Marry at the Consulate","once","Booking, banns and witnesses handled online. The ceremony itself is the visit, as it should be.","AED 100","By appointment",0,"build"]
 ]},
{id:"notary", n:"Notarials and powers of attorney", ic:"pen",
 lead:"Signing something that has to carry legal weight in the Philippines — and most of it can be done in a supervised video session.",
 s:[
  ["Special power of attorney","booth","Guided drafting so the clauses are right, five minutes in the booth, then digital issuance and courier to the Philippines.","AED 100","Same day",0,"key"],
  ["Affidavit — general or joint","booth","Guided drafting so the wording is right before anyone swears to it.","AED 100","Same day",0,"pen"],
  ["Support and consent for a minor travelling","booth","The parent's consent, the child's details and the travel dates in one flow.","AED 100","Same day",0,"child"],
  ["Affidavit of support and guarantee","booth","Assessment online, signature in the booth.","AED 100","Same day",0,"shield"],
  ["Affidavit of loss","booth","Generated from what you have already told us about what was lost.","AED 100","Same day",0,"magni"],
  ["Certified true copy","never","Requested and issued digitally, signed and verifiable by QR.","AED 100","24 hours",0,"newdoc"],
  ["Certificate of appearance","booth","Issued at the moment of the appearance it certifies.","Free","Same day",0,"tickc"]
 ]},
{id:"legal", n:"Certificates and legalisation", ic:"stamp",
 lead:"Making a document issued in one country usable in the other. The UAE is not an Apostille party, so this chain is permanent — but none of it needs you present.",
 s:[
  ["Legalise a UAE document for the Philippines","never","Courier in, courier out, tracked at every step. Authentication verifies a seal, not a person.","AED 100","5 working days",0,"stamp"],
  ["Attest a DFA apostille certificate","never","The same courier route, the same tracking.","AED 100","5 working days",0,"stamp"],
  ["NBI clearance fingerprint card","reach","Prints taken at the post or at an outreach mission; we courier, track through NBI and return the clearance as one job.","AED 100","3–4 weeks",0,"finger"],
  ["Certification of records held here","never","Requested and issued digitally, signed and QR-verifiable.","AED 100","24 hours",0,"cert"]
 ]},
{id:"citizen", n:"Citizenship", ic:"shield",
 lead:"Reacquiring, extending or giving up Philippine citizenship. The oath stays in person by design — this should be hard to do by accident.",
 s:[
  ["Dual citizenship under RA 9225","once","Petition assembled, documents pre-checked, eligibility confirmed before you travel to the post.","AED 200","By appointment",0,"globe"],
  ["Derivative citizenship for children","once","Requirements published for the first time, then handled with the parent's petition.","AED 100","By appointment",0,"child"],
  ["Renounce Philippine citizenship","once","Assembled and checked online. The oath itself stays in person, deliberately.","AED 200","By appointment",0,"scale"],
  ["Passport after RA 9225","once","Routed automatically from the citizenship record instead of starting again from nothing.","AED 240","4–8 weeks",0,"passport"]
 ]},
{id:"visa", n:"Visas for foreign nationals", ic:"plane",
 lead:"For people who are not Filipino and need to enter the Philippines. The DFA already runs an eVisa at two posts — just not this one.",
 s:[
  ["Temporary visitor visa 9(a)","never","The DFA's own eVisa system, already live at Shanghai and Melbourne.","AED 220","5 working days",0,"plane"],
  ["Transit visa 9(b)","never","The same eVisa route.","AED 200","5 working days",0,"globe"],
  ["Seaman and crew visas 9(c)","once","Bulk crew submission through the admin portal; one appearance for the crew, not one per crewman.","AED 200","5 working days",0,"ship"],
  ["Student, employment and diplomatic visas","once","Applied for online, with the status of the Manila authority made visible instead of silent.","Varies","Manila decides",0,"newdoc"],
  ["Check visa-free eligibility","never","A ten-second checker that stops needless applications before they start.","Free","Instant",0,"magni"],
  ["Support and guarantee for a visitor","booth","Assessment online, signature in the booth.","AED 100","Same day",0,"shield"]
 ]},
{id:"help", n:"Help and emergencies", ic:"warn",
 lead:"When something has gone wrong. All of it reachable from a phone, at any hour, reachable from a phone, at any hour, and with an exit control on every screen for anyone being watched while they use it.",
 s:[
  ["Ask for assistance","never","Intake, triage and a real case number, not a form that disappears.","Free","Immediate",0,"hands"],
  ["Legal assistance referral","never","Case file, documents and hearing dates in one thread, with the free legal clinics scheduled through it.","Free","Immediate",0,"scale"],
  ["Repatriation — not an overseas worker","never","Application, fitness-to-travel evidence, flight and arrival assistance as one tracked job.","Free","Case by case",0,"plane"],
  ["Repatriation of remains","never","The one journey nobody should have to project-manage while grieving.","Free","Case by case",0,"urn"],
  ["Prison or hospital visit request","never","Requested and scheduled online, with the visit logged against the case.","Free","Case by case",0,"build"],
  ["Report a scam or a fake agent","never","A reporting channel that feeds the post's own advisories, so warnings come from evidence rather than rumour.","Free","Immediate",0,"alert"]
 ]},
{id:"vote", n:"Voting and community", ic:"people",
 lead:"Registering to vote from abroad, and the organisations that hold the community together.",
 s:[
  ["Register to vote overseas","reach","Form completed online, appointment or outreach slot booked, biometrics captured in minutes.","Free","Same day",0,"ballot"],
  ["Transfer or reactivate a registration","reach","Status checked online first, so nobody travels unnecessarily.","Free","Same day",0,"renew"],
  ["Check your registration status","never","Shown in your file at all times, so nobody queues to be told a yes or a no.","Free","Instant",0,"tickc"],
  ["Register a community organisation","never","Requirements published, application online, register searchable.","Free","10 working days",0,"group"],
  ["Book an outreach mission slot","never","Missions become a schedule you can see months ahead, with what each one covers.","Free","Instant",0,"cal"]
 ]}
];
window.KVERD={
  never:{lab:"No visit",         ic:"tickc", col:"var(--ok)",        note:"Completed from where you are, start to finish"},
  booth:{lab:"Supervised session",ic:"shield",col:"var(--gold)", note:"A video call with an officer, or five minutes at an outreach mission"},
  reach:{lab:"Outreach mission", ic:"people",col:"var(--blue)",      note:"Satisfied when the mission reaches your emirate"},
  once: {lab:"One visit",        ic:"cal",   col:"var(--ink-4)",     note:"One appointment survives, usually biometrics"}
};
