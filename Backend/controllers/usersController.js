var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");
var boom = require('boom');

exports.createUser = {
    auth: {
      mode:'try',
      strategy:'session'
    },
    handler: function(request, reply) {
      console.log(request.payload);
      var esp = "";
      if(request.payload.scope === "Doctor"){
          esp = request.payload.especialidad
      }
       var newUser = new user({
         nombre : request.payload.nombre,
         apellido : request.payload.apellido,
         identidad : request.payload.identidad,
         telefono : request.payload.telefono,
         correo : request.payload.correo,
         password : SHA3(request.payload.password),
         expediente : [],
         especialidad : esp,
         scope : request.payload.scope

       });
       newUser.save(function (err) {
         console.log(err);
         if(err){
          return reply(boom.notAcceptable('Ya existe una cuenta con este correo' + err));
         }else{
           return reply('ok');
         };
      });
    }
  }

  exports.getUsers = {
    handler: function(request, reply){
      var users = user.find({});
      reply(users);
    }
  }
