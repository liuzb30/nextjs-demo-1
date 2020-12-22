import {MigrationInterface, QueryRunner, TableIndex,} from "typeorm";

export class AddUniqueUsernameToUser1608623267451 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createIndex('users', new TableIndex({
            name: 'users_username', columnNames: ['username'], isUnique: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropIndex('users', 'users_username')
    }

}
