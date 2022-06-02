import { useEffect, useState } from 'react'
import { Form, Input, Button, Select, InputNumber, DatePicker, DatePickerProps } from 'antd'
import { Category, Project } from '../interfaces/Project'
import css from './ProjectForm.module.css'

interface projFormProps {
    handleSubmit: Function,
    btnText: string,
    projectData?
}

function ProjectForm({ handleSubmit, btnText, projectData }: projFormProps) {

    const [categories, setCategories] = useState<Category[]>([])
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

    function handleFinish(dataSubmit) {
        const category : Category = categories.find(category => category.id == dataSubmit.category)!
        const project: Project = {
            name: dataSubmit.name,
            budget: dataSubmit.budget,
            category,
            cost: projectData.cost,
            services: [],
            id: projectData.id,
            limitDate: dataSubmit.limitDate,
            initDate: dataSubmit.initDate
        }
        handleSubmit(project)

    }

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
      };

    return (
        <>
            <Form
                layout='vertical'
                className={css.form}
                onFinish={handleFinish}>
                <Form.Item
                    name={['name']}
                    rules={[{ required: true, message: 'Digite o nome do projeto por favor!' }]}
                    label="nome do projeto">
                    <Input placeholder='Ex. App ping pong' value={project.name} />
                </Form.Item>

                <Form.Item
                    name={['limitDate']}
                    rules={[{ required: true, message: 'Especifique a data de entrega do projeto!' }]}
                    label="Data de entrega">
                    <DatePicker onChange={onChange} />
                </Form.Item>

                <Form.Item
                    name={['budget']}
                    rules={[{required:true, type: 'number', min: 0, max: undefined }]}
                    label="orçamento do projeto">
                    <InputNumber placeholder=' Ex. 100' value={project.budget} />
                </Form.Item>

                <Form.Item
                    name={['category']}
                    rules={[{ required: true, message: 'Selecione uma Categoria!' }]}
                    label="categoria">
                    <Select style={{ width: 320 }} value={project.category}>
                        {categories.map((option) => (
                            <Select.Option key={option.id} id={option.id} value={option.id} > {option.name} </ Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button htmlType='submit' type='primary' size='large'>
                    {btnText}
                </Button>
            </Form>
        </>
    )
}

export default ProjectForm