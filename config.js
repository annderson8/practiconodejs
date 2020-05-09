module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api:{
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET ||  'notasecret!'
    },

    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'root',
        database: process.env.MYSQL_DB || 'platzinode'
    },
    mysqlService: {
        port: process.env.MYSQL_SERVICE_PORT || 3001,
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',


    },
    redis:{
        host: process.env.REDIS_HOST || 'redis-15654.c93.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_USER || 15654,
        password: process.env.REDIS_PASS || 'qkwt7zdGrUeDMARAKXhWAcwTOfOKWevs',
    },

    cacheService: {
        port: process.env.CACHE_SERVICE_PORT || 3003,
        host: process.env.CACHE_SERVICE_HOST || 'localhost',


    },
    post: {
        port: process.env.POST_PORT || 3002,
    }
}