require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', function(req, res){
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(function(doc){
    res.send(doc);
  }, function(e){
    res.status(400).send(e);
  });
});



app.get('/todos', function(req, res){
  Todo.find().then(function(todos){
    res.send({todos});
  }, function(e){
    res.status(400).send(e);
  });
});



// GET /todos/1234324
app.get('/todos/:id', function(req, res){
  var id = req.params.id;
  // Valid id using isValid

    //404 - send back empty send

    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }


  Todo.findById(id).then(function(todo){
    if(!todo){
      return res.status(404).send();
    }
      res.send({todo});
      //res.send(todo);

  }).catch(function(e){
    res.status(400).send();
  });

});


app.delete('/todos/:id', function(req, res){
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then(function(todo){
        if(!todo){
          return res.status(404).send();
        }
        res.send({todo});
      }).catch(function(e){
        res.status(400).send();
      });
});



app.patch('/todos/:id', function(req, res){

  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  //console.log(body);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }



  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function(todo){
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(function(e){
    res.status(400).send();
  });


});


// POST /users  //use pick method

app.post('/users', function(req, res){
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(function(){
    return user.generateAuthToken();
    //res.send(user);
  }).then(function(token){
    res.header('x-auth', token).send(user);
  }).catch(function(e){
    res.status(400).send(e);
  });
});



app.get('/users/me', authenticate, function(req, res){
  res.send(req.user);
});


// POST /users/login {email, password}
app.post('/users/login', function(req, res){
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then(function(user){
    return user.generateAuthToken().then(function(token){
      res.header('x-auth', token).send(user);
    });

  }).catch(function(e){
    res.status(400).send();
  });

});

app.delete('/users/me/token', authenticate, function(req, res){
  req.user.removeToken(req.token).then(function(){
    res.status(200).send();
  }, function(){
    res.status(400).send();
  });
});

app.listen(port, function(){
  console.log('Started up at port' + port);
});

module.exports = {app};
