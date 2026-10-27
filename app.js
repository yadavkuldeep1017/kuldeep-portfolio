/* Portfolio content comes from three editable JSON files. No tracking or external runtime. */
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
  arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
  external:'<path d="M7 17 17 7M7 7h10v10"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M6 6.5h1m-1 11h1m5-11h6m-6 11h6"/>',
  layers:'<path d="m12 2 10 6-10 6L2 8l10-6Zm-9 11 9 5 9-5M3 18l9 5 9-5"/>',
  database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7"/>',
  chart:'<path d="M3 3v18h18M7 15l4-5 4 3 6-8"/>',
  shield:'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 5 10 8L22 5"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.code}</svg>`;
let profile, career, technologies;
const slugLink = p => p.id==='obrh-orchestration' ? 'obrh.html' : `project.html?id=${encodeURIComponent(p.id)}`;
const techLink = t => `technology.html?id=${encodeURIComponent(t.id)}`;
const technologyAliases = {'spring':'spring','rest':'rest','soap':'soap','owasp methodologies':'owasp','caching':'performance-engineering','database queries':'performance-engineering','mcp':'mcp','model context protocol':'mcp','aws':'aws','jmeter':'jmeter'};
const matchesTechnology = (name,t) => name.toLowerCase()===t.name.toLowerCase() || technologyAliases[name.toLowerCase()]===t.id;
const list = items => `<ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
const tags = (items, limit = 99) => `<div class="tags">${items.slice(0,limit).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
const external = (url,label,cls='text-link') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
const intro = (eyebrow,title,copy,meta='') => `<section class="page-intro"><div class="container"><div class="eyebrow">${esc(eyebrow)}</div><h1>${title}</h1><p>${esc(copy)}</p>${meta ? `<div class="intro-meta">${meta}</div>`:''}</div></section>`;
const breadcrumb = (label,parent='') => `<div class="breadcrumb"><a href="index.html">Overview</a><span aria-hidden="true">/</span>${parent ? `<a href="${parent==='Work'?'projects':'technologies'}.html">${parent}</a><span aria-hidden="true">/</span>`:''}<span>${esc(label)}</span></div>`;
const cta = () => `<section class="cta"><div class="container"><div class="eyebrow">Let’s connect</div><h2>Have something <em>in mind?</em></h2><p>For conversations about backend engineering, integration, or building something useful.</p><div class="buttons"><a href="contact.html" class="button">Start a conversation ${icon('external')}</a><a href="resume.html" class="button secondary">Read my resume ${icon('download')}</a></div></div></section>`;

function workArt(p,i) {
  const colors = ['','blue','sand','mint','lavender','blue','sand','rose'];
  const symbols = ['layers','server','chart','chart','code','layers','database','shield'];
  return `<div class="work-art ${colors[i%colors.length]}"><span class="art-num">WORK / ${String(i+1).padStart(2,'0')}</span><div class="architecture"><div class="arch-box">${icon('code')}</div><div class="arch-line"></div><div class="arch-box focus">${icon(symbols[i%symbols.length])}</div><div class="arch-line"></div><div class="arch-box">${icon('database')}</div></div><span class="art-type">${esc(p.category).toUpperCase()}</span></div>`;
}
function workCard(p,i) {
  return `<a class="work-card" href="${slugLink(p)}">${workArt(p,i)}<div class="card-body"><span class="kicker">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>${tags(p.tech,3)}<div class="card-bottom"><span>Explore the work</span><span aria-hidden="true">↗</span></div></div></a>`;
}
function renderHome() {
  return `<div class="container"><section class="hero"><div><div class="pill"><span class="dot"></span> JAVA BACKEND ENGINEER · PUNE, INDIA</div><h1>I build the backend<br>behind <em>better<br>experiences.</em></h1><p class="hero-copy">Hi, I’m <strong>Kuldeep Yadav.</strong> I turn complex integrations into reliable services. Currently building banking technology at <strong>Oracle Financial Services Software.</strong></p><div class="buttons"><a class="button" href="projects.html">Explore my work ${icon('external')}</a><a class="button secondary" href="resume.html">View resume ${icon('download')}</a></div><div class="hero-stack"><span>JAVA</span><i></i><span>SPRING BOOT</span><i></i><span>MICROSERVICES</span><i></i><span>BANKING INTEGRATION</span></div></div><div class="portrait-wrap"><div class="portrait-card"><div class="portrait-top"><span class="dot"></span> THE PERSON BEHIND THE CODE</div><img src="assets/kuldeep-yadav.jpg" width="248" height="320" alt="Kuldeep Yadav" fetchpriority="high"><div class="portrait-caption"><div>Kuldeep Yadav<small>Staff Consultant · Oracle</small></div>${icon('code')}</div></div><div class="portrait-float"><b>3+</b><span>YEARS BUILDING<br>BACKEND SYSTEMS</span></div></div></section><section id="expertise" class="expertise-section" aria-label="Experience and expertise"><div class="eyebrow">Experience & expertise</div><div class="expertise-strip">${profile.expertiseHighlights.map(item=>`<a class="expertise-highlight" href="${esc(item.url)}"><div class="expertise-title"><span class="expertise-icon">${icon(item.icon)}</span><h2>${esc(item.title)}</h2></div><p>${esc(item.detail)}</p></a>`).join('')}</div></section></div>
  <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">Selected work</div><h2>Complex problems.<br>Practical solutions.</h2><p>A closer look at the systems, integrations, and improvements I’ve worked on.</p></div><a href="projects.html" class="text-link">All ${career.projects.length} case studies <span aria-hidden="true">↗</span></a></div><div class="grid-3">${[career.projects[0],career.projects[2],career.projects[5]].map(p=>workCard(p,career.projects.indexOf(p))).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="feature-band"><div><div class="eyebrow">Experience that connects</div><h2>From service logic<br>to production delivery.</h2><p>Java development, banking API orchestration, performance tuning, and the tools that keep services running.</p><a class="button lime" href="experience.html">Explore my experience ${icon('external')}</a></div><div class="feature-lines"><a class="feature-line" href="experience.html"><strong>Oracle Financial Services Software</strong><span>Aug 2023 – Present ↗</span></a><a class="feature-line" href="obrh.html"><strong>Banking integration & orchestration</strong><span>OBRH · HDFC Bank ↗</span></a><a class="feature-line" href="project.html?id=observability-delivery"><strong>Containers, monitoring & delivery</strong><span>Docker · Kubernetes · ELK ↗</span></a><a class="feature-line" href="project.html?id=application-security-audits"><strong>Application security foundations</strong><span>Cybersecurist · 2023 ↗</span></a></div></div></div></section>
  <section class="section"><div class="container"><div class="section-head"><div><div class="eyebrow">My engineering toolkit</div><h2>The tools. The thinking.</h2><p>Explore ${technologies.length} technology notes, with simple explanations, examples, and links to learn more.</p></div><a href="technologies.html" class="text-link">Open the technology guide <span aria-hidden="true">↗</span></a></div><div class="tool-preview">${[['{ }','Java & Spring','Service logic, web APIs, security, and persistence.','Backend'],['⇄','Integration','Camel routes, workflows, gateways, REST, and SOAP.','Integration'],['▤','Data & databases','Relational and document databases, caching, and queries.','Data'],['⌘','Delivery & visibility','Containers, pipelines, logs, metrics, and traces.','Cloud & delivery']].map(([symbol,title,desc,cat])=>`<a href="technologies.html?category=${encodeURIComponent(cat)}" class="tool-block"><span class="tool-symbol" aria-hidden="true">${symbol}</span><h3>${title}</h3><p>${desc}</p></a>`).join('')}</div></div></section>${cta()}`;
}
function renderExperience() {
  const oracleHighlights='<ul>'+career.companyHighlights.map(t=>`<li>${esc(t).replace(/\bOBRH\b/g,'<a class="text-link" href="obrh.html">OBRH ↗</a>')}</li>`).join('')+'</ul>';
  return `${intro('Career & contributions','Experience with <em>real impact.</em>','Java backend development, banking integration, delivery, and application security. A complete view of my roles and contributions.','<span>3+ years of backend experience</span><span>Pune, India</span>')}<div class="container page-content"><div class="detail-layout"><div><div class="timeline">${career.roles.map(r=>`<article class="role" id="${esc(r.id)}"><div class="dates">${esc(r.dates)}</div><h3>${esc(r.title)}</h3><div class="company">${esc(r.company)}${r.location?' · '+esc(r.location):''}</div><p class="role-copy">${esc(r.summary)}</p>${r.highlights.length?list(r.highlights):''}${tags(r.tech,8)}</article>`).join('')}</div><section class="detail-section section-space"><h2><a href="obrh.html">Oracle Banking Routing Hub (OBRH) ↗</a></h2><p>Explore the project overview and my engineering learning notes: architecture, technology roles, Camel routes, design patterns, and caching, with fictional examples.</p><a class="button secondary" href="obrh.html">Open the OBRH notebook ${icon('arrow')}</a></section><section class="detail-section section-space"><h2>Contributions at Oracle</h2><p>These contributions span my Oracle tenure, beginning in August 2023.</p>${oracleHighlights}</section><a class="text-link" href="projects.html">Read the work case studies <span aria-hidden="true">↗</span></a></div><aside class="aside-card"><h3>Career at a glance</h3><dl><div class="row"><dt>Current role</dt><dd>Staff Consultant</dd></div><div class="row"><dt>Organization</dt><dd>Oracle Financial Services Software</dd></div><div class="row"><dt>Focus</dt><dd>Java backend & banking integration</dd></div><div class="row"><dt>Location</dt><dd>Pune, India</dd></div></dl><a class="button" href="resume.html">Read my resume ${icon('download')}</a></aside></div></div>${cta()}`;
}
function renderProjects() {
  return `${intro('Work & case studies','Built to solve.<br><em>Designed to last.</em>','Explore professional contributions, a proof of concept, portfolio projects, and security work. Each case study connects the problem, my work, the technologies, and the result.')}<div class="container page-content"><div class="filters"><div class="filter-pills" aria-label="Filter work"><button class="filter-button active" data-work-filter="all" aria-pressed="true">All work</button><button class="filter-button" data-work-filter="professional" aria-pressed="false">Professional</button><button class="filter-button" data-work-filter="personal" aria-pressed="false">Portfolio projects</button><button class="filter-button" data-work-filter="security" aria-pressed="false">Security</button></div><label class="sr-only" for="work-search">Search work</label><input class="field search-field" type="search" id="work-search" placeholder="Search projects or technologies…"></div><p class="results-label" id="work-count"></p><div class="grid-3" id="work-grid"></div><p class="supporting-line">Professional case studies describe separate areas of contribution within my Oracle experience. Figures come from my resume.</p></div>${cta()}`;
}
function relatedTechnologies(names) {
  const pairs = technologies.filter(t=>names.some(n=>matchesTechnology(n,t)));
  return pairs.length?`<section class="detail-section"><h2>Understand the technologies</h2><div class="filter-pills">${pairs.map(t=>`<a class="filter-button" href="${techLink(t)}">${esc(t.name)} ↗</a>`).join('')}</div></section>`:'';
}
function renderProject() {
  const p=career.projects.find(p=>p.id===new URLSearchParams(location.search).get('id'));
  if(!p) return notFound('work case study','projects.html');
  document.title=`${p.title} | Kuldeep Yadav`;
  return `${intro(p.category,esc(p.title),p.summary)}<div class="container page-content">${breadcrumb(p.title,'Work')}<div class="detail-layout"><div><div class="result-panel"><strong>${esc(p.metric)}</strong><p>${esc(p.metricLabel)}</p></div><section class="detail-section"><h2>The context</h2><p>${esc(p.context)}</p></section><section class="detail-section"><h2>My contributions</h2>${list(p.contributions)}</section><section class="detail-section"><h2>The outcome</h2>${list(p.outcomes)}</section><section class="detail-section"><h2>How to understand the work</h2><div class="example">${esc(p.explanation)}</div></section>${relatedTechnologies(p.tech)}<div class="note">This case study expands on my resume. Explanatory examples describe the concepts and do not disclose internal code or client systems.</div></div><aside class="aside-card"><h3>Project notes</h3><dl><div class="row"><dt>Type of work</dt><dd>${esc(p.category)}</dd></div><div class="row"><dt>Technology & focus</dt><dd>${tags(p.tech)}</dd></div><div class="row"><dt>Explore more</dt><dd><a class="text-link" href="experience.html">Career details ↗</a></dd></div></dl>${p.links.map(l=>external(l.url,l.label,'button secondary')).join('')}<a class="button" href="projects.html">All work ${icon('arrow')}</a></aside></div><div class="section-space"><div class="subheading"><h2>More to explore</h2></div><div class="grid-3">${career.projects.filter(x=>x.id!==p.id).slice(0,3).map(x=>workCard(x,career.projects.indexOf(x))).join('')}</div></div></div>${cta()}`;
}
function renderTechnologies() {
  const cats=[...new Set(technologies.map(t=>t.category))];
  return `${intro('Expertise & reference notes','Know the tools.<br><em>Understand the why.</em>','A personal reference to the technologies in my resume: what they do, when they help, the key ideas, and an example. Use it to explore my stack or refresh a concept.','<span>'+technologies.length+' technology notes</span><span>7 areas of engineering</span>')}<div class="container page-content"><div class="filters"><div class="filter-pills" aria-label="Filter technologies"><button class="filter-button active" data-tech-filter="all" aria-pressed="true">All technologies</button>${cats.map(c=>`<button class="filter-button" data-tech-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('')}</div><label class="sr-only" for="tech-search">Search technology guide</label><input class="field search-field" id="tech-search" type="search" placeholder="Find a tool, concept, or example…"></div><p id="tech-count" class="results-label"></p><div class="tool-grid" id="technology-grid"></div><div class="note">Experience context is shown in every note. Tools listed in my resume are distinguished from tools tied to a named project. Examples are for learning and do not claim a particular production implementation.</div></div>${cta()}`;
}
function technologyCard(t) {
  const initials=t.name==='C#'?'C#':t.name==='Spring Boot'?'SB':t.name==='Java'?'Jv':t.name.replace(/[^A-Za-z ]/g,'').split(' ').map(x=>x[0]).join('').slice(0,3);
  return `<a class="technology-card" href="${techLink(t)}"><div class="tool-top"><span class="tool-initial" aria-hidden="true">${esc(initials)}</span><span>${esc(t.category)}</span></div><h3>${esc(t.name)}</h3><p>${esc(t.summary)}</p><div class="read-more">Read the notes <span aria-hidden="true">↗</span></div></a>`;
}
function renderTechnology() {
  const t=technologies.find(t=>t.id===new URLSearchParams(location.search).get('id'));
  if(!t) return notFound('technology note','technologies.html');
  document.title=`${t.name} | Technology Guide | Kuldeep Yadav`;
  const related=technologies.filter(x=>x.category===t.category && x.id!==t.id).slice(0,3);
  const matchingProjects=career.projects.filter(p=>p.tech.some(n=>matchesTechnology(n,t)));
  return `${intro(t.category,esc(t.name),t.summary)}<div class="container page-content">${breadcrumb(t.name,'Toolkit')}<div class="detail-layout"><div><section class="detail-section"><h2>What it helps with</h2><p>${esc(t.use)}</p></section><section class="detail-section"><h2>Key ideas to remember</h2><ul class="concepts">${t.concepts.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></section><section class="detail-section"><h2>A simple example</h2><div class="example"><div class="example-label">Conceptual example</div>${esc(t.example)}</div></section><section class="detail-section"><h2>Where it fits in my background</h2><p>${esc(t.resumeContext)}</p>${matchingProjects.length?`<div class="filter-pills">${matchingProjects.map(p=>`<a class="filter-button" href="${slugLink(p)}">${esc(p.title)} ↗</a>`).join('')}</div>`:''}</section></div><aside class="aside-card"><h3>Keep exploring</h3><dl><div class="row"><dt>Area</dt><dd>${esc(t.category)}</dd></div><div class="row"><dt>Learning reference</dt><dd>${external(t.docs,'Documentation')}</dd></div></dl><a class="button" href="technologies.html?category=${encodeURIComponent(t.category)}">Browse this area ${icon('arrow')}</a><a class="button secondary" href="technologies.html">All technologies</a><div class="supporting-line"><button class="print-button">Print / save these notes</button></div></aside></div>${related.length?`<section class="section-space"><div class="subheading"><h2>Related notes</h2></div><div class="tool-grid">${related.map(technologyCard).join('')}</div></section>`:''}</div>`;
}
function renderAbout() {
  return `${intro('The person behind the code','Curious by nature.<br><em>Engineer by practice.</em>','I’m Kuldeep Yadav, a software engineer based in Pune. My focus is Java backend development and the integration work that connects banking systems.')}<div class="container page-content"><div class="about-top"><div><h2>A little about my work</h2><p>${esc(profile.summary)}</p><p>My background also includes application security auditing, tournament scheduling, and a railway reservation project. I’ve mentored junior engineers on Git workflows, Agile practices, and CI/CD.</p><a class="text-link" href="experience.html">Explore my full experience <span aria-hidden="true">↗</span></a></div><aside class="about-facts"><dl><div class="fact"><dt>Based in</dt><dd>Pune, India</dd></div><div class="fact"><dt>Current role</dt><dd>Staff Consultant · Oracle Financial Services Software</dd></div><div class="fact"><dt>Resume headline</dt><dd>Software Developer II | Java Backend Development</dd></div><div class="fact"><dt>Primary focus</dt><dd>Java · Spring Boot · Banking integration</dd></div></dl></aside></div><section><div class="subheading"><h2>Education</h2><span>The foundation behind the work</span></div>${career.education.map(e=>`<article class="education"><span>${esc(e.dates)}</span><div><h3>${esc(e.degree)}</h3><p>${esc(e.institution)}</p><p>${esc(e.detail)}</p></div></article>`).join('')}</section><section class="section-space"><div class="subheading"><h2>Awards & achievements</h2><span>Milestones from my resume</span></div><div class="achievement-grid">${career.achievements.map((a,i)=>`<article class="info-card"><div class="kicker">Achievement / ${String(i+1).padStart(2,'0')}</div><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p></article>`).join('')}</div></section><section class="section-space"><div class="subheading"><h2>Learning & credentials</h2></div><div class="grid-3">${career.certifications.map(a=>`<article class="info-card"><div class="kicker">${esc(a.kind || 'Learning')}</div><h3>${esc(a.title)}</h3><p>${esc(a.detail)}</p></article>`).join('')}</div></section></div>${cta()}`;
}
function renderContact() {
  return `${intro('Career links & contact','Let’s start a<br><em>good conversation.</em>','Find my professional profiles, explore my code, or get in touch about backend engineering, banking integration, and software development.')}<div class="container page-content"><div class="contact-layout"><section class="contact-card"><div class="eyebrow" style="color:var(--lime)">Say hello</div><h2>One email away.</h2><p>For professional conversations and opportunities, email is a good place to start.</p><a class="contact-email" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a><div class="buttons"><a href="mailto:${esc(profile.email)}" class="button lime">Send an email ${icon('mail')}</a><button class="button secondary" id="copy-email">Copy email</button></div><div class="contact-small"><span>Based in ${esc(profile.location)}</span><a href="tel:${esc(profile.phoneLink)}">${esc(profile.phone)}</a></div></section><div>${profile.links.map(l=>`<a class="social-row" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><div><h3>${esc(l.label)}</h3><p>${esc(l.detail)}</p></div><span aria-hidden="true">↗</span></a>`).join('')}<a class="social-row" href="resume.html"><div><h3>Resume</h3><p>Read online or download the updated PDF</p></div><span aria-hidden="true">↗</span></a><p class="supporting-line">These are the profile links included in my resume.</p></div></div></div>`;
}
function renderResume() {
  return `${intro('Resume & career summary','My experience.<br><em>In one place.</em>','Read the updated resume here or download a copy for your records. For deeper context, explore the experience, work, and technology pages.')}<div class="container page-content"><div class="resume-actions"><p>ATS-friendly resume · PDF · Updated October 25, 2026</p><div class="buttons"><a class="button" href="assets/Kuldeep-Yadav-Resume.pdf?v=20261025-links" download>Download resume ${icon('download')}</a><a class="button secondary" href="assets/Kuldeep-Yadav-Resume.pdf?v=20261025-links" target="_blank" rel="noopener noreferrer">Open PDF ${icon('external')}</a></div></div><iframe class="resume-frame" title="Kuldeep Yadav’s updated resume" src="assets/Kuldeep-Yadav-Resume.pdf?v=20261025-links#view=FitH"></iframe><p class="supporting-line">If your browser cannot display the PDF, use Open PDF or Download resume above.</p><section class="section-space"><div class="subheading"><h2>Go beyond the resume</h2></div><div class="tool-preview"><a class="tool-block" href="experience.html"><span class="tool-symbol">01</span><h3>Experience</h3><p>Roles, responsibilities, and career impact.</p></a><a class="tool-block" href="projects.html"><span class="tool-symbol">02</span><h3>Work</h3><p>Detailed contributions and project outcomes.</p></a><a class="tool-block" href="technologies.html"><span class="tool-symbol">03</span><h3>Technology guide</h3><p>Tools, key concepts, examples, and references.</p></a><a class="tool-block" href="about.html"><span class="tool-symbol">04</span><h3>Credentials</h3><p>Education, learning, and achievements.</p></a></div></section></div>`;
}
function notFound(item,href) {
  document.title='Page not found | Kuldeep Yadav';
  return `${intro('Let’s find your way','This note <em>isn’t here.</em>',`The requested ${item} could not be found. Use the guide below to choose another entry.`)}<div class="container page-content"><a class="button" href="${href}">Back to the collection ${icon('arrow')}</a></div>`;
}
function bindProjectFilters() {
  let mode='all';
  const update=()=>{
    const q=$('#work-search').value.trim().toLowerCase();
    const selected=career.projects.filter(p=>(mode==='all'||(mode==='personal'?p.category==='Portfolio project':mode==='security'?p.id==='application-security-audits':p.category!=='Portfolio project'&&p.id!=='application-security-audits'))&&[p.title,p.category,p.summary,...p.tech].join(' ').toLowerCase().includes(q));
    $('#work-grid').innerHTML=selected.length?selected.map(p=>workCard(p,career.projects.indexOf(p))).join(''):'<p class="empty">No work matches that search. Try another technology or choose All work.</p>';
    $('#work-count').textContent=`${selected.length} of ${career.projects.length} case studies`;
  };
  document.querySelectorAll('[data-work-filter]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.workFilter;document.querySelectorAll('[data-work-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});update();}));
  $('#work-search').addEventListener('input',update);update();
}
function bindTechnologyFilters() {
  let cat=new URLSearchParams(location.search).get('category')||'all';
  if(!technologies.some(t=>t.category===cat)) cat='all';
  const buttons=[...document.querySelectorAll('[data-tech-filter]')];
  const update=()=>{
    buttons.forEach(b=>{const active=b.dataset.techFilter===cat;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    const q=$('#tech-search').value.trim().toLowerCase();
    const selected=technologies.filter(t=>(cat==='all'||cat===t.category)&&[t.name,t.summary,t.use,...t.concepts,t.example,t.resumeContext].join(' ').toLowerCase().includes(q));
    $('#technology-grid').innerHTML=selected.length?selected.map(technologyCard).join(''):'<p class="empty">No technology notes match. Try a shorter search or choose All technologies.</p>';
    $('#tech-count').textContent=`${selected.length} of ${technologies.length} technology notes`;
  };
  buttons.forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.techFilter;const url=new URL(location.href);if(cat==='all')url.searchParams.delete('category');else url.searchParams.set('category',cat);history.replaceState(null,'',url);update();}));
  $('#tech-search').addEventListener('input',update);update();
}
function setupSearch() {
  const dialog=$('#search-dialog'),input=$('#global-search'),results=$('#search-results');
  const pages=[['Overview','index.html'],['Experience & career','experience.html'],['Work & projects','projects.html'],['Technology guide','technologies.html'],['About, education & achievements','about.html'],['Career links & contact','contact.html'],['Resume & download','resume.html'],['OBRH: architecture, Camel, caching, singleton & design patterns','obrh.html']];
  const entries=[...pages.map(([title,url])=>({title,url,type:'Page',keywords:title})),...career.projects.map(p=>({title:p.title,url:slugLink(p),type:'Work',keywords:[p.title,p.summary,...p.tech].join(' ')})),...technologies.map(t=>({title:t.name,url:techLink(t),type:t.category,keywords:[t.name,t.summary,...t.concepts].join(' ')}))];
  function update(){const q=input.value.trim().toLowerCase();const selected=(q?entries.filter(e=>e.keywords.toLowerCase().includes(q)):entries.slice(0,7)).slice(0,15);results.innerHTML=selected.length?selected.map(e=>`<a class="search-result" href="${esc(e.url)}"><small>${esc(e.type)}</small><strong>${esc(e.title)}</strong></a>`).join(''):'<p class="empty">No results. Try another search.</p>';}
  const open=()=>{if(!dialog.open){update();dialog.showModal();input.focus();}};
  $('.search-open').addEventListener('click',open);$('.close-search').addEventListener('click',()=>dialog.close());input.addEventListener('input',update);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open){e.preventDefault();dialog.close();return;}if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();open();}},true);
}
async function copyEmail() {
  try{await navigator.clipboard.writeText(profile.email);const toast=$('.toast');toast.textContent='Email address copied';toast.classList.add('visible');setTimeout(()=>toast.classList.remove('visible'),2400);}
  catch{const toast=$('.toast');toast.textContent=`Email: ${profile.email}`;toast.classList.add('visible');setTimeout(()=>toast.classList.remove('visible'),6000);}
}
function bindOBRHGuide() {
  const notes=[...document.querySelectorAll('.guide-topic')];
  const input=$('#guide-search');
  let category='all';
  function filterNotes(){
    const q=input.value.trim().toLowerCase();let count=0;
    notes.forEach(note=>{const match=(category==='all'||note.dataset.guideCategory===category)&&note.textContent.toLowerCase().includes(q);note.hidden=!match;if(match)count++;});
    $('#guide-count').textContent=`${count} of ${notes.length} notes`;
    $('#guide-empty').hidden=count!==0;
  }
  function setCategory(value){
    category=value;document.querySelectorAll('[data-guide-filter]').forEach(button=>{const active=button.dataset.guideFilter===value;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});filterNotes();
  }
  input.addEventListener('input',filterNotes);
  document.querySelectorAll('[data-guide-filter]').forEach(button=>button.addEventListener('click',()=>setCategory(button.dataset.guideFilter)));
  $('#guide-expand-all').addEventListener('click',()=>notes.filter(n=>!n.hidden).forEach(n=>n.open=true));
  $('#guide-collapse-all').addEventListener('click',()=>notes.filter(n=>!n.hidden).forEach(n=>n.open=false));
  function revealHash(){
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    const note=notes.find(n=>n.id===id);if(!note)return;
    input.value='';setCategory('all');note.open=true;note.scrollIntoView({block:'start'});
  }
  window.addEventListener('hashchange',revealHash);revealHash();
  document.querySelectorAll('[data-guide-step]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-guide-step]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelectorAll('[data-guide-panel]').forEach(panel=>panel.hidden=panel.dataset.guidePanel!==button.dataset.guideStep);
  }));
  document.querySelectorAll('[data-cache-scenario]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-cache-scenario]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
    document.querySelectorAll('[data-cache-panel]').forEach(panel=>panel.hidden=panel.dataset.cachePanel!==button.dataset.cacheScenario);
  }));
  let beforePrint;
  window.addEventListener('beforeprint',()=>{beforePrint=notes.map(n=>({open:n.open,hidden:n.hidden}));notes.forEach(n=>{n.hidden=false;n.open=true;});});
  window.addEventListener('afterprint',()=>{if(beforePrint)notes.forEach((n,i)=>{n.open=beforePrint[i].open;n.hidden=beforePrint[i].hidden;});});
  $('.print-button')?.addEventListener('click',()=>window.print());
}
async function init() {
  const page=document.body.dataset.page;
  if(page==='project'&&new URLSearchParams(location.search).get('id')==='obrh-orchestration'){location.replace('obrh.html');return;}
  const responses=(page==='obrh'||location.protocol==='file:')&&window.PORTFOLIO_DATA ? [window.PORTFOLIO_DATA.profile,window.PORTFOLIO_DATA.career,window.PORTFOLIO_DATA.technologies] : await Promise.all(['profile.json','career.json','technologies.json'].map(f=>fetch(`${f}?v=4`).then(r=>{if(!r.ok)throw new Error('Content unavailable');return r.json();})));
  [profile,career,technologies]=responses;
  if(page==='obrh'){bindOBRHGuide();setupSearch();return;}
  const renderers={home:renderHome,experience:renderExperience,projects:renderProjects,project:renderProject,technologies:renderTechnologies,technology:renderTechnology,about:renderAbout,contact:renderContact,resume:renderResume};
  $('#main').innerHTML=(renderers[page]||renderHome)();
  if(page==='projects')bindProjectFilters();if(page==='technologies')bindTechnologyFilters();
  $('#copy-email')?.addEventListener('click',copyEmail);
  $('.print-button')?.addEventListener('click',()=>window.print());
  setupSearch();
}
$('.menu-button').addEventListener('click',()=>{const open=$('#navigation').classList.toggle('open');$('.menu-button').setAttribute('aria-expanded',String(open));$('.menu-button').setAttribute('aria-label',open?'Close navigation':'Open navigation');});
init().catch(error=>{console.error(error);$('#main').innerHTML='<div class="container loading"><h1>Let’s reconnect.</h1><p>The portfolio content could not load. Refresh the page to try again.</p><div class="buttons"><a class="button" href="assets/Kuldeep-Yadav-Resume.pdf?v=20261025-links">Read my resume</a><a class="button secondary" href="mailto:yadavkuldeep1017@gmail.com">Contact me</a></div></div>';});
