// step 1 : import 
require('dotenv').config()
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');



// step 2 : create auth object
const auth = {
    auth: {
        api_key: process.env.API_KEY || '92fbba3340d55791b469754ed108fa9a-53c13666-e46ce901', // TODO: Replace with your mailgun API KEY
        domain: process.env.DOMAIN || 'notifications.morbius.co' // TODO: Replace with your mailgun DOMAIN
    }
};
console.log(auth)
// step 3 : create transporter
const transporter = nodemailer.createTransport(mailGun(auth));

// step 4 : 
const sendOnboardingEmail = async(name,email, subject,lecture_attended,lectures_alloted,cb) => {

    const contextObject = {
        type: '101 Musicals Academy -  Notifications',
        name:name,
        email: email,
        lecture_attended:lecture_attended,
        lectures_alloted:lectures_alloted
      };
    const mailOptions = {
        from: process.env.EMAIL, // TODO replace this with your own email
        to: email, // TODO: the receiver email has to be authorized for the free tier
        cc:['mithilesh.tarkar@gmail.com'],
        subject,
        template: {
            name: 'attendance_email.hbs',
            engine: 'handlebars',
            context: contextObject
          }
    };

   await transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}



module.exports = sendOnboardingEmail;
