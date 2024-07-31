import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { envConfig } from './env.config';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const entityPath = path.join(__dirname, '../**/*.entity.js');
const entityTsPath = path.join(__dirname, '../../src/**/*.entity.ts');

// console.log('entityPath', entityPath);
// console.log('entityTsPath', entityTsPath);

const config = {
    entities: [entityPath],
    entitiesTs: [entityTsPath],
    dbName: envConfig.dbPath || './src/database/db.sqlite',
    allowGlobalContext: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    debug: envConfig.dbDebug,
    driver: SqliteDriver,
    extensions: [Migrator, SeedManager],
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: './src/database/migrations',
        pathTs: undefined,
    },
    seeder: {
        path: './src/database/seeders',
    },
};

export default defineConfig(config);
