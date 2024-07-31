import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello() {
        return {
            message: 'Hello World!',
            version: '0.0.1',
        };
    }
}
