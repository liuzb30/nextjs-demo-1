import {ChangeEventHandler, FormEventHandler, ReactChild, useCallback, useState} from "react";
type Props = {
    onSubmit: FormEventHandler;
    fields:{
        label:string;
        type: 'text' | 'password' | 'textarea';
        value: string | number;
        onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        errors: string[];
    }[];
    buttons:ReactChild
}
const Form:React.FC<Props> = (props)=>{
    return(
        <div>
            <form onSubmit={props.onSubmit}>
                {
                    props.fields.map(field=>(
                        <div key={field.label}>
                        <label>
                            {field.label}
                            {field.type==='textarea'?
                                <textarea onChange={field.onChange}>{field.value}</textarea>:
                                <input type={field.type} value={field.value} onChange={field.onChange}/>
                            }
                        </label>
                        <p>{field.errors.join(',')}</p>
                        </div>
                    ))
                }
                <div>
                    {props.buttons}
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

export default Form;