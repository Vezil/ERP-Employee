const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const HolidaysController = require('./controllers/Holidays/HolidaysController');
const EmployeeController = require('./controllers/EmployeeController');
const EmployeesController = require('./controllers/Employees/EmployeesController');
const ContractsController = require('./controllers/Contracts/ContractsController');

module.exports = app => {
    app.post(
        '/create',
        AuthenticationControllerPolicy.create,
        AuthenticationController.create
    );
    app.post('/login', AuthenticationController.login);

    app.post('/employees', EmployeesController.Create);
    app.get('/employees', EmployeesController.Show);
    app.get('/employees/:id', EmployeesController.getOne);
    app.put('/employees/:id', EmployeesController.Update);
    app.delete('/employees/:id', EmployeesController.Delete);

    app.get('/contracts', ContractsController.Show);
    app.post('/contracts', ContractsController.Create);
    app.put('/contracts/:id', ContractsController.Update);
    app.delete('/contracts/:id', ContractsController.Delete);

    app.get('/holidays', HolidaysController.Show);
    app.post('/holidays', HolidaysController.Create);
    app.put('/holidays/:id', HolidaysController.Update);
    app.delete('/holidays/:id', HolidaysController.Delete);

    app.get(
        '/employees/:id/holidays',
        EmployeeController.getHolidaysByEmployeeId
    );
    app.get('/employeesR/:id/holidays', EmployeeController.getEmployeeRequests);
    app.post('/employees/:id/holidays', EmployeeController.addHolidaysEmployee);
    app.put(
        '/employees/:id/holidays/:id_holidays',
        EmployeeController.editHolidaysEmployee
    );
    app.delete(
        '/employees/:id/holidays/:id_holidays',
        EmployeeController.deleteHolidaysEmployee
    ); //employeeId
};
