var express = require('express');
var app = express();
<% if (logOption == 'logger.info') {%>
var winston = require('winston');
var logger = new winston.Logger({transports: [
    new (winston.transports.Console)({timestamp: true, colorize: true})
]});<%}%>

app.get('/', function (req, res) {
    <%= logOption%>('Incoming Request');
    res.send('{"status":"hello world"}');
});

var server = app.listen(<%= serverPort %>, function () {
    <%= logOption%>('Listening on port %d', server.address().port);
});