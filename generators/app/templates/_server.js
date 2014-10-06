var config = require('config');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var mongoHost = config.get('mongoConfig.host');
var mongoPort = config.get('mongoConfig.port');
var mongoDb = config.get('mongoConfig.db');

<% if (logOption == 'logger.info') {%>
var winston = require('winston');
var logger = new winston.Logger({transports: [
    new (winston.transports.Console)({timestamp: true, colorize: true})
]});<%}%>

mongoose.connect('mongodb://' + mongoHost + ':' + mongoPort + '/' + mongoDb, {}, function (err) {
  if (err) {
  return console.log('Could not reach MongoDB instance: ' + err);
  }

  var personModel = require('./models/default');

  app.get('/', function (req, res) {
    <%= logOption%>('Incoming Request');
    personModel.find({}).lean().exec(function(err, people){
    if (err) {
      // TODO: handle error on get
      <%= logOption%>(err);
      res.statusCode = 400;
      res.send(err);
    }
    res.send('{"<%=entityPlural%>":'+<%=entityPlural%>.length+'}');
    });
  });

  var server = app.listen(<%= serverPort %>, function () {
      <%= logOption%>('Listening on port %d', server.address().port);
  });

});