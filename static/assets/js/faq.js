    
    // GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.faq-container h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.4 });
    gsap.from('.faq-container', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.6 });

    // Animate FAQ items
    gsap.utils.toArray('.faq-item').forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        },
        delay: index * 0.2
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