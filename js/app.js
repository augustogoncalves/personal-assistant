var lastLaunchDate;

$(document).ready(function () {
    lastLaunchDate = new Date();
    
    if (annyang) {
        annyang.addCommands(CONFIG.voiceCommands);
        annyang.setLanguage(CONFIG.voiceRecognitionLanguage);
        annyang.debug(true); // output on console.log
        annyang.start();

        console.log('Voice recognition ready');
    }
});

var areYouAlive = function(){
    say(randomSentence(CONFIG.upTime).format(lastLaunchDate.getHours() + ' ' + lastLaunchDate.getMinutes()));
}

var wakeUp = function () {
    say(randomSentence(CONFIG.greeting));
}

var addToShoopingList = function (productName) {
    say(randomSentence(CONFIG.addingToShoppingList).format(productName));
}

var ipAddress = function () {
    var os = require('os');
    var ifaces = os.networkInterfaces();

    var listOfIps = [];

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                //say(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                listOfIps.push(iface.address.toString().replace(/\./g, ' ' + CONFIG.dot + ' '));
            }
            ++alias;
        });
    });
    
    var result = CONFIG.ipAddress.format(listOfIps.length);
    listOfIps.forEach(function (ip, i) {
        result += 'IP {0}: {1}. '.format(i+1, ip);
    });
    say(result);
}

var currentTime = function(){
    var dateTime = new Date();
    say('{0} {1}'.format(dateTime.getHours(), dateTime.getMinutes()));
}

var lastSentence = null;

var repeatLastSentence = function(){
    say(lastSentence);
}

function say(msg, callback) {
    console.log('Pause annyang');
    console.log('Saying: ' + msg);
    lastSentence=msg;
    annyang.abort();
    responsiveVoice.speak(msg, CONFIG.voiceSpeakingLanguage, {
        onend: function () {
            console.log('Resume annyang');
            annyang.start();
        }
    });
}

function randomSentence(arr) {
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return arr;
}

// source: http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/4673436#4673436
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}