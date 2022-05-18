import css from './Select.module.css'

//3 formas de deixar os valores opcionais

// function Select({text, name, options, handleOnChange, value}:{text:string|undefined})
// function Select({text?:string, name?:string, options?:unknown, handleOnChange?:unknown, value?:string})
interface SelectProps {text?:string, name?:string, options?, handleOnChange?, value?:string}

function Select({text, name, options, handleOnChange, value}:SelectProps) {
    return(
        <>
        <div className={css.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ""}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
        </>
    )
}

export default Select