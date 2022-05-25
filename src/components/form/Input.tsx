import css from './Input.module.css'

interface InputProps {
    type?:string,
    text?:string,
    name?:string,
    placeholder?:string,
    handleOnChange?:React.ChangeEventHandler<HTMLInputElement>,
    value?:string
}

function Input({ type, text, name, placeholder, handleOnChange, value }:InputProps) {
    return (
        <>
            <div className={css.form_control}>
                <label htmlFor={name}>{text}:</label>
                <input type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    value={value}
                    />
            </div>
        </>
    )
}

export default Input