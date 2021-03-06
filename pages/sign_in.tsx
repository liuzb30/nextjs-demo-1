import {GetServerSideProps, GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";
import {withSession} from "../lib/withSession";
import {User} from "../src/entity/User";
import {useForm} from "../hooks/useForm";
import * as querystring from "querystring";

type Props = {
    user: User
}
const SignIn: NextPage<Props> = (props) => {
    const initFormData = {username: '', password: ''}
    const {form} = useForm({
            initFormData,
            fields: [
                {label: '用户名', type: 'text', key: 'username',},
                {label: '密码', type: 'password', key: 'password',},
            ],
            buttons: (<button type='submit'>登录</button>),
            submit: {
                request: formData => axios.post('/api/v1/session', formData),
                callback: () => {
                    window.alert('登陆成功')
                    const queryStr = querystring.parse(window.location.search.slice(1))
                    queryStr.redirect && (window.location.href = queryStr.redirect.toString())
                }
            }
        }
    )
    return (
        <div>
            {props.user &&
            <div>
                当前用户为{props.user.username}
            </div>}
            {form}
        </div>
    )
}

export default SignIn

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser') || null
    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    }
})