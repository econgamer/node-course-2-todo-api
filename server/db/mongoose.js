var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log('env *******', process.env.NODE_ENV);

if(process.env.PORT){
  mongoose.connect('mongodb://econgamer:123123@ds133922.mlab.com:33922/node_databasetoheroku');
  console.log("Connect to heroku database");
}else if(process.env.NODE_ENV === 'test'){
  mongoose.connect('mongodb://localhost:27017/TodoAppTest');
  console.log("Connect to Test database");
}else{
  mongoose.connect('mongodb://localhost:27017/TodoApp');
  console.log("Connect to development database");
}

// process.env.NODE_ENV === 'test'

//added stuff
//var env = process.env.NODE_ENV

// if(process.env.PORT){
//   mongoose.connect('mongodb://econgamer:123123@ds133922.mlab.com:33922/node_databasetoheroku');
// }else{
//   mongoose.connect('mongodb://localhost:27017/TodoApp');
// }


module.exports = {
  mongoose
};
