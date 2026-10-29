/* Educational content and original SVG images. No model calls or external runtime. */
(() => {
  'use strict';
  const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link=id=>`technology.html?id=${encodeURIComponent(id)}`;
  const progressKey='kuldeep-study-completed-v1';
  function completed(){try{return new Set(JSON.parse(localStorage.getItem(progressKey)||'[]'));}catch{return new Set();}}
  function wrap(value,max=24){
    const lines=[];let line='';
    String(value).split(/\s+/).forEach(word=>{if(line&&line.length+word.length+1>max){lines.push(line);line=word;}else line+=(line?' ':'')+word;});
    if(line)lines.push(line);return lines;
  }
  function textLines(value,x,y,width=25,cls='',maxLines=5){
    const lines=wrap(value,width).slice(0,maxLines);
    return `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${lines.map((line,i)=>`<tspan x="${x}" dy="${i?19:0}">${E(line)}</tspan>`).join('')}</text>`;
  }
  function box(label,x,y,w,h,accent=false){
    const lines=wrap(label,Math.max(12,Math.floor(w/8))).slice(0,4);
    const first=y+h/2-(lines.length-1)*9.5+5;
    return `<rect class="sd-box${accent?' sd-accent':''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="13"/>${textLines(label,x+w/2,first,Math.max(12,Math.floor(w/8)),'sd-label',4)}`;
  }
  function svgFrame(id,title,caption,w,h,body,variant){
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" class="study-svg study-svg-${variant}" role="img" aria-labelledby="${id}-${variant}-title ${id}-${variant}-desc"><title id="${id}-${variant}-title">${E(title)}</title><desc id="${id}-${variant}-desc">${E(caption)}</desc><defs><marker id="${id}-${variant}-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#8bd6b3"/></marker></defs><rect class="sd-canvas" width="${w}" height="${h}" rx="18"/>${body}</svg>`;
  }
  function diagramSVG(t,key,d,mobile=false){
    const variant=mobile?'tall':'wide',id=`${t.id}-${key}`,w=mobile?360:900;
    const arrow=`marker-end="url(#${id}-${variant}-arrow)"`;
    const nodes=d.nodes;let body='',h;
    if(key==='tradeoffs'||key==='comparison'){
      const comparison=key==='comparison';
      const titles=comparison?[t.name,t.lesson.comparison.alternative]:['Advantages','Trade-offs'];
      const values=comparison?[t.lesson.comparison.rows.slice(0,2).map(r=>`${r.aspect}: ${r.thisTopic}`),t.lesson.comparison.rows.slice(0,2).map(r=>`${r.aspect}: ${r.alternative}`)]:[t.lesson.pros.slice(0,2),t.lesson.cons.slice(0,2)];
      h=mobile?570:290;
      for(let i=0;i<2;i++){
        const x=mobile?20:20+i*445,y=mobile?20+i*275:20,bw=mobile?320:435;
        body+=`<rect class="sd-panel" x="${x}" y="${y}" width="${bw}" height="250" rx="14"/>`;
        body+=textLines(titles[i],x+bw/2,y+32,mobile?30:44,'sd-heading',2);
        values[i].forEach((v,j)=>{body+=textLines(v,x+bw/2,y+92+j*90,mobile?33:47,'sd-detail',4);});
      }
    }else if(d.layout==='choice'){
      const trunk=nodes.slice(0,-2),choices=nodes.slice(-2);
      h=mobile?trunk.length*112+270:300;
      if(mobile){
        trunk.forEach((n,i)=>{const y=18+i*112;if(i)body+=`<path class="sd-line" d="M180 ${y-30}V${y-7}" ${arrow}/>`;body+=box(n,30,y,300,82,i===0);});
        const start=(trunk.length-1)*112+100,join=trunk.length*112+5;
        choices.forEach((n,i)=>{const y=trunk.length*112+40+i*110;body+=`<path class="sd-line" d="M180 ${start}V${join}H15V${y+38}H23" ${arrow}/>`+box(n,30,y,300,76)+`<text class="sd-step" x="42" y="${y-8}">Alternative ${i+1}</text>`;});
      }else{
        const bw=Math.min(230,(520-(trunk.length-1)*20)/trunk.length);
        trunk.forEach((n,i)=>{const x=25+i*(bw+20);if(i)body+=`<path class="sd-line" d="M${x-18} 149H${x-7}" ${arrow}/>`;body+=box(n,x,106,bw,86,i===0);});
        const end=25+trunk.length*bw+(trunk.length-1)*20,join=(end+650)/2;
        choices.forEach((n,i)=>{const y=25+i*165;body+=`<path class="sd-line" d="M${end} 149H${join}V${y+43}H643" ${arrow}/>`+box(n,650,y,225,86)+`<text class="sd-step" x="662" y="${y-8}">Alternative ${i+1}</text>`;});
      }
    }else if(d.layout==='merge'){
      const inputs=nodes.slice(0,-2),process=nodes[nodes.length-2],output=nodes[nodes.length-1];
      h=mobile?inputs.length*95+265:Math.max(300,inputs.length*95+30);
      if(mobile){
        const py=inputs.length*95+60;
        inputs.forEach((n,i)=>{const y=18+i*95;body+=`<path class="sd-line" d="M30 ${y+35}H15V${py-25}H180V${py-7}" ${arrow}/>`+box(n,30,y,300,70);});
        body+=box(process,30,py,300,75,true)+`<path class="sd-line" d="M180 ${py+75}V${py+103}" ${arrow}/>`+box(output,30,py+110,300,75);
      }else{
        const py=h/2-45;
        inputs.forEach((n,i)=>{const y=20+i*95;body+=`<path class="sd-line" d="M255 ${y+35}H300V${py+45}H343" ${arrow}/>`+box(n,25,y,230,70);});
        body+=box(process,350,py,235,90,true)+`<path class="sd-line" d="M585 ${py+45}H643" ${arrow}/>`+box(output,650,py,225,90);
      }
    }else if(d.layout==='map'||(['useCases','advanced','pitfalls'].includes(key)&&d.layout!=='flow')){
      h=mobile?120+nodes.length*105:300;
      if(mobile){
        body+=box(t.name,30,16,300,70,true);
        body+=`<path class="sd-line" d="M180 86V103H18V${138+(nodes.length-1)*105}"/>`;
        nodes.forEach((n,i)=>{const y=115+i*105;body+=`<path class="sd-line" d="M18 ${y+37}H38" ${arrow}/>`+box(n,43,y,293,77);});
      }else{
        body+=box(t.name,310,15,280,70,true);
        const bw=(840-(nodes.length-1)*18)/nodes.length;
        nodes.forEach((n,i)=>{const x=30+i*(bw+18);body+=`<path class="sd-line" d="M450 85V116H${x+bw/2}V153" ${arrow}/>`+box(n,x,160,bw,106);});
      }
    }else{
      h=mobile?nodes.length*112+20:215;
      const bw=mobile?300:(840-(nodes.length-1)*28)/nodes.length;
      nodes.forEach((n,i)=>{
        const x=mobile?30:30+i*(bw+28),y=mobile?18+i*112:55;
        if(i){body+=mobile?`<path class="sd-line" d="M180 ${y-30}V${y-7}" ${arrow}/>`:`<path class="sd-line" d="M${x-26} 105H${x-7}" ${arrow}/>`;}
        body+=box(n,x,y,bw,mobile?82:105,i===0);
        body+=`<text class="sd-step" x="${x+12}" y="${y-8}">${i+1<10?'0':''}${i+1}</text>`;
      });
    }
    return svgFrame(id,d.title,d.caption,w,h,body,variant);
  }
  function figure(t,key,diagram){
    const d=diagram||t.lesson.diagrams[key];
    return `<figure class="study-figure" data-study-diagram="${E(key)}"><div class="study-figure-heading"><h3>${E(d.title)}</h3><button class="study-image-download" type="button" aria-label="Download ${E(d.title)} as an SVG image">Save image (SVG) ↓</button></div>${diagramSVG(t,key,d)}${diagramSVG(t,key,d,true)}<figcaption>${E(d.caption)}</figcaption></figure>`;
  }
  const paragraphs=xs=>xs.map(x=>`<p>${E(x)}</p>`).join('');
  const ul=xs=>`<ul>${xs.map(x=>`<li>${E(x)}</li>`).join('')}</ul>`;
  function steps(xs){return `<ol class="study-steps">${xs.map((x,i)=>`<li><span>${i+1}</span><div>${typeof x==='string'?`<p>${E(x)}</p>`:`<h3>${E(x.title)}</h3><p>${E(x.detail)}</p>`}</div></li>`).join('')}</ol>`;}
  function section(id,number,title,content){return `<section class="study-section" id="${id}"><div class="eyebrow">${number} / Study notes</div><h2>${title}</h2>${content}</section>`;}
  function renderLesson(topic,catalog){
    const lesson=window.STUDY_DATA?.lessons[topic.id];if(!lesson)return '';
    const t={...topic,lesson};
    const curriculum=window.STUDY_DATA.curriculum,sequence=curriculum.sequence,index=sequence.indexOf(t.id);
    const get=id=>catalog.find(x=>x.id===id);
    const prerequisiteLinks=lesson.prerequisites.map(id=>{const x=get(id);return x?`<a href="${link(id)}">${E(x.name)} ↗</a>`:'';}).join('');
    const contents=[['definition','Definition & fundamentals'],['use-cases','Use cases'],['mechanics','How it works'],['tradeoffs','Pros & cons'],['comparison','Compare approaches'],['example','Worked example'],['advanced','Go deeper'],['pitfalls','Common mistakes'],['practice','Check your understanding'],['references','References']];
    const category=E(t.category),studied=completed().has(t.id);
    let html=`<section class="page-intro study-intro"><div class="container"><div class="eyebrow">${category} / Visual study guide</div><h1>${E(t.name)}</h1><p>${E(t.summary)}</p><div class="intro-meta"><span>${E(lesson.level)}</span><span>About ${t.readMinutes||6} min + practice</span><span>10 illustrated sections</span></div><div class="buttons"><a class="button" href="#definition">Start studying ↓</a><button type="button" class="button secondary" id="study-complete" data-study-id="${E(t.id)}" aria-pressed="${studied}">${studied?'Studied ✓':'Mark studied'}</button></div><p class="study-progress-note" id="study-progress-status" role="status">Study progress stays in this browser.</p></div></section>`;
    html+=`<div class="container page-content"><div class="breadcrumb"><a href="technologies.html">Technology library</a><span aria-hidden="true">/</span><span>${E(t.name)}</span></div><div class="study-layout"><aside class="study-nav"><nav aria-label="Lesson sections"><div class="eyebrow">In this lesson</div>${contents.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav><button class="print-button">Print / save lesson</button>${index>=0?`<a class="text-link" href="ai.html">AI path · Step ${index+1} of ${sequence.length} ↗</a>`:''}<a class="text-link" href="technologies.html">All topics ↗</a></aside><article class="study-content">`;
    html+=section('definition','01','Definition first',`<p class="study-definition">${E(lesson.definition)}</p><p>${E(lesson.whyItMatters)}</p>${figure(t,'definition')}<h3 class="study-subheading">Build the foundation</h3><dl class="study-terms">${lesson.fundamentals.map(x=>`<div><dt>${E(x.term)}</dt><dd>${E(x.explanation)}</dd></div>`).join('')}</dl><div class="study-prerequisites"><h3>Before you begin</h3>${prerequisiteLinks?`<p>These topics make this lesson easier to follow.</p><div>${prerequisiteLinks}</div>`:'<p>Start here, then follow the examples in order.</p>'}</div>`);
    html+=section('use-cases','02','When to use it',`${figure(t,'useCases')}<div class="study-card-grid">${lesson.useCases.map(x=>`<div class="study-card"><h3>${E(x.title)}</h3><p>${E(x.detail)}</p></div>`).join('')}</div>`);
    html+=section('mechanics','03','How it works, step by step',`${figure(t,'mechanics')}${steps(lesson.mechanics)}`);
    html+=section('tradeoffs','04','Advantages and trade-offs',`${figure(t,'tradeoffs')}<div class="study-procon"><div><h3>Pros</h3>${ul(lesson.pros)}</div><div><h3>Cons & limits</h3>${ul(lesson.cons)}</div></div>`);
    html+=section('comparison','05',`Compare with ${E(lesson.comparison.alternative)}`,`${figure(t,'comparison')}<div class="study-table-wrap" tabindex="0" role="region" aria-label="Comparison of ${E(t.name)} and ${E(lesson.comparison.alternative)}"><table class="study-comparison"><caption class="sr-only">Approach comparison</caption><thead><tr><th scope="col">Question</th><th scope="col">${E(t.name)}</th><th scope="col">${E(lesson.comparison.alternative)}</th></tr></thead><tbody>${lesson.comparison.rows.map(r=>`<tr><th scope="row">${E(r.aspect)}</th><td data-label="${E(t.name)}">${E(r.thisTopic)}</td><td data-label="${E(lesson.comparison.alternative)}">${E(r.alternative)}</td></tr>`).join('')}</tbody></table></div>`);
    const example=lesson.example;
    html+=section('example','06',E(example.title),`<p>${E(example.scenario)}</p>${figure(t,'example')}${steps(example.steps)}<div class="study-result"><h3>Expected result</h3><p>${E(example.result)}</p></div>${example.code?`<div class="study-code-heading"><span>${E(example.codeLanguage||'Teaching example')}</span><button class="study-copy-code" type="button">Copy sample</button></div><pre class="study-code" tabindex="0"><code>${E(example.code)}</code></pre><p class="study-small">A small learning example. Review the linked documentation before adapting it to a real application.</p>`:''}`);
    html+=section('advanced','07','Build toward advanced use',`${figure(t,'advanced')}<div class="study-card-stack">${lesson.advanced.map(x=>`<div class="study-card"><h3>${E(x.title)}</h3><p>${E(x.detail)}</p></div>`).join('')}</div>`);
    html+=section('pitfalls','08','Common mistakes and better choices',`${figure(t,'pitfalls')}${lesson.pitfalls.map(x=>`<div class="study-mistake"><h3>${E(x.mistake)}</h3><p><b>Better approach:</b> ${E(x.better)}</p></div>`).join('')}`);
    const practiceDiagram={title:`Practice ${t.name}`,nodes:['Recall the idea','Explain the diagram','Apply the example','Check your result'],caption:`Use this learning loop to check your understanding of ${t.name}. Try answering before opening each answer.`};
    html+=section('practice','09','Check your understanding',`${figure(t,'practice',practiceDiagram)}${lesson.selfCheck.map(x=>`<details class="study-question"><summary>${E(x.question)}</summary><p>${E(x.answer)}</p></details>`).join('')}<div class="study-exercise"><h3>Try it yourself</h3><p>Change one assumption in the worked example. Explain what changes in the flow, which trade-off matters, and what you would verify. Then compare your explanation with the notes above.</p></div>`);
    const referenceDiagram={title:'Turn reading into understanding',nodes:['Read a primary source','Rebuild the mental model','Try a small example','Verify assumptions'],caption:'Use official references to confirm version details and deepen the concepts in this lesson.'};
    html+=section('references','10','Keep learning from primary sources',`${figure(t,'references',referenceDiagram)}<ul class="study-references">${lesson.references.map(r=>`<li><a href="${E(r.url)}" target="_blank" rel="noopener noreferrer">${E(r.title)} ↗</a></li>`).join('')}</ul><div class="study-context"><h3>Where this fits in my background</h3><p>${E(t.resumeContext)}</p><a href="experience.html">Read my career experience ↗</a></div>`);
    if(index>=0){
      html+=`<nav class="study-next" aria-label="AI learning path navigation">${index?`<a href="${link(sequence[index-1])}"><small>Previous step</small><strong>${E(get(sequence[index-1])?.name||sequence[index-1])}</strong></a>`:'<span></span>'}${index<sequence.length-1?`<a href="${link(sequence[index+1])}"><small>Next step</small><strong>${E(get(sequence[index+1])?.name||sequence[index+1])} →</strong></a>`:'<a href="ai.html"><small>Path complete</small><strong>Review your AI learning path →</strong></a>'}</nav>`;
    }
    return html+`</article></div></div>`;
  }
  function renderAIPath(catalog){
    const curriculum=window.STUDY_DATA.curriculum,sequence=curriculum.sequence,done=completed();
    const get=id=>catalog.find(t=>t.id===id),count=sequence.filter(id=>done.has(id)).length;
    const stages=['Foundations','Guided generation','Retrieval','Agents','Evaluation & production'];
    const stageFor=id=>curriculum.topics.find(t=>t.id===id)?.stage||'Agents';
    const roadmap={id:'ai-roadmap',name:'AI learning path',lesson:{}};
    const diagram={title:'From foundations to production',nodes:stages,caption:'Build foundations first, then learn controlled generation, retrieval, agents, and reliable delivery. Revisit safety and evaluation throughout.'};
    let html=`<section class="page-intro study-intro"><div class="container"><div class="eyebrow">Study library / AI learning path</div><h1>Learn AI.<br><em>Build your understanding.</em></h1><p>A ${sequence.length}-step sequence from the basics to LLMs, RAG, vector databases, agents, LangChain, and LangGraph. Every topic has explanations, visual diagrams, comparisons, and a worked example.</p><div class="buttons"><a class="button" href="${link(sequence[0])}">Start with AI foundations →</a><a class="button secondary" href="technologies.html?category=AI%20%26%20agents">Browse AI topics</a></div><p class="study-small">This path is learning material. My professional experience is described in the career section.</p></div></section><div class="container page-content"><div class="study-path-progress"><div><h2>Your reading progress</h2><p id="ai-study-progress-text">${count} of ${sequence.length} steps marked studied in this browser</p></div><progress id="ai-study-progress" max="${sequence.length}" value="${count}" aria-label="AI topics studied">${count} of ${sequence.length}</progress></div>${figure(roadmap,'roadmap',diagram)}<p class="study-path-tip">Start in order. If a lesson names a prerequisite, use its link to fill that gap. Use Mark studied on a lesson to save your progress locally.</p>`;
    for(const stage of stages){
      const ids=sequence.filter(id=>stageFor(id)===stage);
      html+=`<section class="study-path-stage"><div class="eyebrow">${stages.indexOf(stage)+1} / Learning stage</div><h2>${E(stage)}</h2><div class="study-path-grid">${ids.map(id=>{const t=get(id),n=sequence.indexOf(id)+1,l=window.STUDY_DATA.lessons[id];return `<article class="study-path-card" data-path-topic="${E(id)}" data-path-level="${E(l.level)}"><div class="study-path-card-top"><span>STEP ${String(n).padStart(2,'0')}</span>${done.has(id)?'<span class="study-done" data-path-status>Studied ✓</span>':`<span data-path-status>${E(l.level)}</span>`}</div><h3><a href="${link(id)}">${E(t.name)}</a></h3><p>${E(t.summary)}</p><a class="text-link" href="${link(id)}">Open lesson →</a></article>`;}).join('')}</div></section>`;
    }
    return html+`<div class="study-context"><h2>Keep the distinction clear</h2><p>RAG retrieves supporting material. An agent selects actions using tools. A workflow follows a designed sequence. A graph can support fixed and model-directed paths. These ideas work together, but they solve different problems.</p><a href="technologies.html">Explore the full technology library ↗</a></div></div>`;
  }
  function bind(){
    const syncPathProgress=()=>{
      const progress=document.querySelector('#ai-study-progress');if(!progress)return;
      const ids=completed(),sequence=window.STUDY_DATA.curriculum.sequence,count=sequence.filter(id=>ids.has(id)).length;
      progress.value=count;document.querySelector('#ai-study-progress-text').textContent=`${count} of ${sequence.length} steps marked studied in this browser`;
      document.querySelectorAll('[data-path-topic]').forEach(card=>{const yes=ids.has(card.dataset.pathTopic),status=card.querySelector('[data-path-status]');status.textContent=yes?'Studied ✓':card.dataset.pathLevel;status.classList.toggle('study-done',yes);});
    };
    window.addEventListener('pageshow',syncPathProgress);window.addEventListener('storage',syncPathProgress);
    const complete=document.querySelector('#study-complete');
    complete?.addEventListener('click',()=>{
      const ids=completed(),id=complete.dataset.studyId;if(ids.has(id))ids.delete(id);else ids.add(id);
      try{localStorage.setItem(progressKey,JSON.stringify([...ids]));const yes=ids.has(id);complete.setAttribute('aria-pressed',String(yes));complete.textContent=yes?'Studied ✓':'Mark studied';document.querySelector('#study-progress-status').textContent=yes?'Marked studied. Saved only in this browser.':'Study mark removed in this browser.';}
      catch{document.querySelector('#study-progress-status').textContent='This browser could not save progress. You can still read every lesson.';}
    });
    document.querySelectorAll('.study-copy-code').forEach(button=>button.addEventListener('click',async()=>{
      const code=button.parentElement.nextElementSibling.textContent;
      try{await navigator.clipboard.writeText(code);button.textContent='Copied ✓';}catch{button.textContent='Select the sample to copy';}
    }));
    document.querySelectorAll('.study-image-download').forEach(button=>button.addEventListener('click',()=>{
      const figure=button.closest('figure'),source=figure.querySelector(window.innerWidth<650?'.study-svg-tall':'.study-svg-wide');
      const copy=source.cloneNode(true);copy.removeAttribute('class');copy.setAttribute('width',copy.viewBox.baseVal.width);copy.setAttribute('height',copy.viewBox.baseVal.height);
      const style=document.createElementNS('http://www.w3.org/2000/svg','style');
      style.textContent='.sd-canvas{fill:#101d28}.sd-box{fill:#1c3038;stroke:#426557;stroke-width:1.5}.sd-accent{fill:#b5efd0;stroke:#b5efd0}.sd-label{fill:#e6f2eb;font:15px Segoe UI,Arial,sans-serif}.sd-accent+.sd-label{fill:#153a2a;font-weight:600}.sd-line{fill:none;stroke:#8bd6b3;stroke-width:2}.sd-step{fill:#8bd6b3;font:11px Segoe UI,Arial,sans-serif}.sd-panel{fill:#172a33;stroke:#426557}.sd-heading{fill:#b5efd0;font:bold 16px Segoe UI,Arial,sans-serif}.sd-detail{fill:#e6f2eb;font:14px Segoe UI,Arial,sans-serif}';copy.insertBefore(style,copy.firstChild);
      const blob=new Blob([new XMLSerializer().serializeToString(copy)],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),a=document.createElement('a');
      a.href=url;a.download=(complete?.dataset.studyId||'ai-path')+'-'+figure.dataset.studyDiagram+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    }));
    const details=[...document.querySelectorAll('.study-question')];let before;
    window.addEventListener('beforeprint',()=>{before=details.map(d=>d.open);details.forEach(d=>d.open=true);});
    window.addEventListener('afterprint',()=>{if(before)details.forEach((d,i)=>d.open=before[i]);});
  }
  window.StudyLibrary={renderLesson,renderAIPath,bind};
})();
