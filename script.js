/* =========================================================
   1) ASSETS (langsung ke folder assets/)
   ========================================================= */
const IMG = {
  hero:      'assets/hero.jpg',
  garden:    'assets/garden.jpg',
  room:      'assets/room.jpg',
  villa:     'assets/villa.jpg',
  family:    'assets/family.jpg',
  romance:   'assets/romance.jpg',
  breakfast: 'assets/breakfast.jpg',
  spa:       'assets/spa.jpg',
  picnic:    'assets/picnic.jpg',
  yoga:      'assets/yoga.jpg',
  culture:   'assets/culture.jpg',
  beach:     'assets/beach.jpg',
  resort:    'assets/resort.jpg',
  bar:       'assets/bar.jpg'
};
const WA = '6282144956046';

/* =========================================================
   2) DATA
   ========================================================= */
const ROOMS = [
  {n:'Deluxe Ocean Suite',img:'room',p:450,tags:['65 sqm','2 Adults','Resort Pools','Ocean View'],d:'A restful suite for two with a warm interior and calming ocean views.'},
  {n:'Ocean View Villa',img:'villa',p:850,tags:['120 sqm','2 Adults + 1 Child','Private Plunge Pool','Ocean View'],d:'A private villa with a plunge pool and a full, uninterrupted ocean view.'},
  {n:'Family Sanctuary Villa',img:'family',p:1200,tags:['200 sqm','4 Adults + 2 Kids','Infinity Pool','Garden View'],d:'A spacious retreat for families, surrounded by tropical nature.'}
];
const EXPS = [
  {n:'Romantic Sunset Dinner',img:'romance',d:'A private dining moment by the shore as the sky turns gold.'},
  {n:'Floating Breakfast',img:'breakfast',d:'Start the day slowly with breakfast served beside the water.'},
  {n:'Aurea Wellness Ritual',img:'spa',d:'A restorative spa ritual in a quiet, candle-lit pavilion.'},
  {n:'Private Beach Picnic',img:'picnic',d:'A styled picnic on a secluded stretch of sand.'},
  {n:'Morning Yoga',img:'yoga',d:'Mindful movement in an open tropical pavilion.'}
];
const OFFERS = [
  {n:'The Nusa Seclusion Escape',img:'beach',d:'A peaceful stay focused on privacy, comfort, and time away from daily routines.'},
  {n:'Romantic Horizon Journey',img:'romance',d:'A romantic getaway built around special moments and time together.'},
  {n:'Aurea Well-Being Path',img:'yoga',d:'A restorative stay inspired by wellness and mindful movement.'},
  {n:'The Family Sanctuary',img:'family',d:'Quality time together in a spacious villa made for families.'}
];
const GAL = [
  ['resort','Oceanfront Retreat','resort'],
  ['resort','Garden Path','garden'],
  ['rooms','Deluxe Ocean Suite','room'],
  ['wellness','Wellness Ritual','spa'],
  ['resort','Sunset Beach','beach'],
  ['dining','Floating Breakfast','breakfast'],
  ['experiences','Balinese Traditions','culture'],
  ['dining','A Table by the Sea','romance'],
  ['dining','Evening Bar','bar'],
  ['wellness','Morning Yoga','yoga'],
  ['rooms','Ocean View Villa','villa']
];
const PAGES = [
  ['home','Home'],
  ['rooms','Rooms'],
  ['experiences','Experiences'],
  ['offers','Offers'],
  ['gallery','Gallery'],
  ['about','About'],
  ['contact','Contact']
];

/* =========================================================
   3) HELPERS
   ========================================================= */
const $ = id => document.getElementById(id);
const img = (k,a='') => `<img loading="lazy" src="${IMG[k]}" alt="${a}" onerror="this.style.display='none'">`;
const ph = (k,t,d,extra='') => `<div class="ph ${extra}" onclick="openM('${k}','${t.replace(/'/g,"\\'")}','${d.replace(/'/g,"\\'")}')">${img(k,t)}</div>`;
const bg = k => `style="background-image:url('${IMG[k]}')"`;
const head = (e,h,p,cls='') => `<div class="head ${cls}"><p class="eyebrow">${e}</p><h2>${h}</h2>${p?`<p>${p}</p>`:''}</div>`;
const band = (e,h,p,btn,to,k) => `<section class="band on-dark" style="background-image:linear-gradient(rgba(10,38,31,.78),rgba(10,38,31,.78)),url('${IMG[k]}')"><div class="wrap"><p class="eyebrow">${e}</p><h2>${h}</h2><p>${p}</p><button class="btn" onclick="go('${to}')">${btn}</button></div></section>`;
const phero = (k,e,h,p) => `<div class="phero" ${bg(k)}><div class="wrap hc"><p class="eyebrow">${e}</p><h1>${h}</h1><p>${p}</p></div></div>`;
const price = p => `<span class="price">$${p.toLocaleString()}<small>Listed rate / night</small></span>`;
const onreq = l => `<span class="price">On Request<small>${l}</small></span>`;

const detailBtn = (k, title, detail) => `<button class="btn out detail-btn" type="button" onclick="openDetail('${k}','${encodeURIComponent(title)}','${encodeURIComponent(detail)}')">View Details</button>`;
const roomInfo = r => `${r.d}\n\nROOM FEATURES\n${r.tags.map(t => '• ' + t).join('\n')}\n\nA GOOD MATCH FOR\n${r.n === 'Deluxe Ocean Suite' ? 'Couples or solo travellers looking for a comfortable suite with ocean views and access to resort pools.' : r.n === 'Ocean View Villa' ? 'Guests who value extra space, a private plunge pool, and an ocean-facing setting.' : 'Families or small groups who need generous space, a garden outlook, and a pool-focused stay.'}\n\nRATE INFORMATION\nListed rate: $${r.p.toLocaleString()} per night. This is an indicative listed rate, not a live quote.\n\nBEFORE YOU BOOK\nPlease contact the resort to confirm dates, occupancy, taxes, inclusions, final pricing, and availability.`;
const roomCard = r => `<article class="card">${ph(r.img,r.n,r.d)}<div class="cb"><h3>${r.n}</h3><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${r.d}</p><div class="meta">${price(r.p)}<div class="card-actions">${detailBtn(r.img,r.n,roomInfo(r))}<button class="btn" style="min-height:44px;padding:10px 18px" onclick="pick('${r.n}')">Book</button></div></div></div></article>`;
const expInfo = e => `${e.d}\n\nABOUT THIS EXPERIENCE\n${({
  'Romantic Sunset Dinner':'A special evening dining setting designed around the shoreline and sunset atmosphere. Ask the team about menu choices, table location, dietary requests, and weather arrangements.',
  'Floating Breakfast':'A relaxed breakfast experience served beside or on the water. Ask which pool settings are available, what the breakfast selection includes, and how to arrange a preferred serving time.',
  'Aurea Wellness Ritual':'A restorative spa experience in a peaceful pavilion. Ask about the treatment options, session length, therapist availability, and any preparation or wellness considerations.',
  'Private Beach Picnic':'A styled picnic experience by the beach. Ask about available locations, food and beverage selections, set-up times, and arrangements in case of poor weather.',
  'Morning Yoga':'A mindful movement session in an open-air tropical pavilion. Ask about the class level, instructor schedule, session length, and what to bring.'
})[e.n]}\n\nPLAN YOUR EXPERIENCE\n• Confirm available dates and time slots\n• Ask for the latest price and what is included\n• Share dietary, accessibility, or other special requests\n• Request confirmation of the location and duration\n\nAll schedules, inclusions, and prices are subject to confirmation by the resort.`;
const expCard = e => `<article class="card">${ph(e.img,e.n,e.d)}<div class="cb"><h3>${e.n}</h3><p>${e.d}</p><div class="meta">${onreq('Price enquiry')}<div class="card-actions">${detailBtn(e.img,e.n,expInfo(e))}<button class="link" onclick="ask('${e.n}')">Enquire →</button></div></div></div></article>`;
const offerRow = o => `<article class="row">${ph(o.img,o.n,o.d)}<div class="cb"><p class="eyebrow">Signature Offer</p><h3>${o.n}</h3><p>${o.d}</p><div class="meta">${onreq('Package price')}<div class="card-actions">${detailBtn(o.img,o.n,`${o.d}\n\nABOUT THIS OFFER\nA curated stay concept from AUREA HAVEN.\n\nBEFORE YOU BOOK\n• Ask which room or villa categories are eligible\n• Confirm package inclusions and applicable dates\n• Check minimum-stay requirements, if any\n• Request current rates and availability\n\nAll package details and terms must be confirmed directly with the resort.`)}<button class="btn" style="min-height:44px;padding:10px 18px" onclick="ask('${o.n}')">Enquire</button></div></div></div></article>`;
const roomRow = r => `<article class="row">${ph(r.img,r.n,r.d)}<div class="cb"><p class="eyebrow">Sanctuary</p><h3>${r.n}</h3><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${r.d}</p><div class="meta">${price(r.p)}<div class="card-actions">${detailBtn(r.img,r.n,roomInfo(r))}<button class="btn" onclick="pick('${r.n}')">Book This</button></div></div></div></article>`;
const expRow = e => `<article class="row">${ph(e.img,e.n,e.d)}<div class="cb"><p class="eyebrow">Experience</p><h3>${e.n}</h3><p>${e.d}</p><div class="meta">${onreq('Price enquiry')}<div class="card-actions">${detailBtn(e.img,e.n,expInfo(e))}<button class="btn" onclick="ask('${e.n}')">Enquire</button></div></div></div></article>`;

/* =========================================================
   4) PAGES
   ========================================================= */
const VIEWS = {
home: () => `
<section class="hero hero-editorial" ${bg('resort')}>
  <div class="hero-shade"></div>
  <div class="hero-topline"><span>PRIVATE ISLAND · BALI</span><span class="hero-index">01 <i></i> 04</span></div>
  <div class="wrap hero-layout">
    <div class="hero-copy">
      <p class="eyebrow">A Private Island Experience</p>
      <h1>Find your<br><em>own</em> horizon.</h1>
      <p class="hero-intro">A quieter kind of luxury, shaped by the rhythm of the island, thoughtful hospitality, and the beauty of the sea.</p>
      <div class="acts"><button class="btn" onclick="go('booking')">Reserve Your Stay <span aria-hidden="true">↗</span></button><button class="hero-text-link" onclick="go('experiences')">Discover the experience <span aria-hidden="true">→</span></button></div>
    </div>
    <aside class="hero-note"><span class="note-rule"></span><span>THE ART OF<br> SLOW LIVING</span><small>Nature · Stillness · Belonging</small></aside>
  </div>
  <div class="hero-bottomline"><span>06° 14′ S&nbsp;&nbsp; 115° 05′ E</span><span>SCROLL TO DISCOVER&nbsp; ↓</span></div>
  <div class="hero-feature">
    <div class="feature-image" style="background-image:url('assets/villa.jpg')"></div>
    <div class="feature-copy"><span class="eyebrow">A PLACE TO UNWIND</span><h3>Stay close<br>to what matters.</h3><button class="feature-link" onclick="go('rooms')">Explore our sanctuaries <b>↗</b></button></div>
  </div>
</section>
<section class="avail"><div class="wrap">
  <form onsubmit="avail(event)">
    <div class="f"><label for="qi">Check-in</label><input id="qi" type="date" required></div>
    <div class="f"><label for="qo">Check-out</label><input id="qo" type="date" required></div>
    <div class="f"><label for="qg">Guests</label><select id="qg">${[1,2,3,4,5,6].map(n=>`<option ${n==2?'selected':''}>${n} Guest${n>1?'s':''}</option>`).join('')}</select></div>
    <div class="f"><label for="qr">Room Type</label><select id="qr"><option>Not decided yet</option>${ROOMS.map(r=>`<option>${r.n}</option>`).join('')}</select></div>
    <button class="btn" type="submit">Check Availability</button>
  </form>
</div></section>
<section class="sec" style="padding:44px 0 12px"><div class="wrap amen">
  <div><i>🏊</i><b>Infinity Pool</b></div>
  <div><i>💆</i><b>Spa &amp; Wellness</b></div>
  <div><i>🍽️</i><b>Restaurant &amp; Bar</b></div>
  <div><i>🧘</i><b>Yoga Pavilion</b></div>
  <div><i>🌅</i><b>Ocean Views</b></div>
  <div><i>🛎️</i><b>Personal Service</b></div>
</div></section>
<section class="sec"><div class="wrap split">
  <div><p class="eyebrow">A Place to Slow Down</p><h2>Find Your Own Rhythm in Bali.</h2>
  <p>AUREA HAVEN is designed for guests who appreciate peaceful surroundings, personal space, and meaningful moments.</p>
  <p>From quiet mornings by the pool to evenings beside the ocean, each stay is an invitation to experience Bali at your own pace.</p>
  <button class="link" onclick="go('about')">Discover Our Story →</button></div>
  ${ph('garden','A Place to Slow Down','A tropical garden pathway inviting a peaceful moment.')}
</div></section>
<section class="sec iv home-rooms"><div class="wrap">
  ${head('Stay Your Way','Your Private Retreat.','Thoughtfully designed rooms and villas for quiet mornings and memorable evenings.')}
  <div class="grid">${ROOMS.map(roomCard).join('')}</div>
  <p style="text-align:center;margin-top:30px"><button class="btn out" onclick="go('rooms')">View All Rooms &amp; Details</button></p>
</div></section>
<section class="sec experiences-preview"><div class="wrap">
  ${head('More Than a Stay','Moments to Remember.','Experiences inspired by the island, its landscape, and its traditions.')}
  <div class="grid">${EXPS.slice(0,3).map(expCard).join('')}</div>
  <p style="text-align:center;margin-top:30px"><button class="btn out" onclick="go('experiences')">Explore All Experiences</button></p>
</div></section>
<section class="sec facilities-section"><div class="wrap">
  ${head('Resort Facilities','Everything You Need, Nothing You Don\'t.','Relax by the pool, unwind at the spa, dine by the sea.')}
  <div class="fac">${[['resort','Resort & Pool','Relax'],['spa','Spa & Wellness','Unwind'],['bar','Restaurant & Bar','Dine'],['yoga','Yoga Pavilion','Restore']].map(f=>`<div class="ph" onclick="openM('${f[0]}','${f[1]}','AUREA HAVEN · ${f[2]}')">${img(f[0],f[1])}<div class="cap"><small>${f[2]}</small>${f[1]}</div></div>`).join('')}</div>
</div></section>
${band('Signature Offers','Make Time for Something Special.','Selected escapes and thoughtful packages for a more meaningful stay.','Explore Signature Offers','offers','beach')}
<section class="sec dk"><div class="wrap">
  ${head('Your Stay, Made Simple','Guiding Your Journey.','Four simple steps from discovery to arrival.')}
  <div class="steps">
    <div class="step"><b>01</b><h3>Discover</h3><p>Explore rooms, experiences, and the resort atmosphere.</p></div>
    <div class="step"><b>02</b><h3>Explore</h3><p>Compare accommodation and discover available offers.</p></div>
    <div class="step"><b>03</b><h3>Reserve</h3><p>Send your preferred dates and details in a minute.</p></div>
    <div class="step"><b>04</b><h3>Arrive</h3><p>Our team confirms your reservation personally.</p></div>
  </div>
</div></section>
${band('Begin Your Escape','Take Your Time.','Your next island escape begins with a simple step.','Plan Your Stay','booking','romance')}`,

rooms: () => `
${phero('room','Stay Your Way','Your Private Retreat.','From a restful ocean suite to a private villa surrounded by nature.')}
<section class="sec iv"><div class="wrap">${head('Our Sanctuaries','Choose Your Retreat.','')}${ROOMS.map(roomRow).join('')}</div></section>
<section class="sec"><div class="wrap">
  ${head('Compare Your Stay','Find the Right Space.','')}
  <div class="tw"><table><thead><tr><th>Accommodation</th><th>Area</th><th>Guests</th><th>Private Pool</th><th>Rate</th></tr></thead><tbody>
  ${ROOMS.map((r,i)=>`<tr><td>${r.n}</td><td>${r.tags[0]}</td><td>${r.tags[1]}</td><td>${i?'Yes':'No'}</td><td>$${r.p.toLocaleString()}</td></tr>`).join('')}
  </tbody></table></div>
  <p class="note">Listed rates. Please confirm price period, taxes, inclusions, and availability with the resort.</p>
  <p style="text-align:center;margin-top:26px"><button class="btn" onclick="go('booking')">Start Your Booking</button></p>
</div></section>`,

experiences: () => `
${phero('breakfast','Discover the Island','More Than a Stay.','Dining, wellness, and cultural experiences inspired by Bali.')}
<section class="sec"><div class="wrap">${head('Signature Experiences','Make Every Moment Meaningful.','')}${EXPS.map(expRow).join('')}</div></section>
${band('Your Time, Your Way','Create Your Perfect Day.','Ask the team about schedules and current prices.','Ask About Experiences','contact','garden')}`,

offers: () => `
${phero('beach','Selected Escapes','Signature Offers.','Thoughtful packages for a more memorable island escape.')}
<section class="sec iv"><div class="wrap">${head('Special Offers','Choose Your Escape.','')}${OFFERS.map(offerRow).join('')}</div></section>
${band('A Special Stay Awaits','Bespoke Curation.','Contact our team to ask about availability and current pricing.','Enquire Now','contact','garden')}`,

gallery: () => `
${phero('resort','A Collection of Moments','Captured Moments.','Explore the spaces, scenery, dining, and experiences of AUREA HAVEN.')}
<section class="sec iv"><div class="wrap">
  ${head('The Gallery','Every Picture Tells a Story.','Tap a photo to view its details.')}
  <div class="filters" id="flt">${['all','resort','rooms','dining','experiences','wellness'].map((c,i)=>`<button class="${i?'':'on'}" onclick="flt('${c}',this)">${c}</button>`).join('')}</div>
  <div class="gal" id="gal">${GAL.map(g=>`<button class="ph gallery-photo" type="button" data-c="${g[0]}" aria-label="View ${g[1]} photo" onclick="openGalleryM('${g[2]}','${g[1]}')">${img(g[2],g[1])}</button>`).join('')}</div>
  <p style="text-align:center;margin-top:34px"><button class="btn" onclick="go('booking')">Experience It Yourself</button></p>
</div></section>`,

about: () => `
${phero('culture','Our Story','Rooted in Bali. Made for the World.','A place shaped by island nature, thoughtful hospitality, and belonging.')}
<section class="sec"><div class="wrap split">
  ${ph('culture','Rooted in Bali','Balinese cultural details inspire our sense of place.')}
  <div><p class="eyebrow">A Vision of AUREA HAVEN</p><h2>Inspired by the Island.</h2>
  <p>AUREA HAVEN brings together the natural beauty of Bali and the comfort of a considered resort experience.</p>
  <p>A memorable stay is not only about where guests sleep, but also the atmosphere, the people, and the moments they take home.</p></div>
</div></section>
<section class="sec iv"><div class="wrap">${head('Our Core Philosophy','What Guides Us.','')}
  <div class="grid">
  <div class="card"><div class="cb"><h3>Nature</h3><p>Respecting the island landscape and the peaceful surroundings that make Bali special.</p></div></div>
  <div class="card"><div class="cb"><h3>Hospitality</h3><p>A welcoming atmosphere through thoughtful details and personal attention.</p></div></div>
  <div class="card"><div class="cb"><h3>Culture</h3><p>Inspiration from Balinese traditions, local character, and a sense of place.</p></div></div>
  </div></div></section>
${band('Welcome to Our Story','Come Be Part of Our Story.','Discover the feeling of a stay at AUREA HAVEN.','Plan Your Stay','booking','garden')}`,

contact: () => `
${phero('resort','We Are Here to Help',"We'd Love to Hear From You.",'Questions about accommodation, experiences, or reservations.')}
<section class="sec iv"><div class="wrap two">
  <div class="info"><p class="eyebrow" style="color:var(--gold)">Get in Touch</p><h2>Let's Plan Your Stay.</h2>
  <p>Have a question or special request? Message us on WhatsApp or use the form.</p>
  <p><a class="btn" id="waC" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
  <p style="margin-top:22px;padding-top:16px;border-top:1px solid rgba(212,176,106,.4)"><strong>AUREA HAVEN</strong><br>Resort &amp; Spa · Bali, Indonesia</p></div>
  <form class="form" id="cf"><h2>Send a Message.</h2>
  <div class="fg">
    <div class="f"><label for="cn">Full Name</label><input id="cn" required autocomplete="name" placeholder="Your name"></div>
    <div class="f"><label for="ce">Email</label><input id="ce" type="email" required autocomplete="email" inputmode="email" placeholder="you@example.com"></div>
    <div class="f"><label for="ct">Enquiry Type</label><select id="ct"><option>Room Reservation</option><option>Experiences</option><option>Special Offers</option><option>General Enquiry</option></select></div>
    <div class="f"><label for="cd">Preferred Date</label><input id="cd" type="date"></div>
    <div class="f full"><label for="cm">Message</label><textarea id="cm" required placeholder="How can we help?"></textarea></div>
    <div class="f full"><button class="btn" type="submit">Send via WhatsApp</button></div>
  </div></form>
</div></section>
<section class="sec"><div class="wrap">${head('Find Your Way','Location & Map.','Use the map below to view the Nusa Dua area shared with us.')}
  <div class="map-embed"><iframe title="Google Maps — Nusa Dua, Bali" src="https://www.google.com/maps?output=embed&amp;q=https%3A%2F%2Fmaps.app.goo.gl%2Fmr6GYwMCChzojGHc8" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
  <p class="map-link"><a class="btn out" href="https://maps.app.goo.gl/mr6GYwMCChzojGHc8" target="_blank" rel="noopener">Open location in Google Maps ↗</a></p>
</div></section>`,

booking: () => `
${phero('picnic','A Thoughtful Escape Awaits','Reserve Your Escape.','Share your stay details. We confirm availability personally.')}
<section class="sec iv"><div class="wrap two" style="grid-template-columns:1.15fr .85fr">
  <form class="form" id="bf"><h2>Booking Request.</h2>
  <p class="note" style="margin-top:0">Takes about one minute. No payment is taken here.</p>
  <div class="fg">
    <div class="f"><label for="bi">Check-in</label><input id="bi" type="date" required></div>
    <div class="f"><label for="bo">Check-out</label><input id="bo" type="date" required></div>
    <div class="f"><label for="bg2">Guests</label><select id="bg2">${[1,2,3,4,5,6].map(n=>`<option ${n==2?'selected':''}>${n} Guest${n>1?'s':''}</option>`).join('')}</select></div>
    <div class="f"><label for="br">Accommodation</label><select id="br"><option>Not decided yet</option>${ROOMS.map(r=>`<option>${r.n}</option>`).join('')}</select></div>
    <div class="f"><label for="bn">Full Name</label><input id="bn" required autocomplete="name" placeholder="Your name"></div>
    <div class="f"><label for="be">Email</label><input id="be" type="email" required autocomplete="email" inputmode="email" placeholder="you@example.com"></div>
    <div class="f full"><label for="bq">Special Requests (optional)</label><textarea id="bq" placeholder="Honeymoon, airport pickup, dietary needs..."></textarea></div>
    <div class="f full"><button class="btn" type="submit">Send Request via WhatsApp</button></div>
  </div>
  <div class="msg" id="bm" role="status"></div>
  <p class="note">This does not confirm a reservation. Availability and final pricing are confirmed by the resort.</p></form>
  <aside class="sum"><h2>Your Stay</h2><dl>
    <dt>Dates</dt><dd id="s1">Select your dates</dd>
    <dt>Accommodation</dt><dd id="s2">Not decided yet</dd>
    <dt>Guests</dt><dd id="s3">2 Guests</dd></dl>
    <div class="total"><small>Estimated total</small><b id="s4">—</b><small>Listed rate × nights, before taxes. To be confirmed by the resort.</small></div></aside>
</div></section>`
};

/* =========================================================
   5) LOGIC
   ========================================================= */
let current = 'home';
function go(p, noHash){
  if(!VIEWS[p]) p = 'home';
  current = p;
  $('app').innerHTML = `<section class="page on">${VIEWS[p]()}</section>`;
  document.querySelectorAll('nav#mn button').forEach(b => b.classList.toggle('on', b.dataset.p === p));
  $('mn').classList.remove('on');
  $('bg').setAttribute('aria-expanded', 'false');
  $('hbook').style.display = '';
  if(!noHash) history.pushState({p}, '', '#' + p);
  window.scrollTo({top: 0});
  if(p === 'home') initSearch();
  if(p === 'booking') initBooking();
  if(p === 'contact') initContact();
  initReveal();
  const wa = $('waC');
  if(wa) wa.href = `https://wa.me/${WA}`;
}

let revealObserver;
function initReveal(){
  const targets = document.querySelectorAll('.sec, .band, .card, .row, .step, .fac .ph, .split > *');
  if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('is-visible')); return; }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  targets.forEach((el, index) => {
    el.classList.remove('is-visible');
    el.classList.add('will-reveal');
    if (el.classList.contains('card') || el.classList.contains('step')) el.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`);
    revealObserver.observe(el);
  });
}

function menu(){
  const o = $('mn').classList.toggle('on');
  $('bg').setAttribute('aria-expanded', o);
}
window.addEventListener('popstate', () => go(location.hash.slice(1) || 'home', true));

function pick(r){ go('booking'); $('br').value = r; upd(); }
function ask(t){ go('contact'); $('ct').value = 'Experiences'; $('cm').value = `I would like to enquire about: ${t}. Please share details, availability, and current price.`; }

function flt(c, b){
  document.querySelectorAll('#flt button').forEach(x => x.classList.remove('on'));
  b.classList.add('on');
  document.querySelectorAll('#gal [data-c]').forEach(i => i.style.display = (c === 'all' || i.dataset.c === c) ? '' : 'none');
}

function openDetail(k, encodedTitle, encodedDetail){
  openM(k, decodeURIComponent(encodedTitle), decodeURIComponent(encodedDetail));
}

function openGalleryM(k, t){
  openM(k, t, '');
  $('modal').classList.add('image-only');
}

let modalReturnFocus = null;
function openM(k, t, d){
  modalReturnFocus = document.activeElement;
  $('modal').classList.remove('image-only');
  $('mimg').src = IMG[k];
  $('mimg').alt = t;
  $('mt').textContent = t;
  $('md').textContent = d;
  $('modal').setAttribute('aria-hidden', 'false');
  $('modal').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeM(){
  const modal = $('modal');
  if (!modal.classList.contains('on')) return;
  modal.classList.remove('on', 'image-only');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalReturnFocus && typeof modalReturnFocus.focus === 'function') modalReturnFocus.focus({ preventScroll: true });
  modalReturnFocus = null;
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('modal').classList.contains('on')) { e.preventDefault(); closeM(); }
});

function initSearch(){
  const t = new Date().toISOString().slice(0, 10);
  $('qi').min = t;
  $('qo').min = t;
  $('qi').addEventListener('change', () => {
    const d = new Date($('qi').value);
    d.setDate(d.getDate() + 1);
    $('qo').min = d.toISOString().slice(0, 10);
    if($('qo').value && $('qo').value <= $('qi').value) $('qo').value = $('qo').min;
  });
}
function avail(e){
  e.preventDefault();
  const v = ['qi', 'qo', 'qg', 'qr'].map(id => $(id).value);
  if(new Date(v[1]) <= new Date(v[0])){ alert('Please choose a check-out date after check-in.'); return; }
  go('booking');
  $('bi').value = v[0];
  $('bo').value = v[1];
  $('bg2').value = v[2];
  $('br').value = v[3];
  upd();
}

const fmt = d => new Date(d).toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});
function upd(){
  const i = $('bi').value, o = $('bo').value, r = $('br').value, g = $('bg2').value;
  const room = ROOMS.find(x => x.n === r);
  const n = (i && o) ? Math.round((new Date(o) - new Date(i)) / 864e5) : 0;
  $('s1').textContent = (i && o && n > 0) ? `${fmt(i)} → ${fmt(o)} (${n} night${n > 1 ? 's' : ''})` : 'Select your dates';
  $('s2').textContent = r;
  $('s3').textContent = g;
  $('s4').textContent = (room && n > 0) ? '$' + (room.p * n).toLocaleString() : '—';
}
function initBooking(){
  const t = new Date().toISOString().slice(0, 10);
  $('bi').min = t;
  $('bo').min = t;
  $('bi').addEventListener('change', () => {
    const d = new Date($('bi').value);
    d.setDate(d.getDate() + 1);
    $('bo').min = d.toISOString().slice(0, 10);
    if($('bo').value && $('bo').value <= $('bi').value) $('bo').value = $('bo').min;
    upd();
  });
  ['bo', 'br', 'bg2'].forEach(id => $(id).addEventListener('change', upd));
  $('bf').addEventListener('submit', e => {
    e.preventDefault();
    if(new Date($('bo').value) <= new Date($('bi').value)){ alert('Please choose a check-out date after check-in.'); return; }
    const text = [
      'Hello AUREA HAVEN, I would like to request a booking:',
      'Name: ' + $('bn').value,
      'Email: ' + $('be').value,
      'Check-in: ' + $('bi').value,
      'Check-out: ' + $('bo').value,
      'Guests: ' + $('bg2').value,
      'Room: ' + $('br').value,
      'Estimated: ' + $('s4').textContent,
      'Requests: ' + ($('bq').value || 'None')
    ].join('\n');
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
    $('bm').textContent = 'Opening WhatsApp with your request. If it does not open, tap here.';
    $('bm').classList.add('show');
    $('bm').onclick = () => window.open(url, '_blank');
    window.open(url, '_blank');
  });
}
function initContact(){
  $('cf').addEventListener('submit', e => {
    e.preventDefault();
    const text = `Hello AUREA HAVEN,\nName: ${$('cn').value}\nEmail: ${$('ce').value}\nType: ${$('ct').value}\nDate: ${$('cd').value || '-'}\n\n${$('cm').value}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank');
  });
}

/* INIT */
$('mn').innerHTML = PAGES.map(p => `<button data-p="${p[0]}" onclick="go('${p[0]}')">${p[1]}</button>`).join('');
const fl = p => `<a href="#${p[0]}" onclick="go('${p[0]}');return false">${p[1]}</a>`;
$('f1').innerHTML = PAGES.slice(0, 4).map(fl).join('');
$('f2').innerHTML = PAGES.slice(4).map(fl).join('') + fl(['booking', 'Book Now']);
if ($('waBar')) $('waBar').href = `https://wa.me/${WA}`;
$('yr').textContent = new Date().getFullYear();
go(location.hash.slice(1) || 'home', true);
