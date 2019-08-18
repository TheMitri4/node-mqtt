const mosca = require('mosca');
const settings = { port: 1883 };

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('./libs/auth');
const oauth2 = require('./libs/oauth2');

app.use(passport.initialize());

// app.use(express.cookieParser());
app.use(bodyParser());

app.use(express.static('public'));

app.post('/oauth/token', oauth2.token);

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/private', function(req, res) {
    res.send('TUTURUUUUUU');
});

app.listen(3000);

// Mosca

let server = new mosca.Server(settings);

server.on('ready', function() {
    console.log('Привет, я родился!');
});

server.on('clientConnected', function(client) {
    console.log('Присоединился ' + client.id);
});

server.on('clientDisconnected', function(client) {
    console.log('Отсоединился ' + client.id);
});

server.on('published', function(packet, client) {
    if(packet.topic !== 'test/priv'){
        return;
    };
    server.publish({
        topic: 'test/pub',
        payload: 'themitri4',
        qos: 2,
        retain: false
    }, function() {
        console.log('dobe');
    });
});