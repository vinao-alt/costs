import Message from "../layout/Message"
import Loading from "../layout/Loading";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

import css from "../pages/Projects.module.css"

import { Project } from "../interfaces/Project";

import ProjectCard from "../project/ProjectCard";

import { useLocation } from 'react-router-dom';

import { useState, useEffect } from "react";

function Projects() {

    const [projects, setProjects] = useState<Project[]>([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')


    interface CustomizedState { message: string }

    const location = useLocation();
    const state = location.state as CustomizedState;
    let message = ''

    if (state) {
        message = state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    const projetos: Project[] = data
                    setProjects(projetos)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method:'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={css.project_container}>
            <div className={css.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newprojects" text="criar projeto" />
            </div>
            <div>
                {message && <Message type="success" msg={message} />}
                {projectMessage && <Message type="success" msg={projectMessage} />}
            </div>

            <Container customClass="start">
                {projects.map((item) => (
                    <ProjectCard
                        id={item.id}
                        key={item.id}
                        name={item.name}
                        budget={item.budget}
                        category={item.category}
                        limitDate={item.limitDate}
                        handleRemove={removeProject}

                    />
                ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não ha projetos cadastrados!</p>
                ) }
            </Container>
        </div>
    )
}

export default Projects