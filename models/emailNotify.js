const nodemailer = require('nodemailer')

require('dotenv').config()

// crypt password
const crypt = require('./helper/crypt')
const gmail_password = process.env.GMAIL_PASSWORD || ''
const encryptedPassword = crypt.encrypt(gmail_password)
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: crypt.decrypt(encryptedPassword),
  },
});

function emailNotifyService(to, subject, message, res) {
  const mailOptions = {
    from: process.env.GMAIL_FROM,
    to,
    subject,
    html: message,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(info.response);
    }
  });
}

module.exports = emailNotifyService;
