const moment = require('moment');

module.exports.getDateTime = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}