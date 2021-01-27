const emailNotifyService = require('../models/emailNotify');

require('dotenv').config()

var token =  process.env.TOKEN_LINE_NOTIFY || null;

const emailNotifyController = (req, res) => {
  if (req.body.to && req.body.subject && req.body.message) {
    emailNotifyService(req.body.to, req.body.subject, req.body.message, res);
  } else if (!req.body.to && req.body.subject && req.body.message) {
    res.status(400).json({
      message: 'Input to not found value.',
    });
  } else if (req.body.to && !req.body.subject && req.body.message) {
    res.status(400).json({
      message: 'Input subject not found value.',
    });
  } else if (req.body.to && req.body.subject && !req.body.message) {
    res.status(400).json({
      message: 'Input message not found value.',
    });
  } else if (!req.body.to && !req.body.subject && req.body.message) {
    res.status(400).json({
      message: 'Input to and subject not found value.',
    });
  } else if (req.body.to && !req.body.subject && !req.body.message) {
    res.status(400).json({
      message: 'Input subject and message not found value.',
    });
  } else if (!req.body.to && req.body.subject && !req.body.message) {
    res.status(400).json({
      message: 'Input to and message not found value.',
    });
  } else {
    res.status(400).json({
      message: 'Input to, subject and message not found value.',
    });
  }
}

module.exports = emailNotifyController;