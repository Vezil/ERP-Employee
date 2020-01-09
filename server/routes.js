const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminController = require('./controllers/AdminController')
module.exports = (app) => {

    app.post('/create', AuthenticationControllerPolicy.create, AuthenticationController.create)
    app.post('/login', AuthenticationController.login)
    app.get('/allEmployees', AdminController.allEmployees)

}
