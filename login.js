const puppeteer = require('puppeteer');
var mail = require('./sendMail');

function successMail(filePath) {
    mail.sendMail({
        to: process.env.RECEIVER_MAIL,
        subject: '\u{1F63B} Login successful to dashboard',
        text: 'Login successful to dashboard',
        filename: 'image.png',
        path: filePath
    })
}

function failureMail(log) {
    mail.sendMail({
        to: process.env.RECEIVER_MAIL,
        subject: '\u{1F63B} Login Failed',
        text: `${log}`,
    })

}

function handleError(error) {
    throw Error(error);
}

module.exports = {
    loginAutomation: async function loginAutomation(date) {
        const browser = await puppeteer.launch({ headless: false })
        try {
            const page = await browser.newPage().catch(handleError)

            //logout user, if user is logged in.
            await page.goto('https://github.com/logout').catch(handleError)
            await page.click('#js-pjax-container > div > form > input.btn.btn-block.f4.py-3.mt-5').catch(handleError)


            //login user
            await page.goto('https://github.com/login').catch(handleError)
            await page.focus('#login_field').catch(handleError)

            //TODO get username and password from environment variables.
            await page.keyboard.type(process.env.GITHUB_USERNAME).catch(handleError)
            await page.focus('#password').catch(handleError)
            await page.keyboard.type(process.env.GITHUB_PASSWORD).catch(handleError)
            await page.click('#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block').catch(handleError)
            await page.waitForNavigation({ waitUntil: 'networkidle0' });

            //Used to debug login failure
        //    await page.waitForXPath('#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block').catch(handleError);

            const screenshotPath = './assets/evidences/' + date + '-dashboard.png'
            await page.screenshot({ path: screenshotPath }).catch(handleError)

            await browser.close();
            successMail(screenshotPath);

        } catch(err) {
            browser.close();
            failureMail(err);
        }
    }
};