const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cliente');
mongoose.Promise = global.Promise;

module.exports = mongoose;