import Swiper, { Navigation } from "swiper";
import { buttonsSwiper } from "./buttonsSwiper.js";
import { productPopup } from "./productPopup.js";

export const renderProduct = () => {
    const wrapper = document.querySelector('.products-wrapper');
    
    if(wrapper) {
        const productsNav = document.querySelector('.products-categories');
        const productsNavLinks = productsNav.querySelectorAll('.products-category')
        getProduct().then(products => {
            render(products, undefined, wrapper);
            productPopup();
            const productSwiper = new Swiper(wrapper.parentElement, {
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 1200,
                modules: [Navigation],
                navigation: {
                    prevEl: '.button-prev',
                    nextEl: '.button-next',
                    disabledClass: 'button-disabled'
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }
            })
            productsNav.onclick = (e) => {
                for(let i = 0; i < productsNavLinks.length; i++) {
                    productsNavLinks[i].classList.remove('active');
                }
                if(e.target.classList.contains('products-category')) {
                    e.target.classList.add('active');
                    render(products, e.target.dataset.id, wrapper);
                    productSwiper.update()
                    productSwiper.updateProgress()
                    productSwiper.updateSize()
                    productSwiper.updateSlides()
                    productSwiper.updateSlidesClasses();
                    productPopup();
                }
            }
        })
    }

}

async function getProduct() {
    const url = '/wp-json/wp/v2/posts/?categories=2'
    let res = await fetch(url);
    let data = await res.json();
    let array = [];
    data.forEach(item => {
        let obj = {};
        obj.name = item.title.rendered;
        obj.img = item.fimg_url;
        obj.id = item.id;
        obj.slug = item.slug;
        obj.price = item.acf.price;
        obj.category = item.categories[0];
        array.push(obj);
    });
    return array;
}

const render = (products, category, wrapper) => {
    let array = [];

    if(category) {
        products.forEach(i => {
            if(Number(i.category) === Number(category)) {
                array.push(i);
            }
        })
    }else{
        array = products;
        array.sort((a, b) => parseFloat(a.category) - parseFloat(b.category));
    }

    wrapper.innerHTML = '';
    array.map(item => {
        let price = Number(item.price).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        });
        let priceText = `от ${price}`;
        if(item.category === 5) {
            priceText = price
        }

        let itemOuter = `
        <a href="/${item.slug}" class="products-item swiper-slide" data-id="${item.id}">
            <div class="products-item-top">
                <img class="products-item-img" src="${item.img}" alt="${item.name}">
                <button class="button">
                    <span class="button-text">Смотреть подробнее</span>
                </button>
            </div>
            <div class="products-item-bottom">
                <h3 class="products-item-title">${item.name}</h3>
                <div class="products-item-price">${priceText}</div>
            </div>
        </a>
        `
        // const priceValue = document.querySelector('.products-item-price');

        // const priceArray = priceValue.innerHTML.split('&nbsp;');

        // priceValue.innerHTML = priceArray.join(' ')

        wrapper.insertAdjacentHTML('beforeend', itemOuter);
    })

    buttonsSwiper();
}