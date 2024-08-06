import {parse, v4 as uuidv4} from 'uuid'

import styles from './project.module.css'


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layout/loading.jsx';
import Container from '../layout/container.jsx';
import ProjectForm from '../project/projectForm.jsx';
import Message from '../layout/message.jsx';
import ServiceForm from '../service/serviceForm.jsx';
import ServiceCard from '../service/serviceCard.jsx';
function Project() {

    const {id} =useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,{
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            } ). then((resp) => resp.json()) 
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch((err) => console.log(err))
        }, 300)
  
    }, [id])

    function editPost (project) {
        setMessage('')
        //budget validation
        if(project.budget < project.expenses){
         setMessage('O orçamento nao pode ser menor que o custo do Projeto !!!')
         setType('error')
         return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {'Content-Type' :'application/json'

            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado com sucesso!')
            setType('success')

        })

        .catch ((err) => console.log(err))

    }
    function createService(project) {
        setMessage('')
        //last service
        const lastService = project.services[project.services.length - 1] 

        lastService.id = uuidv4()
        const lastServiceExpenses = lastService.expenses

        const newExpenses = parseFloat(project.expenses) + parseFloat(lastServiceExpenses);

            if (newExpenses > parseFloat(project.budget)) {
                setMessage('Orçamento ultrapassado, verifique o valor do Serviço.');
                setType('error');
                project.services.pop();
                 // Remover o último serviço se necessário
                return false;
            }
            project.expenses = newExpenses
        //update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json' 
            },
            body: JSON.stringify(project)
        }).then((resp)  => resp.json())
        .then((data) => {
            // exibir serviços
            setShowServiceForm(false)
        })
        
        .catch((err) => console.log(err) )
    }

    function removeService(id, expenses) {
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project 

        projectUpdated.services = servicesUpdated

        projectUpdated.expenses = parseFloat(projectUpdated.expenses) - parseFloat(expenses)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json()) 
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')

        })
        
        .catch((err) => console.log(err))

    }
    
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)

    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)

    }


    return(
        <>
        {project.name ? (
            <div className={styles.project_details} >  
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.details_container}>
                    <h1>Projeto:{project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p>
                                <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                <span>Total de Orçamento: </span> {project.budget}
                                </p>
                                <p>
                                <span>Total Utilizado: </span> {project.expenses}
                                </p>
                            </div>
                        ) : ( <div  className={styles.project_info}>
                            <ProjectForm  
                            handleSubmit={editPost}
                            btnText='Concluir Edição'
                            projectData={project}
                            
                            />
                        </div>
                        )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2>Adicione um Serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    btnText='Adicionar serviço'
                                    projectData={project}
                                    
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start" > 
                        {services.length > 0  && 
                         services.map((service) => (
                            <ServiceCard 

                            id={service.id}
                            name={service.name}
                            expenses={service.expenses}
                            description={service.description}
                            key={service.id}
                            handleRemove={removeService}
                            
                            /> 

                        ))
                        
                        }
                        {services.length === 0 && <p>Não ha Serviços Cadastrados</p>}
                        </Container>
                </Container>
            </div>
        ) : (
            <Loading />
            )}
        
        </>
      
    )
}

export default Project;