// var mongo = require('mongodb');

// var server = new mongo.Server('localhost', 27017);
// var db = new mongo.Db('pubsub', server);

// db.open(function(err) {
//     if (err) throw err;
//             var doc={foo:"bar", time: Date.now()};

//             //foo: 'bar', time: Date.now()
//          setInterval(function() {
// -            db.collection.insert({doc}, function(err) {
// +            db.collection.insert({doc}, function(err, message) {
//                  if (err) throw err;
// -                console.log('published', doc._id);
// +                console.log('published', message._id);
//              });
//          }, 2000);
//      });
// });

var mongoose=require("mongoose");

var messageSchema=mongoose.Schema({
    foo:"String"
});


var logSchema=mongoose.Schema({
    joo:"String"
});





mongoose.connect("localhost:27017/pubsub");
var message=mongoose.model("message", messageSchema);
var log=mongoose.model("log", logSchema);

setInterval(function(){
message.create({foo:"bar", time:Date.now()}, function(err,doc){
    message.create({foo:"dkfdl", time:Date.now()}, function(err, message){
            if(err) throw err;
            console.log('published', doc._id);
+                console.log('published', message._id);            

    });
});
},2000);


setInterval(function(){
log.create({joo:"joo system working", time:Date.now()}, function(err,doc){
    message.create({joo:"dkfdl", time:Date.now()}, function(err, message){
            if(err) throw err;
            console.log('published', doc._id);
+                console.log('published', message._id);            

    });
});
},2000);
