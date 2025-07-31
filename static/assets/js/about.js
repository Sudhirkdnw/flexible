    
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
