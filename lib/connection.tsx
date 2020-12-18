import "reflect-metadata";
import {createConnection, getConnectionManager} from "typeorm";
import config from 'ormconfig.json'
import {Post} from "../src/entity/Post";
import {User} from "../src/entity/User";
import {Comment} from "../src/entity/Comment";


export const getDatabaseConnection = async () => {
    const connection = getConnectionManager()
    if(connection.has('default')){
        await connection.get('default').close()
    }
    // @ts-ignore
    return await createConnection({
        ...config,
        entities:[Post, User, Comment]
    })
}