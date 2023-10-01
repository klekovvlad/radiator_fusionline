export const map = () => {
    const frame = `<iframe loading="lazy" src="https://yandex.ru/map-widget/v1/?um=constructor%3A338b0b554184d01adb5413ad5b6f9b98957cff9da2017481bf5d6e62b200776a&amp;source=constructor" width="100%" height="720" frameborder="0"></iframe>`
    const mapSection = document.querySelector('.map');

    mapSection.addEventListener('click', (e) => {
        if(e.target.classList.contains('map-img')) {
            e.target.parentNode.removeChild(e.target);
            mapSection.insertAdjacentHTML('afterbegin', frame)
            mapSection.classList.add('active');
        }
    })
}