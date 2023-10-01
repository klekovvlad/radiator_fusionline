import { onResize } from "./resize.js";

export const sectionAnimation = (scroll) => {
    let center = scroll + (window.innerHeight / 2);
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        if((section.getBoundingClientRect().top + document.documentElement.scrollTop) * onResize() <= center) {
            section.classList.add('view');
        }
    })
}