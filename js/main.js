// ============================================================
// DANIEL DO IPHONE – MAIN JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HAMBURGER MENU ----------
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });

    // Close on nav link click
    navMobile.querySelectorAll('.nav__link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
      });
    });
  }

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- ACTIVE NAV LINK ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav .nav__link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- HERO SWIPER ----------
  const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.hero-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.hero-prev',
      nextEl: '.hero-next',
    },
    keyboard: { enabled: true },
  });

  // ---------- SCROLL REVEAL ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ---------- ADD REVEAL ATTRS TO ELEMENTS ----------
  const addReveal = (selector, delay = false) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      if (delay) el.setAttribute('data-reveal-delay', String((i % 4) + 1));
    });
  };

  addReveal('.trust-item', true);
  addReveal('.service-item', false);
  addReveal('.ipad-service', true);
  addReveal('.testimonial-card', true);
  addReveal('.section__head', false);
  addReveal('.about-layout__img', false);
  addReveal('.ipad-layout__img', false);

  // Re-init observer for dynamically attributed elements
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ---------- IMG PLACEHOLDER FALLBACK ----------
  // If images are missing, add placeholder class to containers
  document.querySelectorAll('.services-center-img img, .ipad-layout__img img, .about-layout__img img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement.classList.add('img-placeholder');
    });
  });

});
