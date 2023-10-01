import IMask from "imask"

export const mask = () => {
    const phoneInputs = document.querySelectorAll('input[type=tel]');
    const numberInputs = document.querySelectorAll('.input-number');

    if(phoneInputs.length > 0) {
        phoneInputs.forEach(input => {
            const phoneMask = IMask(input, {
                mask: '+{7}(000)000-00-00',
            })
        })
    }

    if(numberInputs.length > 0) {
        numberInputs.forEach(input => {
            input.addEventListener('click', () => {
                const numberMask = IMask(input, {
                    mask: Number,
                    min: 1,
                    max: 100,
                })
                numberMask.updateValue();
                numberMask.updateControl();
                input.addEventListener('keydown', () => {
                    numberMask.updateValue();
                    numberMask.updateControl();
                })
            })
        })
    }
}