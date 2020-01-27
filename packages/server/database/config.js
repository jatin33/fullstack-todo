const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/todo';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

module.exports = mongoose.connect(MONGO_URL,options);
