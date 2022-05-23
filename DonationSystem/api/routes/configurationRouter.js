const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController.js');
const timeUtil = require('../utils/timeUtil.js');
const {queueConfig} = require('../config/config.js');

router.get('/configuration', (req, res) => {
    const password = req.query.password;
    if(queueConfig.password != password){
        const query = 'SELECT * FROM configuration WHERE input_key=? OR input_key=?';
        databaseController.getConnection().query(query, ['min-amount', 'logo-link'], (err, data) => {
            if(err){
                console.log(err);
                return res.status(502).json({
                    status: 'error',
                    message: 'Error while query.'
                });
            }
            return res.status(200).json({
                status: 'ok',
                password: 'in-correct',
                configuration: data
            });
        })
    } else {
        const query = 'SELECT * FROM configuration';
        databaseController.getConnection().query(query, (err, data) => {
            if(err){
                return res.status(502).json({
                    status: 'error',
                    message: 'Error while query.'
                });
            }
            return res.status(200).json({
                status: 'ok',
                password: 'correct',
                configuration: data
            });
        })
    }
});

router.put('/configuration', (req, res) => {
    const key = req.body.input_key;
    const value = req.body.input_value;
    const password = req.body.password;
    if(queueConfig.password != password){
        return res.status(401).json({
            status: 'error',
            message: 'Brak autoryzacji.'
        });
    }
    const query = 'UPDATE configuration SET input_value=? WHERE input_key=?';
    databaseController.getConnection().query(query, [value, key], (err) => {
        if(err){
            return res.status(502).json({
                status: 'error',
                message: 'Error while query.'
            });
        }
        return res.status(200).json({
            status: 'ok',
            message: 'Konfiguracja została zmieniona.'
        });
    });
})

module.exports = router;