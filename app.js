// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.PORT || 3000, function() 
{
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector
({ appId: '1aa43322-c399-4889-b711-e401c6da4a50', appPassword: 'hS8f7u8Dcxrwjq7G93WfeTs' }); 
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create bot dialogs
bot.dialog('/', function (session) {
    session.send("Hello World");
});

POST /knowledgebases/d8d575b5-df88-4d42-a43d-fdd65f9b3bf4/generateAnswer
Host: https://westus.api.cognitive.microsoft.com/qnamaker/v1.0
Ocp-Apim-Subscription-Key: d68d61ed05f44a01a6f14ed26e67b896
Content-Type: application/json
{"question":"hi"}