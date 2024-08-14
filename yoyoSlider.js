function yoyoCarousel(selector, options) {
    const carousel = document.querySelector(selector);
    const settings = Object.assign({
        showDot: true,
        dotActiveColor: '#717171',
        autoSlide: true,
        interval: 3000,
    }, options);

    const style = document.createElement('style');
    style.textContent = `
.yoyoSlider {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: auto;
    overflow: hidden;
}
.yoyoSlider-images {
    display: flex;
    transition: transform 0.5s ease-in-out;
}
.yoyoSlider img {
    width: 100%;
    height: auto;
    display: block;
}
.yoyoSlider .prev,
.yoyoSlider .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: rgba(0,0,0,0.5);
}
.yoyoSlider .next {
    right: 0;
    border-radius: 3px 0 0 3px;
}
.yoyoSlider .prev:hover,
.yoyoSlider .next:hover {
    background-color: rgba(0,0,0,0.8);
}
.yoyoSlider .dots {
    text-align: center;
    padding: 10px;
}
.yoyoSlider .dot {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    cursor: pointer;
}
.yoyoSlider .dot.active {
    background-color: ${settings.dotActiveColor};
}
`;
    document.head.appendChild(style);

    function createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }

    const images = Array.from(carousel.querySelectorAll('img'));
    const carouselImages = createElementWithClass('div', 'yoyoSlider-images');
    images.forEach(img => carouselImages.appendChild(img));
    carousel.innerHTML = '';
    carousel.appendChild(carouselImages);

    const prevButton = createElementWithClass('a', 'prev');
    prevButton.addEventListener('click', prevSlide);
    prevButton.textContent = '❮';

    const nextButton = createElementWithClass('a', 'next');
    nextButton.addEventListener('click', nextSlide);
    nextButton.textContent = '❯';

    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    if (settings.showDot) {
        const dotsContainer = createElementWithClass('div', 'dots');
        carousel.appendChild(dotsContainer);
    }

    let currentIndex = 0;

    function showSlide(index) {
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
        updateDots();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function updateDots() {
        if (!settings.showDot) return;
        const dots = carousel.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function createDots() {
        if (!settings.showDot) return;
        const dotsContainer = carousel.querySelector('.dots');
        images.forEach((_, index) => {
            const dot = createElementWithClass('span', 'dot');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    createDots();




    if (settings.autoSlide) {
        setInterval(nextSlide, `${settings.interval}`);
    }

}