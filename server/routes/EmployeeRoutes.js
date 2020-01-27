const EmployeesController = require('../controllers/EmployeesController');
const EmployeeValidator = require('../validations/EmployeeValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
    app.get(
        '/employees',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        EmployeesController.show
    );

    app.get(
        '/employees/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        EmployeesController.getOne
    );

    app.post(
        '/employees',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        EmployeeValidator,
        EmployeesController.create
    );

    app.put(
        '/employees/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        EmployeeValidator,
        EmployeesController.update
    );

    app.delete(
        '/employees/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        EmployeesController.delete
    );
};
