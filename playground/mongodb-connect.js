//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');


  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   complete: false
  // }, function(err, result){
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //Insert new doc into Users (name, age, location(string))
  // db.collection('Users').insertOne({
  //   name: 'econgamer',
  //   age: 23,
  //   location: 'Home'
  // }, function(err, result){
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id));
  // });


  db.close();

});
