import { buttonsSwiper } from "./modules/buttonsSwiper.js";
import { elementsAnimation } from "./modules/elementsAnimation.js";
import { faq } from "./modules/faq.js";
import { forms } from "./modules/forms.js";
import { initSwiper } from "./modules/initSwiper.js";
import { initVideo } from "./modules/initVideo.js";
import { map } from "./modules/map.js";
import { mask } from "./modules/mask.js";
import { menu } from "./modules/menu.js";
import { popupButtonListener } from "./modules/popup.js";
import { quiz } from "./modules/quiz.js";
import { renderProduct } from "./modules/renderProduct.js";
import { onResize } from "./modules/resize.js";
import { sectionAnimation } from "./modules/sectionAnimations.js";
import { socialMobile } from "./modules/socialMobile.js";
import { useDescShow } from "./modules/useDescShow.js";

menu();
initSwiper();
renderProduct();
buttonsSwiper();
useDescShow();
quiz();
faq();
popupButtonListener();
initVideo();
mask();
forms();
map();

onResize()
window.addEventListener('resize', onResize);
window.addEventListener('scroll', () => {
    sectionAnimation(window.scrollY);
    elementsAnimation(window.scrollY);

    if(window.innerWidth < 768) {
        socialMobile(window.scrollY);
    }
})