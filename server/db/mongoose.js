var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

if(process.env.PORT){
  mongoose.connect('mongodb://econgamer:123123@ds133922.mlab.com:33922/node_databasetoheroku');
}else{
  mongoose.connect('mongodb://localhost:27017/TodoApp');
}


module.exports = {
  mongoose
};
