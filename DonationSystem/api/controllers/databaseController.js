const mysql = require('mysql');
const { databaseConfig } = require('../config/config.js');
const timeUtil = require('../utils/timeUtil.js');

let connect = false;

let connection = undefined;

exports.isConnect = () => {
    return connect;
};

exports.getConnection = () => {
    if(!connect) {
        console.log(`[${timeUtil.getDateTime()}] Database is not connected.`);
        return;
    }
    return connection;
} 


exports.createConnection = () => {
    console.log(`[${timeUtil.getDateTime()}] Create connection to database.`)
    connection = mysql.createConnection({
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.database
    });

    connection.connect(error => {
        console.log(`[${timeUtil.getDateTime()}] Connecting...`)
        if(error){
            console.log(`[${timeUtil.getDateTime()}] Error while creating connection.`);
            connect = false;
            return this;
        } else {
            console.log(`[${timeUtil.getDateTime()}] Database connected successful.`);
            connect = true;
            return this;
        }
    });
} 