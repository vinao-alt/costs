import css from './Input.module.css'
import {Input} from 'antd'

interface InputProps {
    placeholder?:string,
    value?:string,
}

function InputComponent({placeholder, value }:InputProps) {
    return (
        <>
            <div className={css.form_control}>
                <input
                    placeholder={placeholder}
                    value={value}
                    required
                    />
            </div>
        </>
    )
}

export default InputComponent