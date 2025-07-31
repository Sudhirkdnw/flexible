
    // Form Toggle Functionality
    document.querySelectorAll('.nav-link[data-form], .form-toggle').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const formType = e.currentTarget.getAttribute('data-form');
        const signinForm = document.getElementById('signin-form');
        const signupForm = document.getElementById('signup-form');
        const signinLink = document.querySelector('.nav-link[data-form="signin"]');
        const signupLink = document.querySelector('.nav-link[data-form="signup"]');

        if (formType === 'signin') {
          signinForm.classList.remove('d-none');
          signupForm.classList.add('d-none');
          signinLink.classList.add('active');
          signupLink.classList.remove('active');
          gsap.fromTo(signinForm, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        } else if (formType === 'signup') {
          signinForm.classList.add('d-none');
          signupForm.classList.remove('d-none');
          signinLink.classList.remove('active');
          signupLink.classList.add('active');
          gsap.fromTo(signupForm, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        }
      });
    });

    // GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.auth-content h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.auth-form .form-control', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1 });
    gsap.from('.auth-form .btn-primary', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', delay: 1.5 });
    gsap.from('.auth-form .form-check, .auth-form a', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1.8 });

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

