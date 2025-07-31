
    // Initialize Particles.js
    try {
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
      console.log('Particles.js initialized successfully');
    } catch (e) {
      console.error('Error initializing Particles.js:', e);
    }

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

    // Filter Functionality
    const levelFilter = document.getElementById('level-filter');
    const modeFilter = document.getElementById('mode-filter');
    const pswFilter = document.getElementById('psw-filter');
    const courseRows = document.querySelectorAll('.course-table tr');

    function filterCourses() {
      const level = levelFilter.value;
      const mode = modeFilter.value;
      const psw = pswFilter.value;

      courseRows.forEach(row => {
        const cardLevel = row.dataset.level;
        const cardMode = row.dataset.mode;
        const cardPsw = row.dataset.psw;

        const levelMatch = level === 'all' || level === cardLevel;
        const modeMatch = mode === 'all' || mode === cardMode;
        const pswMatch = psw === 'all' || psw === cardPsw;

        if (levelMatch && modeMatch && pswMatch) {
          row.style.display = 'table-row';
          gsap.fromTo(row, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        } else {
          row.style.display = 'none';
        }
      });
    }

    levelFilter.addEventListener('change', filterCourses);
    modeFilter.addEventListener('change', filterCourses);
    pswFilter.addEventListener('change', filterCourses);

    // GSAP Animations with ScrollTrigger
    try {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.courses-content h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
      gsap.from('.info-section', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 0.8 });
      gsap.from('.filter-section .form-select', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1 });
      gsap.from('.course-table tr', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1.2 });
      gsap.from('.chatbot-btn', { opacity: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.5 });
      console.log('GSAP animations initialized');
    } catch (e) {
      console.error('Error initializing GSAP animations:', e);
    }

    // Micro-interactions for buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });

    // Chatbot Logic
    try {
      const chatbotMessages = document.getElementById('chatbotMessages');
      const chatbotInput = document.getElementById('chatbotInput');
      let chatbotState = 'greeting';
      let userData = { name: '', email: '', background: '' };

      console.log('Chatbot initialized');

      // Initialize chatbot with greeting
      addMessage('Hello! I’m here to help you choose the right course. May I have your name, please?');

      function addMessage(message, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isBot ? 'bot' : 'user'}`;
        messageDiv.innerHTML = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        gsap.from(messageDiv, { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' });
      }

      function handleChatbotSubmit() {
        const userInput = chatbotInput.value.trim();
        if (!userInput && chatbotState !== 'background') return;

        if (chatbotState !== 'background') {
          addMessage(userInput, false);
          chatbotInput.value = '';
        }

        switch (chatbotState) {
          case 'greeting':
            addMessage('Hello! I’m here to help you choose the right course. May I have your name, please?');
            chatbotState = 'name';
            break;
          case 'name':
            userData.name = userInput;
            addMessage(`Nice to meet you, ${userData.name}! Could you share your Gmail ID?`);
            chatbotState = 'email';
            break;
          case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)) {
              addMessage('Please enter a valid Gmail ID.');
              return;
            }
            userData.email = userInput;
            addMessage('Thanks! What’s your current educational background? Please select an option:', true);
            addMessage(`
              <select id="backgroundSelect" class="form-control">
                <option value="">Select Background</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 12">Class 12</option>
                <option value="Undergraduate">Undergraduate</option>
              </select>
              <button onclick="handleBackgroundSelect()">Submit</button>
            `, true);
            chatbotState = 'background';
            chatbotInput.style.display = 'none';
            break;
        }
      }

      function handleBackgroundSelect() {
        const backgroundSelect = document.getElementById('backgroundSelect');
        const background = backgroundSelect.value;
        if (!background) {
          addMessage('Please select your educational background.');
          return;
        }
        userData.background = background;
        addMessage(background, false);

        let recommendations = '';
        let nextSteps = '';
        const courses = Array.from(document.querySelectorAll('.course-table tbody tr'));

        if (background === 'Class 10') {
          recommendations = courses
            .filter(row => row.dataset.level === 'A-Level')
            .map(row => {
              const cells = row.querySelectorAll('td');
              return `- **${cells[0].textContent}** (${cells[2].textContent}, ${cells[3].textContent}): ${cells[7].textContent}`;
            })
            .join('<br>');
          nextSteps = 'Based on your Class 10 background, I recommend A-Level courses, equivalent to Class 12 in India. These are available online or face-to-face. You’ll need GCSE or equivalent qualifications with a minimum grade of C/4 in relevant subjects. Submit your application with your Class 10 grades.';
        } else if (background === 'Class 12') {
          recommendations = courses
            .filter(row => row.dataset.level === 'BSc')
            .map(row => {
              const cells = row.querySelectorAll('td');
              return `- **${cells[0].textContent}** (${cells[2].textContent}, ${cells[3].textContent}, PSW: ${cells[5].textContent}): ${cells[7].textContent}`;
            })
            .join('<br>');
          nextSteps = 'With your Class 12 background, I recommend BSc courses (undergraduate level). These are face-to-face and PSW-eligible, requiring a UK student visa. You’ll need A-Level or equivalent qualifications with strong grades and proof of English proficiency (IELTS 6.0 or equivalent). Apply with your Class 12 transcripts.';
        } else if (background === 'Undergraduate') {
          recommendations = courses
            .filter(row => row.dataset.level === 'MSc')
            .map(row => {
              const cells = row.querySelectorAll('td');
              return `- **${cells[0].textContent}** (${cells[2].textContent}, ${cells[3].textContent}, PSW: ${cells[5].textContent}): ${cells[7].textContent}`;
            })
            .join('<br>');
          nextSteps = 'With your undergraduate background, I recommend MSc courses (postgraduate level). These are face-to-face and PSW-eligible, requiring a UK student visa. You’ll need a bachelor’s degree with strong grades and proof of English proficiency (IELTS 6.5 or equivalent). Apply with your academic transcripts.';
        }

        addMessage(`Based on your background (${background}), here are suitable courses for the next level:<br>${recommendations}`);
        addMessage(`Next Steps: ${nextSteps}`);
        addMessage('Would you like to know more about any specific course or the application process? Just type your question!');
        chatbotState = 'followup';
        chatbotInput.style.display = 'block';
      }

      // Handle Enter key for chatbot input
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatbotSubmit();
      });

      // Show Help Popup and Chatbot Button on Page Load (once per session)
      window.addEventListener('load', () => {
        if (!sessionStorage.getItem('helpPopupShown')) {
          setTimeout(() => {
            const helpPopup = document.getElementById('helpPopup');
            const chatbotBtn = document.querySelector('.chatbot-btn');
            if (helpPopup && chatbotBtn) {
              helpPopup.style.display = 'block';
              chatbotBtn.style.display = 'flex';
              gsap.from('#helpPopup', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });
              gsap.from('.chatbot-btn', { opacity: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
              console.log('Help popup and chatbot button displayed');
              sessionStorage.setItem('helpPopupShown', 'true');
            }
          }, 1000); // 1-second delay
        }
      });

      // Remove Help Popup and Optionally Chatbot Button
      function removeHelpPopup(removeChatbot = false) {
        const helpPopup = document.getElementById('helpPopup');
        const chatbotBtn = document.querySelector('.chatbot-btn');
        if (helpPopup) {
          helpPopup.remove();
          console.log('Help popup removed from DOM');
        }
        if (removeChatbot && chatbotBtn) {
          chatbotBtn.remove();
          console.log('Chatbot button removed from DOM');
        }
      }

    } catch (e) {
      console.error('Error in chatbot logic:', e);
    }