// Add your requirements
var restify = require('restify'); 
var builder = require('botbuilder'); 
var cognitiveservices = require('botbuilder-cognitiveservices');

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
bot.dialog('/', BasicQnAMakerDialog);

// QnA Maker Dialogs

var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: 'd8d575b5-df88-4d42-a43d-fdd65f9b3bf4', 
	subscriptionKey: 'd68d61ed05f44a01a6f14ed26e67b896'});

var BasicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({ 
	recognizers: [recognizer],
	defaultMessage: 'I am not sure. Let me check and get back to you.',
	qnaThreshold: 0.5});