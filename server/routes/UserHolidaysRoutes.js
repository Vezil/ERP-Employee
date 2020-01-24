const UserHolidaysController = require('../controllers/UserHolidaysController');
const HolidaysValidator = require('../validations/HolidaysValidator');
const AuthenticationController = require('../controllers/AuthenticationController');

module.exports = app => {
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
        '/employees/:id/holidays/:holidays_id',
        HolidaysValidator,
        AuthenticationController.verifyToken,
        UserHolidaysController.update
    );

    app.delete(
        '/employees/:id/holidays/:holidays_id',
        AuthenticationController.verifyToken,
        UserHolidaysController.delete
    );
};
