import { useEffect, useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { Project } from '../interfaces/Project'


function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState<Project[]>([])
    const [project, setProject] = useState<Project>(projectData || {})

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    // function handleCategory(project) {
    //     setProject({
    //         ...project,
    //         category: {
    //             id: project.category.id,
    //             name: project.category.name,
    //         },
    //     })
    // }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                // name: e.target.name
                name: e.target.options[e.target.selectedIndex].text
            },
        })
    }

    function handleFinish(a: any) {
        handleSubmit(project)
    }

    return (
        <>
            <Form
                onFinish={handleFinish}>
                <Form.Item
                    name={['name']}
                    rules={[{ required: true, message: 'Digite o nome do projeto por favor!' }]}
                    label="nome do projeto">
                    <Input placeholder='Ex. App ping pong' onChange={handleChange} value={project.name} />
                </Form.Item>

                <Form.Item
                    name={['budget']}
                    rules={[{ required: true, min: 0, max: 99 }]}
                    label="orçamento do projeto">
                    <Input type='number' onChange={handleChange} placeholder=' Ex. 100' value={project.budget} />
                </Form.Item>

                <Form.Item
                    name={['category']}
                    rules={[{ required: true, message: 'Selecione uma Categoria!' }]}
                    label="categoria">
                    <Select style={{ width: 120 }} onChange={handleCategory} value={project.category}>
                        {categories.map((option) => (
                            <Select.Option value={option.id} key={option.id} id={option.id}> {option.name} </ Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button htmlType='submit'>
                    {btnText}
                </Button>
            </Form>
        </>
    )
}

export default ProjectForm