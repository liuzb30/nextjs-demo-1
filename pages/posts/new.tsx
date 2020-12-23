import {NextPage} from "next";
import {useCallback, useState} from "react";
import axios from "axios";
import Form from "../../components/Form";

const PostsNew: NextPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })
    const initErrors = {
        title:[] as string[],
        content:[] as string[]
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
            <Form onSubmit={onSubmit} fields={[
                {label:'标题',type:'text',value:formData.title,
                    onChange:e => setFormData({...formData, title: e.target.value}),errors:errors.title},
                {label:'内容',type:'textarea',value:formData.content,
                    onChange:e => setFormData({...formData, content: e.target.value}),errors:errors.content},
            ]} buttons={<button type='submit'>提交</button>}/>
        </div>
    )
}

export default PostsNew