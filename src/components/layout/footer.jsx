import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./footer.module.css";
function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <FaWhatsapp/>
                </li>
                <li>
                    <FaGithub/>
                </li>
                <li>
                    <FaLinkedin/>
                </li>
                </ul>
                <p className={styles.copy_right}>
                    <span>Expenses</span> &copy; 2024
                </p>
        </footer>
   
)
}

export default Footer;