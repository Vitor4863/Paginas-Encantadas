const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    let isTransitioning = false;
    let currentSlide = 0;
    let slideWidth = slides[0].clientWidth;
    let autoSlideInterval;

    function updateTrack() {
        track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
        updateIndicators();
    }

    function nextSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            if (currentSlide < slides.length - 1) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateTrack();
        }
    }

    function prevSlide() {
        if (!isTransitioning) {
            isTransitioning = true;
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = slides.length - 1;
            }
            updateTrack();
        }
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 3000);
    }

    startAutoSlide();

    function restartAutoSlide() {
        clearInterval(autoSlideInterval);
        setTimeout(() => {
            isTransitioning = false;
            startAutoSlide();
        }, 800);
    }

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) {
            clearInterval(autoSlideInterval);
            nextSlide();
            setTimeout(() => {
                isTransitioning = false;
                restartAutoSlide();
            }, 800);
        }
    });

    prevButton.addEventListener('click', () => {
        if (!isTransitioning) {
            clearInterval(autoSlideInterval);
            prevSlide();
            setTimeout(() => {
                isTransitioning = false;
                restartAutoSlide();
            }, 800);
        }
    });

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        restartAutoSlide();
    });

    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        updateTrack();
    });

    function createIndicators() {
        for (let i = 0; i < slides.length; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            indicator.addEventListener('click', () => {
                if (!isTransitioning && i !== currentSlide) {
                    clearInterval(autoSlideInterval);
                    currentSlide = i;
                    updateTrack();
                    restartAutoSlide();
                }
            });
            indicatorsContainer.appendChild(indicator);
        }
    }

    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    createIndicators();


    