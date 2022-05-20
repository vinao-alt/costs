import css from './Loading.module.css'
import loading from '../img/loading.svg'

function Loading() {
    return(
        <div className={css.loader_container}>
            <img src={loading} alt="Loading" className={css.loader} />
        </div>
    )
}

export default Loading