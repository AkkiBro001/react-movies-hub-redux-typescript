import styles from "./Skeleton.module.scss";
import gradient from "../../assets/gradient.png"
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
function Skeleton() {

  const theme = useSelector(state => (state as RootState).theme)
  
  return (
    <div className={styles.card}>
        <img src={gradient} alt="" style={{filter: `${theme ? "invert(0)" : 'invert(1)'}`}}/>
    </div>
  )
}

export default Skeleton