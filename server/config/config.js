
module.exports = {
    port: process.env.PORT || 9001,
    db:{
        database: process.env.DB_NAME || 'ERP',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'apptest123',
        options:{
            dialect: process.env.DIALECT || 'mysql',
            // dialectModule: process.env.DIALECTMODULE || 'mysql2',
            host: process.env.HOST || 'localhost',
            port: process.env.DB_PORT || 4312
        }
        
    }
}
