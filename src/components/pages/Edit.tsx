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
import { Project, ProjectUpdate } from "../interfaces/Project";
import { Service } from "../interfaces/Service";
import { toast } from "react-toastify";
import VMasker from 'vanilla-masker'
import { Button } from 'antd'
function Edit() {
  const { id } = useParams();
  const [project, setProject] = useState<Project>();
  const [services, setServices] = useState<Service>();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
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
    );
  }, [id]);


  function editPost(project: Project) {


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

  function createService(service: Service, project: Project) {
    const lastService: Service = service
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

    project.services.push(lastService)
    project.services.sort((a,b) => a.date < b.date ? 1 : -1 )


    // add service cost to project cost total
    project.cost = newCost;

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
              <Button type="primary" size="large" onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </Button>
              {!showProjectForm ? (
                <div className={css.project_info}>
                  <p>
                    <span>Categoria: </span>
                    {project.category.name}
                  </p>

                  <p>
                    <span>Orçamento Total: </span> R$ {VMasker.toMoney(project.budget * 100)}

                  </p>

                  <p>
                    <span>Custo Total: </span> R$ {VMasker.toMoney(project.cost * 100)}

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
              {/* <button className={css.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </button> */}
              <Button type="primary" size="large" onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
              </Button>
              <div className={css.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmitService={createService}
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
                    date={service.date}
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
