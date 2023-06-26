import styles from "./Card.module.scss";
import LazyLoadImg from "../lazyLoadImg/LazyLoadImg";
import Rating from "../Rating/Rating";
import { Genres } from "../../constants/TypeGuards";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import NoPoster from "../../assets/no-poster.png"


interface Props {
    imgURL: string,
    title: string,
    rating: number,
    genre_ids: number[]
}





function Card({imgURL, title, rating, genre_ids}: Props) {
const genres: Genres[] = useSelector((state: RootState) => state.home.genres)
const getGenres = genre_ids.map(id => genres.find(val => val.id === id)?.name).slice(0,3)

    
 

  return (
    

     <div className={styles.card}>
        <header className={styles.cardImgContainer}>
            <LazyLoadImg src={imgURL ? imgURL : NoPoster} className=""/>
            <div className={styles.genres}>
                {getGenres.map((genres, id) => <span key={id}>{genres}</span>)}
            </div>
            <div className={styles.gradient}></div>
        </header>
        <Rating rating={rating}/>
        <footer className={styles.cardDetails}>
            
            <span className={styles.name}>{title}</span>
        </footer>
    </div>
    
  )
}

export default Card