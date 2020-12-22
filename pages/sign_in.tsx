import {GetServerSideProps, NextPage} from "next";
import {useCallback, useState} from "react";
import axios from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";

type Props = {
    user:User
}
const SignIn: NextPage<Props> = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const initErrors = {
        username:[] as string[],
        password:[] as string[]
    }
    const [errors, setErrors] = useState(initErrors)
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setErrors(initErrors)
        axios.post('/api/v1/session',formData).then(res=>{
            window.alert('登录成功')
        }).catch(e=>{
            if(e.response.status===401){
                setErrors(e.response.data)
            }
        })
    }, [formData])
    return (
        <div>
            {props.user &&
            <div>
                当前用户为{props.user.username}
            </div>}
            <form onSubmit={onSubmit}>
                <label>
                    用户名
                    <input value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}/>
                </label>
                <p>{errors.username.join(',')}</p>
                <label>
                    密码
                    <input type='password' value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}/>
                </label>
                <p>{errors.password.join(',')}</p>
                <div>
                    <button type='submit'>登录</button>
                </div>
            </form>
            <style jsx>{`
              label{
                display: block;
              }
            `}</style>
        </div>
    )
}

export default SignIn

// @ts-ignore
export const getServerSideProps:GetServerSideProps = withSession(async context => {
    // @ts-ignore
    const user = context.req.session.get('currentUser')
    return{
        props:{
            user: JSON.parse(JSON.stringify(user))
        }
    }
})