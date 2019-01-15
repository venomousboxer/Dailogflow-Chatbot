const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true }))

app.listen(3000,()=>{console.log('webhook server is listening on port 3000')})

const verificationController = require('./controllers/verification');
const messageWebhookController = require('./controllers/messageWebhooks');
app.get('/', verificationController);
app.post('/', messageWebhookController);