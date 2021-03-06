// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};


// const express = require('express');
// const serverlessHTTP = require('serverless-http');

// const app = express();
// app.get('/', (req, res) => {
//   res.send('Hello from express /!');
// })
// app.get('/test', (req, res) => {
//     res.send('Hello from express /test!');
//   })

// exports.newHandler = serverlessHTTP(app);


const createApp = require('ringcentral-chatbot/dist/apps').default
const serverlessHTTP = require('serverless-http')

const handle = async event => {
const { type, text, group, bot } = event
    if (type === 'Message4Bot' && text === 'ping') {
        await bot.sendMessage(group.id, { text: 'pong' })
    }
}
const app = createApp(handle)
exports.newHandler = serverlessHTTP(app)
