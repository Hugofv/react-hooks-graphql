const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/graphql");
mongoose.Promise = global.Promise;

module.exports = mongoose;
