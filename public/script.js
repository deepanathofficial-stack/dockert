/* ==========================================================================
   Deepanath's Personal Website - Frontend Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 4. Active Nav Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 5. Check Node.js Server Connectivity (/api/profile)
  const serverStatus = document.getElementById('server-status');
  fetch('/api/profile')
    .then(response => {
      if (!response.ok) throw new Error('API offline');
      return response.json();
    })
    .then(data => {
      if (serverStatus) {
        serverStatus.innerHTML = `<span class="badge-online">●</span> Node.js Server Connected (${data.name}'s API)`;
      }
    })
    .catch(() => {
      if (serverStatus) {
        serverStatus.innerHTML = `<span style="color:#ef4444;">●</span> Standalone Mode`;
      }
    });

  // 6. Contact Form Submission (Asynchronous POST to Node.js backend)
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const submitBtn = document.getElementById('submit-btn');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');
  const formFeedback = document.getElementById('form-feedback');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset previous error messages
      [nameError, emailError, messageError].forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
      });
      formFeedback.className = 'form-feedback hidden';

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        nameError.classList.add('visible');
        isValid = false;
      }

      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email.';
        emailError.classList.add('visible');
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.classList.add('visible');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message.';
        messageError.classList.add('visible');
        isValid = false;
      }

      if (!isValid) return;

      // Set Loading State
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnSpinner.classList.remove('hidden');

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          formFeedback.textContent = data.message || 'Message sent successfully!';
          formFeedback.className = 'form-feedback success';
          contactForm.reset();
        } else {
          formFeedback.textContent = data.message || 'Something went wrong. Please try again.';
          formFeedback.className = 'form-feedback error';
        }
      } catch (err) {
        console.error('Fetch error:', err);
        formFeedback.textContent = 'Could not connect to the server. Please check your connection.';
        formFeedback.className = 'form-feedback error';
      } finally {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        btnSpinner.classList.add('hidden');
        formFeedback.classList.remove('hidden');
      }
    });
  }
});

