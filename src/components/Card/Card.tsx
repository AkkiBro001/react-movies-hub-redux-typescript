import styles from "./Card.module.scss";
import LazyLoadImg from "../lazyLoadImg/LazyLoadImg";
import Rating from "../Rating/Rating";
import { Genres } from "../../constants/TypeGuards";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useNavigate, useParams } from "react-router-dom";


interface Props {
    id: number
    imgURL: string,
    title: string,
    rating: number,
    genre_ids: number[]
    clsName?: string,
    mediaType: string | undefined
}





function Card({imgURL, title, rating, genre_ids, clsName, id, mediaType}: Props) {
const navigate = useNavigate()
const genres: Genres[] = useSelector((state: RootState) => state.home.genres)
const getGenres = genre_ids ? genre_ids.map(id => genres?.find(val => val.id === id)?.name).slice(0,3) : undefined


   const {type, query} = useParams()  
   
    
  return (
    

     <div className={`${styles.card} ${clsName ? clsName : ""}`} onClick={()=>navigate(`/${mediaType}/${id}`)}>
        <header className={`${styles.cardImgContainer} ${(type || query) ? "collectionCardImg" : ""}`} >
            <LazyLoadImg src={imgURL} className=""/>
            <div className={`${styles.genres} ${(type || query) ? "collectionGenres" : ""}`}>
                {getGenres?.map((genres, id) => <span key={id}>{genres}</span>)}
            </div>
            <div className={styles.gradient}></div>
        </header>
        <Rating rating={rating} clsName='rating__card'/>
        <footer className={styles.cardDetails}>
            
            <span className={styles.name}>{title}</span>
        </footer>
    </div>
    
  )
}

export default Card