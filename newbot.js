var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    everything = require('./whitecardarray.js'),
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
        botRegex4 = /^cahbot.*-who.*/i,
        botRegex5 = /^cahbot.*-what.*/i,
        botRegex6 = /^cahbot.*-act.*/i,
        botRegex7 = /^cahbot/i,
        word1,
        word2;

    //REGEX1
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
    //REGEX2
    else if(request.text && botRegex2.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postOptions();
            console.log('posted options!');
        }, 500);
        this.res.end();
    }
    //REGEX3
    else if(request.text && botRegex3.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            postUpdate();
            console.log('posted update!');
        }, 500);
        this.res.end();
    }
    //REGEX4
    else if(request.text && botRegex4.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(who);
            postMessage(word1);
            console.log('posted who!');
        }, 500);
        this.res.end();
    }//REGEX5
    else if(request.text && botRegex5.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(what);
            postMessage(word1);
            console.log('posted what!');
        }, 500);
        this.res.end();
    }//REGEX6
    else if(request.text && botRegex6.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(action);
            postMessage(word1);
            console.log('posted action!');
        }, 500);
        this.res.end();
    }
    //REGEX7
    else if(request.text && botRegex7.test(request.text)){
        this.res.writeHead(200);
        setTimeout(function() {
            word1 = getWord1(everything);
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


function getWord1(array) {
    var rand1; 
    rand1 = array[Math.floor(Math.random() * array.length)];
    return rand1;
}

function getWord2(array) {
    var rand2; 
    rand2 = array[Math.floor(Math.random() * array.length)];
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
    var options, body, botReq;
    
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
