
const CronJob = require('cron').CronJob;
const sendMessage = new CronJob('0 12 * * * *', function() {

  console.log('You will see this message every second');

}, null, true, 'America/Los_Angeles');

const lunchCron = () => {
    sendMessage.start();
}


module.exports = {
    lunchCron
}
