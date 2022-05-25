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

    if (
      project.category &&
      project.budget >= 0 &&
      project.budget != null &&
      project.name != null &&
      project.name != ""
    ) {

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
      if (!project.category) {
        toast.error("Escolha uma categoria!");
      } else if (
        project.budget < 0 ||
        project.budget == null
      ) {
        toast.error("Digite um número positivo para o valor do projeto!");
      } else if (project.name == "" || project.name == null) {
        toast.error("Digite um nome para o projeto!");
      }
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
