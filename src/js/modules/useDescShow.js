export const useDescShow = () => {
    const useItems = document.querySelectorAll('.use-item');

    if(useItems.length > 0) {
        useItems.forEach(useItem => {

            const useText = useItem.querySelector('.use-text');

            useItem.onclick = (e) => {
                for(let i = 0; i < useItems.length; i++) {
                    if(useItems[i] !== useItem) {
                        useItems[i].classList.remove('open')
                    }
                }
                if(e.target.classList.contains('use-text-title') || e.target.classList.contains('use-img')) {
                    useItem.classList.contains('open') ?  useItem.classList.remove('open') : useItem.classList.add('open')             
                }
               
            }
        })
    }
}