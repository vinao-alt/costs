// import css from "./ProjectCard.module.css";
import css from "./ProjectCard.module.css";

import { Link } from "react-router-dom";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import VMasker from 'vanilla-masker'
import { Category, Project } from "../interfaces/Project";
import Moment from "moment";

import {Tag} from 'antd'

interface projCardProps {
  id: number,
  name: string,
  budget: number,
  category: Category,
  limitDate: Date,
  initDate: Date,
  handleRemove: Function
}

function ProjectCard({ id, name, budget, category, limitDate, initDate,  handleRemove }: projCardProps) {

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  function changeColor(category) {
    let cor = "#fff"
    if (category.name == "Infra") {
      cor = "magenta"
    } else if (category.name == "Desenvolvimento") {
      cor = "orange"
    } else if (category.name == "Design") {
      cor = "green"
    } else if (category.name == "Planejamento") {
      cor = "blue"
    }
    return cor
  }

  return (
    <div className={css.project_card}>
      <h4>{name}</h4>

      {/* <p>
        <>
          <span>Inicio: </span> {Moment(initDate).format('DD-MM-YYYY')}
        </>
      </p> */}

      <p>
        <>
          <span>Entrega: </span> {Moment(limitDate).format('DD-MM-YYYY')}
        </>
      </p>

      <p>
        <span>Orçamento: </span> R$ {VMasker.toMoney(budget * 100)}
      </p>

      {/* className={css.category_text} */}
      <p>
        {/* <span className={`${css[category.name.toLowerCase()]}`}></span> */}
        <Tag color={changeColor(category)}>{category.name}</Tag>
        
      </p>

      <div className={css.project_card_actions}>
        <Link to={`/edit/${id}`}>
          <BsPencil /> Editar
        </Link>

        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>

    </div>
  );
}

export default ProjectCard;
