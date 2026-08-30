/* extra icons — one per service, so nothing in the catalogue is text alone */
(function(){
var S=function(p){return '<svg viewBox="0 0 24 24" fill="none">'+p+'</svg>';};
var K=window.KI, W=1.6;
var add={
 renew:  '<path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M20 3.5V8h-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
 newdoc: '<path d="M13.5 2.6H7a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13.5 2.6V8h5.5M9 13h6M9 16.5h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 child:  '<circle cx="9" cy="7.5" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M3.6 20c0-3.1 2.4-5 5.4-5s5.4 1.9 5.4 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M17 9.5v5M14.5 12h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
 magni:  '<circle cx="10.5" cy="10.5" r="6.2" stroke="currentColor" stroke-width="1.6"/><path d="m15.2 15.2 4.4 4.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M8 10.5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 broken: '<path d="M5 4.5h9.5l4.5 4.6V19a1.6 1.6 0 0 1-1.6 1.6H5A1.6 1.6 0 0 1 3.4 19V6.1A1.6 1.6 0 0 1 5 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m8.5 8.5 3 3-2 2 3.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
 box:    '<path d="M3.4 7.6 12 3.2l8.6 4.4v8.8L12 20.8 3.4 16.4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3.4 7.6 12 12l8.6-4.4M12 12v8.8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
 rings:  '<circle cx="9" cy="14" r="5.2" stroke="currentColor" stroke-width="1.6"/><circle cx="15" cy="14" r="5.2" stroke="currentColor" stroke-width="1.6"/><path d="m9.4 4.4 2.6 3 2.6-3-1.4-1.6h-2.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',

 /* a first-aid kit: the emergency case for somebody in hospital. The homepage
    has carried this card since the emergency section was built; the portal had
    no case behind it, so the link landed on the wrong one. */
 cross:  '<rect x="3.4" y="6" width="17.2" height="12.6" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M9 6V4.8a1.4 1.4 0 0 1 1.4-1.4h3.2A1.4 1.4 0 0 1 15 4.8V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12 9.6v5.4M9.3 12.3h5.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
 urn:    '<path d="M8 21h8M9 21c-1.6-2.4-2.4-4.6-2.4-6.6 0-3 2.4-5.4 5.4-5.4s5.4 2.4 5.4 5.4c0 2-.8 4.2-2.4 6.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12 6.4V3M10.3 4.6h3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 scale:  '<path d="M12 3.4v17M6 6.6h12M4 16a3 3 0 0 0 6 0l-3-6.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 16a3 3 0 0 0 6 0l-3-6.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 20.6h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
 hands:  '<path d="M12 20.4s-6.6-3.9-6.6-9a3.7 3.7 0 0 1 6.6-2.3 3.7 3.7 0 0 1 6.6 2.3c0 5.1-6.6 9-6.6 9Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
 ship:   '<path d="M3.6 15.4 5 10.6h14l1.4 4.8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.6 10.6V6.4h8.8v4.2M12 3v3.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M2.6 18.4c1.6 0 1.6 1.6 3.2 1.6s1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6 1.6-1.6 3.2-1.6 1.6 1.6 3.2 1.6 1.6-1.6 3.2-1.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
 ballot: '<rect x="3.4" y="9.6" width="17.2" height="11" rx="1.8" stroke="currentColor" stroke-width="1.6"/><path d="M7.6 9.6V4.8a1.4 1.4 0 0 1 1.4-1.4h6a1.4 1.4 0 0 1 1.4 1.4v4.8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m9.6 14.6 1.8 1.8 3.4-3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
 globe:  '<circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="1.6"/><path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6s-1.2 6.2-3.4 8.6c-2.2-2.4-3.4-5.4-3.4-8.6S9.8 5.8 12 3.4Z" stroke="currentColor" stroke-width="1.5"/>',
 finger: '<path d="M8 11.4a4 4 0 0 1 8 0c0 3-.6 5.8-1.8 8.2M12 11.4v4.4c0 1.8-.3 3.5-.9 5.1M4.6 12a7.4 7.4 0 0 1 12.6-5.3M19.4 12c0 2.6-.4 5.2-1.2 7.6M7 18.6c.6-1.7.9-3.4.9-5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 alert:  '<circle cx="12" cy="12" r="8.6" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.6v5.2M12 16.2h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
 build:  '<path d="M3.6 20.6h16.8M5.4 20.6V9.4M18.6 20.6V9.4M2.6 9.4 12 3.4l9.4 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.2 20.6v-5.2h5.6v5.2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
 group:  '<circle cx="8.4" cy="8.6" r="3.1" stroke="currentColor" stroke-width="1.6"/><circle cx="16.4" cy="9.6" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M2.8 19.4c0-3 2.5-4.8 5.6-4.8s5.6 1.8 5.6 4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 14.8c2.6 0 5.2 1.2 5.2 4.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 life:   '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.6" stroke="currentColor" stroke-width="1.7"/><path d="m5.7 5.7 3.8 3.8M18.3 5.7l-3.8 3.8M18.3 18.3l-3.8-3.8M5.7 18.3l3.8-3.8" stroke="currentColor" stroke-width="1.6"/>',
 cog:    '<circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
 mic:    '<rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
 clip:   '<path d="M20 11.5 12.4 19a4.5 4.5 0 0 1-6.4-6.4l7.8-7.8a3 3 0 0 1 4.3 4.3l-7.7 7.7a1.5 1.5 0 0 1-2.2-2.1l7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
 up:     '<path d="M7 14l5-5 5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
 down:   '<path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
 chat:   '<path d="M4.2 5.6h15.6a1.6 1.6 0 0 1 1.6 1.6v8.2a1.6 1.6 0 0 1-1.6 1.6H10.4L6 20.2v-3.2H4.2a1.6 1.6 0 0 1-1.6-1.6V7.2a1.6 1.6 0 0 1 1.6-1.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 10h10M7 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
 card:   '<rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.6" stroke="currentColor" stroke-width="1.6"/><path d="M2.8 9.6h18.4" stroke="currentColor" stroke-width="1.6"/><path d="M6.2 14.6h3.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
 key:    '<circle cx="8" cy="12" r="4.4" stroke="currentColor" stroke-width="1.6"/><path d="M12.4 12H21M18 12v3.4M15.2 12v2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
 plus:   '<path d="M12 5.4v13.2M5.4 12h13.2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>'
};
for(var k in add){ if(!K[k]) K[k]=S(add[k]); }
})();
