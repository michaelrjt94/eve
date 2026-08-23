document.addEventListener('DOMContentLoaded', () => {
  // --- NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION MENU ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-item a');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- RECRUITMENT MODAL ---
  const modal = document.getElementById('recruitModal');
  const openModalButtons = document.querySelectorAll('.btn-recruit-trigger');
  const closeModalButton = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  if (modal) {
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Disable page scrolling
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Enable page scrolling
    };

    openModalButtons.forEach(btn => btn.addEventListener('click', openModal));
    if (closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      
      if (elTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run once initially to show elements already in view

  // --- AMBIENT STARFIELD CANVAS ANIMATION ---
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let numStars = 80;
    
    // Set Canvas Size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Scale number of stars based on screen width
      if (window.innerWidth < 768) {
        numStars = 40;
      } else {
        numStars = 100;
      }
      initStars();
    };

    // Star Constructor
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = -Math.random() * 0.15 - 0.05; // Move upwards slightly
        this.alpha = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.001;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Twinkle effect (alpha pulsing)
        if (this.growing) {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= 0.8) this.growing = false;
        } else {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0.2) this.growing = true;
        }

        // Reset if star goes off-screen
        if (this.y < 0 || this.x < 0 || this.x > canvas.width) {
          this.reset();
          this.y = canvas.height; // start at the bottom again
        }
      }

      draw() {
        ctx.fillStyle = `rgba(0, 210, 255, ${this.alpha})`; // Cyan tinted stars
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
    animate();
  }
});
