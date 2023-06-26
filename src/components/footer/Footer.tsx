import {FaTwitter, FaFacebookSquare, FaInstagramSquare, FaSnapchatGhost} from "react-icons/fa";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer>
        <p>&copy; MoviesHub 2023</p>
        <ul className={styles.socials}>
            <li><FaTwitter/></li>
            <li><FaFacebookSquare/></li>
            <li><FaInstagramSquare/></li>
            <li><FaSnapchatGhost/></li>
        </ul>
    </footer>
  )
}

export default Footer