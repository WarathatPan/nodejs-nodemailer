const nodemailer = require('nodemailer');

/**
 * 
 * @param from from
 * @param to to
 * @param subject subject
 * @param message message
 * @param clientId clientId
 * @param clientSecret clientSecret
 * @param refreshToken refreshToken
 * @param accessToken accessToken
 * @return messageJson { statusCode: number, info: Object{} } 
 * @usage emailNotifyService({to, subject, message})
 */

function emailNotifyService({from, to, subject, message, clientId, clientSecret, refreshToken, accessToken}) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: from,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    }
  });

  const mailOptions = {
    from: from,
    to,
    subject,
    html: message,
  };

  return new Promise((resolve, reject) => {
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
  }).catch((err) => {
    const messageJson = {
      statusCode: 400,
      err: err,
    };
    console.log('err==> ', err);
    return messageJson;
  });
}

module.exports = emailNotifyService;
