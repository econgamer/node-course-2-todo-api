const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach(function(done){
  Todo.remove({}).then(function(){
    return Todo.insertMany(todos);
  }).then(function(){
    done();
  });
});

describe('POST /todos', function(){
  it('it should create a new to do', function(done){
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect(function(res){
          expect(res.body.text).toBe(text);
        })
        .end(function(err,res){
          if(err){
            return done(err);
          }
          Todo.find({text}).then(function(todos){
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch(function(e){
            done(e);
          });

        });

  });

  it('should not create todo with invalid body data', function(done){
    var text = 'Test empty text case';

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end(function(err, res){
        if(err){
          return done(err);
        }

        Todo.find().then(function(todos){
            expect(todos.length).toBe(2);
            done();
        }).catch(function(e){
          done(e);
        });
      });
  });
});


describe('GET /todos', function(){
  it('should get all todos', function(done){
    request(app)
      .get('/todos')
      .expect(200)
      .expect(function(res){
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  });
});


describe('GET /todos/:id', function(){
  it('should return todo doc', function(done){
    request(app)
      .get('/todos/'+ todos[0]._id.toHexString())
      .expect(200)
      .expect(function(res){
        expect(res.body.todo.text).toBe(todos[0].text);
      }).end(done);
  });

  it('should return 404 if todo not found', function(done){
    // make sure you get a 404 back
    request(app)
      .get('/todos/'+ new ObjectID().toHexString())
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', function(done){
    // todos/123
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('DELETE /todos/:id', function(){
  it('should remove a todo', function(done){
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(function(res){
        expect(res.body.todo._id).toBe(hexId);
      })
      .end(function(err,res){
        if(err){
          return done(err);
        }

        Todo.findById(hexId).then(function(todo){
          expect(todo).toNotExist();
          done();
        }).catch(function(e){
          done(e);
        });
      });

  });

  it('should return 404 if todo not found', function(done){
    request(app)
      .delete('/todos/'+ new ObjectID().toHexString())
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', function(done){
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', function(){
  it('should update the todo', function(done){

    var hexId = todos[0]._id.toHexString();
    var text = 'Update from test';
    var completed = true;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text})
      .send({completed})
      .expect(200)
      .expect(function(res){
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

    //grab id of first item
    // update text, set completed true
    // 200
    // text is changed, completed is true, completedAt is a number .toBeA

  });

  it('should clear completedAt when todo is not completed', function(done){

    var hexId = todos[1]._id.toHexString();
    var text= 'Update from test';
    var completed = false;

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text})
      .send({completed})
      .expect(200)
      .expect(function(res){
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
    // grab id of second todo item
    // update text, set completed to false
    // 200
    // text is changed, completed false, completed at is null .toNotExist
  });


});
