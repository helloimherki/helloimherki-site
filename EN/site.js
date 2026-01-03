(function(){
  const header = document.getElementById('site-header');
  const btn = header?.querySelector('.hamburger');
  const nav = header?.querySelector('#site-nav');
  if(!header || !btn || !nav) return;

  const setExpanded = (open) => btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  setExpanded(false);

  const openMenu = () => {
    header.classList.add('is-open');
    setExpanded(true);

    // mobilon ne scrollozzon a háttér
    if(window.innerWidth <= 768) document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    header.classList.remove('is-open');
    header.classList.remove('is-hidden');
    setExpanded(false);

    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => header.classList.contains('is-open') ? closeMenu() : openMenu();

  // Hamburger click
  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    toggleMenu();
  });

  // Link click -> close
  nav.addEventListener('click', (e)=>{
    if(e.target.closest('a')) closeMenu();
  });

  // ESC -> close
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeMenu();
  });

  // Click outside -> close (only if open)
  document.addEventListener('click', (e)=>{
    if(!header.classList.contains('is-open')) return;
    if(!header.contains(e.target)) closeMenu();
  });

  // Resize -> close on desktop
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 768) closeMenu();
  });

  // Active nav automatikus (ne kelljen HTML-ben kézzel "active")
  (function setActiveNav(){
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const links = nav.querySelectorAll('a[href]');
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      const isActive = href === path || (path === '' && href === 'index.html');
      a.classList.toggle('active', isActive);
      if(isActive) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  })();

  // Scroll hide/show (disabled while menu open)
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    if(header.classList.contains('is-open')) return;

    // “scrolled” állapot (vizuális finomítás)
    header.classList.toggle('is-scrolled', window.scrollY > 10);

    // Always show at the very top
    if(window.scrollY < 10){
      header.classList.remove('is-hidden');
      lastY = window.scrollY;
      return;
    }

    const y = window.scrollY;
    if(Math.abs(y - lastY) < 8) return;

    if(y > lastY && y > 80) header.classList.add('is-hidden');
    else header.classList.remove('is-hidden');

    lastY = y;
  }, { passive:true });

})();
