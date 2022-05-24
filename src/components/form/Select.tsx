import css from "./Select.module.css";

// interface SelectProps { text: string, name: string, options, handleOnChange, value: string }

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={css.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ""} required>
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}> {option.name} </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
