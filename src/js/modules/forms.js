import { send } from "./send.js";

export const forms = () => {
    const formItems = document.querySelectorAll('form');

    if(formItems.length > 0) {

        formItems.forEach(form => {
            const button = form.querySelector('button');

            if(button) {
                button.onclick = (e) => {
                    e.preventDefault();
                    send(form);
                }
            }
        })

    }
}