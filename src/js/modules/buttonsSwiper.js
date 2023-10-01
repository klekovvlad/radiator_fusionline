export const buttonsSwiper = () => {
    const swiper = document.querySelectorAll('.swiper');
    if(swiper.length > 0) {
        swiper.forEach((s, index) => {
            const swiperButtons = document.querySelectorAll('.buttons-slider')[index];

            if(swiperButtons) {
                const swiperSlides = s.querySelectorAll('.swiper-slide');
                const swiperButtonPrev = swiperButtons.querySelector('.button-prev');
                const swiperButtonNext = swiperButtons.querySelector('.button-next');

                pushIndex(getIndex(swiperSlides), swiperButtonPrev, swiperButtonNext);

                swiperButtons.onclick = (e) => {
                    if(e.target === swiperButtonNext || e.target === swiperButtonPrev) {
                        pushIndex(getIndex(swiperSlides), swiperButtonPrev, swiperButtonNext);
                    }
                }
            }
        })
    }
}

const getIndex = (swiperSlides) => {
    let currentSlide = 1;

    swiperSlides.forEach((slide, index) => {
        if(slide.classList.contains('swiper-slide-active')) {
            if(index === 1) {
                currentSlide = 1
            }else{
                currentSlide = index + 1;
            }
        }
    });
    
    return Number(currentSlide);
}

const pushIndex = (currentSlide, swiperButtonPrev, swiperButtonNext) => {
    swiperButtonPrev.dataset.number = checkNum(currentSlide);
    swiperButtonNext.dataset.number = checkNum(currentSlide + 1);
}

const checkNum = (num) => {
    if(num < 10) {
        num = '0' + num;
    }
    return num;
}