#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var log = require('verbalize');
var colors = require('colors');
var nowplaying = require('nowplaying');
var request = require('request');

var itunes = require('./lib/itunes');
var spotify = require('./lib/spotify');

var apps = [itunes, spotify];

var argv = require('minimist')(process.argv.slice(2), {
    'string': ['user', 'channel', 'url'],
    'default': {
        'user': 'Unknown Maxrelaxer',
        'channel': '#relaxbot',
        'bot': 'Jams Bot',
        'url': 'https://maxrelax.slack.com/services/hooks/incoming-webhook?token=THTv0gnuZCooGY16FS2SBxc0'
    }
});


var user = argv.user,
    bot = argv.bot,
    channel = argv.channel,
    webhookUrl = argv.url;

var slack = {
    'username': bot,
    'icon_emoji': ':musical_note:',
    'channel': channel,
    'webhookUrl': webhookUrl
};

// Verbalize `runner`
log.runner = 'nowplaying-slack';

var currentTrack = null;
var message, payload;

var slackPayload = {
    'username': slack['username'],
    'icon_emoji': slack['icon_emoji'],
    'channel': slack['channel'],
    'text': null
};

nowplaying.on("playing", onPlaying);
nowplaying.on("paused", onPaused);

function getFormattedMessage(data) {
    for (var i in apps) {
        if (apps[i].name === data.source) {
            return apps[i].getMessage(user, data);
        }
    }
    return null;
}

function onPlaying(data) {
    message = getFormattedMessage(data);
    console.log("PLAYING!".green);
    console.log("[message to post]".green);
    console.log(message.yellow);

    slackPayload['text'] = message;
    
    if (message && message != currentTrack) {
        request.post({
            url: slack.webhookUrl,
            json: true,
            body: JSON.stringify(slackPayload)

        }, function(err, resp, body) {
            if (err) console.error(err);
            if (resp && body) {
                console.log('Slack says OK!'.green);
                currentTrack = message;
            }
        })
    }
}

function onPaused(data) {
    console.log("PAUSED!".yellow, data);
}
