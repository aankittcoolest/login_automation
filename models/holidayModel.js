var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var holidaySchema = new Schema({
    holiday: String
});

var Holidays = mongoose.model('Holidays', holidaySchema);
module.exports = Holidays;