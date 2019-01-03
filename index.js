var mongoose = require('mongoose');
var config = require('./config');
var holidaySchema = require('./models/holidayModel');
var login = require('./login');

var today = new Date().toLocaleDateString("ja-JP", {year:'numeric', month: 'long', day: 'numeric'});

mongoose.connect(config.getDbConnectionString(), () => {
    holidaySchema.findOne({holiday: today}, (err, result) => {
        if(err) {
            console.error(err);
        }
        if(result) {
            login.loginAutomation(today.replace(',','').replace(/ /g,'-'));
        }
        mongoose.connection.close();
    })
});
