const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const HolidaysController = require('../controllers/Holidays/HolidaysController');
const EmployeesController = require('../controllers/Employees/EmployeesController');
const ContractsController = require('../controllers/Contracts/ContractsController');
const HolidaysUserController = require('../controllers/Holidays/HolidaysUserController');

module.exports = app => {
    app.post(
        '/create',
        AuthenticationControllerPolicy.create,
        AuthenticationController.verifyToken,
        AuthenticationController.create
    );
    app.post('/login', AuthenticationController.login);

    app.post(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeesController.Create
    );
    app.get(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeesController.Show
    );
    app.get(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeesController.getOne
    );
    app.put(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeesController.Update
    );
    app.delete(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeesController.Delete
    );

    app.get(
        '/contracts',
        AuthenticationController.verifyToken,
        ContractsController.Show
    );
    app.get(
        '/employees/:id/contracts',
        AuthenticationController.verifyToken,
        ContractsController.showContracts
    );
    app.post(
        '/contracts',
        AuthenticationController.verifyToken,
        ContractsController.Create
    );
    app.put(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        ContractsController.Update
    );
    app.delete(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        ContractsController.Delete
    );

    app.get(
        '/holidays',
        AuthenticationController.verifyToken,
        HolidaysController.Show
    );
    app.post(
        '/holidays',
        AuthenticationController.verifyToken,
        HolidaysController.Create
    );
    app.put(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        HolidaysController.Update
    );
    app.delete(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        HolidaysController.Delete
    );

    app.get(
        '/employees/:id/holidays',
        AuthenticationController.verifyToken,
        HolidaysUserController.showHolidays
    );
    app.get(
        '/employees/:id/holidaysRequests',
        AuthenticationController.verifyToken,
        HolidaysUserController.showRequests
    );
    app.post(
        '/employees/:id/holidays',
        AuthenticationController.verifyToken,
        HolidaysUserController.Create
    );
    app.put(
        '/employees/:id/holidays/:holidaysId',
        AuthenticationController.verifyToken,
        HolidaysUserController.Update
    );
    app.delete(
        '/employees/:id/holidays/:holidaysId',
        AuthenticationController.verifyToken,
        HolidaysUserController.Delete
    );
};
