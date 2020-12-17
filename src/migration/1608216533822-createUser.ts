import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1608216533822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'users',
            columns:[
                {name:'id',type:'int', isPrimary:true, isGenerated:true, generationStrategy:'increment'},
                {name:'username', type:'varchar'},
                {name:'passwordDigest', type:'varchar'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
