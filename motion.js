/* Scroll is the timeline; no wheel interception and no autoplay timer. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 900px) and (min-height: 700px)');
  const story = document.querySelector('.method-story');
  const sticky = document.querySelector('.method-sticky');
  const clamp = n => Math.max(0, Math.min(1, n));
  let enabled = false, queued = false, manual = false;

  const reveal = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, {rootMargin: '0px 0px -7% 0px'}) : null;

  function prepareText() {
    document.querySelectorAll('.hero h1, .hero-actions, .hero-meta, .section-intro, .inference-strip').forEach(el => {
      if (el.classList.contains('text-reveal')) return;
      el.classList.add('text-reveal');
      if (reduce.matches || !reveal || el.getBoundingClientRect().bottom < 0) el.classList.add('is-visible');
      else reveal.observe(el);
    });
  }

  function paint() {
    queued = false;
    if (!enabled) return;
    const bounds = story.getBoundingClientRect();
    const travel = story.offsetHeight - sticky.offsetHeight;
    const p = clamp((80 - bounds.top) / Math.max(1, travel));
    const decoder = clamp((p - .27) / .16);
    const generator = clamp((p - .59) / .18);
    story.style.setProperty('--decoder-reveal', decoder);
    story.style.setProperty('--generator-reveal', generator);
    story.style.setProperty('--story-progress', `${p * 100}%`);
    story.style.setProperty('--story-scale', .97 + .03 * clamp(p / .18));
    if (!manual) {
      const next = p < .29 ? 0 : p < .61 ? 1 : 2;
      if (stage !== next) focusFigureStage(next, true);
    }
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(paint); }
  }
  function configure() {
    enabled = desktop.matches && !reduce.matches;
    story.classList.toggle('scroll-enabled', enabled);
    if (enabled) {
      story.style.setProperty('--sticky-height', `${sticky.offsetHeight}px`);
      paint();
    } else {
      ['--decoder-reveal','--generator-reveal','--story-progress','--story-scale'].forEach(key => story.style.removeProperty(key));
    }
    if (reduce.matches) document.querySelectorAll('.text-reveal').forEach(el => el.classList.add('is-visible'));
  }

  // Stage tabs and keyboard navigation also seek the scroll narrative.
  document.addEventListener('arpg:stage', e => {
    if (!enabled) return;
    manual = true;
    const positions = [.05, .46, .84];
    const top = scrollY + story.getBoundingClientRect().top - 80;
    window.scrollTo({top: top + positions[e.detail] * (story.offsetHeight - sticky.offsetHeight), behavior: 'instant'});
    manual = false;
    paint();
  });
  document.addEventListener('arpg:render', () => { prepareText(); configure(); });
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', configure);
  reduce.addEventListener('change', configure);
  desktop.addEventListener('change', configure);
  // Opening training details must extend the sticky panel, not overlap content.
  if ('ResizeObserver' in window) new ResizeObserver(() => {
    if (enabled) story.style.setProperty('--sticky-height', `${sticky.offsetHeight}px`);
  }).observe(sticky);
  prepareText();
  configure();
})();
