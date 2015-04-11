var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    whitecard = require('./whitecardarray.js'),
    blackcard = require('./blackcardarray.js'),
    who = require('./whoArray.js'),
    what = require('./whatArray.js'),
    action = require('./actionArray.js'),
    menu = require('./options.js'),
    update = require('./update.js');

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegex1 = /^cahbot.*_.*_/i,
        botRegex2 = /^cahbot options/i,
        botRegex3 = /^cahbot update/i,
        botRegex4 = /^cahbot random/i,
        botRegex5 = /^cahbot.*-who.*/i,
        botRegex6 = /^cahbot.*-what.*/i,
        botRegex7 = /^cahbot.*-act.*/i,
        botRegex8 = /^cahbot/i,
        word1,
        word2;

    //REGEX1
    if(request.text && botRegex1.test(request.text)) {
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(whitecard);
            word2 = getWord2(whitecard);
            postMultiMessage(word1,word2);
            console.log('posted multi-word message!');
        }, 500);
        this.res.end();

    }
    //REGEX2
    else if(request.text && botRegex2.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postOther(menu);
            console.log('posted options!');
        }, 500);
        this.res.end();
    }
    //REGEX3
    else if(request.text && botRegex3.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postOther(update);
            console.log('posted update!');
        }, 500);
        this.res.end();
    }
    //REGEX4
    else if(request.text && botRegex4.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(blackcard);
            postOther(word1);
            console.log('posted random!');
        }, 500);
        this.res.end();
    }
    //REGEX5
    else if(request.text && botRegex5.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(who);
            postMessage(word1);
            console.log('posted who!');
        }, 500);
        this.res.end();
    }//REGEX6
    else if(request.text && botRegex6.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(what);
            postMessage(word1);
            console.log('posted what!');
        }, 500);
        this.res.end();
    }//REGEX7
    else if(request.text && botRegex7.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(action);
            postMessage(word1);
            console.log('posted action!');
        }, 500);
        this.res.end();
    }
    //REGEX8
    else if(request.text && botRegex8.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(whitecard);
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


function getWord1(a) {
    var rand1;
    rand1 = a[Math.floor(Math.random() * a.length)];
    return rand1;
}

function getWord2(a) {
    var rand2; 
    rand2 = a[Math.floor(Math.random() * a.length)];
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
        "text": a + "\n" + b
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

function postOther(a) {
    var options, body, botReq;
    
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": a
    };

    console.log('sending ' + a + ' to ' + botID);

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
        "text": a
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
