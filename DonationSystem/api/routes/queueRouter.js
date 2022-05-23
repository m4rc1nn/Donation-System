const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController.js');
const timeUtil = require('../utils/timeUtil.js');
const {queueConfig} = require('../config/config.js');

router.get('/queue', (req, res) => {
    const password = req.query.password;
    if(queueConfig.password != password){
        return res.status(401).json({
            status: 'error',
            message: 'Brak autoryzacji.'
        });
    }
    const query = `SELECT transaction.id, transaction.nickname, transaction.text, transaction.amount FROM donation_queue INNER JOIN transaction ON transaction.id = donation_queue.id WHERE donation_queue.status='NOT_SHOWN' LIMIT 1`;
    databaseController.getConnection().query(query, (err, data) => {
        if(err){
            return res.status(502).json({
                status: 'error',
                message: 'Error while query.'
            });
        }
        return res.status(200).json({
            status: 'ok',
            list: data.map((donate) => {
                donate.amount = parseFloat(donate.amount / 100).toFixed(2);
                return donate;
            })
        });
    })
});

router.put('/queue', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const status = req.body.status;
    if(queueConfig.password != password){
        return res.status(401).json({
            status: 'error',
            message: 'Brak autoryzacji.'
        });
    }
    const query = `UPDATE donation_queue SET status=?, display_time=? WHERE id=?`;
    databaseController.getConnection().query(query, [status, timeUtil.getDateTime(), id], (err) => {
        if(err){
            return res.status(502).json({
                status: 'error',
                message: 'Error while query.'
            });
        }
        return res.status(200).json({
            status: 'ok',
            message: 'Status został zmieniony.'
        });
    });
});

module.exports = router;