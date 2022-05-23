import { useNavigate } from "react-router-dom"

import ProjectForm from "../project/ProjectForm"

import css from './NewProjects.module.css'

function NewProjects() {

    const history = useNavigate()

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            history('/projects', {state:{message: 'Projeto criado com sucesso'}})
        })
            .catch(err => console.log("erro:", err))

    }

    return (
       <div className={css.newproject_container}>
           <h1>Criar Projeto</h1>
           <p>Crie seu projeto para depois adicionar os serviços!</p>
           <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} projectData/>
       </div>
    )
}

export default NewProjects