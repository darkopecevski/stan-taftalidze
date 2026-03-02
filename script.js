document.addEventListener("DOMContentLoaded", () => {
    // Initialize Feather Icons
    feather.replace();

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const slideCounter = document.querySelector('.slide-counter');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlides() {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));

        // Add active class to current slide
        slides[currentSlide].classList.add('active');

        // Update counter
        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
    }

    // Initialize counter
    updateSlides();

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
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
