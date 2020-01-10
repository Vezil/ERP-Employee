const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminController = require('./controllers/AdminController')
module.exports = (app) => {

    app.post('/create', AuthenticationControllerPolicy.create, AuthenticationController.create)
    app.post('/login', AuthenticationController.login)
    app.post('/addEmployee', AdminController.addEmployee)
    app.get('/Employees', AdminController.Employees)
    app.get('/Employees/:id', AdminController.oneEmployee)
    app.put('/Employess/:id', AdminController.updateEmployee)

}
