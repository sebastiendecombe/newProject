var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var cookieSession = require('cookie-session'); // gestion des cookies
var fs = require('fs');


//Init de l'app
var app = express();
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
var serverLogStream = fs.createWriteStream(__dirname + '/log/server.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream})) // Active le middleware de logging et écrit dans le rep log

app.set('trust proxy', 1) ;// trust first proxy

app.use(express.static(__dirname + '/public')) ;// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(favicon(__dirname + '/public/favicon2.ico')); // Active la favicon indiquée


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  serverLogStream.write('log Example app listening at http://%s:%s' + host + port);
  
  server.on('error', function (reason){
	serveurLogStream.write('erreur dans le programme: '+reason);
  });
 
  //server.on('error',serverLogStream.write('erreur'));
  console.log('Example app listening at http://%s:%s', host, port);
  
});

//app.use(morgan('combined')) // Active le middleware de logging
//.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
//.use(favicon(__dirname + '/public/favicon.png')) // Active la favicon indiquée
//.use(function(req, res){ // Répond enfin
//    res.send('Hello');
//});

//app.listen(8080);