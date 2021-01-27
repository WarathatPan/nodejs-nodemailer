const emailNotifyService = require('../models/emailNotify');

require('dotenv').config();

const emailNotifyController = async (req, res) => {
  if (req.body.to && req.body.subject && req.body.message) {
    const result = await emailNotifyService({to:req.body.to, subject:req.body.subject, message:req.body.message});
    if (result.statusCode == 200) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
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