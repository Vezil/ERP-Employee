const HolidaysController = require('../controllers/HolidaysController');
const HolidaysValidator = require('../validations/HolidaysValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
    app.get(
        '/holidays',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        HolidaysController.show
    );

    app.post(
        '/holidays',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        HolidaysValidator,
        HolidaysController.create
    );

    app.put(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        HolidaysValidator,
        HolidaysController.update
    );

    app.delete(
        '/holidays/:id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyAdmin,
        HolidaysController.delete
    );
};
