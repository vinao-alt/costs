import { BsFillTrashFill } from 'react-icons/bs'
import css from '../project/ProjectCard.module.css'
import Formatters from '../utils/Formatters'

function ServiceCard({id, name, cost, description, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id,cost)
    }

    return(
        <div className={css.project_card}>
            <h4>{name}</h4>
            <p>
            <Formatters name={"Custo Total"} format={"0,0.00"}>{cost}</Formatters>
            </p>
            <p>{description}</p>
            <div className={css.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard