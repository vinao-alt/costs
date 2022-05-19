import Message from "../layout/Message"
import { useLocation } from 'react-router-dom';
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";

import css from "../pages/Projects.module.css"
import { useState, useEffect } from "react";

function Projects() {

    // interface Projetos {
    //     name: string,
    //     budget: number,
    //     category: {id:number, nome:string},
    //     cost: number,
    //     services: [],
    //     id: number
    // }

    const [projects, setProjects] = useState([])

    const location = useLocation() as { state: { message: string } }
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
            .then((data) => {
                console.log("projetos: ", data)
                setProjects(data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className={css.project_container}>
            <div className={css.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newprojects" text="criar projeto" />
            </div>
            {/* <Message msg="alguma mensagem" type="success"/> */}
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 && projects.map((project) =>
                    <div key={project}>
                        <ProjectCard id={project} name={project} budget={project} />
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Projects