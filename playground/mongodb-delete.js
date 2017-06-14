//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, db){
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(function(result){
  //   console.log(result);
  // })

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(function(result){
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({complete: false}).then(function(result){
  //   console.log(result);
  // });


  // deleteMany - econgamer
  // db.collection('Users').deleteMany({name: 'econgamer'}).then(function(result){
  //   console.log(result);
  // });

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5940f4cd8fee4d5324495062')}).then(function(result){
    console.log(result);
  });

  db.close();
//
//   {
//     text: 'Eat lunch',
//     complete: false
// }

});
