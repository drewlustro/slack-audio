var forever = require('forever');

var child = new(forever.Monitor)('./bin/nowplaying-slack');

child.on('start', function(process, data) {
    console.error('Started nowplaying-slack (' + process + ') and monitoring...');
});

child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time');
});

child.on('stdout', function(data) {
    console.log('[child] Output - ' + data);
});

child.on('stderr', function(data) {
    console.log('[child] Error - ' + data);
});

child.on('exit', function(forever) {
    console.error('Stopped nowplaying-slack.');
});