import { Link } from 'react-router-dom'
import css from './LinkButton.module.css'

function LinkButton(to:any, text:string) {
    return (
        <>
            <Link to={to} className={css.btn}>
                {text}
            </Link>
        </>
    )
}

export default LinkButton