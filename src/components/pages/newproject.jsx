import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/projectForm';
import styles from './newProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        // inicializando os serviços do my expenses
        project.expenses = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            // redirecionar
            navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } });
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Novo Projeto</h1>
            <p>Crie aqui o seu projeto para depois adicionar os seus itens</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}

export default NewProject;
