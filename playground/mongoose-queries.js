const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5943a765f8a9324030b4df3c';
// var id = '594a5d8c32f736341a7a7631';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then(function(todos){
//   console.log('Todos', todos);
// });
//
//
// Todo.findOne({
//   _id: id
// }).then(function(todo){
//   console.log('Todo', todo);
// });

// Todo.findById(id).then(function(todo){
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch(function(e){
//   console.log(e);
// });


User.findById(id).then(function(user){
  if(!user){
    return console.log('Id not found');
  }
  console.log('User by ID ', user);
}).catch(function(e){
  console.log(e);
});
