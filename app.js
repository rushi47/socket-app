var express = require('express');  
var app = express();  
var mongoose=require("mongoose");
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});


var messageSchema=mongoose.Schema({
    message:"String"
});


var logSchema=mongoose.Schema({
    log:"String"
});







/////////////
//==========
//SOCKET
//================


io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
    });
    client.on('messages', function(data) {
           client.emit('broad', data);
           client.broadcast.emit('broad',data);
    });
});    

server.listen(4200, function(){
	console.log("server running");
});  