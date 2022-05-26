import css from './Input.module.css'

interface InputProps {
    type?,
    text?:string,
    name?:string,
    placeholder?:string,
    handleOnChange?,
    value?:string,
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
                    required
                    />
            </div>
        </>
    )
}

export default Input