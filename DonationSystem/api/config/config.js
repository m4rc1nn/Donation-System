//dane do konta przelewy24
const przelewy24Config = {
    merchantId: ,
    posId: ,
    apiKey: '',
    crcKey: '',
    sandbox: true
};

//dane do połączenia się z bazą danych
const databaseConfig = {
    host: '',
    user: '',
    password: '',
    database: ''
};

//ustawienia hasła do kolejki i panelu
const queueConfig = {
    password: 'haslo'
};

//konfiguracja adresów URL
const websiteConfig = {
    apiUrl: '',
    apiPort: 8080,
    frontendUrl: '',

    //NIE TYKAJ TEGO NIŻEJ//
    getApiUrl: () => {
        return websiteConfig.apiUrl;
    },
    getFrontendUrl: () => {
        return websiteConfig.frontendUrl;
    }
};

module.exports = {
    przelewy24Config,
    databaseConfig,
    websiteConfig,
    queueConfig
};