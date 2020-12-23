import axios from "axios";
import {NextPage} from "next";
import {ChangeEventHandler, useCallback, useState} from "react";
import Form from "../components/Form";

const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    })
    const initErrors = {
        username:[] as string[],
        password:[] as string[],
        passwordConfirm:[] as string[]
    }
    const [errors, setErrors] = useState(initErrors)

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setErrors(initErrors)
        axios.post('/api/v1/users',formData).then(res=>{
            window.alert('注册成功')
        }).catch(e=>{
            if(e.response.status===401){
                setErrors(e.response.data)
            }
        })
    }, [formData])
    return (
        <div>
            <Form onSubmit={onSubmit} fields={[
                {label:'用户名',type:'text',value:formData.username,
                    onChange:e => setFormData({...formData, username: e.target.value}),errors:errors.username},
                {label:'密码',type:'password',value:formData.password,
                    onChange:e => setFormData({...formData, password: e.target.value}),errors:errors.password},
                {label:'确认密码',type:'password',value:formData.passwordConfirm,
                    onChange:e => setFormData({...formData, passwordConfirm: e.target.value}),errors:errors.passwordConfirm},
            ]} buttons={<button type='submit'>注册</button>}/>
        </div>
    )
}

export default SignUp