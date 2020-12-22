import {User} from "../entity/User";
import md5 from "md5";
import {getDatabaseConnection} from "../../lib/connection";

export class SignIn{
    // 信息校验
    user:User;
    errors = {
        username: [] as string[],
        password: [] as string[]
    }
    constructor(public username:string, public password:string) {
    }

    async validate(){
        const{username, password} = this
        if(!username || username.length<4){
            this.errors.username.push('用户名长度不能少于4位')
        }
        if(!password){
            this.errors.password.push('密码不能为空')
        }
        const connection = await getDatabaseConnection()
        this.user = await connection.manager.findOne(User, {where:{username}})

        if(!this.user){
            this.errors.username.push('用户名不存在')
        }
        if(this.user && this.user.passwordDigest !== md5(password)){
            this.errors.password.push('用户名或密码不正确')
        }

    }

    hasError(){
        return !!Object.values(this.errors).some(value=>value.length>0)
    }
}