var holidaySchema = require('./models/holidayModel');
var config = require('./config');
var mongoose = require('mongoose');

var csvFilePath = './assets/holidays2019.csv';
var csv = require('csvtojson');


mongoose.connect(config.getDbConnectionString());
(async () => {
    var results = await csv().fromFile(csvFilePath);
    results.forEach(result => {
        var holiday = new Date(result.Date + ' 2019').toLocaleDateString("ja-JP", {year:'numeric', month: 'long', day: 'numeric'});
        holidaySchema.findOne({ "holiday": holiday }, function (err, result) {
            if(!result) {
                holidaySchema.create({holiday: holiday}, function (err, result) {
                    if(err) {
                        console.error(err);
                    } console.log(result);
                });
            }
        })

    });
})();