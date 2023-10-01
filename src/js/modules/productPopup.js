import Swiper, { Mousewheel, Navigation, Thumbs } from "swiper";

const popup = document.querySelector('.popup-product');
const popupElements = {
    popup: popup,
    close: popup.querySelector('.close'),
    popupTitle: popup.querySelector('.popup-product-title'),
    popupChars: popup.querySelector('.popup-product-chars'),
    popupGallery: popup.querySelector('.popup-gallery-wrapper'),
    popupThumb: popup.querySelector('.popup-thumb-wrapper'),
    popupInterier: popup.querySelector('.popup-interier-wrapper'),
    popupInterierTitle: popup.querySelector('.popup-interier-title')
}

const Thumb = new Swiper(popupElements.popupThumb.parentElement, {
    direction: 'vertical',
    speed: 1000,
    slidesPerView: 4,
    freeMode: true,
    modules: [Mousewheel],
    mousewheel: {
        eventsTarget: 'container'
    },
    spaceBetween: 30,
    breakpoints: {
        0: {
            direction: 'horizontal',
            spaceBetween: 10,
        },
        768: {
            direction: 'vertical',
            spaceBetween: 30,
        }
    }
})

const Gallery = new Swiper(popupElements.popupGallery.parentElement, {
    slidesPerView: 1,
    speed: 1000,
    modules: [Thumbs],

    thumbs: {
        swiper: Thumb,
    }
}) 

const Interier = new Swiper(popupElements.popupInterier.parentElement, {
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

export const productPopup = () => {
    const products = document.querySelectorAll('.products-item');
    if(products.length > 0) {
        products.forEach(product => {
            product.onclick = (e) => {
                e.preventDefault();
                popupElements.popup.classList.add('open');
                popupElements.popup.classList.add('loading');
                openPopup(e.currentTarget)
            }
        })

    }
}

const openPopup = (el) => {
    getInfo(el.dataset.id).then(product => {
        renderPopup(product);
    });
}

async function getInfo(id) {
    const res = await fetch(`/wp-json/wp/v2/posts/${id}`);
    const data = await res.json();

    let obj = {}
    obj.title = data.title.rendered;
    obj.chars = data.acf.chars;
    obj.gallery = data.acf.gallery;
    obj.interier = data.acf.interier;
    obj.price = data.acf.price;
    obj.id = data.id;
    obj.category = data.categories[0];

    return obj;
}

const clearPopup = (product) => {
    popupElements.popupTitle.innerHTML = '';
    popupElements.popupChars.innerHTML = '';
    popupElements.popupGallery.innerHTML = '';;
    popupElements.popupThumb.innerHTML = '';
    popupElements.popupInterier.innerHTML = '';
    if(product.category !== 5 && popupElements.popup.querySelector('.popup-product-nav')) {
        popupElements.popup.querySelector('.popup-product-nav').parentNode.removeChild(popupElements.popup.querySelector('.popup-product-nav'));
    }
}

const renderPopup = (product) => {
    clearPopup(product);
    const nav = popupElements.popup.querySelector('.popup-product-nav');
    
    
    let slideCenterClass = '';
    let firstSlideText = '';

    if(product.category === 5) {
        popupElements.popupTitle.textContent = 'Сантехнические комплектующие для монтажа';
        firstSlideText = 'Все комплектующие';
        slideCenterClass = 'product-center';
        getAccessProducts().then(products => {
            
            if(!nav) {
                const nav = document.createElement('div');
                nav.classList.add('popup-product-nav');
                popupElements.popupTitle.after(nav);

                products.map(p => {
                    const button = document.createElement('button');
                    button.classList.add('product-nav');
                    button.dataset.id = p.id;
                    button.textContent = p.title.rendered;
                    if(p.id === product.id) {
                        button.classList.add('active');
                    }
                    nav.append(button);
                    button.onclick = () => {
                        popupElements.popup.querySelectorAll('.product-nav').forEach(btn => {
                            btn.classList.remove('active')
                        })
                        button.classList.add('active');
                        openPopup(button);
                    };
                })
            }
        })
    }else{
        popupElements.popupTitle.textContent = product.title;
    }

    if(product.chars) {
        product.chars.map(char => {
            popupElements.popupChars.insertAdjacentHTML('beforeend', 
            `<li class="char-item">
                <div class="char-item-title">${char.title}</div>
                <div class="char-item-valur">${char.value}</div>
            </li>`
            )
        })
    }

    if(product.price) {
        let price = Number(product.price).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'RUB'
        });
        let priceText = `от ${price}`;
        if(product.category === 5) {
            priceText = price
        }
        popupElements.popupChars.insertAdjacentHTML('beforeend', 
        `<li class="char-item">
            <div class="char-item-title">Цена</div>
            <div class="char-item-value char-item-price">${priceText}</div>
        </li>`
        )
        const priceValue = document.querySelector('.char-item-price');

        const priceArray = priceValue.innerHTML.split('&nbsp;');

        priceValue.innerHTML = priceArray.join(' ')
    }

    if(product.gallery) {
        product.gallery.map((img, index) => {
            
            let text = ''
            if(index === 0) {
                text = `<div class="gallery-item-text">${firstSlideText}</div>`
            }

            popupElements.popupGallery.insertAdjacentHTML('beforeend', 
            `<div class="gallery-item ${slideCenterClass} swiper-slide">
                <img src="${img.url}" alt=${img.alt}>
                ${text}
            </div>`
            )
        })

        product.gallery.map(img => {
            popupElements.popupThumb.insertAdjacentHTML('beforeend', 
            `<div class="thumb-item ${slideCenterClass} swiper-slide">
                <img src="${img.sizes.medium}" alt=${img.alt}>
            </div>`
            )
        })
    }

    if(product.interier) {
        popupElements.popupInterier.parentElement.style.display = 'block';
        
        popupElements.popupInterierTitle.textContent = `${product.title} в интерьере`;
        
        product.interier.map(img => {
            popupElements.popupInterier.insertAdjacentHTML('beforeend', 
            `<div class="interier-item swiper-slide">
                <img src="${img.url}" alt=${img.alt}>
            </div>`
            )
        })
        
        Interier.update()
        Interier.updateProgress()
        Interier.updateSize()
        Interier.updateSlides()
        Interier.updateSlidesClasses()
    }else{
        popupElements.popupInterier.parentElement.style.display = 'none';
    }

    
    Thumb.update()
    Thumb.updateProgress()
    Thumb.updateSize()
    Thumb.updateSlides()
    Thumb.updateSlidesClasses()
    Gallery.update()
    Gallery.updateProgress()
    Gallery.updateSize()
    Gallery.updateSlides()
    Gallery.updateSlidesClasses()
    Gallery.slideTo(0, 0)

    popupElements.close.onclick = () => {
        popupElements.popup.classList.remove('open');
        // if(nav) {
        //     nav.parentElement.removeChild(nav);
        // }
    }
    
    popupElements.popup.classList.remove('loading');
}

async function getAccessProducts() {
    const res = await fetch('/wp-json/wp/v2/posts/?categories=5');
    const data = await res.json();

    return data;
}