const UserHolidaysController = require('../controllers/UserHolidaysController');
const HolidaysValidator = require('../validations/HolidaysValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
    app.get(
        '/employees/:id/holidays',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyPerson,
        UserHolidaysController.showHolidays
    );

    app.get(
        '/employees/:id/holidaysRequests',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyPerson,
        UserHolidaysController.showRequests
    );

    app.post(
        '/employees/:id/holidays',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyPerson,
        HolidaysValidator,
        UserHolidaysController.create
    );

    app.put(
        '/employees/:id/holidays/:holidays_id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyPerson,
        HolidaysValidator,
        UserHolidaysController.update
    );

    app.delete(
        '/employees/:id/holidays/:holidays_id',
        AuthenticationController.verifyToken,
        AuthenticationController.verifyPerson,
        UserHolidaysController.delete
    );
};
