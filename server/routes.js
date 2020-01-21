const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const HolidaysController = require('./controllers/Holidays/HolidaysController');
const EmployeesController = require('./controllers/Employees/EmployeesController');
const ContractsController = require('./controllers/Contracts/ContractsController');
const HolidaysUserController = require('./controllers/Holidays/HolidaysUserController');

module.exports = app => {
    app.post(
        '/create',
        AuthenticationControllerPolicy.create,
        AuthenticationController.create
    );
    app.post('/login', AuthenticationController.login);

    app.post('/employees', EmployeesController.Create);
    app.get(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeesController.Show
    );
    app.get('/employees/:id', EmployeesController.getOne);
    app.put('/employees/:id', EmployeesController.Update);
    app.delete('/employees/:id', EmployeesController.Delete);

    app.get('/contracts', ContractsController.Show);
    app.get('/employees/:id/contracts', ContractsController.showContracts);
    app.post('/contracts', ContractsController.Create);
    app.put('/contracts/:id', ContractsController.Update);
    app.delete('/contracts/:id', ContractsController.Delete);

    app.get('/holidays', HolidaysController.Show);
    app.post('/holidays', HolidaysController.Create);
    app.put('/holidays/:id', HolidaysController.Update);
    app.delete('/holidays/:id', HolidaysController.Delete);

    app.get('/employees/:id/holidays', HolidaysUserController.showHolidays);
    app.get(
        '/employees/:id/holidaysRequests',
        HolidaysUserController.showRequests
    );
    app.post('/employees/:id/holidays', HolidaysUserController.Create);
    app.put(
        '/employees/:id/holidays/:holidaysId',
        HolidaysUserController.Update
    );
    app.delete(
        '/employees/:id/holidays/:holidaysId',
        HolidaysUserController.Delete
    );
};
