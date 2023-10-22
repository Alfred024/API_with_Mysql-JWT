module.exports = {
    api:{
        port: process.env.API_PORT || 3001,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecret',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',
        user: process.env.MYSQL_USER || 'sql10655544',
        password: process.env.MYSQL_PASS|| '8rtc3ibmpr',
        database: process.env.MYSQL_DB || 'sql10655544',
    }
}