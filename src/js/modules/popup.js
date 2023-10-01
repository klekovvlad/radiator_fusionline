const titles = {
    order: 'Сделайте заказ',
    callback: 'Закажите обратный звонок',
    calculation: 'Получите индивидуальный расчет'
}

const popup = document.querySelector('.popup-form');

export const popupButtonListener = () => {
    const popupButtons = document.querySelectorAll('.popup-open');

    if(popupButtons.length > 0) {
        popupButtons.forEach(button => {
            button.onclick = () => {
                openPopup(button);
            }
        })
    }
}

const openPopup = (button) => {
    const title = popup.querySelector('.title');
    const close = popup.querySelector('.close');

    if(button.classList.contains('popup-order')) {
        title.textContent = titles.order;
    }else if(button.classList.contains('popup-callback')){
        title.textContent = titles.callback;
    }else if (button.classList.contains('popup-calculation')) {
        title.textContent = titles.calculation;
    }

    popup.classList.add('open');

    close.addEventListener('click', (e) => closePopup(e));
    popup.addEventListener('click', (e) => closePopup(e))
}

const closePopup = (e) => {
    if(e.target.classList.contains('close') || e.target.classList.contains('popup')) {
        popup.classList.remove('open');
    }
}