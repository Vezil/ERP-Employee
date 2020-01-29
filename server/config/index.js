require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    // host: process.env.HOST || 'localhost',
    db: {
        url: process.env.DB_URL,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.HOST,
        options: {
            logging: true,
            dialect: process.env.DIALECT,
            dialectModule: process.env.DIALECTMODULE,
            host: process.env.HOST,
            port: process.env.DB_PORT
        }
    },
    mailer: {
        user: process.env.MAILER_USER,
        password: process.env.MAILER_PASSWORD
    },

    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};
