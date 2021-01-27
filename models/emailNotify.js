const nodemailer = require('nodemailer');

require('dotenv').config();

// crypt password
const crypt = require('../utils/crypt');
const gmail_user = process.env.GMAIL_USER || '';
const gmail_password = process.env.GMAIL_PASSWORD || '';
const gmail_from = process.env.GMAIL_FROM || '';
const encryptedPassword = crypt.encrypt(gmail_password);
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: gmail_user,
    pass: crypt.decrypt(encryptedPassword),
  },
});

/**
 * 
 * @param to to
 * @param subject subject
 * @param message message
 * @return messageJson { statusCode: number, info: Object{} } 
 * @usage emailNotifyService({to, subject, message})
 */
function emailNotifyService({to, subject, message}) {
  const mailOptions = {
    from: gmail_from,
    to,
    subject,
    html: message,
  };

  return new Promise(function (resolve, reject) {
    transport.sendMail(mailOptions, (err, info) => {
      if (!err) {
        const messageJson = {
          statusCode: 200,
          info: info,
        };
        resolve(messageJson);
      } else {
        const messageJson = {
          statusCode: 400,
          err: err,
        };
        reject(messageJson);
      }
    });
  });
}

module.exports = emailNotifyService;
