
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1')}}},
	{method: 'GET', path: '/v1/users', config: usersController.getUsers},
	/*{method: 'GET', path: '/v1/books/{account}', config: booksController.getbooksdet},
  {method: 'POST', path: '/v1/book', config: booksController.createbook},
	{method: 'PUT', path: '/v1/book/{account}', config: booksController.updatebook},
	{method: 'DELETE', path: '/v1/book/{account}', config: booksController.deletebook},*/
	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout}
];
