import {NextApiHandler} from "next";
import {SignIn} from "../../../src/Model/SignIn";
import {withSession} from "../../../lib/withSession";

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
        req.session.set('currentUser', signIn.user)
        await req.session.save()
        res.end(JSON.stringify(signIn.user))
    }

}

export default withSession(Session)