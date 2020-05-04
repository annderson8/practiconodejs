module.exports = {
    api:{
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET ||  'notasecret!'
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'db4free.net',
        user: process.env.MYSQL_USER || 'userplatzinodejs',
        password: process.env.MYSQL_PASS || 'YZpPfdG3qY..M5$',
        database: process.env.MYSQL_DB || 'platzinodejs'
    },
}