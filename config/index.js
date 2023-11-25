module.exports = {
    api:{
        port: process.env.API_PORT || 3000,
    },
    jwt:{
        secret: process.env.JWT_SECRET || 'notasecret',
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'http://localhost:3306',
        user: process.env.MYSQL_USER || 'alfredo',
        password: process.env.MYSQL_PASS|| 'ye2010olbap',
        database: process.env.MYSQL_DB || 'social_media',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3306,
    },
    postService: {
        port: process.env.POST_PORT || 3002,
    },
}