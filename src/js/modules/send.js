export const send = (form) => {
    const phoneInput = form.querySelector('input[type=tel]');
    
    if(phoneInput.value !== '') {
        const data = new FormData(form);

        fetch('/send.php', {
            method: "POST",
            body: data,
        })
        .then(response => {
            console.log(response);
            if(response.status === 200) {
                window.location = '/thankyou'
            }
        })
    }else{
        if(phoneInput.parentElement.classList.contains('input-button')) {
            phoneInput.parentElement.classList.add('input-write');
        }else{
            phoneInput.classList.add('input-write')
        }
        phoneInput.onclick = () => {
            if(phoneInput.parentElement.classList.contains('input-button')) {
                phoneInput.parentElement.classList.remove('input-write');
            }else{
                phoneInput.classList.remove('input-write')
            }
        }
    }
}