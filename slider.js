(() => {
  'use strict';
  const sources = window.SLIDE_SOURCES || [];
  const stage = document.getElementById('stage');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const replay = document.getElementById('replay');
  const fullscreen = document.getElementById('fullscreen');
  const progress = document.getElementById('progress');
  const announcement = document.getElementById('announcement');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ns = 'http://www.w3.org/2000/svg';
  const totalPages = Math.max(10, sources.length);
  let current = 0;
  let busy = false;
  let animations = [];

  // Wrap original nodes without altering paths, fills, transforms or paint order.
  const slides = sources.map((source, index) => {
    const parsed = new DOMParser().parseFromString(source.svg, 'image/svg+xml');
    if (parsed.querySelector('parsererror')) throw new Error('SVG không hợp lệ: ' + source.title);
    const svg = document.importNode(parsed.documentElement, true);
    const originalNodes = [...svg.children];
    // Shared background treatment for large blue boxes; small icons stay flat.
    if (window.BLUE_BACKGROUND_SVG) {
      [...svg.querySelectorAll('rect[fill="#0076BE"]')].forEach((rect, boxIndex) => {
        const width = Number(rect.getAttribute('width'));
        const height = Number(rect.getAttribute('height'));
        if (width < 200 || height < 100) return;
        const effectSource = window.BLUE_BACKGROUND_SVG.replaceAll('page-02-', `blue-${boxIndex}-`);
        const effect = document.importNode(new DOMParser().parseFromString(effectSource, 'image/svg+xml').documentElement, true);
        for (const key of ['x', 'y', 'width', 'height']) effect.setAttribute(key, rect.getAttribute(key) || '0');
        effect.setAttribute('overflow', 'hidden');
        effect.setAttribute('pointer-events', 'none');
        effect.setAttribute('aria-hidden', 'true');
        if (rect.hasAttribute('rx')) effect.style.borderRadius = rect.getAttribute('rx') + 'px';
        rect.after(effect);
      });
    }
    // Replace only the requested page numbering in the derived DOM.
    if (source.footer) {
      const footer = document.createElementNS(ns, 'text');
      footer.setAttribute('x', '1820');
      footer.setAttribute('y', '1037');
      footer.setAttribute('text-anchor', 'end');
      footer.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
      footer.setAttribute('font-size', '16');
      footer.setAttribute('fill', 'black');
      footer.dataset.pageCounter = '';
      footer.textContent = `${String(index + 1).padStart(2, '0')}/${String(totalPages).padStart(2, '0')}`;
      originalNodes[source.footer.node].replaceWith(footer);
    }
    const motionLayers = (source.motionGroups || []).map((id, order) => ({
      element: svg.querySelector(`[id="${id}"]`), delay: order * (source.motionGroupDelay || 90), y: 14, duration: source.motionGroupDuration || 560
    })).filter(layer => layer.element);
    // Separate SVG exports can reuse definition IDs. Scope references per slide.
    const ids = new Map([...svg.querySelectorAll('[id]')].map(node => [node.id, `s${index}-${node.id}`]));
    for (const node of [svg, ...svg.querySelectorAll('*')]) {
      for (const attr of [...node.attributes]) {
        if (attr.name === 'id') { node.id = ids.get(attr.value); continue; }
        let value = attr.value.replace(/url\(#([^)]*)\)/g, (all, id) => ids.has(id) ? `url(#${ids.get(id)})` : all);
        if ((attr.localName === 'href') && value.startsWith('#') && ids.has(value.slice(1))) value = '#' + ids.get(value.slice(1));
        if (value !== attr.value) node.setAttributeNS(attr.namespaceURI, attr.name, value);
      }
    }
    const layers = [...motionLayers, ...(source.layers || []).map(layer => {
      const node = originalNodes[layer.node];
      if (!node) return null;
      const group = document.createElementNS(ns, 'g');
      group.dataset.layer = layer.name;
      node.replaceWith(group);
      group.append(node);
      return { element: group, ...layer };
    }).filter(Boolean)];
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', source.description || source.title);
    const section = document.createElement('section');
    section.className = 'slide';
    section.dataset.page = String(index + 1).padStart(2, '0');
    section.hidden = index !== 0;
    section.setAttribute('role', 'group');
    section.setAttribute('aria-roledescription', 'slide');
    section.setAttribute('aria-label', `${index + 1} / ${totalPages}: ${source.title}`);
    section.append(svg);
    stage.append(section);
    return { section, layers };
  });
  if (!slides.length) return; // Keep the original image if the asset script is missing.
  stage.querySelector('.fallback').remove();
  document.querySelector('.controls').hidden = false;
  progress.max = totalPages;

  function syncControls() {
    previous.disabled = current === 0 || busy;
    next.disabled = current === slides.length - 1 || busy;
    replay.disabled = busy;
    document.getElementById('counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`;
    progress.value = current + 1;
    announcement.textContent = `Slide ${current + 1} / ${totalPages}: ${sources[current].title}`;
  }
  function stopAnimations() {
    animations.forEach(animation => animation.cancel());
    animations = [];
  }
  async function animateIn(slide) {
    if (reduceMotion.matches) return;
    const layers = slide.layers.length ? slide.layers : [{ element: slide.section, delay: 0, x: 0, y: 12 }];
    animations = layers.map(layer => layer.element.animate([
      { opacity: 0, transform: `translate(${layer.x || 0}px, ${layer.y || 0}px)` },
      { opacity: 1, transform: 'translate(0px, 0px)' }
    ], { duration: layer.duration || 600, delay: layer.delay || 0, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }));
    await Promise.allSettled(animations.map(animation => animation.finished));
    stopAnimations();
  }
  async function goTo(index) {
    if (busy || index === current || index < 0 || index >= slides.length) return;
    busy = true;
    syncControls();
    stopAnimations();
    const outgoing = slides[current];
    if (!reduceMotion.matches) {
      const animation = outgoing.section.animate([{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${index > current ? -16 : 16}px)` }], { duration: 220, easing: 'ease-in', fill: 'both' });
      animations = [animation];
      await Promise.allSettled([animation.finished]);
      stopAnimations();
    }
    outgoing.section.hidden = true;
    current = index;
    slides[current].section.hidden = false;
    syncControls();
    await animateIn(slides[current]);
    busy = false;
    syncControls();
  }
  async function playAgain() {
    if (busy) return;
    busy = true;
    syncControls();
    stopAnimations();
    await animateIn(slides[current]);
    busy = false;
    syncControls();
  }
  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  replay.addEventListener('click', playAgain);
  const presentation = document.getElementById('presentation');
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await presentation.requestFullscreen();
    } catch { announcement.textContent = 'Trình duyệt không hỗ trợ toàn màn hình ở chế độ này.'; }
  }
  fullscreen.hidden = !document.fullscreenEnabled;
  fullscreen.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    fullscreen.setAttribute('aria-label', document.fullscreenElement ? 'Thoát toàn màn hình' : 'Toàn màn hình');
  });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.target.isContentEditable) return;
    const actions = { ArrowLeft: () => goTo(current - 1), ArrowRight: () => goTo(current + 1), Home: () => goTo(0), End: () => goTo(slides.length - 1), r: playAgain, f: toggleFullscreen };
    const action = actions[event.key];
    if (action) { event.preventDefault(); action(); }
  });
  reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stopAnimations(); });
  syncControls();
  playAgain();
})();
