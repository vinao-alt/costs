import { BsFillTrashFill } from 'react-icons/bs'
import css from '../project/ProjectCard.module.css'
import VMasker from 'vanilla-masker'


function ServiceCard({id, name, cost, description, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id,cost)
    }

    cost = cost*100

    return(
        <div className={css.project_card}>
            <h4>{name}</h4>
            <p>
            <span>Custo: </span> R$ {VMasker.toMoney(cost)}
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