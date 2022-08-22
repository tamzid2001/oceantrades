const functions = require("firebase-functions");
const express = require("express");
const app = express();
var admin = require("firebase-admin");
var nodemailer = require('nodemailer');
const csrf = require("csurf");
let port = process.env.PORT || 3000;
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
app.use(express.static(__dirname + "/functions"));
let Parser = require('rss-parser');
let parser = new Parser();
const schedule = require('node-schedule');


var serviceAccount = require("");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

client.login("");

const dictionary = {
"EURUSD": "979904100244258826", "GBPUSD": "979966108046065664", "USDJPY": "979966324069511230", 
"USDCHF": "979969386075004928", "AUDUSD": "979970210654195722", "NZDUSD": "979971517171519559",
"EURGBP": "981753423387037726", "EURCHF": "981753423387037726", 
"EURCAD": "981753494123999333", "EURNZD": "981753658704289873", "EURJPY": "981753759178825738", 
"GBPJPY": "981753842490294272", "CHFJPY": "981753972719239178", "CADJPY": "981754058375303198", 
"AUDJPY": "981754133243629608", "NZDJPY": "981754216727064646", "GBPCHF": "981754307101745253", 
"GBPAUD": "981754374034448424", "GBPCAD": "981754444981088357", "DAX": "979973455443288074",
"FRA40":"979973654706262068", "JAPPAN225": "979973744988663838", "UK100": "979973853415628802", 
"US30": "979973946776621097", "SPX500": "979974001751392316", "XAUUSD": "979975854350282802",
"XAGUSD": "979975955445600296", "COPPER": "979976139030278164", "XPTUSD": "979976220454313995", 
"USOIL": "979977128802136145", "BRENTOIL": "980922500835856384", "BTCUSD": "979977978039660544", 
"ETHUSD": "979978035514191873", "SOLUSD": "979978378008481833", "XRPUSD": "979978443078914048"
}


app.get("/", (req, res) => {
    const filePath = path.resolve("./index.html");
    res.sendFile(filePath);
});

app.get("/disclaimer", (req, res) => {
    const filePath = path.resolve("./disclaimer.html");
    res.sendFile(filePath);
});

app.get("/earningsdisclaimer", (req, res) => {
    const filePath = path.resolve("./earningsdisclaimer.html");
    res.sendFile(filePath);
});

app.get("/termsandconditions", (req, res) => {
    const filePath = path.resolve("./terms.html");
    res.sendFile(filePath);
});

app.get("/privacypolicy", (req, res) => {
    const filePath = path.resolve("./privacypolicy.html");
    res.sendFile(filePath);
});

app.get("/dmca", (req, res) => {
    const filePath = path.resolve("./dmca.html");
    res.sendFile(filePath);
});

// const job = schedule.scheduleJob('0 8 * * *', function(){
//     news();
// });
var n=[];
async function news () {
    var channel = client.channels.cache.get("987942306743214100");
    await parser.parseURL('https://www.google.com/alerts/feeds/07069145445641289524/4888174885712006344', (err,feed) => {

        feed.items.forEach(async(item) => {
            //console.log(item.title);
            var t = item.title.toString();
            var l = item.link.toString();
            n.push({title:t,link:l});
            //console.log(t);
            //console.log(l);
            //console.log(item.title + ':' + item.link)
        });
        return n;
  
  }).catch((err)=>{console.log(err)})};


  news().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});


app.get("/signal", (req,res)=>{
    var sym = req.query.symbol;
    var ticketid = req.query.ticket;
    var openprice = req.query.open;
    var type = req.query.type;
    var tp = req.query.tp;
    var ew = req.query.ew;
    var channel = client.channels.cache.get(dictionary[sym]);
    channel.send(`${sym} ${ticketid}\n${type} @ ${openprice}\ntakeprofit @ ${tp}\nexpected worth: ${ew} points`).then(r=>{res.send(200)});
})

app.get("/update", (req,res)=>{
    var ticketid = req.query.ticket;
    var openprice = req.query.open;
    var type = req.query.type;
    var tp = req.query.tp;
    var ew = req.query.ew;
    channel.messages.fetch({ limit: 100 }).then(messages => {
        console.log(`Received ${messages.size} messages`);
        //Iterate through the messages here with the variable "messages".
        messages.forEach((message) => {
            if(message.content.includes(ticketid)){
                //message.content.edit()
                channel.send(`${ticketid} (updated)\n${type} @ ${openprice}\ntakeprofit @ ${tp}\nexpected worth: ${ew} points`);
                //break;
            }
            console.log(message.content);
        });

        return true;

      });
});

//app.listen(5000, () => console.log(`Node server listening at https://.web.app:${5000}/`));

exports.app = functions.https.onRequest(app);
//exports.widgets = functions.https.onRequest(app);




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
