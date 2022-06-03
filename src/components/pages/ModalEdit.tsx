import { Button, Modal } from 'antd'
import { toast } from 'react-toastify';
import { Project } from '../interfaces/Project';
import { Service } from '../interfaces/Service';
import ServiceForm from '../services/ServiceForm';
import { v4 as uuidv4 } from "uuid";
import { useState } from 'react';

interface modalProps {
    abrirModal: () => void,
    visible: boolean,
    fecharModal: () => void,
    onOk: () => void,
    projectData?,
    handleSub?
}

function ModalEdit({ visible, fecharModal, onOk, projectData, handleSub}: modalProps) {

    return (
        <div>
            <>
                <Modal
                    title="Editar Serviço"
                    visible={visible}
                    onCancel={fecharModal}
                    okText="Concluir Edição"
                    onOk={onOk}>
                    <ServiceForm
                        handleSubmitService={handleSub}
                        projectData={projectData} />
                </Modal>
            </>
        </div>
    )
}

export default ModalEdit