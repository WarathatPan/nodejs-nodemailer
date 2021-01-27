const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');

// Controllers
const emailNotifyController = require('./controllers/emailNotifyController')

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

const port = process.env.PORT || 4444;

app
  .post('/api/email_notify', emailNotifyController)

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

module.exports = app;
