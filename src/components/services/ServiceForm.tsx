import css from '../project/ProjectForm.module.css'
import { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { Service } from '../interfaces/Service'
import { Project } from '../interfaces/Project'

interface servFormProps {
    handleSubmitService: Function,
    btnText: string,
    projectData?
}

function ServiceForm({ handleSubmitService, btnText, projectData }: servFormProps) {

    const [services, setServices] = useState<Service>({} || projectData)

    function handleFinish(dataSubmit) {
        const service: Service = {
            id: 0,
            name: dataSubmit.name,
            cost: dataSubmit.cost,
            description: dataSubmit.description,
            // date: new Date()
        }
        handleSubmitService(service, projectData)
    }

    return (<>
        <Form
            onFinish={handleFinish}>
            <Form.Item
                name={['name']}
                rules={[{ required: true, message: 'Digite o nome do Serviço por favor!' }]}
                label="nome do Serviço">
                <Input placeholder='Ex. Atualizar banco de dados da NETFLIX' value={services.name} />
            </Form.Item>

            <Form.Item
                name={['cost']}
                rules={[{ required: true, min: 0, max: 99 }]}
                label="custo do serviço">
                <Input type='number' placeholder=' Ex. 100' value={services.cost} />
            </Form.Item>

            <Form.Item
                name={['description']}
                rules={[{ required: true }]}
                label="descrição do serviço">
                <Input placeholder=' Ex. 100' value={services.cost} />
            </Form.Item>

            <Button htmlType='submit'>
                {btnText}
            </Button>
        </Form>
    </>)
}

export default ServiceForm