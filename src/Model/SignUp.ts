import {getDatabaseConnection} from "../../lib/connection";
import {User} from "../entity/User";

export class SignUp{
    username:string;
    password:string;
    passwordConfirm:string;
    errors={
        username: [] as string[],
        password: [] as string[],
        passwordConfirm: [] as string[]
    }
    constructor(attributes:Partial<SignUp>) {
        Object.assign(this, attributes)
    }
    async validate(){
        const {username,password,passwordConfirm} = this
        if (username.length < 4) {
            this.errors.username.push('用户名长度不能少于4位')
        }
        if (password.length < 6) {
            this.errors.password.push('密码长度不能少于6位')
        }
        if (password !== passwordConfirm) {
            this.errors.passwordConfirm.push('密码和确认密码不一致')
        }
        // 用户是否存在
        const connection = await getDatabaseConnection()
        const user = await connection.manager.findOne(User, {where:{username}})
        if(user){
            this.errors.username.push('用户名已经存在')
        }
    }

    hasError(){

        console.log('this.errors')
        console.log(this.errors)
        return Object.values(this.errors).some(value => value.length > 0)
    }
}