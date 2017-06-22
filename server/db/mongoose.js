var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://econgamer:123123@ds133922.mlab.com:33922/node_databasetoheroku' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
