import css from "./Edit.module.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import { Project } from "../interfaces/Project";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";

function Edit() {
  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("data da pagina de ediçao: ", data);
          setProject(data);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, [id]);

  function editPost(project) {
    setMessage("");
    // budget validation
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false); //or (!showProjectForm)
        setMessage("Projeto Atualizado!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project?.name ? (
        <div className={css.edit_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={css.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={css.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={css.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}
                  </p>

                  <p>
                    <span>Total de Orçamento: </span>
                    R${project.budget}
                  </p>

                  <p>
                    <span>Total Utilizado: </span>
                    R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={css.project_info}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={css.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={css.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button>
              <div className={css.project_info}>
                {showServiceForm && (
                  <div>Formulário do serviço</div>
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              <p>itens de Serviços</p>
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Edit;
