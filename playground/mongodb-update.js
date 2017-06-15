//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');


  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('594107a4f7a29f401bbc16f6')
  // },{
  //   $set: {complete: true}
  // }, {
  //   returnOriginal: false
  // }).then(function(result){
  //   console.log(result);
  // });


  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('593ff3e074d48932608fc1e9')
  },{
    $inc: { age : 1 },
    $set: { name: "econgamer"}
  },{
    returnOriginal: false
  }).then(function(result){
    console.log(result);
  });

  db.close();

});
