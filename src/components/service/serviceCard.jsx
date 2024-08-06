import styles from '../project/projectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'
function ServiceCard ({id, name, expenses, description, handleRemove}) {

    const remove  =  (e) => {
        e.preventDefault()
        handleRemove(id, expenses)

    }
    return(


        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p> 
                <span>Custo total:</span> R${expenses}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill />
                    Excluir 
                </button>
            </div>
        </div>
        


    )
}

export default ServiceCard