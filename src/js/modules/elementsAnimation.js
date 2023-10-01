import { onResize } from "./resize.js";

export const elementsAnimation = (scroll) => {
    let center = scroll + (window.innerHeight * 0.5);

    const elements = document.querySelectorAll('.animation');

    elements.forEach(el => {
        if((el.getBoundingClientRect().top + document.documentElement.scrollTop) * onResize() <= center) {
            el.style.opacity = '1';
            el.style.transform = 'translate(0,0)'
        }
    })
}