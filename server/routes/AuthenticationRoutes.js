const AuthenticationController = require('../controllers/AuthenticationController');
const LoginValidator = require('../validations/LoginValidator');

module.exports = app => {
    app.post('/login', LoginValidator, AuthenticationController.login);
};
