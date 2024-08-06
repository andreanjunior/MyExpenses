import { Link } from "react-router-dom";


import Container from "./container";
import styles from "./navBar.module.css";
import logo from "../../img/costs_logo.png";

function NavBar() {
    return(
        <nav className={styles.navbar}>
            <Container>
             <Link to="/"> <img src={logo} alt="logo"/>
             </Link>
             <ul className={styles.list}>
                <li className={styles.item}>
                  <Link to="/">Home</Link>
                </li>
                <li className={styles.item}>
                  <Link to="/projects">Projeto</Link>
                </li>
                <li className={styles.item}> 
                  <Link to="/contact">Contato</Link>
                </li>
                <li className={styles.item}>
                  <Link to="/conpany">Empresa</Link>
                </li>
              
             </ul>
            </Container>
        </nav>
    )
       
}

export default NavBar;