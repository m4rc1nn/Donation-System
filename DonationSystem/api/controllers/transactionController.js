const sessionUtil = require('../utils/sessionUtil.js');
const databaseController = require('./databaseController.js');
const timeUtil = require('../utils/timeUtil.js');
const {
    przelewy24Config,
    websiteConfig
} = require('../config/config.js');

const {
    P24,
    Currency,
    Country,
    Language,
    Encoding
} = require('@ingameltd/node-przelewy24')

var p24;

const initPayment = async () => { 
    p24 = new P24(
        przelewy24Config.merchantId, 
        przelewy24Config.posId,
        przelewy24Config.apiKey,
        przelewy24Config.crcKey, 
        { 
          sandbox: przelewy24Config.sandbox
        }
    )
    try {
        const access = await p24.testAccess();
        if(access){
            console.log(`[${timeUtil.getDateTime()}] The payment initialization was successful.`);
        }
    } catch(err){
        console.log(`[${timeUtil.getDateTime()}] Failed to initialize payment.`);
        console.log(`Error: ${err}`)
    }
}

const createTransaction = async (email, nickname, amount, text) => {
    const id = sessionUtil.create();
    const currency = Currency.PLN;
    const description = `Wpłata od ${nickname}`;
    const country = Country.Poland;
    const language = Language.PL;
    const urlReturn = `${websiteConfig.getFrontendUrl()}/status`;
    const urlStatus = `${websiteConfig.getApiUrl()}/verify`;
    const timeLimit = 15;
    const encoding = Encoding.UTF8;
    const order = {
        sessionId: id,
        amount: amount,
        currency: currency,
        description: description,
        email: email,
        country: country,
        language: language,
        urlReturn: urlReturn,
        urlStatus: urlStatus,
        timeLimit: timeLimit,
        encoding: encoding
    };
    try {
        const result = await p24.createTransaction(order);
        query = `INSERT INTO transaction(id, time_start, time_end, nickname, text, amount, email, payment_status) VALUES (?, ?, '0000-00-00 00:00:00',?, ?, ?, ?, 'created')`;
        databaseController.getConnection().query(query, [id, timeUtil.getDateTime(), nickname, text, amount, email]);
        return result.link;
    } catch (err){
        console.log(`[${timeUtil.getDateTime()}] Failed to create payment.`);
        console.log(`Error: ${err}`)
        return false;
    }  
}

const verifyTransaction = async (request) => {
    try {
        const notificationResult = p24.verifyNotification(request);
        if(!notificationResult) return false;

        const verifyRequest = {
            amount: request.amount,
            currency: Currency.PLN,
            orderId: request.orderId,
            sessionId: request.sessionId
        }
        try {
            const result = await p24.verifyTransaction(verifyRequest);
            if(!result) return false;
            let query = `UPDATE transaction SET payment_status='completed', time_end=? WHERE id=?`;
            databaseController.getConnection().query(query, [timeUtil.getDateTime(), request.sessionId]);
            query = `INSERT INTO donation_queue(id, status, display_time) VALUES (?, 'NOT_SHOWN', '0000-00-00 00:00:00')`;
            databaseController.getConnection().query(query, [request.sessionId]);
            return true;
        } catch (err){
            console.log(`[${timeUtil.getDateTime()}] Failed to verify payment.`);
            console.log(`Error: ${err}`)
            return false;
        }
    } catch (err){
        console.log(`[${timeUtil.getDateTime()}] Failed to verify payment.`);
        console.log(`Error: ${err}`)
        return false;
    }
}

module.exports = {
    p24,
    initPayment,
    createTransaction,
    verifyTransaction
}