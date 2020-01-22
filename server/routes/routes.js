const AuthenticationController = require('../controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy');
const HolidaysController = require('../controllers/Holidays/HolidaysController');
const EmployeesController = require('../controllers/Employees/EmployeesController');
const ContractsController = require('../controllers/Contracts/ContractsController');
const UserHolidaysController = require('../controllers/Holidays/UserHolidaysController');
const { check } = require('express-validator');

module.exports = app => {
    app.post('/login', AuthenticationController.login);

    app.post(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeesController.create
    );
    app.get(
        '/employees',
        AuthenticationControllerPolicy.create,
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
        [
            check('start_date')
                .notEmpty()
                .isLength({ max: 10 }),
            check('finish_date')
                .notEmpty()
                .isLength({ max: 10 })
        ],
        AuthenticationController.verifyToken,
        UserHolidaysController.create
    );
    app.put(
        '/employees/:id/holidays/:holidaysId',
        [
            check('start_date')
                .notEmpty()
                .isLength({ max: 10 }),
            check('finish_date')
                .notEmpty()
                .isLength({ max: 10 })
        ],
        AuthenticationController.verifyToken,
        UserHolidaysController.update
    );
    app.delete(
        '/employees/:id/holidays/:holidaysId',
        AuthenticationController.verifyToken,
        UserHolidaysController.delete
    );
};
