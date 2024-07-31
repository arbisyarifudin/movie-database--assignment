import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'movies' })
export class Movie {
    @PrimaryKey({ type: 'uuid', unique: true })
    id: string = v4();

    @Property({ type: 'varchar', length: 255 })
    title: string;

    @Property({ type: 'int' })
    publishingYear: number;

    @Property()
    poster: string;

    @Property({ onCreate: () => new Date() })
    created_at: Date = new Date();

    @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
    updated_at: Date = new Date();
}
