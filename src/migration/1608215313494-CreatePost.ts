import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class CreatePost1608215313494 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 升级数据库
        await queryRunner.createTable(new Table({
            name:'posts',
            columns:[
                {
                    name:'id',
                    type:'int',
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:'increment'
                },
                {
                    name:'title',
                    type:'varchar'
                },
                {
                    name:'content',
                    type:'text'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 降级数据库
        await queryRunner.dropTable('posts')
    }

}
