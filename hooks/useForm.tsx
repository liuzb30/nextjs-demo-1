import {ReactChild, useCallback, useState} from "react";
import {AxiosResponse} from "axios";

type Field<T> = {
    label: string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
}
type useFormOptions<T> = {
    initFormData: T;
    fields: Field<T>[];
    buttons: ReactChild;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        callback?: () => void;
    }
}

export function useForm<T>(props: useFormOptions<T>) {
    const {initFormData, fields, buttons, submit} = props
    const [formData, setFormData] = useState(initFormData)
    const [errors, setErrors] = useState(() => {
        const e: { [k in keyof T]?: string[] } = {}
        for (let key in initFormData) {
            if (initFormData.hasOwnProperty(key)) {
                e[key] = []
            }
        }
        return e;
    })
    const _onSubmit = useCallback((e) => {
        e.preventDefault();
        submit.request(formData).then(res => {
            submit.callback && submit.callback()
        }).catch(e => {
            if (e.response.status === 422) {
                setErrors(e.response.data)
            } else if (e.response.status === 401) {
                console.log(window.location.pathname)
                window.alert(e.response.data)
                window.location.href = `/sign_in?redirect=${window.location.pathname}`
            }
        })
    }, [formData])

    const form = (<div>
        <form onSubmit={_onSubmit}>
            {
                fields.map(field => (
                    <div key={field.label}>
                        <label>
                            {field.label}
                            {field.type === 'textarea' ?
                                <textarea value={formData[field.key].toString()} onChange={e => setFormData({
                                    ...formData,
                                    [field.key]: e.target.value
                                })}/> :
                                <input type={field.type} value={formData[field.key].toString()}
                                       onChange={e => setFormData({...formData, [field.key]: e.target.value})}/>
                            }
                        </label>
                        <p>{errors[field.key].join(',')}</p>
                    </div>
                ))
            }
            <div>
                {buttons}
            </div>
        </form>
        <style jsx>{`
              label{
                display: block;
              }
            `}</style>
    </div>)
    return {form, formData, setErrors}
}
