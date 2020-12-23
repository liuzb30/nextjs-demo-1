import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import {useCallback, useState} from "react";
import axios from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";
import Form from "../components/Form";

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
            <Form onSubmit={onSubmit} fields={[
                {label:'用户名',type:'text',value:formData.username,
                    onChange:e => setFormData({...formData, username: e.target.value}),errors:errors.username},
                {label:'密码',type:'password',value:formData.password,
                    onChange:e => setFormData({...formData, password: e.target.value}),errors:errors.password},
            ]} buttons={<button type='submit'>登录</button>}/>
        </div>
    )
}

export default SignIn

export const getServerSideProps:GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser') || null
    return{
        props:{
            user: JSON.parse(JSON.stringify(user))
        }
    }
})