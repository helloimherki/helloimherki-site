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
    if(window.innerWidth <= 768) document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    header.classList.remove('is-open');
    header.classList.remove('is-hidden');
    setExpanded(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = () => header.classList.contains('is-open') ? closeMenu() : openMenu();

  btn.addEventListener('click', (e)=>{
    e.preventDefault();
    toggleMenu();
  });

  nav.addEventListener('click', (e)=>{
    if(e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e)=>{
    if(!header.classList.contains('is-open')) return;
    if(!header.contains(e.target)) closeMenu();
  });

  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 768) closeMenu();
  });

  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    if(header.classList.contains('is-open')) return;

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