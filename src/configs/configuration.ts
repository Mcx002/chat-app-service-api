export default () => ({
    env: process.env.NODE_ENV || 'development',
    app: {
        port: Number(process.env.APP_PORT) || 3000,
        name: process.env.APP_NAME || 'Service',
        version: process.env.APP_VERSION || 'v0.1.0',
    },
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    },
    anonymous: {
        username: process.env.ANONYMOUS_USERNAME,
        password: process.env.ANONYMOUS_PASSWORD,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || 'test',
    }
});