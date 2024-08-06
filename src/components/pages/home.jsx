import styles from './home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from "../layout/linkButton";
function Home() {
    return (
        <section className={styles.home_container}>
        <h1>Bem vindo ao <span>My Expenses</span>
        </h1>
        <p>Comece a gerenciar suas despesas agora mesmo!</p>
       <LinkButton to="/newproject" text="Criar Projeto"/>
        <img src={savings} alt="savings" />
        </section>
   

    )
}

export default Home;