var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  nombre : {type: String, required: true},
  apellido : {type: String, required: true},
  identidad :{type: String, required : true},
  telefono : {type: String, required: true},
  correo : {type: String, unique:true, required: true},
  password : {type: String, required : true},
  expediente : [],
  especialidad : {type : String},
  scope : [String]
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
