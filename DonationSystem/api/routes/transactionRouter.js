const express = require('express');
const router = express.Router();
const database = require('../controllers/databaseController.js');
const transactionController = require('../controllers/transactionController.js');
const { body, validationResult } = require('express-validator');

router.use((req, res, next) => {
    if(!database.isConnect()){
        return res.status(500).json({
            message: 'No database connection.'
        });
    }
    next();
});

router.post('/transaction', body('email').isEmail(), body('text').isLength({min: 0, max: 500}), async (req, res) => {
    let email = req.body.email;
    let nickname = req.body.nickname;
    let amount = parseInt(req.body.amount * 100);
    let text = req.body.text;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            status: 'error',
            message: 'Bad request.'
        })
    }
    const result = await transactionController.createTransaction(email, nickname, amount, text);
    return res.status(200).json({
        status: 'ok',
        link: result
    })
})

router.post('/verify', async (req, res) => {
    const result = await transactionController.verifyTransaction(req.body);
    if(result){
        return res.status(200).json({
            status: 'ok'
        });
    }
    return res.status(401).json({
        status: 'error'
    })
})

module.exports = router;