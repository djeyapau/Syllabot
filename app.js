
var restify = require('restify');
var builder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');
var fs = require("fs");
var bodyParser = require("body-parser");
var builder = require('./core/');

//app.use(bodyParser.urlencoded({extended: true}));

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot

var connector = new builder.ChatConnector({
 appId: '23f5bba6-e1cb-48bf-a655-2253b6edc447',
 appPassword: 'gAZL0frFRO5WDTeeTiNNuPg'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
/*
var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: 'd8d575b5-df88-4d42-a43d-fdd65f9b3bf4', 
	subscriptionKey: 'd68d61ed05f44a01a6f14ed26e67b896'});
	
var basicQnAMakerDialog = new cognitiveservices.QnAMakerDialog({ 
	recognizers: [recognizer],  
	defaultMessage: 'Try again!',
	qnaThreshold: 0.1});

bot.dialog('/', basicQnAMakerDialog); 
*/

//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

//=========================================================
// Bots Global Actions
//=========================================================

bot.endConversationAction('goodbye', 'Goodbye :)', { matches: /^bye/i });
bot.beginDialogAction('help', '/help', { matches: /^help/i });

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        var card = new builder.HeroCard(session)
            .title("Microsoft Bot Framework")
            .text("Your bots - wherever your users are talking.")
            .images([
                 builder.CardImage.create(session, "http://docs.botframework.com/images/demo_bot_image.png")
            ]);
        //var msg = new builder.Message(session).attachments([card]);
        //session.send(msg);
        session.send("Hola! I am syllabot and I can answer all your questions related to the course syllabus!");
        session.beginDialog('/help');
    },
    function (session, results) {
        // Display menu
        session.beginDialog('/menu');
    },
    function (session, results) {
        // Always say goodbye
        session.send("Ok... See you later!");
    }
]);

bot.dialog('/menu', [
    function (session) {
        builder.Prompts.choice(session, "Which course is your question on?", "cloud|web|android|weather|(quit)");
    },
    function (session, results) {
        if (results.response && results.response.entity != '(quit)') {
            // Launch demo dialog
            session.beginDialog('/' + results.response.entity);
        } else {
            // Exit the menu
            session.endDialog();
        }
    },
    function (session, results) {
        // The menu runs a loop until the user chooses to (quit).
        session.replaceDialog('/menu');
    }
]).reloadAction('reloadMenu', null, { matches: /^menu|show menu/i });

bot.dialog('/help', [
    function (session) {
        session.endDialog("Global commands that are available anytime:\n\n* menu - Exits a demo and returns to the menu.\n* goodbye - End this conversation.\n* help - Displays these commands.");
    }
]);

bot.dialog('/cloudqna', [
    function (session) {
        builder.Prompts.text(session, "Shoot out 'a question'.");
    },
    function(session, results) {
         if (results.response != 'quit') {
//var res = ((results.response).match(/name/i))?"true":"false";
var question = results.response;
if(question.match(/course/i))
{
    if(question.match(/name/i))
        session.send("Cloud Computing Technologies");
    else if(question.match(/grad/i) && question.match(/under/i) && question.match(/code/i))
    session.send("ITMO 444");
    else if(question.match(/grad/i) && question.match(/code/i))
    session.send("ITMO 544");
    else if(question.match(/prerequisites/i))
    session.send("ITMD 411/510 & ITMO 456/556");
    else if(question.match(/catalog/i) && question.match(/description/i))
    session.send("Computing applications hosted on dynamically-scaled virtual resources available as services are considered. Collaborative and non-collaborative 'cloud-resident' applications are analyzed with respect to cost, device/location independence, scalability, reliability, security, and sustainability. Commercial and local cloud architectures are examined. A group-based integration of course topics will result in a project employing various cloud computing technologies.");
    else if(question.match(/objective/i))
    session.send("Each successful student will be able to demonstrate building and running cloud-based services on a large scale. They will gain the knowledge of deploying and managing elastic and cloud based applications on industry standard platforms as well as opensource platforms. Students will be prepared with knowledge of Cloud Based Operations and Application Development.");
    else if(question.match(/outcome/i))
    session.send("Students completing this course will be able to:\n\nBe able to explain the fundamental aspects of IaaS\n\nUse and administer Industry Standard cloud resources\n\nBuild and deploy your own elastic scaling application on a cloud platform\n\nBe able to explain the difference between scale up vs scale out architecture\n\nUnderstand how to design for services and not servers.");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/class/i))
{
    if(question.match(/day/i))
        session.send("Tuesday and Thursday");
    else if(question.match(/tim/i))
    session.send("10:00 - 11:40");
    else if(question.match(/place/i) || question.match(/hall/i) || question.match(/num/i) || question.match(/location/i))
    session.send("Wishnick hall, 115");
    else if(question.match(/hour/i))
    session.send("2.000");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/faculty/i) || question.match(/teach/i) || question.match(/prof/i) || question.match(/instructor/i))
{
    if(question.match(/name/i))
        session.send("Jeremy Hajek");
    else if(question.match(/num/i))
    session.send("(630) 296-4012");
    else if(question.match(/office/i))
    {
        if(question.match(/hour/i))
    session.send("2.000");
    else if(question.match(/day/i))
    session.send("Tuesday & Thursday");
    else if(question.match(/tim/i))
    session.send("1:00pm - 3:00pm or after class");
    else if(question.match(/place/i) || question.match(/location/i))
    session.send("Main campus");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/email/i))
session.send("hajek@iit.edu");
else if(question.match(/skype/i))
session.send("jeremy.hajek")
else
session.send("Can you restructure your question, please?");
}
else if(question.match(/credit/i))
{
    if(question.match(/result/i))
    session.send("ITM-enrolled students will receive, upon successful completion of the course, 3 semester hours of credit.");
    else if(question.match(/hour/i))
    session.send("3.000");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/lab/i))
{
if(question.match(/hour/i))
    session.send("2.000");
    else if(question.match(/day/i))
    session.send("Laboratory activities will sometimes be integrated with the lectures and will take place online and possibly in class.");
    else if(question.match(/tim/i))
    session.send("Laboratory activities will sometimes be integrated with the lectures and will take place online and possibly in class.");
    else if(question.match(/place/i) || question.match(/hall/i) || question.match(/num/i) || question.match(/location/i))
    session.send("Wishnick hall, 115");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/blackboard/i))
{
    if(question.match(/what is/i) || question.match(/defin/i) || question.match(/work/i) || question.match(/job/i) || question.match(/respons/i))
    session.send("Blackboard is a Learning Management System which we will use for our course. Each student should have been notified of his or her Blackboard account for this course. If you have not been notified, go to above web page where there is contact information. Be familiar with how to use Blackboard.");
    else if(question.match(/login/i) || (question.match(/how/i) && question.match(/use/i)))
    session.send("blackboard.iit.edu\n\nvia my.iit.edu\n\nhttps://sites.google.com/a/iit.edu/blackboard/");
    else if(question.match(/usage/i) || question.match(/use/i))
    session.send("communicate\n\nhomework submission\n\nquestions\n\nfeedback");
    else
    session.send("Can you restructure your question, please?");
}
else if((question.match(/home/i) && question.match(/work/i)) || question.match(/assign/i) || question.match(/week/i))
{
    if(question.match(/release/i) || question.match(/give/i) || question.match(/upload/i))
session.send("Thursday of class week ");
if(question.match(/due/i) || question.match(/deadline/i) || (question.match(/submit/i) && question.match(/home/i)))
session.send("following Thursday, 11:59 PM");
}
else if((question.match(/home/i) && question.match(/work/i)) || question.match(/review/i) || question.match(/question/i))
{
 if(question.match(/release/i) || question.match(/give/i) || question.match(/upload/i))
session.send("Thursday of class week ");
if(question.match(/due/i) || question.match(/deadline/i) || (question.match(/submit/i) && question.match(/home/i)))
session.send("following Saturday (10 days), 11:59 PM");
}   
else
session.send("Can you restructure your question, please?");

         session.beginDialog('/cloudqna');
        }
         else {
            session.endDialog();
        }
    }
]);

bot.dialog('/prompts', [
    function (session) {
        session.send("Our Bot Builder SDK has a rich set of built-in prompts that simplify asking the user a series of questions. This demo will walk you through using each prompt. Just follow the prompts and you can quit at any time by saying 'cancel'.");
        builder.Prompts.text(session, "Prompts.text()\n\nEnter some text and I'll say it back.");
    },
    function (session, results) {
        session.send("You entered '%s'", results.response);
        builder.Prompts.number(session, "Prompts.number()\n\nNow enter a number.");
    },
    function (session, results) {
        session.send("You entered '%s'", results.response);
        session.send("Bot Builder includes a rich choice() prompt that lets you offer a user a list choices to pick from. On Facebook these choices by default surface using Quick Replies if there are 10 or less choices. If there are more than 10 choices a numbered list will be used but you can specify the exact type of list to show using the ListStyle property.");
        builder.Prompts.choice(session, "Prompts.choice()\n\nChoose a list style (the default is auto.)", "auto|inline|list|button|none");
    },
    function (session, results) {
        var style = builder.ListStyle[results.response.entity];
        builder.Prompts.choice(session, "Prompts.choice()\n\nNow pick an option.", "option A|option B|option C", { listStyle: style });
    },
    function (session, results) {
        session.send("You chose '%s'", results.response.entity);
        builder.Prompts.confirm(session, "Prompts.confirm()\n\nSimple yes/no questions are possible. Answer yes or no now.");
    },
    function (session, results) {
        session.send("You chose '%s'", results.response ? 'yes' : 'no');
        builder.Prompts.time(session, "Prompts.time()\n\nThe framework can recognize a range of times expressed as natural language. Enter a time like 'Monday at 7am' and I'll show you the JSON we return.");
    },
    function (session, results) {
        session.send("Recognized Entity: %s", JSON.stringify(results.response));
        builder.Prompts.attachment(session, "Prompts.attachment()\n\nYour bot can wait on the user to upload an image or video. Send me an image and I'll send it back to you.");
    },
    function (session, results) {
        var msg = new builder.Message(session)
            .ntext("I got %d attachment.", "I got %d attachments.", results.response.length);
        results.response.forEach(function (attachment) {
            msg.addAttachment(attachment);    
        });
        session.endDialog(msg);
    }
]);

bot.dialog('/cloud', [
    function (session) {
        session.send("Here are a few topics your questions can be on:");
        session.send("Course\n\nClass\n\nFaculty\n\nCredit\n\nLab\n\nBlackboard\n\nHomework\n\nGrade Split-up\n\nGrade criteria\n\nBook\n\nTimetable\n\nMiscellaneous"); 
        session.send("Enter quit if you want to go to a different course.");
        session.beginDialog('/cloudqna');
    }
]);

bot.dialog('/web', [
    function (session) {
        session.endDialog("web");
    }
]);

bot.dialog('/android', [
    function (session) {
        session.endDialog("android");
    }
]);

// Create a dialog and bind it to a global action
bot.dialog('/weather', [
    function (session, args) {
        session.endDialog("The weather in %s is 71 degrees and raining.");
    }
]);
bot.beginDialogAction('weather', '/weather');   // <-- no 'matches' option means this can only be triggered by a button.