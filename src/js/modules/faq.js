import { onResize } from "./resize.js";

export const faq = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if(faqItems.length > 0) {
        faqItems.forEach(faqItem => {
            const faqQuestion = faqItem.querySelector('.faq-question');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            let height = faqAnswer.clientHeight;

            faqQuestion.onclick = () => {
                if(faqQuestion.parentElement.classList.contains('open')) {
                    faqQuestion.parentElement.classList.remove('open')
                    faqQuestion.style.paddingBottom = `0px`;
                }else{
                    for(let i = 0; i < faqItems.length; i++) {
                        faqItems[i].classList.remove('open')
                        faqItems[i].querySelector('.faq-question').style.paddingBottom = `0px`;
                    }
                    faqQuestion.parentElement.classList.add('open')
                    faqQuestion.style.paddingBottom = `${height * onResize()}px`;
                }
            }
        })
    }
}