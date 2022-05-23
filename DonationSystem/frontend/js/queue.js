import config from '../config/config.js';

const password = new URLSearchParams(window.location.search).get('password');
const donateTextElement = document.getElementsByTagName('p')[0];
const audioElement = document.getElementsByTagName('audio')[0];
const sourceElement = document.getElementsByTagName('source')[0];
const imgElement = document.getElementsByTagName('img')[0];
let donateTime = 8000;
let donateText = '{NICKNAME} wpłacił {AMOUNT}zł. {TEXT}';

document.body.onload = async () => {
    const response = await fetch(config.apiUrl + `/configuration?password=${password}`).then(res => res.json());
    sourceElement.src = [...response.configuration].find((config) => config.input_key == 'audio-link').input_value;
    imgElement.src = [...response.configuration].find((config) => config.input_key == 'logo-link').input_value;
    donateText = [...response.configuration].find((config) => config.input_key == 'donate-text').input_value;
    donateTime = [...response.configuration].find((config) => config.input_key == 'donate-time').input_value;
    audioElement.load();
}

const checkDonation = async () => {
    const response = await fetch(config.apiUrl + `/queue?password=${password}`).then(res => res.json());
    if(response.status == 'ok'){
        if(response.list.length > 0){
            [...response.list].forEach(async (donate, index) => {
                await showDonate(donate.id, donate.nickname, donate.amount, donate.text);
                checkDonation();
            });
        } else {
            setTimeout(() => {
                checkDonation();
            }, 1000);
        }
    }
}

const showDonate = async (id, nickname, amount, text) => {
    return new Promise((resolve, reject) => {
        donateTextElement.textContent = donateText.replace('{NICKNAME}', nickname).replace('{AMOUNT}', amount).replace('{TEXT}', text);
        donateTextElement.classList.toggle('show');
        imgElement.classList.toggle('show');
        audioElement.currentTime = 0;
        audioElement.muted = false;
        audioElement.play();
        setTimeout(() => {
            donateTextElement.classList.toggle('show');
            imgElement.classList.toggle('show');
            audioElement.pause();
            fetch(config.apiUrl + `/queue`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    id: id,
                    status: 'SHOWN'
                })
            })
            setTimeout(() => {
                resolve(true);
            }, 1000);
        }, donateTime < 2000 ? 2000 : donateTime);
    })
}

checkDonation();