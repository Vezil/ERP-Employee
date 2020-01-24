const AuthenticationController = require('../controllers/AuthenticationController');
const HolidaysController = require('../controllers/HolidaysController');
const EmployeesController = require('../controllers/EmployeesController');
const ContractsController = require('../controllers/ContractsController');
const UserHolidaysController = require('../controllers/UserHolidaysController');
const LoginValidator = require('../validations/LoginValidator');
const EmployeeValidator = require('../validations/EmployeeValidator');
const ContractValidator = require('../validations/ContractValidator');
const HolidaysValidator = require('../validations/HolidaysValidator');

module.exports = app => {
    app.post('/login', LoginValidator, AuthenticationController.login);

    app.post(
        '/employees',
        // AuthenticationController.verifyToken,
        EmployeeValidator,
        EmployeesController.create
    );
    app.get(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeesController.show
    );
    app.get(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeesController.getOne
    );
    app.put(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeeValidator,
        EmployeesController.update
    );
    app.delete(
        '/employees/:id',
        AuthenticationController.verifyToken,
        EmployeesController.delete
    );

    app.get(
        '/contracts',
        AuthenticationController.verifyToken,
        ContractsController.show
    );
    app.get(
        '/employees/:id/contracts',
        AuthenticationController.verifyToken,
        ContractsController.showContracts
    );
    app.post(
        '/contracts',
        AuthenticationController.verifyToken,
        ContractValidator,
        ContractsController.create
    );
    app.put(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        ContractValidator,
        ContractsController.update
    );
    app.delete(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        ContractsController.delete
    );

    app.get(
        '/holidays',
        AuthenticationController.verifyToken,
        HolidaysController.show
    );
    app.post(
        '/holidays',
        AuthenticationController.verifyToken,
        HolidaysValidator,
        HolidaysController.create
    );
    app.put(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        HolidaysValidator,
        HolidaysController.update
    );
    app.delete(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        HolidaysController.delete
    );

    app.get(
        '/employees/:id/holidays',
        AuthenticationController.verifyToken,
        UserHolidaysController.showHolidays
    );
    app.get(
        '/employees/:id/holidaysRequests',
        AuthenticationController.verifyToken,
        UserHolidaysController.showRequests
    );
    app.post(
        '/employees/:id/holidays',
        HolidaysValidator,
        AuthenticationController.verifyToken,
        UserHolidaysController.create
    );
    app.put(
        '/employees/:id/holidays/:holidaysId',
        HolidaysValidator,
        AuthenticationController.verifyToken,
        UserHolidaysController.update
    );
    app.delete(
        '/employees/:id/holidays/:holidaysId',
        AuthenticationController.verifyToken,
        UserHolidaysController.delete
    );
};
