const AuthenticationController = require('./controllers/AuthenticationController')

module.exports = (app) => {

    app.post('/create', AuthenticationController.create)
}
