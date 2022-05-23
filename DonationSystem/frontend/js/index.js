import config from '../config/config.js';

const imgElement = document.getElementsByTagName('img')[0];

const amountElement = document.getElementsByTagName('input')[0];
const textElement = document.getElementsByTagName('textarea')[0];
const nicknameElement = document.getElementsByTagName('input')[1];
const emailElement = document.getElementsByTagName('input')[2];

const errorMessage = document.getElementById('error-message');

document.body.onload = async () => {
    const response = await fetch(config.apiUrl + `/configuration`).then(res => res.json());
    imgElement.src = [...response.configuration].find((config) => config.input_key == 'logo-link').input_value;
    amountElement.min = [...response.configuration].find((config) => config.input_key == 'min-amount').input_value;
};

document.getElementsByTagName('button')[0].addEventListener('click', async () => {
    let validate = true;
    [amountElement, textElement, nicknameElement, emailElement].forEach(element => {
        if(!element.checkValidity() || element.value == ''){
            element.reportValidity();
            validate = false;
        }
    })
    if(validate){
        const response = await fetch(config.apiUrl + '/transaction', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: emailElement.value,
                nickname: nicknameElement.value,
                amount: amountElement.value,
                text: textElement.value
            })
        }).then(res => res.json());
        if(response.status == 'ok'){
            location.href = response.link;
        }
    } else {
        errorMessage.textContent = 'Formularz został błędnie uzupelniony. Spróbuj ponownie.';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 5000);
    }
})