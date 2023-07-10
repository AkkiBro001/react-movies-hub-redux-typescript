import styles from "./NoResult.module.scss"
import NoResultImg from "../../assets/no-results.png"

const NoResult = () => {
  return (
    <div className={styles.noResultContainer}>
        <img src={NoResultImg} alt="" />
        <h1>Oops!! No result found</h1>
        <a href="/">Go to Home Page</a>
    </div>
  )
}

export default NoResult