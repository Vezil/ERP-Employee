const EmployeesController = require('../controllers/EmployeesController');
const EmployeeValidator = require('../validations/EmployeeValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
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

    app.post(
        '/employees',
        AuthenticationController.verifyToken,
        EmployeeValidator,
        EmployeesController.create
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
};
