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

  document.querySelectorAll('.trust-item').forEach((el, i) => {
    if (el.querySelector('.trust-item__icon--gif')) return; // skip GIF item — transform pauses animation
    el.setAttribute('data-reveal', '');
    el.setAttribute('data-reveal-delay', String((i % 4) + 1));
  });
  addReveal('.service-item', false);
  addReveal('.ipad-service', true);
  addReveal('.testimonial-card', true);
  addReveal('.section__head', false);
  addReveal('.about-layout__img', false);
  // .ipad-layout__phone skipped — contains 3D phone, transform would conflict

  // Re-init observer for dynamically attributed elements
  document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

  // ---------- 3D TIMER SCROLL ROTATION ----------
  const timer3d = document.getElementById('timer-3d');
  const repairSection = document.getElementById('rapido');

  if (timer3d && repairSection) {
    window.addEventListener('scroll', () => {
      const rect = repairSection.getBoundingClientRect();
      const sectionH = repairSection.offsetHeight;
      const progress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight * 0.5) / (sectionH + window.innerHeight * 0.5)));
      timer3d.style.transform = `rotateY(${progress * 360}deg)`;
    }, { passive: true });
  }

  // ---------- 3D PHONE SCROLL ROTATION ----------
  const phone3d = document.getElementById('phone-3d');
  const phoneSection = document.getElementById('servicos');

  if (phone3d && phoneSection) {
    window.addEventListener('scroll', () => {
      const rect = phoneSection.getBoundingClientRect();
      const sectionH = phoneSection.offsetHeight;
      const progress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight * 0.5) / (sectionH + window.innerHeight * 0.5)));
      phone3d.style.transform = `rotateY(${progress * 360}deg)`;
    }, { passive: true });
  }

  // ---------- MOTO RIDER SCROLL ----------
  const motoRider = document.getElementById('moto-rider');
  const motoSection = document.getElementById('ipad');

  if (motoRider && motoSection) {
    window.addEventListener('scroll', () => {
      const rect = motoSection.getBoundingClientRect();
      const sectionH = motoSection.offsetHeight;
      const progress = Math.max(0, Math.min(1, (-rect.top + window.innerHeight) / (sectionH + window.innerHeight)));
      const totalDistance = window.innerWidth + 160;
      motoRider.style.transform = `translateX(${-160 + progress * totalDistance}px)`;
    }, { passive: true });
  }

  // ---------- HERO NEON TYPING EFFECT ----------
  const neonSequence = [
    { el: document.getElementById('neon-brand'), text: 'Daniel do iPhone', cls: 'hero-neon--brand' },
    { el: document.getElementById('neon-main'),  text: 'Reparamos seu celular\nem apenas 20 minutos!', cls: 'hero-neon--main' },
    { el: document.getElementById('neon-sub'),   text: 'Com garantia de 1 ano!', cls: 'hero-neon--sub' },
  ];

  const typeText = (el, text, speed, onDone) => {
    let i = 0;
    el.classList.add('hero-neon--typing');
    const tick = () => {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else {
        el.classList.remove('hero-neon--typing');
        if (onDone) setTimeout(onDone, 400);
      }
    };
    tick();
  };

  const runSequence = (index) => {
    if (index >= neonSequence.length) return;
    const { el, text, cls } = neonSequence[index];
    if (!el) return;
    el.classList.add(cls);
    typeText(el, text, 20, () => runSequence(index + 1));
  };

  runSequence(0);

  // ---------- IMG PLACEHOLDER FALLBACK ----------
  // If images are missing, add placeholder class to containers
  document.querySelectorAll('.services-center-img img, .ipad-layout__img img, .about-layout__img img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      img.parentElement.classList.add('img-placeholder');
    });
  });

});
