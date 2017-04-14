 var mongo = require('mongodb');

 var server = new mongo.Server('localhost', 27017);
var db = new mongo.Db('pubsub', server);


// var mongoose=require("mongoose");






// mongoose.connect("localhost:27017/pubsub");



// // mongoose.connection.on('open', function (ref) {
//     function find (collec, query, callback) {
//       console.log("inside function");

//         mongoose.connection.db.collection(collec, function (err, collection) {
              
//         collection.find('messages', function (err, docs) {
//                 if(err) console.log(err);
//                 else
//                 console.log(doc);
//             });
//       });
//     }

// find();
// // });

db.open(function(err) {
   if (err) throw err;

    db.collection('messages', function(err, collection) {
             if (err) throw err;
            
                var cursor=collection.find({},{tailable:true, await_data:true, numberOfRetries:-1});
                cursor.stream()
  .on('data', function(doc){
    console.log(doc);
  })
  .on('error', function(err){
    // handle error
  })
  .on('end', function(){
    // final callback
  });
  }); 

   

    db.collection('logs', function(err, collection) {
             if (err) throw err;
            
                var cursor=collection.find({},{tailable:true, await_data:true, numberOfRetries:-1});
                cursor.stream()
  .on('data', function(doc){
    console.log(doc);
  })
  .on('error', function(err){
    // handle error
  })
  .on('end', function(){
    // final callback
  });
  }); 
 });
