import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import css from './NewProjects.module.css'

function NewProjects() {

    const navigate = useNavigate() //equivalente ao history do professor do curso

    function createPost(project) {
        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects',{
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
        })
        .catch((err) => console.log(err))


    }

    return (
        <>
            <div className={css.newproject_container}>
                <h1>Criar Projeto</h1>
                <p>Crie seu projeto para depois adicionar os serviços!</p>

                <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
            </div>
        </>
    )
}

export default NewProjects