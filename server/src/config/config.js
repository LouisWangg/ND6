module.exports = {
    port: process.env.PORT || 8081,
    db: {
        options: {
            host: 'localhost',
            port: '3306',
            database: 'nd6',
            dialect: 'mysql',
            username: 'root',
            password: ''
        }
    },
}
