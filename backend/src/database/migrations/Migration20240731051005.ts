import { Migration } from '@mikro-orm/migrations';

export class Migration20240731051005 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table `movies` (`id` chat(36) not null, `title` varchar(255) not null, `publishing_year` integer not null, `poster` text not null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`id`));',
        );
        this.addSql(
            'create unique index `movies_id_unique` on `movies` (`id`);',
        );

        this.addSql(
            'create table `users` (`id` char(36) not null, `email` varchar(255) not null, `password` text not null, `created_at` datetime not null, `updated_at` datetime not null, primary key (`id`));',
        );
        this.addSql('create unique index `users_id_unique` on `users` (`id`);');
        this.addSql('create index `users_email_index` on `users` (`email`);');
        this.addSql(
            'create unique index `users_email_unique` on `users` (`email`);',
        );
    }
}
