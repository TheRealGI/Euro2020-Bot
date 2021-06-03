const moment = require('moment');

const getUtcDate = function (date) {
    return moment.utc(date).format("YYYY-MM-DD");
}

const getUTCTimestamp = function (date) {
    return moment.utc(date).format("HH:mm");
}

module.exports = { getUtcDate, getUTCTimestamp };