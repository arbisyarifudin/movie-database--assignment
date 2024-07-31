import { envConfig } from 'src/config/env.config';

export const logMessage = (...args) => {
    const appDebug = envConfig.appDebug;
    const now =
        new Date().toLocaleDateString() +
        ', ' +
        new Date().toLocaleTimeString();
    if (appDebug) {
        console.log(`[Log] ${now} >`, ...args);
    }
};
