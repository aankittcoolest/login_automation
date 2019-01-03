
var username = process.env.MONGOOSE_USERNAME;
var password = process.env.MONGOOSE_PASSWORD;

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb://' + username + ':' + password + '@ds235833.mlab.com:35833/node-todo';
    }
}