/* Scroll scenes derive their state from current geometry, in either language. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 760px) and (min-height: 700px)');
  const story = document.querySelector('.method-story');
  const sticky = document.querySelector('.method-sticky');
  const space = document.querySelector('.space-scroll-story');
  const studio = document.querySelector('.space-studio');
  const clamp = p => Math.max(0, Math.min(1, p));
  const smooth = p => { p=clamp(p); return p*p*(3-2*p); };
  let enabled=false, queued=false, savedScene=null;
  // Entrances have their own lifetime: refreshing scroll geometry must never
  // hide a heading that the reader has already seen.
  let entranceObserver;
  function entrances() {
    const headings = document.querySelectorAll('.section-intro, .learning-route, .research-takeaway');
    document.querySelectorAll('.text-reveal').forEach(el => el.classList.add('is-visible'));
    if (reduce.matches || !('IntersectionObserver' in window)) {
      entranceObserver?.disconnect();
      headings.forEach(el => el.classList.add('intro-revealed'));
      document.documentElement.classList.remove('intro-motion');
      return;
    }
    document.documentElement.classList.add('intro-motion');
    document.documentElement.dataset.introReady = 'true';
    if (!entranceObserver) entranceObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('intro-revealed');
        entranceObserver.unobserve(entry.target);
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0});
    headings.forEach(el => {
      if (el.classList.contains('intro-revealed')) return;
      if (el.getBoundingClientRect().bottom < 0) el.classList.add('intro-revealed');
      else entranceObserver.observe(el);
    });
  }

  function progress(container, panel) {
    return clamp((80-container.getBoundingClientRect().top)/Math.max(1,container.offsetHeight-panel.offsetHeight));
  }
  function measure() {
    if (!enabled) return;
    story.style.setProperty('--sticky-height',`${sticky.offsetHeight}px`);
    space.style.setProperty('--space-height',`${studio.offsetHeight}px`);
  }
  function paint() {
    queued=false;
    if (!enabled) return;
    const p=progress(story,sticky);
    story.style.setProperty('--decoder-reveal',smooth((p-.28)/.16));
    story.style.setProperty('--generator-reveal',smooth((p-.60)/.18));
    story.style.setProperty('--story-scale',.98+.02*clamp(p/.15));
    story.style.setProperty('--story-progress',`${p*100}%`);
    const next=p<.32?0:p<.65?1:2;
    if(stage!==next) focusFigureStage(next,true);
    window.arpgSpace?.seek(progress(space,studio));
  }
  function schedule() {
    if(!queued){queued=true;requestAnimationFrame(paint);}
  }
  function seek(container,panel,p) {
    if(!enabled)return;
    window.scrollTo({top:scrollY+container.getBoundingClientRect().top-80+clamp(p)*(container.offsetHeight-panel.offsetHeight),behavior:'instant'});
    paint();
  }
  function configure() {
    enabled=desktop.matches&&!reduce.matches;
    story.classList.toggle('scroll-enabled',enabled);
    space.classList.toggle('space-scroll-enabled',enabled);
    window.arpgSpace?.setScrollMode(enabled);
    const zh=document.documentElement.lang.startsWith('zh');
    studio.querySelector('.space-footnote').textContent=enabled
      ? (zh?'向下滚动，逐步观看 · 也可点击阶段或拖动进度':'Scroll to explore · or select a chapter and scrub')
      : (zh?'几何类比 · 26 秒概念演示':'Conceptual visualization · 26 seconds');
    entrances();
    measure();paint();
  }
  document.addEventListener('arpg:before-render',()=>{
    savedScene=null;
    if(!enabled)return;
    for(const [container,panel] of [[story,sticky],[space,studio]]){
      const rect=container.getBoundingClientRect();
      if(rect.top<=80 && rect.bottom>=80+panel.offsetHeight){
        savedScene={container,panel,p:progress(container,panel)};break;
      }
    }
  });
  document.addEventListener('arpg:render',()=>{
    entrances();
    requestAnimationFrame(()=>{
      measure();
      if(savedScene){const {container,panel,p}=savedScene;seek(container,panel,p);savedScene=null;}
      else paint();
    });
  });
  document.addEventListener('arpg:stage',e=>seek(story,sticky,[.1,.5,.9][e.detail]));
  document.addEventListener('arpg:space-seek',e=>seek(space,studio,e.detail));
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',()=>{measure();schedule();});
  reduce.addEventListener('change',configure);
  desktop.addEventListener('change',configure);
  if('ResizeObserver' in window){
    const observer=new ResizeObserver(()=>{measure();schedule();});
    [sticky,studio,document.querySelector('#real-cards')].forEach(el=>observer.observe(el));
  }
  addEventListener('load',()=>{measure();schedule();});
  document.fonts?.ready.then(()=>{measure();schedule();});
  configure();
})();
