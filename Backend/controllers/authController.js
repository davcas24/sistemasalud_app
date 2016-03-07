var joi = require('joi');
var boom = require('boom');
var user = require('../schemas/user');
var SHA3 = require("crypto-js/sha3");

exports.login = {
    auth: false,
    validate: {
      payload: {
        correo: joi.string().required(),
        password: joi.string().min(2).max(100).required()
      }
    },
    handler: function(request, reply) {
      var password = String(SHA3(request.payload.password));
      user.find({correo: request.payload.correo, password: password}, function(err, user){
          console.log(user);
          console.log(err)
          if(!err){
            if(user.length > 0){
              request.auth.session.set(user[0]);
              return reply({correo: user[0].correo, scope: user[0].scope});
            }
            return reply(boom.unauthorized('Wrong correo or password'));
          }
          return reply(boom.notAcceptable('Error Executing Query'));
      });
    }
};
exports.logout = {
    auth: {
      mode:'required',
      strategy:'session'
    },
    handler: function(request, reply) {
      request.auth.session.clear();
      return reply('Logout Successful!');
    }
  };
