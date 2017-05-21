var app = require('express')();
var Redis = require('ioredis');
var server = app.listen(3000);

redis = new Redis({
    port: 6379,
    host: 'localhost'
});
var io = require('socket.io').listen(server);

redis.on("connect", function () {
    console.log("redis connected");
});

redis.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.on('basic', function (res) {
        console.log(res);
        redis.set('activity', 'shit')
    });
    socket.on('newActivity', function (res) {
        redis.get('activity', function (err, data) {
            var activities = data;
                console.log(data);
        });
    });
});