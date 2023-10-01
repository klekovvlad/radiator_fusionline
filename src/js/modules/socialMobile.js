const socialMob = document.querySelector('.mobile-social')

export const socialMobile = (scroll) => {
    if((scroll + window.innerHeight) >= (document.documentElement.offsetHeight - socialMob.offsetHeight)) {
        socialMob.classList.add('hide')
    }else{
        socialMob.classList.remove('hide')
    }
}