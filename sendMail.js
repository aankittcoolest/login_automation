var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

var mailOptions = {
        from: process.env.EMAIL
}
    
function configureMailOptions(options) {
    mailOptions.to = options.to;
    mailOptions.subject = options.subject;
    mailOptions.text = options.text;
    if(options.filename) {
        mailOptions.attachments = [{
            filename: options.filename,
            path: options.path
        }];
    }
}

module.exports = {
    sendMail: function sendMail(options) {
        configureMailOptions(options)
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent successfully: ' + info.response);
            }
        })
    }
}