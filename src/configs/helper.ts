export function getEnvFile(): string {
    const nodeEnv = process.env.NODE_ENV

    switch (nodeEnv) {
        case 'production':
            return '.production.env'
        case 'test':
            return '.test.env'
        default:
            return '.env'
    }
}