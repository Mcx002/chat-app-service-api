export default () => ({
    env: process.env.NODE_ENV || 'development',
    app: {
        port: Number(process.env.APP_PORT) || 3000,
        name: process.env.APP_NAME || 'Service',
        version: process.env.APP_VERSION || 'v0.1.0',
    },
    db: {
        url: process.env.DB_URL,
    },
    anonymous: {
        credential: process.env.ANONYMOUS_CREDENTIAL,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY || 'test',
    }
});