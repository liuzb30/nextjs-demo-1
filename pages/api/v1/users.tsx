import {NextApiHandler} from "next";
import {User} from "../../../src/entity/User";
import md5 from "md5";
import {getDatabaseConnection} from "../../../lib/connection";

const Users: NextApiHandler = async (req, res) => {
    console.log(req.body)
    const {username, password, passwordConfirm} = req.body
    // 信息校验
    const errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirm: [] as string[]
    }
    if (username.length < 4) {
        errors.username.push('用户名长度不能少于4位')
    }
    if (password.length < 6) {
        errors.password.push('密码长度不能少于6位')
    }
    if (password !== passwordConfirm) {
        errors.passwordConfirm.push('密码和确认密码不一致')
    }
    const hasError = Object.values(errors).some(value => value.length > 0)

    res.setHeader("Content-Type", "application/json");
    if (hasError) {
        res.statusCode = 401
        res.end(JSON.stringify(errors))
    } else {
        const user = new User()
        user.username = username
        user.passwordDigest = md5(password)
        const connection = await getDatabaseConnection()
        await connection.manager.save(user)
        res.statusCode = 200;
        res.end('注册成功');
    }

}

export default Users