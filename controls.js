/* Shared capsule controls; geometry follows the actual translated button widths. */
(() => {
  const selector = '.segmented, .stage-tabs, .demo-taskbar, .space-switch';
  const registered = new WeakSet(), pending = new Map();
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function position(group) {
    const active = group.querySelector('button[aria-selected="true"], button[aria-pressed="true"]');
    if (!active) return;
    group.style.setProperty('--pill-x', `${active.offsetLeft}px`);
    group.style.setProperty('--pill-y', `${active.offsetTop}px`);
    group.style.setProperty('--pill-w', `${active.offsetWidth}px`);
    group.style.setProperty('--pill-h', `${active.offsetHeight}px`);
    requestAnimationFrame(() => group.classList.add('pill-ready'));
  }
  function setup() {
    document.querySelectorAll(selector).forEach(group => {
      if (!registered.has(group)) {
        registered.add(group);
        new MutationObserver(() => position(group)).observe(group, {subtree:true, childList:true, attributes:true, attributeFilter:['aria-pressed','aria-selected']});
        new ResizeObserver(() => position(group)).observe(group);
      }
      position(group);
    });
  }
  function cancel(key) {
    const prior = pending.get(key);
    if (prior) { prior.cancelled = true; prior.animations.forEach(a => a.cancel()); pending.delete(key); }
  }
  async function transition(key, selectors, update) {
    cancel(key);
    if (reduced()) { update(); setup(); return; }
    const state = {cancelled:false, animations:[]}; pending.set(key, state);
    const nodes = () => selectors.flatMap(s => [...document.querySelectorAll(s)]);
    const animate = (frames, duration) => {
      state.animations = nodes().map(el => el.animate(frames, {duration, easing:'ease', fill:'both'}));
      return Promise.all(state.animations.map(a => a.finished.catch(() => {})));
    };
    await animate([{opacity:1},{opacity:0}], 110);
    if (state.cancelled) return;
    update(); setup();
    state.animations.forEach(a => a.cancel());
    await animate([{opacity:0},{opacity:1}], 220);
    if (state.cancelled) return;
    state.animations.forEach(a => a.cancel()); pending.delete(key);
  }
  function html(el, value) {
    if (el.innerHTML === value) return;
    if (!el.hasChildNodes()) { el.innerHTML = value; return; }
    transition(el.id, [`#${el.id}`], () => { el.innerHTML = value; });
  }
  window.arpgControls = {setup, transition, html};
  document.addEventListener('DOMContentLoaded', setup);
  document.addEventListener('arpg:render', setup);
  document.addEventListener('arpg:before-render', () => [...pending.keys()].forEach(cancel));
  document.fonts.ready.then(setup);
})();
