document.addEventListener("DOMContentLoaded", () => {
    // Initialize Feather Icons
    feather.replace();

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.indicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create Indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }

    // Event Listeners for Nav Buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Event Listener for Keyboard Navigation (Arrow Keys)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const threshold = 50; // minimum distance to be considered a swipe
        if (touchStartX - touchEndX > threshold) {
            // Swipe Left
            nextSlide();
        }
        if (touchEndX - touchStartX > threshold) {
            // Swipe Right
            prevSlide();
        }
    }
});
