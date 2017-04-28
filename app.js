
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
        builder.Prompts.choice(session, "Which course is your question on?", "ITMD444_544_Cloud_computing_technologies|ITMD455_555_Intelligent_Device_Applications|(quit)");
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
var week = 'week';
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
else if(question.match(/grade/i))
{
	if(question.match(/split/i))
	{
		if(question.match(/live/i))
		{
			session.send("A total of 910 points are available\n\n5 points for participation/attendance per session (for live section students)\n\n29 sessions * 5 (plus 5 free points) = 150\n\n20 points per weekly assignments (10 assignments) = 200\n\n2 MPs (mini projects) will be outcomes of the lectures and will build upon each other leading to the final project and presentation, worth 50 points each = 100\n\n1 Final project worth 100 points\n\n1 Final Exam worth 100 points\n\n13 Chapter review questions 20 points each = 260");
		}
		if(question.match(/online/i))
		{
			session.send("A total of 760 points are available\n\n20 points per weekly assignments (10 assignments) = 200\n\n2 MPs (mini projects) will be outcomes of the lectures and will build upon each other leading to the final project and presentation, worth 50 points each = 100\n\n1 Final project worth 100 points\n\n1 Final Exam worth 100 points\n\n13 Chapter review questions 20 points each = 260");
		}
	}
	if(question.match(/criteria/i))
	{
		if(question.match(/under/i) && question.match(/grad/i))
		{
			session.send("A Outstanding work reflecting substantial effort......................................................................90-100% \n\nB Satisfactory work fully meeting expectations………….........................................................80-89.99% \n\nC Satisfactory work meeting minimal expectations.................................................................70-79.99% \n\nD Substandard work not meeting expectations. ........................................................................60-69.99% \n\nE Unsatisfactory work .....................................................................................................................0-64.99%");
		}
		else if (question.match(/grad/i))
		{
			session.send("A Outstanding work reflecting substantialeffort......................................................................90-100% \n\nB Satisfactory work fully meeting expectations………….........................................................80-89.99% \n\nC Substandard work not meeting expectations.........................................................................65-79.99% \n\nE Unsatisfactory work .....................................................................................................................0-64.99%");
		}
		else
			session.send("Can you restructure your question, please?");
	}	
}
else if(question.match(/book/i))
{
	if(question.match(/name/i))
		session.send("The Practice of Cloud System Administration: Designing and Operating Large Distributed Systems");
	if(question.match(/volume/i))
		session.send("2");
	if(question.match(/ISBN/i))
		session.send("978-0321943187");
	if(question.match(/publisher/i))
		session.send("Addison-Wesley Professional");
	if(question.match(/date/i))
		session.send("9/15/2014");
	if(question.match(/page/i))
		session.send("560");
}
else if(question.match(/weak/i))
{
	if(question.match(/10/i))
		session.send("Oct 25 & 27 Service Delivery: Deployment Phase Chapter 10");
	else if(question.match(/11/i))
		session.send("Nov 01 & 03 Upgrading Live Services Chapter 11");
	else if(question.match(/12/i))
		session.send("Nov 08 & 10 Automation Chapter 12");
	else if(question.match(/13/i))
		session.send("Nov 15 & 17 Design Documents & Monitoring Chapter 13, 16, 17");
	else if(question.match(/14/i))
		session.send("Nov 22 & 24 TBA Guest Speaker TBA");
	else if(question.match(/15/i))
		session.send("Dec 29 & Dec 1 TBA Guest Speaker and Exam Review TBA");
	else if(question.match(/16/i))
		session.send("Week of Dec 05th TBA -Final Examination");
	else if(question.match(/1/i))
		session.send("Aug 23 & 25 Thinking Cloud Preface & Intro");
	else if(question.match(/2/i))
		session.send("Aug 30 & Sept 1 Designing in a Distributed World Chapter 1");
	else if(question.match(/3/i))
		session.send("Sept 06 & 08 Designing For Operations/ Service Platforms Chapter 2 & 3");
	else if(question.match(/4/i))
		session.send("Sept 13 & 15 Application Architectures Chapter 4");
	else if(question.match(/5/i))
		session.send("Sept 20 & 22 Design Patterns for Scaling Chapter 5");
	else if(question.match(/6/i))
		session.send("Sept 27 & 29 Design Patterns for Resiliency Chapter 6");
	else if(question.match(/7/i))
		session.send("Oct 04 & 06 Operations in a Distributed World Chapter 7");
	else if(question.match(/8/i))
		session.send("Oct 11 & 13 DevOps Culture Chapter 8");
	else if(question.match(/9/i))
		session.send("Oct 18 & 20 Service Delivery: Build Phase Chapter 9");
	else
		session.send("Can you restructure your question, please?");
}
else if(question.match(/responsibility/i))
	session.send("Class attendance and active participation are essential if students are to receive maximum benefit from the class. Participation require preparation including completion of reading, labs, assignments and exams by the due dates. If you cannot attend class or complete assignments, labs, or exams on time, please let the instructor know beforehand so that we can discuss alternative strategies. It is the student’s benefit to use their time wisely whether it is in preparation for class, during scheduled class, or in the lab. When students are in any IIT lab environment, they should abide by the college policies. Questions and comments are welcome.");
else if(question.match(/academic/i) && question.match(/policy/i))
	session.send("Any violations of IIT policies regarding academic honesty and or integrity will be referred automatically to the appropriate college authorities for disposition. Please see appropriate pages in the college catalog for definitions and regulations. The minimum penalty for cheating will be a zero for all parties involved on that exam, assignment, lab or quiz. Bottom line: don’t do it.");
else if(question.match(/withdraw/i) && question.match(/policy/i))
	session.send("No longer attending class does not constitute an automatic withdrawal.");
else if(question.match(/behavior/i))
	session.send("During the class time, considerate conduct by all persons is important to a favorable learning environment. Any infringement on the rights of others to get an education will be dealt with in an appropriate manner. Please set all electronic devices such as cell phones or pages to silent modes. Don’t let you phone go off in the class.");
else if(question.match(/honesty/i))
	session.send("During the class time, considerate conduct by all persons is important to a favorable learning environment. Any infringement on the rights of others to get an education will be dealt with in an appropriate manner. Please set all electronic devices such as cell phones or pages to silent modes. Don’t let you phone go off in the class.");
else if(question.match(/plagiarism/i))
	session.send("All work you submit in this course must be your own. You must fully attribute all material directly quoted in papers and you must document all sources used in the preparation of the paper using APA- style bibliographic entries. No more than thirty-three percent of material included in any paper may be direct quotes. Students have submitted plagiarized material to me frequently over the last five years and I will not tolerate it. If you submit plagiarized material you can expect to receive a grade of ZERO for the assignment, and it may result in your expulsion from the course with a failing grade as per the *IIT Code of Academic Honesty* found in the IIT Student Handbook.");
else if(question.match(/contract/i))
	session.send("This syllabus is my contract with you as to what I will deliver and what I expect from you. If I change the syllabus, I will issue a revised version of the syllabus; the latest version will always be available on Blackboard. Areas with changes will be indicated by a black bar in the right-hand margin of the page.");
else if(question.match(/disabilities/i))
	session.send("Reasonable accommodations will be made for students with documented disabilities. In order to receive accommodations, students must obtain a letter of accommodation from the Center for Disability Resources and make an appointment to speak with me as soon as possible. My office hours are listed on the first page of the syllabus. The Center for Disability Resources (CDR) is located in 3424 S. State St., room 1C3-2 (on the first floor), telephone 312.567.5744 or disabilities@iit.edu");
else
session.send("Can you restructure your question, please?");

         session.beginDialog('/cloudqna');
        }
         else {
            session.endDialog();
        }
    }
]);

bot.dialog('/androidqna', [
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
        session.send("Intelligent Device Application");
    else if(question.match(/grad/i) && question.match(/under/i) && question.match(/code/i))
    session.send("ITMO 455");
    else if(question.match(/grad/i) && question.match(/code/i))
    session.send("ITMO 555");
    else if(question.match(/prerequisites/i))
    session.send("ITM 311 with min. grade of D");
    else if(question.match(/catalog/i) && question.match(/description/i))
    session.send("Intelligent device application development is covered with various technologies on mobile and robotic platforms. Utilizing contemporary toolkits, the student considers design and development on emulated and real 'smart' devices including smart phones, personal digital assistants, sensors, actuators, and robots. Numerous exercises reinforce concepts gained throughout the course. A term project will integrate course topics into a comprehensive intelligent device application. This course may be taken more than once but only for 6 hours of ITM 455/555 or ITMD 455/555. (Credits: 2-2-3)");
    else if(question.match(/objective/i))
    session.send("Engage students in learning about Mobile Application development. This section will focus on mobile applications for Android platforms . Students will learn how to successfully build and publish apps for the Android Marketplace.");
    else if(question.match(/outcome/i))
    session.send("On successful completion of this unit, students will be able to:\n\nA. Understand the technical challenges posed by current mobile devices, including competitive devices and wireless communications; be able to evaluate and select appropriate solutions.\n\nB. Appreciate the need to keep up with rapid changes and new developments; be able to identify current trends in mobile communications technologies and systems.  Use of mobile analytics.\n\nC. Select and evaluate suitable software tools and Google APIs for the development of a particular mobile application and understand their strengths, scope and limitations. \n\nD. Use an appropriate application development to design, write and test small interactive programs for mobile devices (cells or tablets). \n\nE. Demonstrate a deployable working app to sites such to Google’s Play store and similar type stores.\n\nF. Work a fully documented, including wiring the protoype model of the app and presentation of the mobile app. Themes are selected based on current trends in the mobile world");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/faculty/i) || question.match(/teach/i) || question.match(/prof/i) || question.match(/instructor/i))
{
    if(question.match(/name/i))
        session.send("James Papademas, MBA, MSMC, MISM");
    else if(question.match(/num/i))
    session.send("773.558.7866");
    else if(question.match(/office/i))
    session.send("At IIT Chicago Campus/per pre-arranged appointment.");
else if(question.match(/email/i))
session.send("jpapadem@iit.edu ");
else if(question.match(/skype/i))
session.send("james.papademas")
else
session.send("Can you restructure your question, please?");
}
else if(question.match(/lab/i))
{
    session.send("Lab programs will be based on the following point allocations:\n\nProgram correctness: 30 points\n\n(Your program runs and executes without errors, meeting all program requirements with readable program output display)\n\nDesign Approach and Documentation: 15 points\n\n(Program must follow standard programming style. Please examine programming styles from class demo’s, textbooks, proper usage of blocks and indentations, proper documentation, meaningful variable names, comment statements, algorithm development, and programming logic used/approach to resolve assigned problem.  Label each lab with your name at the top of your source code as well as your lab number!!! Each lab must have adequate snapshots of output for full credit as well.)\n\nProgram enrichments: 5 points\n\n(Error proof program, extra features included, OOP methodology consideration, reliability and ease of maintenance-above and beyond)");
}
else if(question.match(/blackboard/i))
{
    if(question.match(/what is/i) || question.match(/defin/i) || question.match(/work/i) || question.match(/job/i) || question.match(/respons/i))
    session.send("We will use IIT's Blackboard system (http://blackboard.iit.edu) to communicate weekly agendas, submit homework, labs, ask questions, to post lecture materials and get feedback. Each student should have been notified of his or her Blackboard account for this course. If you have not been notified, go to above web page where there is contact information.  Blackboard weeks start from Monday through Sunday.");
    else
    session.send("Can you restructure your question, please?");
}
else if(question.match(/grade/i))
{
	if(question.match(/split/i))
			session.send("Midterm- 		 100 points\n\nFinal -                  200 points\n\nFinal project-     200 points\n\nLabs (8) -            400 points\n\nTotal points-     900 points");
	if(question.match(/criteria/i))
		session.send("A – 90% and up\n\nB – 80 to < 89.99%\n\nC – 70 to < 79.99%\n\nD – 60 to < 69.99%\n\nF – 59 and below");
}
else if(question.match(/grad/i) && question.match(/expect/i))
	session.send("Applications will be fully documented and tested out in both debug mode and release modes\n\nAll types of IO will have exception handling included in your applications\n\nFinal project may include the following additions:\n\n-Google\n\nServices/API’s\n\n-Google Analytics\n\n-Google Cloud Messaging (GCM) Services incl. CCS (Cloud Connection Server)/XMPP + Delivery Receipt API\n\n-Application Signing\n\n-Publishing with Google Play, etc.\n\n-Application reporting & assessment\n\n-Securing the app\n\n-Database, File Processing");
else if(question.match(/weak/i))
{
	if(question.match(/10/i))
		session.send("Working in the background (Concurrency). Introducing Services, working with loaders, threads, alarms.	Chapter 9	Lab 8 assignment");
	else if(question.match(/11/i))
		session.send("Expanding the user experience. Working with action bars, navigation behavior (menus), dialogs, messages using Toast, notification manager.	Chapter 10	Final project assignment ");
	else if(question.match(/12/i))
		session.send("-Advanced user experience. Screen optimization, scalable graphics, animation. Hardware acceleration.  Interactive controls.                                                                                         -Hardware sensors. 	 Chapters 11-12");
	else if(question.match(/13/i))
		session.send("-Maps, GeoCoding, Location based Services\n\n-Multimedia (Audio & Video) playback.\n\n-Cloud to Device Messaging (Grads only)	Chapters 12 (cont’d), 13, 15               Chapter 18 (Grads only)");
	else if(question.match(/14/i))
		session.send("-Distributing Applications-Signing Applications & Analytics (Grads only)	Chapter 19");
	else if(question.match(/15/i))
		session.send("-Marketing your app, the Play Store-Final Exam Study	Comprehensive");
	else if(question.match(/1/i))
		session.send("Course overview. Intro to Android Studio- the SDK/IDE. 	Chapters 1-2");
	else if(question.match(/2/i))
		session.send("-Application manifest. Using resources. Activity cycles.      -Building user interfaces… Working the AVD (Android Virtual Device) Manager/Emulator. Debug Monitor.	Chapters 3-4	Lab 1 assignment");
	else if(question.match(/3/i))
		session.send("Intro to Fragments. Creating Views. Introducing Adapters.	Chapter 4 cont’d.	Lab 2 assignment");
	else if(question.match(/4/i))
		session.send("Intents and Broadcast Receivers.  Intro Linkify.	Chapter 5	Lab 3 assignment");
	else if(question.match(/5/i))
		session.send("Using Internet Resources. XML parsing. Using the Download Manager.	Chapter 6	Lab 4 assignment");
	else if(question.match(/6/i))
		session.send("Files, saving state and preferences 	Chapter 7	Lab 5 assignment");
	else if(question.match(/7/i))
		session.send("Databases. Intro to SQLite dbase.  Querying the dbase. 	Chapter 8	Lab 6 assignment");
	else if(question.match(/8/i))
		session.send("Databases cont’d. Content values and Cursors.   Content provider.  Search activity.   	Chapter 8 cont’d.	Lab 7 assignment");
	else if(question.match(/9/i))
		session.send("Mid Term study. Mid Term (in class, closed books/notes, devices, etc.) covering Chapters 1-8");
	else
		session.send("Can you restructure your question, please?");
}
else if(question.match(/responsibility/i))
	session.send("Class attendance and active participation are essential if students are to receive maximum benefit from the class. Participation requires preparation including completion of reading, labs, projects and exams by the due dates. If you cannot attend class or complete assignments, labs, projects or exams on time, please let the instructor know beforehand so that we can discuss alternative strategies. It is the student’s benefit to use their time wisely whether it is in preparation for class, during scheduled class, or in the lab. When students are in any IIT lab environment, they should abide by the college policies. Questions and comments are welcome.");
else if(question.match(/exam/i) && question.match(/policy/i))
	session.send("There will be a mid term and final exam for the course.  No retakes of exams are allowed unless there are extraordinary circumstances. Any exams may be taken early if the instructor is given adequate time to prepare testing arrangements. ");
else if(question.match(/assignments/i))
	session.send("It is extremely critical that students complete all assignments timely otherwise late points will be deducted accordingly.  Submitting assignments timely in the order assigned will ensure progression according to the academic design of the course.  The instructor will not accept bulk assignments.");
else if(question.match(/email reply/i))
	session.send("Every attempt will be made to answer email daily. Please indicate in your email clearly the problem you are experiencing in your subject and body of your email.  Please also include your name and course enrolled.");
else if(question.match(/academic/i) && question.match(/policy/i))
	session.send("Any violations of IIT policies regarding academic honesty and or integrity will be referred automatically to the appropriate college authorities for disposition. Please see appropriate pages in the college catalog for definitions and regulations. The minimum penalty for cheating will be a zero for all parties involved on that exam, assignment, lab, project or quiz.  ");
else if(question.match(/withdraw/i) && question.match(/policy/i))
	session.send("No longer attending a class does not constitute an automatic withdrawal. Students are expected to withdraw from the course if they have decided not to pursue the course anymore.");
else if(question.match(/classroom/i) && question.match(/behavior/i))
	session.send("During the class time, considerate conduct by all persons is important to a favorable learning environment. Any infringement on the rights of others to get an education will be dealt with in an appropriate manner. Please set all electronic devices such as cell phones or pagers to silent or vibrate mode. No cell phone talking is permitted in the classroom. If you must take the call, please continue your conversation outside of the classroom and please make it short so as to not miss your lecture material.");
else if(question.match(/general/i) && question.match(/note/i))
	session.send("In order to achieve the course objectives, it is important to enjoy the class in addition to complying with the above requirements, and the rules and policies of IIT. Most students sign up for the courses with the best intentions. If you are experiencing course/college related problems, please feel free to discuss it with your instructor before a crisis develops so we can resolve them in a manner beneficial to all parties involved.");
else if(question.match(/reasonable/i) || question.match(/accommodation/i))
	session.send("will be made for students with documented disabilities. In order to receive accommodations, students must obtain a letter of accommodation from the Center for Disability Resources and make an appointment to speak with me as soon as possible.  The Center for Disability Resources (CDR) is located in the Life Sciences building, in room 218, with telephone 312-567-5744 or with email at disabilities@iit.edu.");
else
session.send("Can you restructure your question, please?");

         session.beginDialog('/androidqna');
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

bot.dialog('/ITMD444_544_Cloud_computing_technologies', [
    function (session) {
        session.send("Here are a few topics your questions can be on:");
        session.send("Course\n\nClass\n\nFaculty\n\nCredit\n\nLab\n\nBlackboard\n\nHomework\n\nGrade Split-up\n\nGrade criteria\n\nBook\n\nTimetable\n\nMiscellaneous"); 
        session.send("Enter quit if you want to go to a different course.");
        session.beginDialog('/cloudqna');
    }
]);

bot.dialog('/ITMD455_555_Intelligent_Device_Applications', [
    function (session) {
        session.send("Here are a few topics your questions can be on:");
        session.send("Course\n\nClass\n\nFaculty\n\nCredit\n\nLab\n\nBlackboard\n\nHomework\n\nGrade Split-up\n\nGrade criteria\n\nBook\n\nTimetable\n\nMiscellaneous"); 
        session.send("Enter quit if you want to go to a different course.");
        session.beginDialog('/androidqna');
    }
]);