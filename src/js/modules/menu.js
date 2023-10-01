export const menu = () => {
    const header = document.querySelector('.header');
    const button = document.querySelector('.header-nav-button');
    const menu = document.querySelector('.header-nav');
    const nav = menu.querySelector('#menu-nav');
    const links = nav.querySelectorAll('a');
    const body = document.querySelector('body')

    button.onclick = () => {
        if(header.classList.contains('open')) {
            header.classList.remove('open')
            menu.style.display = 'none';
        }else{
            setTimeout(() => {
                header.classList.add('open')
            }, 200);
            menu.style.display = 'block';
        }
    }

    links.forEach(link => {
        link.onclick = () => {
            if(header.classList.contains('open')) {
                header.classList.remove('open')
            }
        }
    })
}

