const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminController = require('./controllers/AdminController')
const EmployeeController = require('./controllers/EmployeeController')

module.exports = (app) => {
    app.post('/create', AuthenticationControllerPolicy.create, AuthenticationController.create)
    app.post('/login', AuthenticationController.login)

    app.post('/addEmployees', AdminController.addEmployee)
    app.get('/employees', AdminController.Employees)
    app.get('/employees/:id', AdminController.oneEmployee)
    app.get('/employeesE/:email', AdminController.oneEmployeeThroughEmail)
    app.put('/employees/:id', AdminController.updateEmployee)
    app.delete('/employees/:id', AdminController.deleteEmployee)

    app.get('/contracts', AdminController.getContracts)
    app.post('/contracts', AdminController.addContract)
    app.put('/contracts/:id', AdminController.updateContract)
    app.delete('/contracts/:id', AdminController.deleteContract)

    app.get('/holidays', AdminController.getHolidays) //=> HolidaysController.show
    app.post('/holidays', AdminController.addHolidays) //=> HolidaysController.create
    app.put('/holidays/:id', AdminController.updateHolidays)// => HolidaysController.update
    app.delete('/holidays/:id', AdminController.deleteHolidays)// => HolidaysController.delete

    app.get('/employees/:id/holidays', EmployeeController.getHolidaysByEmployeeId)
    app.get('/employeesR/:id/holidays', EmployeeController.getEmployeeRequests)
    app.post('/employees/:id/holidays', EmployeeController.addHolidaysEmployee)
    app.put('/employees/:id/holidays/:id_holidays', EmployeeController.editHolidaysEmployee)
    app.delete('/employees/:id/holidays/:id_holidays', EmployeeController.deleteHolidaysEmployee) //employeeId
}

