var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var <%= entity %> = new Schema({
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('<%= entity %>', <%= entity %>);