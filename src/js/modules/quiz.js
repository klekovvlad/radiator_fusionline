import Swiper, { Navigation } from "swiper"
import { send } from "./send.js";

let current = 1;

export const quiz = () => {
    

    const quizSlides = document.querySelector('.quiz-slide');

    if(quizSlides) {
        const quizSlider = new Swiper(quizSlides, {
            slidesPerView: 1,
            spaceBetween: 20,
            modules: [Navigation],
            navigation: {
                prevEl: '.quiz-button-prev',
                nextEl: '.quiz-button-next',
                disabledClass: 'disabled'
            }
        });
    
        quizSlider.allowTouchMove = false;
    
        const slides = quizSlides.querySelectorAll('.swiper-slide');
    
        const prevBtn = quizSlides.querySelector('.quiz-button-prev');
        const nextBtn = quizSlides.querySelector('.quiz-button-next');

        quizSlider.on('slideChange', () => {
            let x = quizSlider.activeIndex;
            let answersItems = null
            if(quizSlider.activeIndex > 1) {
                x = quizSlider.activeIndex + 1
                answersItems = slides[x].querySelectorAll('label')

            }else{
                answersItems = quizSlides.querySelectorAll('label');
            }
            answersItems.forEach(answer => {
                answer.classList.remove('active')
            })

        })
    
        nextBtn.classList.add('disabled');
    
        document.querySelectorAll('.quiz-item-num')[0].textContent = `0${current}/0${slides.length - 1}`;
    
        slides.forEach(slide => {
            const content = slide.querySelector('.quiz-item-content');
            const answers = content.querySelectorAll('label');
    
            let column = 4;
            
            if(window.innerWidth > 767) {
                if(content.children.length === 1) {
                    column = 2;
                }else if(content.children.length <= 3) {
                    column = answers.length;
                }
            }else {
                column = 1
                if(content.children.length === 3) {
                    column = 2;
                }
            }
    
            content.style.gridTemplateColumns = `repeat(${column}, 1fr)`;

            answers.forEach((answer, index) => {
    
                answer.onclick = () => {
                    for(let i = 0; i < answers.length; i++) {
                        answers[i].classList.remove('active');
                    }
                    answer.classList.add('active');
                    if(current === 1) {
                        slides[1].style.display = 'block';
                        slides[2].style.display = 'block';
                        
                        if(index === 0) {
                            slides[2].style.display = 'none';
                        }else if(index === 1) {
                            slides[1].style.display = 'none';
                        }
    
                        quizSlider.update()
                        quizSlider.updateProgress()
                        quizSlider.updateSize()
                        quizSlider.updateSlides()
                        quizSlider.updateSlidesClasses();
                        

                        for(let i = 1; i < slides.length; i++) {
                            
                            if(i === 1 || i === 2) {
                                slides[i].querySelector('.quiz-item-num').textContent = `02/0${slides.length - 1}`
                            }else{
                                slides[i].querySelector('.quiz-item-num').textContent = `0${i}/0${slides.length - 1}`
                            }
                        }
                    }
                    if(!answer.classList.contains('quiz-item-checkbox__other')) {
                        nextBtn.classList.remove('disabled');
                    }else{
                        nextBtn.classList.add('disabled');
                    }
                }
    
                const input = answer.querySelector('.input');
                if(input) {
                    const radio = answer.querySelector('input[type=radio]');
    
                    input.addEventListener('click', () => {
                        radio.value = '';
                        radio.checked = true;
                    })
                    input.addEventListener('keyup', () => {
                        radio.value = input.value;
                        input.parentElement.classList.remove('input-write');
                    })
                    input.addEventListener('blur', () => {
                        if(input.value === '' && input.parentElement.classList.contains('active')) {
                            input.parentElement.classList.add('input-write');
                            nextBtn.classList.add('disabled')
                        }else{
                            input.parentElement.classList.remove('input-write');
                            nextBtn.classList.remove('disabled')
                        }
                    })
                }
            })
        })

        const buttons = document.querySelector('.quiz-buttons');

        buttons.onclick = (e) => {
            
            if(e.target.classList.contains('quiz-button-prev')) {
                current--;

                nextBtn.classList.add('disabled');

                if(current < slides.length - 1) {
                    nextBtn.querySelector('.button-text').textContent = 'Следующий вопрос';
                }
            }
            
            if(e.target.classList.contains('quiz-button-next')) {
                if(current < slides.length - 1) {
                    current++;
                    nextBtn.classList.add('disabled');
                }
        
                if(current === slides.length - 1) {
                    nextBtn.querySelector('.button-text').textContent = 'Получить скидку';
                    nextBtn.classList.remove('disabled');
                    prevBtn.classList.add('disabled');
                    nextBtn.disabled = false
        
                    const form = nextBtn.parentElement.parentElement.parentElement;
                    const inputPhone = form.querySelector('input[type=tel]');
                    const inputName = form.querySelector('input[name=Имя]');
                    
                    inputPhone.onclick = () => {
                        inputPhone.classList.remove('input-write')
                    }
                    inputName.onclick = () => {
                        inputName.classList.remove('input-write');
                    }
                    
                    nextBtn.onclick = () => {
                        send(form);
                    }
    
                }
            }
        }
    }
}