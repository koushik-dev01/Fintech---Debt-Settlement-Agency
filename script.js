// 1. STICKY HEADER
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. MOBILE MENU HANDLING
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navItems = navLinks.querySelectorAll('a');
const icon = mobileBtn.querySelector('i');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle Icon
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Auto Close Menu on Link Click
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});

// 3. SWIPER SLIDER CONFIGURATION
if (document.querySelector('.mySwiper')) {
    var swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 800, // Slower speed for smoother slide
    });
}

// 4. OPTIMIZED SCROLL ANIMATION OBSERVER
// (This replaces AOS)
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('animate');
            observer.unobserve(element); // Stop watching once animated
        }
    });
}, observerOptions);

// Initialize Observer with Stagger Logic
const animatedElements = document.querySelectorAll('[data-animate]');

animatedElements.forEach(el => {
    // Check if element is inside a grid/list to apply stagger delay
    const container = el.closest('.problem-grid, .problem-grid-services, .process-steps, .values-grid');
    
    if (container) {
        const siblings = Array.from(container.querySelectorAll('[data-animate]'));
        const index = siblings.indexOf(el);
        
        // Add CSS delay class (delay-1, delay-2, etc.)
        if (index >= 0) {
            el.classList.add(`delay-${(index % 6) + 1}`);
        }
    }
    
    observer.observe(el);
});


// 5. VIDEO PLAYER FUNCTIONALITY
const video = document.getElementById('promo-video');
const playBtn = document.getElementById('play-btn');
const videoContainer = document.querySelector('.video-container');

if (video && playBtn) {
    playBtn.addEventListener('click', () => {
        video.play();
        video.controls = true;
        videoContainer.classList.add('video-playing');
    });

    video.addEventListener('pause', () => {
        if (!video.seeking) {
            videoContainer.classList.remove('video-playing');
            video.controls = false;
        }
    });

    video.addEventListener('ended', () => {
        videoContainer.classList.remove('video-playing');
        video.controls = false;
        video.load(); // Reset video
    });
}