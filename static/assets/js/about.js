   // Initialize Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#71ab0c', '#71ab0c', '#FFFFFF'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#FFFFFF', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });

    // Sticky Navbar Effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Navigation Active State
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.about-content h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.info-section', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 0.8 });
    gsap.from('.team-card, .headteacher-card, .achievement-card', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1.2 });

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
