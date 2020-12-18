import axios from "axios";
import {NextPage} from "next";
import {useCallback, useState} from "react";

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
            console.log(res)
            window.alert(res.data)
        }).catch(e=>{
            console.log(e.response)
            if(e.response.status===401){
                setErrors(e.response.data)
            }
        })
    }, [formData])
    return (
        <div>
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

                <label>
                    确认密码
                    <input type='password' value={formData.passwordConfirm} onChange={e => setFormData({...formData, passwordConfirm: e.target.value})}/>
                </label>
                <p>{errors.passwordConfirm.join(',')}</p>
                <div>
                    <button type='submit'>注册</button>
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

export default SignUp