module.exports = {
    api:{
        port: process.env.API_PORT || 3001,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecret',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'sql9.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql9659595',
        password: process.env.MYSQL_PASS|| 'Ke1mAqZs1t',
        database: process.env.MYSQL_DB || 'sql9659595',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3306,
    }
}