import css from './Input.module.css'

//3 formas de deixar os valores opcionais

// function Select({text, name, options, handleOnChange, value}:{text:string|undefined})
// function Select({text?:string, name?:string, options?:unknown, handleOnChange?:unknown, value?:string})
// interface SelectProps {type?:string, text?:string, name?:string, placeholder?:string, handleOnChange?:boolean, value?:string}

interface InputProps {
    type?:string,
    text?:string,
    name?:string,
    placeholder?:string,
    handleOnChange?:React.ChangeEventHandler<HTMLInputElement>,
    value?:string
}

// tipo do onchange: (event: React.ChangeEvent<T>) => void

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
                    value={value} />
            </div>
        </>
    )
}

export default Input