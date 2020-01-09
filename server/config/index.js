require('dotenv').config()

module.exports = {
    port: process.env.PORT || 9001,
    db: {
        url: process.env.DB_URL,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.HOST,
        options: {
            dialect: process.env.DIALECT,
            dialectModule: process.env.DIALECTMODULE,
            host: process.env.HOST,
            port: process.env.DB_PORT
        }
    },

    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
