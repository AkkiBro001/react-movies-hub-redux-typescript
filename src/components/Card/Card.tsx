import styles from "./Card.module.scss";
import LazyLoadImg from "../lazyLoadImg/LazyLoadImg";
import Rating from "../Rating/Rating";
import { Genres } from "../../constants/TypeGuards";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

import { useParams } from "react-router-dom";


interface Props {
    imgURL: string,
    title: string,
    rating: number,
    genre_ids: number[]
    clsName?: string,
}





function Card({imgURL, title, rating, genre_ids, clsName}: Props) {
const genres: Genres[] = useSelector((state: RootState) => state.home.genres)
const getGenres = (genre_ids).map(id => genres.find(val => val.id === id)?.name).slice(0,3)

   const {type} = useParams()  
    

  return (
    

     <div className={`${styles.card} ${clsName ? clsName : ""}`}>
        <header className={`${styles.cardImgContainer} ${type ? "collectionCardImg" : ""}`} >
            <LazyLoadImg src={imgURL} className=""/>
            <div className={`${styles.genres} ${type ? "collectionGenres" : ""}`}>
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