   // Initialize Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#00CC66', '#33FF99', '#FFFFFF'] },
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
    gsap.from('.carousel-caption h1', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.carousel-caption p', { opacity: 0, y: 30, duration: 1.5, ease: 'power3.out', delay: 1 });
    gsap.from('.carousel-caption .btn', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', delay: 1.5 });

    gsap.utils.toArray('.features, .courses, .about, .contact').forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate feature cards
    gsap.utils.toArray('.feature-card').forEach(card => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate course cards
    gsap.utils.toArray('.course-card').forEach(card => {
      gsap.from(card, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate comparison button
    gsap.from('.compare-btn', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.compare-btn',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });

    // Toggle FAQ function
    function toggleFaq() {
      const faqContainer = document.getElementById('faq');
      const isVisible = faqContainer.style.display === 'block';
      if (isVisible) {
        gsap.to(faqContainer, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            faqContainer.style.display = 'none';
          }
        });
      } else {
        faqContainer.style.display = 'block';
        gsap.fromTo(faqContainer, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
        // Scroll to FAQ section
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Toggle comparison table function
    function toggleComparisonTable() {
      const tableContainer = document.getElementById('comparison-table');
      const isVisible = tableContainer.style.display === 'block';
      if (isVisible) {
        gsap.to(tableContainer, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: 'power3.in',
          onComplete: () => {
            tableContainer.style.display = 'none';
          }
        });
      } else {
        tableContainer.style.display = 'block';
        gsap.fromTo(tableContainer, {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      }
    }

    // Show home section by default
    document.getElementById('home').style.display = 'block';
    gsap.to('#home', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

    // Parallax Effect for Hero Images
    document.querySelectorAll('.carousel-item img').forEach(img => {
      img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(img, { x: x * 30, y: y * 30, scale: 1.1, duration: 0.5, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
      });
    });

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    // Animate testimonial carousel
    gsap.from('.testimonial-card', {
      opacity: 0,
      x: 100,
      volume: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.testimonial-carousel',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });


