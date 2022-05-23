const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { websiteConfig } = require('./config/config.js');

const transactionColtroller = require('./controllers/transactionController.js');
const databaseController = require('./controllers/databaseController.js');

const transactionRouter = require('./routes/transactionRouter.js');
const queueRouter = require('./routes/queueRouter.js');
const configurationRouter = require('./routes/configurationRouter.js');

const timeUtil = require('./utils/timeUtil.js');

const app = express(); 

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

databaseController.createConnection();
transactionColtroller.initPayment();

app.use((req, res, next) => {
    console.log(timeUtil.getDateTime(), req.originalUrl);
    next();
});

app.use('/', transactionRouter);
app.use('/', queueRouter);
app.use('/', configurationRouter);

app.listen(websiteConfig.apiPort, () => console.log(`[${timeUtil.getDateTime()}] Api started on port: ${websiteConfig.apiPort}.`));