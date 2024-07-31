import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/env.config';

async function bootstrap() {
    const appOptions = {
        abortOnError: false,
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        },
    };
    const app = await NestFactory.create(AppModule, appOptions);
    await app.listen(envConfig.appPort).then(() => {
        console.log(`Server running on http://localhost:${envConfig.appPort}`);
    });
}
bootstrap().catch((err) => {
    console.log(err);
});
