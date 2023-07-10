import styles from "./ErrorPage.module.scss";
import ErrorIcon from "../../assets/error-icon.png"


const ErrorPage = () => {
  
  return (
    <div className={styles.errorContainer}>
        <img src={ErrorIcon} alt="" />
        <h2>Can not fetch data from server</h2>
        <a 
        href="#"
        onClick={()=> location.reload()}
        >Try After Some Time</a>
    </div>
  )
}

export default ErrorPage