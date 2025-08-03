 // Initialize Particles.js
    particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ['#71ab0c', '#71ab0c', '#FFFFFF'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 150, color: '#FFFFFF', opacity: 0.4, width: 1.5 },
        move: { enable: true, speed: 3, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 120, duration: 0.4 }, push: { particles_nb: 4 } }
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

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('#sidebarToggle');
    const body = document.body;
    const footer = document.querySelector('footer');

    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('minimized');
      body.classList.toggle('sidebar-minimized');
      footer.classList.toggle('sidebar-minimized');
      const icon = sidebarToggle.querySelector('i');
      icon.classList.toggle('fa-arrow-left');
      icon.classList.toggle('fa-arrow-right');
    });

    // Navigation Active State
    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // CV Submission Handling
    document.addEventListener('DOMContentLoaded', function() {
      const careerForm = document.querySelector('.career-form');
      careerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('applicantName').value;
        const email = document.getElementById('applicantEmail').value;
        const position = document.getElementById('position').value;
        const cvFile = document.getElementById('cvUpload').files[0];
        const coverLetter = document.getElementById('coverLetter').value;

        if (name && email && position && cvFile) {
          const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
          const application = {
            name,
            email,
            position,
            coverLetter,
            cvFileName: cvFile.name,
            date: new Date().toISOString()
          };
          applications.push(application);
          localStorage.setItem('jobApplications', JSON.stringify(applications));
          careerForm.reset();
          alert('Application submitted successfully! Our team will review your CV soon.');
        } else {
          alert('Please fill in all required fields.');
        }
      });
    });

    // Chatbot Handling
    document.addEventListener('DOMContentLoaded', function() {
      const chatbotMessages = document.getElementById('chatbotMessages');
      const chatbotInput = document.getElementById('chatbotInput');
      const chatbotSubmit = document.getElementById('chatbotSubmit');

      const responses = [
        "Wow, that's a lucky number! Pick another one between 1 and 100!",
        "Cool choice! That number has good vibes. Try another?",
        "Nice pick! Let's see another random number between 1 and 100!",
        "Great number! Want to share another one for fun?"
      ];

      chatbotSubmit.addEventListener('click', function() {
        const userInput = chatbotInput.value.trim();
        if (userInput && !isNaN(userInput) && userInput >= 1 && userInput <= 100) {
          // Add user message
          const userMessage = document.createElement('div');
          userMessage.className = 'chatbot-message user';
          userMessage.textContent = userInput;
          chatbotMessages.appendChild(userMessage);

          // Add bot response with delay for typing effect
          setTimeout(() => {
            const botResponse = document.createElement('div');
            botResponse.className = 'chatbot-message bot';
            botResponse.textContent = responses[Math.floor(Math.random() * responses.length)];
            chatbotMessages.appendChild(botResponse);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
          }, 1000);

          // Clear input
          chatbotInput.value = '';
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        } else {
          const errorMessage = document.createElement('div');
          errorMessage.className = 'chatbot-message bot';
          errorMessage.textContent = 'Please enter a valid number between 1 and 100!';
          chatbotMessages.appendChild(errorMessage);
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
      });

      // Allow Enter key to submit
      chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          chatbotSubmit.click();
        }
      });
    });

    // GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.sidebar-content h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.sidebar-content a', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1 });
    gsap.from('.hero-section h1', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.hero-section p', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.7 });
    gsap.from('.hero-section .btn-primary', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', delay: 0.9 });
    gsap.from('.open-positions .career-card', { opacity: 0, y: 50, duration: 1, stagger: 0.3, scrollTrigger: { trigger: '.open-positions', start: 'top 80%' } });
    gsap.from('.open-positions .career-card img', { opacity: 0, scale: 0.9, duration: 1, stagger: 0.3, scrollTrigger: { trigger: '.open-positions', start: 'top 80%' } });
    gsap.from('.cv-submission .career-card', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.cv-submission', start: 'top 80%' } });
    gsap.from('.career-form .form-control', { opacity: 0, x: -20, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.cv-submission', start: 'top 80%' } });
    gsap.from('.career-form .btn-primary', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', scrollTrigger: { trigger: '.cv-submission', start: 'top 80%' } });
    gsap.from('.testimonial-section .testimonial-card', { opacity: 0, y: 50, duration: 1, stagger: 0.3, scrollTrigger: { trigger: '.testimonial-section', start: 'top 80%' } });
    gsap.from('.chatbot-container', { opacity: 0, y: 50, duration: 1, ease: 'power3.out', delay: 1 });
    gsap.from('.chatbot-messages', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 1.2 });
    gsap.from('.chatbot-input', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 1.4 });

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
