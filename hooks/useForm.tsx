import {ReactChild, useCallback, useState} from "react";
import {AxiosResponse} from "axios";
import cs from 'classnames'

type Field<T> = {
    label: string;
    type: 'text' | 'password' | 'textarea';
    key: keyof T;
    className?: string;
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
                    <div key={field.label} className={cs("field", `field-${field.key}`, field.className)}>
                        <label className='label'>
                            <span className="label-text">{field.label}</span>
                            {field.type === 'textarea' ?
                                <textarea className='control' value={formData[field.key].toString()} onChange={e => setFormData({
                                    ...formData,
                                    [field.key]: e.target.value
                                })}/> :
                                <input className='control' type={field.type} value={formData[field.key].toString()}
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
        .field {
          margin: 8px 0;
        }
        .label {
          display: flex;
          line-height: 32px;
        }
        .label input {
          height: 32px;
        }
        .label > .label-text {
          white-space: nowrap;
          margin-right: 1em;
        }
        .label > .control {
          width: 100%;
        }
      `}</style>
    </div>)
    return {form, formData, setErrors}
}
