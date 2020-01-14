const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminController = require('./controllers/AdminController')

module.exports = (app) => {

    app.post('/create', AuthenticationControllerPolicy.create, AuthenticationController.create)
    app.post('/login', AuthenticationController.login)
    app.post('/addEmployee', AdminController.addEmployee)
    app.get('/employees', AdminController.Employees)
    app.get('/employees/:id', AdminController.oneEmployee)
    app.get('/employeesE/:email', AdminController.oneEmployeeThroughEmail)
    app.put('/employees/:id', AdminController.updateEmployee)
    app.delete('/employees/:id', AdminController.deleteEmployee)


    app.get('/contracts', AdminController.getContracts)
    app.post('/contracts', AdminController.addContract)

    app.get('/holidays', AdminController.getHolidays)
    app.post('/holidays', AdminController.addHolidays)



}

