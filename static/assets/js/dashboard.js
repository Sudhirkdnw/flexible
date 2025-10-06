
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

    // Course Management
    document.addEventListener('DOMContentLoaded', function() {
      const courseList = document.getElementById('courseList');

      // Load assigned courses from localStorage
      function loadAssignedCourses() {
        const assignedCourses = JSON.parse(localStorage.getItem('assignedCourses')) || [
          { name: 'GCSE Maths', status: 'Active', students: 25 },
          { name: 'BSc Business', status: 'Active', students: 30 }
        ];
        courseList.innerHTML = '<h3>Assigned Courses</h3>';
        assignedCourses.forEach(course => {
          const courseDiv = document.createElement('div');
          courseDiv.className = 'course-item';
          courseDiv.innerHTML = `
            <h4>${course.name}</h4>
            <p>Status: ${course.status} | Students: ${course.students}</p>
          `;
          courseList.appendChild(courseDiv);
        });
      }

      // Initial load of assigned courses
      loadAssignedCourses();

  

      // Open Courses Modal
      const openCoursesList = document.getElementById('openCoursesList');
      function loadCoursesForModal() {
        const assignedCourses = JSON.parse(localStorage.getItem('assignedCourses')) || [
          { name: 'GCSE Maths', status: 'Active', students: 25 },
          { name: 'BSc Business', status: 'Active', students: 30 }
        ];
        openCoursesList.innerHTML = '';
        if (assignedCourses.length === 0) {
          openCoursesList.innerHTML = '<p>No courses assigned.</p>';
        } else {
          assignedCourses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.className = 'course-item';
            courseDiv.innerHTML = `
              <h4>${course.name}</h4>
              <a href="course.html?course=${encodeURIComponent(course.name)}" class="btn btn-primary" aria-label="Open ${course.name} Course">Open</a>
            `;
            openCoursesList.appendChild(courseDiv);
          });
        }
      }

      // Load courses when modal is opened
      document.getElementById('openCoursesBtn').addEventListener('click', loadCoursesForModal);
    });

    // Grade Submissions Toggle
    document.getElementById('gradeSubmissionsBtn').addEventListener('click', function() {
      const gradeSubmissionsList = document.getElementById('gradeSubmissionsList');
      if (gradeSubmissionsList.style.display === 'none' || gradeSubmissionsList.style.display === '') {
        gradeSubmissionsList.style.display = 'block';
        this.textContent = 'Hide Grade Submissions';
      } else {
        gradeSubmissionsList.style.display = 'none';
        this.textContent = 'Grade Submissions';
      }
    });

    // Schedule Toggle
    document.getElementById('scheduleBtn').addEventListener('click', function() {
      const scheduleList = document.getElementById('scheduleList');
      if (scheduleList.style.display === 'none' || scheduleList.style.display === '') {
        scheduleList.style.display = 'block';
        this.textContent = 'Hide Schedule';
      } else {
        scheduleList.style.display = 'none';
        this.textContent = 'View Schedule';
      }
    });

    // Performance Chart
    document.addEventListener('DOMContentLoaded', function() {
      const ctx = document.getElementById('performanceChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['GCSE Maths', 'BSc Business'],
          datasets: [{
            label: 'Average Class Score (%)',
            data: [82, 78],
            backgroundColor: ['#71ab0c', '#71ab0c'],
            borderColor: ['#5a8c0a', '#5a8c0a'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    });

    // Timetable Calendar
    document.addEventListener('DOMContentLoaded', function() {
      const calendarEl = document.getElementById('timetableCalendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
          {
            title: 'GCSE Maths Lesson',
            start: '2025-07-16T10:00:00',
            className: 'fc-event-lesson',
            description: 'Online Session'
          },
          {
            title: 'BSc Business Lecture',
            start: '2025-07-17T14:00:00',
            className: 'fc-event-lesson',
            description: 'Online Session'
          },
          {
            title: 'Review Submissions',
            start: '2025-07-15',
            allDay: true,
            className: 'fc-event-assignment',
            description: 'Submit grades via portal'
          }
        ],
        eventClick: function(info) {
          alert(`Event: ${info.event.title}\nDate: ${info.event.start.toLocaleDateString()}\nDetails: ${info.event.extendedProps.description}`);
          if (info.event.url) {
            window.open(info.event.url, '_blank');
          }
        },
        eventDidMount: function(info) {
          if (info.event.classNames.includes('fc-event-lesson')) {
            info.el.style.backgroundColor = '#71ab0c';
            info.el.style.borderColor = '#5a8c0a';
            info.el.style.color = '#FFFFFF';
          } else if (info.event.classNames.includes('fc-event-assignment')) {
            info.el.style.backgroundColor = '#ff6b6b';
            info.el.style.borderColor = '#e63939';
            info.el.style.color = '#FFFFFF';
          }
        }
      });
      calendar.render();
    });

    // Grade Submission Handling
    document.addEventListener('DOMContentLoaded', function() {
      const gradeForm = document.querySelector('.grade-form');
      gradeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const course = document.getElementById('gradeCourse').value;
        const student = document.getElementById('gradeStudent').value;
        const assignment = document.getElementById('gradeAssignment').value;
        const score = document.getElementById('gradeScore').value;
        if (course && student && assignment && score) {
          const grades = JSON.parse(localStorage.getItem('grades')) || [];
          grades.push({ course, student, assignment, score, date: new Date().toISOString() });
          localStorage.setItem('grades', JSON.stringify(grades));
          gradeForm.reset();
          alert(`Grade submitted for ${student} in ${course}!`);
          // Update grade submissions list
          const gradeSubmissionsList = document.getElementById('gradeSubmissionsList');
          if (gradeSubmissionsList.style.display === 'block') {
            document.getElementById('gradeSubmissionsBtn').click();
            document.getElementById('gradeSubmissionsBtn').click();
          }
        } else {
          alert('Please fill in all fields.');
        }
      });
    });

    // Schooling Reports Handling
    document.addEventListener('DOMContentLoaded', function() {
      const reportForm = document.querySelector('.report-form');
      const reportList = document.getElementById('reportList');

      // Load and display reports from local storage
      function loadReports() {
        const reports = JSON.parse(localStorage.getItem('schoolingReports')) || [];
        reportList.innerHTML = '';
        if (reports.length === 0) {
          reportList.innerHTML = '<p>No reports available yet.</p>';
        } else {
          reports.forEach(report => {
            const reportDiv = document.createElement('div');
            reportDiv.className = 'notification-card';
            reportDiv.innerHTML = `
              <h5>${report.course} - ${report.student}</h5>
              <p>${report.content}</p>
              <p><strong>Teacher:</strong> ${report.teacher}</p>
              <p><small>Submitted: ${new Date(report.date).toLocaleDateString()}</small></p>
            `;
            reportList.appendChild(reportDiv);
          });
        }
      }

      // Handle report submission
      reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const course = document.getElementById('reportCourse').value;
        const student = document.getElementById('reportStudent').value;
        const content = document.getElementById('reportContent').value;
        const teacher = document.getElementById('reportTeacher').value;
        if (course && student && content && teacher) {
          const reports = JSON.parse(localStorage.getItem('schoolingReports')) || [];
          reports.push({
            course,
            student,
            content,
            teacher,
            date: new Date().toISOString()
          });
          localStorage.setItem('schoolingReports', JSON.stringify(reports));
          reportForm.reset();
          loadReports();
          alert('Report submitted successfully!');
        } else {
          alert('Please fill in all fields.');
        }
      });

      // Initial load of reports
      loadReports();

      // Download Reports (Placeholder)
      document.querySelector('.download-report-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Downloading all reports... (Implement server-side PDF generation for actual functionality.)');
      });
    });

    // Dark Mode Toggle
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'btn btn-primary';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Restore dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Notifications Toggle
    document.getElementById('toggleNotificationsBtn').addEventListener('click', function() {
      const notifications = document.querySelector('.notifications');
      if (notifications.style.display === 'none' || notifications.style.display === '') {
        notifications.style.display = 'block';
        this.textContent = 'Hide Notifications';
      } else {
        notifications.style.display = 'none';
        this.textContent = 'View Notifications';
      }
    });

    // Chat Support
    const chatButton = document.createElement('button');
    chatButton.className = 'btn btn-primary';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '20px';
    chatButton.style.right = '20px';
    chatButton.innerHTML = '<i class="fas fa-comment"></i> Chat Support';
    chatButton.setAttribute('aria-label', 'Open Chat Support');
    document.body.appendChild(chatButton);

    chatButton.addEventListener('click', () => {
      alert('Opening chat support... (Implement live chat functionality here)');
    });

    // GSAP Animations with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.sidebar-content h2', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out', delay: 0.5 });
    gsap.from('.profile-button-container', { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', delay: 1.1 });
    gsap.from('.profile-picture', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', delay: 1.3 });
    gsap.from('.profile-form .form-control', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1.5 });
    gsap.from('.profile-form .btn-primary', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.7)', delay: 1.7 });
    gsap.from('.courses-list', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 1.9 });
    gsap.from('.grade-submissions', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 2.1 });
    gsap.from('.schedule-list', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 2.3 });
    gsap.from('.sidebar-content a', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 2.5 });
    gsap.from('#openCoursesBtn', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 2.7 });
    gsap.from('.course-card', { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.courses', start: 'top 80%' } });
    gsap.from('.student-performance .student-card', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.student-performance', start: 'top 80%' } });
    gsap.from('.grade-submission .student-card', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.grade-submission', start: 'top 80%' } });
    gsap.from('#timetableCalendar', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.class-schedule', start: 'top 80%' } });
    gsap.from('.notifications .notification-card', { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.notifications', start: 'top 80%' } });
    gsap.from('.schooling-reports .report-card', { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: '.schooling-reports', start: 'top 80%' } });
    gsap.from('.settings .settings-card', { opacity: 0, y: 50, duration: 1, scrollTrigger: { trigger: '.settings', start: 'top 80%' } });
 