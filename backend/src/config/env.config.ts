import 'dotenv/config';

export const envConfig = {
    appDebug: process.env.DEBUG === 'true' || false,
    appPort: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'secret',
    dbPath: process.env.DB_PATH || 'db.sqlite',
    dbDebug:
        process.env.DB_DEBUG === 'true' ||
        process.env.DEBUG === 'true' ||
        false,
};
