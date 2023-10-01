export const onResize = () => {
    let zoom = 1;
    let width = window.outerWidth;
    if(window.outerWidth > window.innerWidth) {
        width = window.innerWidth
    }
    if (width > 767) {
        zoom = width / 1920;
    }else {
        zoom = 1;
    }

    document.querySelector('body').style.zoom = zoom;

    return zoom;
}