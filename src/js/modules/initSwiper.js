import Swiper, { Autoplay, Navigation } from "swiper";

export const initSwiper = () => {
    const heroSlider = document.querySelector('.hero-slider');

    if(heroSlider) {
        const heroSwiper = new Swiper(heroSlider, {
            slidesPerView: 1,
            modules: [Navigation],
            navigation: {
                prevEl: '.button-prev',
                nextEl: '.button-next',
                disabledClass: 'button-disabled'
            }
        })
    }

    const gallerySlider = document.querySelector('.gallery-slider');

    if(gallerySlider) {
        const gallerySwiper = new Swiper(gallerySlider, {
            slidesPerView: 4,
            spaceBetween: 30,
            modules: [Navigation],
            navigation: {
                prevEl: '.button-prev',
                nextEl: '.button-next',
                disabledClass: 'button-disabled'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.4,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        })
    }

    const partnersSlider = document.querySelector('.partners-slider');

    if(partnersSlider) {
        const partnersSwiper = new Swiper(partnersSlider, {
            slidesPerView: 6,
            spaceBetween: 20,
            centeredSlides: true,
            modules: [Autoplay],
            speed: 4000,
            loop: true,
            autoplay: {
              delay: 0,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2.1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                }
            }
        })

        partnersSlider.addEventListener('mouseenter', () => {
            partnersSwiper.autoplay.stop();
        })
        partnersSlider.addEventListener('mouseleave', () => {
            partnersSwiper.autoplay.start();
        })
        partnersSwiper.allowTouchMove = false;
    }
    
}