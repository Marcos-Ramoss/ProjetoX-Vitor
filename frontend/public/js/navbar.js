document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarHoverTrigger = document.querySelector('.navbar-hover-trigger');
    const mainContent = document.querySelector('main');
    const isHomePage = window.location.pathname === '/';

    function setMainPadding(visible) {
      if (!mainContent) return;
      if (visible) {
        mainContent.classList.add('main-navbar-visible');
      } else {
        mainContent.classList.remove('main-navbar-visible');
      }
    }

    if (isHomePage) {
      let lastScrollTop = 0;
      setMainPadding(true);

      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > navbar.offsetHeight) {
          navbar.classList.add('navbar-hidden');
          setMainPadding(false);
        } else if (currentScroll < lastScrollTop) {
          navbar.classList.remove('navbar-hidden');
          setMainPadding(true);
        }

        lastScrollTop = currentScroll;
      });

      navbar.classList.remove('navbar-hidden');

    } else {
      navbar.classList.add('navbar-hidden');
      setMainPadding(false);

      window.removeEventListener('scroll', function() {});

      navbarHoverTrigger.addEventListener('mouseenter', function() {
        navbar.classList.remove('navbar-hidden');
        setMainPadding(true);
      });

      navbarHoverTrigger.addEventListener('mouseleave', function() {
        navbar.classList.add('navbar-hidden');
        setMainPadding(false);
      });

      navbar.addEventListener('mouseenter', function() {
        navbar.classList.remove('navbar-hidden');
        setMainPadding(true);
      });

      navbar.addEventListener('mouseleave', function() {
        navbar.classList.add('navbar-hidden');
        setMainPadding(false);
      });
    }
  });