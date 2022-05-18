import { Link } from 'react-router-dom'
import css from './LinkButton.module.css'

function LinkButton({to, text}) {
    return (
        <Link to={to} className={css.btn}>
            {text}
        </Link>
    )
}

export default LinkButton