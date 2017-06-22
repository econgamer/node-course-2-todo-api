const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(function(result){
//   console.log(result);
// });


// Todo.findOneAndemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('594b726e0666d6fbcdc51635').then(function(todo){
  console.log(todo);
});
