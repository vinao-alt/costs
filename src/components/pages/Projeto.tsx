import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Project } from "../interfaces/Project";
import css from './Project.module.css'
import Projects from './Projects';


function Projeto() {
    const { id } = useParams()
    const [project, setProject] = useState<Project[]>([])

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                const pjt: Project[] = data
                console.log("pjt: ", pjt)
                setProject(pjt)
                // setProject(data)
            })
            .catch((err) => console.log(err))
    }, [id])


    return (
        <div>
         projeto
        </div>
    )
}

export default Projeto