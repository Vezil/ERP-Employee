const ContractsController = require('../controllers/ContractsController');
const ContractValidator = require('../validations/ContractValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
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
};
