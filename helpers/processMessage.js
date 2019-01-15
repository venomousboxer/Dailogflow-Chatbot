const API_AI_TOKEN = 'e8023b6da76e42d381c2d3ac04067ed7'
const apiAiClient = require('apiai')(API_AI_TOKEN)

const FACEBOOK_ACCESS_TOKEN = 'EAAfnNhtpG70BACDtSafieFZAAMcXm9NXNO65iWZCmv0hhS3ULnRa4PZArxbQDpkvLkZCoOxqjAtuQagiEI6MlgHPGkpEN5w61flRaZCamhDpNp3h2GYHZA95g7OHWZC9KUvVZBwtEZCeGNzmo2S84lQXcRkCMjVXJBV1ZCEsaZCMhF9GoL8f4RKnZAAb'
const request = require('request')

const sendTextMessage = (senderId,text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs : {access_token: FACEBOOK_ACCESS_TOKEN },
        method : 'POST',
        json : {
            recipient: { id:senderId},
            message: {text},
        }
    })
}

module.exports = (event) => {
    const senderId = event.sender.id
    const message = event.message.text

    const apiaiSession = apiAiClient.textRequest(message,{sessionId:'crowdrobotics_bot'})

    apiaiSession.on('response',(response)=>{
        const result = response.result.fulfillment.speech
        sendTextMessage(senderId,result)
    })
    apiaiSession.on('error',error=>{console.log(error)})
    apiaiSession.end()

}
