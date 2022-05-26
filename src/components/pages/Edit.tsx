import { parse, v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import css from "./Edit.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";
import { Project } from "../interfaces/Project";
import { Servico } from "../interfaces/Service";
import { toast } from "react-toastify";
import Formatters from "../utils/Formatters";

function Edit() {
  // let { id } = useParams()
  // const [project, setProject] = useState([])
  // const [showProjectForm, setShowProjectForm] = useState(false)
  // const [showServiceForm, setShowServiceForm] = useState(false)
  // const [services, setServices] = useState([])
  // const [message, setMessage] = useState('')
  // const [type, setType] = useState('success')

  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [services, setServices] = useState<Project>();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    // Para ver o loading
    setTimeout(
      () =>
        fetch(`http://localhost:5000/projects/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data);
            setServices(data.services);
          }),
      0
    );
  }, [id]);

  function editPost(project: Project) {
    // budget validation
    // if () {
    //   // setMessage("O Orçamento não pode ser menor que o custo do projeto!");
    //   // setType("error");
    //   toast.error("O Orçamento não pode ser menor que o custo do projeto!")
    //   return false;
    // }

    if (project.budget < project.cost) {
      if (project.cost < 0) {
        toast.error("O custo não pode ser negativo!");
        return false;
      }
      toast.error("O Orçamento não pode ser menor que o custo do projeto!");
      return false;
    } else {
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(data);
          setShowProjectForm(!showProjectForm);
          setMessage("Projeto atualizado!");
          setType("success");
        });
    }
  }

  function createService(project: Project) {
    // last service
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost =
      parseFloat(String(project.cost)) + parseFloat(String(lastServiceCost));
    // maximum value validation
    if (newCost > parseFloat(String(project.budget))) {
      setMessage("Orçamento ultrapassado, verifique o valor do serviço!");
      setType("error");
      project.services.pop();
      return false;
    }

    // add service cost to project cost total
    project.cost = newCost;

    if (lastServiceCost > 0 && lastService.name && lastService.description) {
      fetch(`http://localhost:5000/projects/${project.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setServices(data.services);
          setShowServiceForm(!showServiceForm);
          setMessage("Serviço adicionado!");
          setType("success");
        });
    } else {
      toast.error("Insira todos os dados corretamente!");
      project.services.pop();
      setShowServiceForm(!showServiceForm);
      project.cost = project.services[project.services.length -1].cost
      return false;
    }
  }

  function removeService(id, cost) {
    setMessage("");

    if (project != undefined) {
      const servicesUpdated = project.services.filter(
        (service) => service.id !== id
      );

      const projectUpdated = project;

      projectUpdated.services = servicesUpdated;

      if (parseFloat(cost) != NaN) {
        projectUpdated.cost = projectUpdated.cost - parseFloat(cost);
      }

      fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectUpdated),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(projectUpdated);
          // setServices(servicesUpdated)
          setMessage("Serviço removido com sucesso!");
          setType("success");
        });
    }
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
              <h1>{project.name}</h1>
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
                    <Formatters name={"Total de Orçamento:"} format={"0,0.00"}>{project.budget}</Formatters>
                  </p>

                  <p>
                    <Formatters name={"Total Utilizado:"} format={"0,0.00"}>{project.cost}</Formatters>
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
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {project.services.length > 0 &&
                project.services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))}
              {project.services.length === 0 && (
                <p>Não há serviços cadastrados.</p>
              )}
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
