const emailNotifyService = require('../models/emailNotify');
const inputValidator = require('../utils/inputValidator');

require('dotenv').config();

const emailNotifyController = async (req, res) => {
  const validation = inputValidator(req.body, ['from', 'to', 'subject', 'message', 'clientId', 'clientSecret', 'refreshToken', 'accessToken']);

  if (!validation.isValid) {
    const message = `Input ${validation.invalidFields.join(', ')} not found value.`;

    return res.status(400).json({
      message,
    });
  }

  const result = await emailNotifyService({
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    message: req.body.message,
    clientId: req.body.clientId,
    clientSecret: req.body.clientSecret,
    refreshToken: req.body.refreshToken,
    accessToken: req.body.accessToken
  });
  
  return res.status(200).json(result);
}

module.exports = emailNotifyController;