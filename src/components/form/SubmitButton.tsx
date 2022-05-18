import css from './SubmitButton.module.css'

function SubmitButton({text} ) {
    return(
        <>
        <button className={css.btn}>{text}</button>
        </>
    )
}

export default SubmitButton