import { BsFillTrashFill } from 'react-icons/bs'
import css from '../project/ProjectCard.module.css'
import VMasker from 'vanilla-masker'
import Moment from 'moment'

interface servCard {
    id: number,
    name: string,
    cost: number,
    description: string,
    handleRemove: Function,
    initServiceDate: Date,
    limitServiceDate: Date
}

function ServiceCard({ id, name, cost, description, handleRemove, initServiceDate, limitServiceDate }: servCard) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={css.project_card}>
            <h4>{name}</h4>

            <p>
                <span>Inicio: </span> {Moment(initServiceDate).format('DD-MM-YYYY')}
                <span className={css.data}>Fim: </span> {Moment(limitServiceDate).format('DD-MM-YYYY')}
            </p>

            <p>
                <span>Custo: </span> R$ {VMasker.toMoney(cost * 100)}
            </p>

            <p>{description}</p>
            <div className={css.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir
                </button>
            </div>
        </div >
    )
}

export default ServiceCard