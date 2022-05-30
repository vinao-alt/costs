import css from "./ProjectCard.module.css";

import { Link } from "react-router-dom";

import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import VMasker from 'vanilla-masker'

function ProjectCard({ id, name, budget, category, handleRemove }) {

  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };
  
  return (
    <div className={css.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Orçamento: </span> R$ {budget}
        {VMasker.toMoney(budget * 100)}
      </p>
      <p className={css.category_text}>
        <span className={`${css[category.name.toLowerCase()]}`}></span>{" "}
        {category.name}
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
