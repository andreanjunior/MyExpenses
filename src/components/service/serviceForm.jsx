
import {useState} from 'react'

import Input from '../form/input'
import SubmitButton from '../form/submitButton'
import styles from '../project/projectForm.module.css'

function ServiceForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState({})
    function submit(e) {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)

    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})

    }
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
            type='text'
            text='Nome do serviço'
            name='name'
            placeholder='Insira um Titulo '
            handleOnChange={handleChange}
            />
            <Input 
            type='nunber'
            text='Custo do serviço'
            name='expenses'
            placeholder='Insira o valor '
            handleOnChange={handleChange}
            />
            <Input 
            type='text'
            text='Descriçao do gasto '
            name='description'
            placeholder='Insira uma descriçao '
            handleOnChange={handleChange}
            />
            <SubmitButton text={btnText} />
        </form>

    )
}

export default ServiceForm