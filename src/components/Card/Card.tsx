import styles from "./Card.module.scss"
import LazyLoadImg from "../lazyLoadImg/LazyLoadImg"
import Rating from "../Rating/Rating"

function Card() {
  return (
    <div className={styles.card}>
        <header className={styles.cardImgContainer}>
            <LazyLoadImg src="https://marketplace.canva.com/EAFMqwkPfOY/2/0/1131w/canva-black-minimalist-horror-movie-poster-3bttgZhMDnA.jpg" className=""/>
            <div className={styles.genres}>
                <span>Action</span>
                <span>Drama</span>
                <span>Adventure</span>
            </div>
            <div className={styles.gradient}></div>
        </header>
        <footer className={styles.cardDetails}>
            <Rating/>
            
            <span className={styles.name}>Spider Man: No way home</span>
        </footer>
    </div>
  )
}

export default Card