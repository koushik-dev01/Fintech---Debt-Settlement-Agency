// 1. Sticky Navbar 
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});



/// Mobile Menu Slide + Icon Switch + Auto Close
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = navLinks.querySelectorAll('a');
const icon = mobileBtn.querySelector('i');

mobileBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');

  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
});

// Auto close on menu item click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  });
});




// 2. ENHANCED Swiper - 9 Testimonials
if (document.querySelector('.mySwiper')) {
  var swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      480: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1200: { slidesPerView: 3 }
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
    grabCursor: true,
  });
}


// 3. ULTRA SMOOTH SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const container = entry.target.closest('.problem-grid, .problem-grid-services, .process-steps, .values-grid');
      
      if (container) {
        // Individual smooth stagger for cards
        const items = container.querySelectorAll('[data-animate]');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.classList.add('animate');
          }, index * 120); // Perfect 120ms stagger
        });
      } else {
        // Smooth single elements
        entry.target.classList.add('animate');
      }
    }
  });
}, { 
  threshold: 0.15, 
  rootMargin: '0px 0px -80px 0px' 
});

// Observe all animated elements
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));


// Video player functionality
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('promo-video');
    const playBtn = document.getElementById('play-btn');
    const container = document.querySelector('.video-container');

    if (video && playBtn && container) {
        // Hide controls initially
        video.controls = false;
        
        // Play button click
        playBtn.addEventListener('click', function(e) {
            e.preventDefault();
            container.classList.add('video-playing');
            video.play().then(() => {
                video.controls = true;
            }).catch(err => {
                console.log('Autoplay prevented:', err);
                video.controls = true;
                container.classList.remove('video-playing');
            });
        });
    };

    if (video && playBtn && container) {
        // Show native controls when playing
        playBtn.addEventListener('click', function (e) {
            e.preventDefault();
            container.classList.add('video-playing');
            video.play().then(() => {
                video.controls = true; // Ensure controls are visible
            }).catch(err => {
                console.log('Autoplay prevented:', err);
                // Fallback: show controls immediately
                video.controls = true;
                container.classList.remove('video-playing');
            });
        });

        // Click video to play/pause
        video.addEventListener('click', function (e) {
            if (!video.controls) {
                if (video.paused) {
                    container.classList.add('video-playing');
                    video.play();
                }
            }
        });

        // Reset overlay when video ends or paused
        video.addEventListener('pause', function () {
            if (video.currentTime === 0 || video.ended) {
                container.classList.remove('video-playing');
            }
        });

        video.addEventListener('ended', function () {
            container.classList.remove('video-playing');
        });

        // Hide overlay on first user interaction
        let hasInteracted = false;
        document.addEventListener('click', function () {
            if (!hasInteracted) {
                hasInteracted = true;
            }
        }, { once: true });
    }
});
