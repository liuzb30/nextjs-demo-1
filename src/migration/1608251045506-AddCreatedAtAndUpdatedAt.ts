import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCreatedAtAndUpdatedAt1608251045506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('Posts', [
            new TableColumn({name:'createdAt', type:'timestamp',isNullable:false,default:'now()'}),
            new TableColumn({name:'updatedAt', type:'timestamp',isNullable:false,default:'now()'}),
            ])
        await queryRunner.addColumns('users', [
            new TableColumn({name:'createdAt', type:'timestamp',isNullable:false,default:'now()'}),
            new TableColumn({name:'updatedAt', type:'timestamp',isNullable:false,default:'now()'}),
        ])
        await queryRunner.addColumns('comments', [
            new TableColumn({name:'createdAt', type:'timestamp',isNullable:false,default:'now()'}),
            new TableColumn({name:'updatedAt', type:'timestamp',isNullable:false,default:'now()'}),
        ])

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Posts', 'createdAt')
        await queryRunner.dropColumn('Posts', 'updatedAt')
        await queryRunner.dropColumn('users', 'createdAt')
        await queryRunner.dropColumn('users', 'updatedAt')
        await queryRunner.dropColumn('comments', 'createdAt')
        await queryRunner.dropColumn('comments', 'updatedAt')
    }

}
