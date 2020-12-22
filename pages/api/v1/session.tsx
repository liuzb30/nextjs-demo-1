import {NextApiHandler} from "next";
import {getDatabaseConnection} from "../../../lib/connection";
import {User} from "../../../src/entity/User";
import md5 from "md5";
import {SignIn} from "../../../src/Model/SignIn";

const Session:NextApiHandler = async (req,res)=>{
    const {username, password} = req.body
    const signIn = new SignIn(username,password)
    await signIn.validate()
    const hasError = signIn.hasError()
    res.setHeader("Content-Type", "application/json");
    if(hasError){
        res.statusCode = 401;
        res.end(JSON.stringify(signIn.errors));
    }else{
        res.statusCode=200
        res.end(JSON.stringify(signIn.user))
    }

}

export default Session