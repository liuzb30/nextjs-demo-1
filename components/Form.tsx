import {ChangeEventHandler, FormEventHandler, ReactChild, useCallback, useState} from "react";
type Props = {
    onSubmit: FormEventHandler;
    fields:{
        label:string;
        type: 'text' | 'password';
        value: string | number;
        onChange: ChangeEventHandler<HTMLInputElement>,
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
                            <input type={field.type} value={field.value} onChange={field.onChange}/>
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