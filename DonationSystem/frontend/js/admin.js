import config from '../config/config.js';

let password = prompt('Podaj hasło do panelu');
let logged = false;
$.notify('Trwa logowanie do panelu...', 'info');

document.body.onload = async () => {
    const response = await fetch(config.apiUrl + `/configuration?password=${password}`).then(res => res.json());
    if(response.status == 'ok' && response.password == 'correct'){
        logged = true;
        [...response.configuration].forEach((config) => {
            const element = document.getElementsByName(config.input_key)[0].value = config.input_value;
        })
        $.notify('Logowanie przebiegło pomyślnie.', 'success');
    } else {
        $.notify('Logowanie nie przebiegło pomyślnie.', 'error');
    }
}

document.getElementsByTagName('button')[0].addEventListener('click', () => {
    let errorsCount = 0;
    [...document.getElementsByTagName('input')].forEach(async (input) => {
        const response = await fetch(config.apiUrl + `/configuration`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                input_key: input.name,
                input_value: input.value
            })
        }).then(res => res.json());
        if(response.status == 'error'){
            errorsCount++;
            $.notify(`Nie można zapisać wartości '${input.name}', błąd: ${response.message}`, 'error');
        }
    })
    if(errorsCount > 0){
        $.notify('Konfiguracja nie została zapisana w pełni poprawnie.', 'warn');
    } else {
        $.notify('Konfiguracja została zapisana poprawnie.', 'success');
    }
});

document.getElementsByTagName('button')[1].addEventListener('click', () => {
    if(logged) Swal.fire(`Aby dodać donejty do OBS: [Dodaj -> Przeglądarka], w pole 'Adres URL' wklej ten link: ${config.frontendUrl}/queue?password=${password}`);
    else $.notify('Nie jesteś zalogowany.', 'error');
});

document.getElementsByTagName('button')[2].addEventListener('click', async () => {
    const response = await fetch(config.apiUrl + '/queue', {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            id: 'TEST-DONATION',
            status: 'NOT_SHOWN'
        })
    }).then(res => res.json());
    if(response.status == 'ok'){
        $.notify('Testowy donejt został wysłany do serwera.', 'success');
    } else {
        $.notify('Wystąpił błąd podczas wysyłania testowego donejta na serwer.', 'error');
    }
})