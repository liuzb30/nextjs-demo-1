import "reflect-metadata";
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const posts = await connection.manager.find(Post)
    console.log(posts)

    await connection.close()


}).catch(error => console.log(error));
