const ContractsController = require('../controllers/ContractsController');
const ContractValidator = require('../validations/ContractValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
    app.get(
        '/contracts',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        ContractsController.show
    );

    app.get(
        '/employees/:id/contracts',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        ContractsController.showContracts
    );

    app.post(
        '/contracts',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        ContractValidator,
        ContractsController.create
    );

    app.put(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        ContractValidator,
        ContractsController.update
    );

    app.delete(
        '/contracts/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        ContractsController.delete
    );
};
