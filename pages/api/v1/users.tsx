import {NextApiHandler} from "next";
import {User} from "../../../src/entity/User";
import {getDatabaseConnection} from "../../../lib/connection";
import {SignUp} from "../../../src/Model/SignUp";

const Users: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirm} = req.body
    // 信息校验
    const errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirm: [] as string[]
    }
    const signUp = new SignUp({username,password, passwordConfirm})
    await signUp.validate()
    const hasError = signUp.hasError()
    console.log(hasError)

    res.setHeader("Content-Type", "application/json");
    if (hasError) {
        res.statusCode = 401
        res.end(JSON.stringify(signUp.errors))
    } else {
        const user = new User({username,password})
        const connection = await getDatabaseConnection()
        await connection.manager.save(user)
        res.statusCode = 200;
        res.end('注册成功');
    }

}

export default Users