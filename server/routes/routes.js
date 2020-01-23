const AuthenticationController = require('../controllers/AuthenticationController');
const HolidaysController = require('../controllers/HolidaysController');
const EmployeesController = require('../controllers/EmployeesController');
const ContractsController = require('../controllers/ContractsController');
const UserHolidaysController = require('../controllers/UserHolidaysController');
const datesValidator = require('../validations/datesValidator');
const loginValidator = require('../validations/loginValidator');
const employeeValidator = require('../validations/employeeValidator');

module.exports = app => {
    app.post('/login', loginValidator, AuthenticationController.login);

    app.post(
        '/employees',
        // AuthenticationController.verifyToken,
        employeeValidator,
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
        ContractsController.create
    );
    app.put(
        '/contracts/:id',
        AuthenticationController.verifyToken,
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
        HolidaysController.create
    );
    app.put(
        '/holidays/:id',
        AuthenticationController.verifyToken,
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
        datesValidator,
        AuthenticationController.verifyToken,
        UserHolidaysController.create
    );
    app.put(
        '/employees/:id/holidays/:holidaysId',
        datesValidator,
        AuthenticationController.verifyToken,
        UserHolidaysController.update
    );
    app.delete(
        '/employees/:id/holidays/:holidaysId',
        AuthenticationController.verifyToken,
        UserHolidaysController.delete
    );
};
