import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'users' })
export class User {
    @PrimaryKey({ type: 'uuid' })
    id: string = v4();

    @Property({ type: 'varchar', length: 255, unique: true })
    @Index()
    email: string;

    @Property({ type: 'text', hidden: true })
    password: string;

    @Property({ onCreate: () => new Date() })
    createdAt: Date = new Date();

    @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
    updatedAt: Date = new Date();
}
