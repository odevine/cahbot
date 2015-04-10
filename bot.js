Skip to content
 This repository
Explore
Gist
Blog
Help
@odevine odevine
 
 Unwatch 1
  Star 0
  Fork 0
odevine/cahbot
 branch: master  cahbot/bot.js
@odevineodevine an hour ago make it better
1 contributor
RawBlameHistory     214 lines (174 sloc)  5.232 kb
var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    myArray = require('./whitecardarray.js'),
    menu = require('./options.js'),
    update = require('./update.js');

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegex1 = /^cahbot.*_.*_/,
        botRegex2 = /^cahbot options/,
        botRegex3 = /^cahbot update/,
        botRegex4 = /^cahbot/,
        word1,
        word2;

    //test if asking for 2 words
    if(request.text && botRegex1.test(request.text)) {
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1();
            word2 = getWord2();
            postMultiMessage(word1,word2);
            console.log('posted multi-word message!');
        }, 500);
        this.res.end();

    }
    else if(request.text && botRegex2.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postOptions();
            console.log('posted options!');
        }, 500);
        this.res.end();
    }
    else if(request.text && botRegex3.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postUpdate();
            console.log('posted update!');
        }, 500);
        this.res.end();
    }
    //test if asking for one word
    else if(request.text && botRegex4.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1();
            postMessage(word1);
            console.log('posted single word message!');
        }, 500);
        this.res.end();
    }

    //invalid message
    else {
        console.log("not a valid message to respond to");
        this.res.writeHead(200);
        this.res.end();
    }
}


function getWord1() {
    var rand1; 
    rand1 = myArray[Math.floor(Math.random() * myArray.length)];
    return rand1;
}

function getWord2() {
    var rand2; 
    rand2 = myArray[Math.floor(Math.random() * myArray.length)];
    return rand2;
}

function postMultiMessage(a,b) {
    var options, body, botReq;
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": "." + "\n" + a + "\n" + b + "\n" + "."
    };

    console.log('sending ' + a + b + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

function postOptions() {
    var options, body, botReq;
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": menu
    };

    console.log('sending ' + menu + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

function postUpdate() {
    var update, body, botReq;
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": update
    };

    console.log('sending ' + update + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

function postMessage(a) {
    var options, body, botReq;
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": "." + "\n" + a + "\n" + "."
    };

    console.log('sending ' + a + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

exports.respond = respond;
Status API Training Shop Blog About
© 2015 GitHub, Inc. Terms Privacy Security Contact
