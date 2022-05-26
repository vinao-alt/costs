import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Project } from "../interfaces/Project";

import ProjectForm from "../project/ProjectForm";

import css from "./NewProjects.module.css";

function NewProjects() {
  const history = useNavigate();

  function createPost(project: Project) {
    project.cost = 0;
    project.services = [];

    if (project.category) {
      if (project.budget > 0) {
        fetch("http://localhost:5000/projects", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            history("/projects", {
              state: { message: "Projeto criado com sucesso" },
            });
          })
          .catch((err) => console.log("erro:", err));
      } else {
        toast.warning("Digite um orçamento positivo!");
      }
    } else {
      toast.warning("A categoria não foi preenchida!");
    }
  }

  return (
    <div className={css.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços!</p>
      <ProjectForm
        btnText="Criar Projeto"
        handleSubmit={createPost}
        projectData
      />
    </div>
  );
}

export default NewProjects;
