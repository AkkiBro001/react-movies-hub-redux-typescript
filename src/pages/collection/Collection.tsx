import styles from "./Collection.module.scss";
import useFetch from "../../hooks/useFetch";
import Card from "../../components/Card/Card";
import { ConfigurationAPI } from "../../constants/TypeGuards";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import {ListsAPI} from "../../constants/TypeGuards"
import { useParams } from "react-router-dom";


function Collection() {

  const {type} = useParams()

  const filterType = type === 'movies' ? 'movie' : 'tv';
  
  const {data}:{data:ListsAPI | null} = useFetch(`discover/${filterType}`);
  const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);
  
  return (
    <div className={styles.collection}>
      
          {
            (data as unknown as ListsAPI)?.results?.map(list => {
              const img = (url as ConfigurationAPI).secure_base_url + "original" + list.poster_path
              
            return <Card key={list.id}  imgURL={img} title={(list.title || list.name) as string} rating={list.vote_average} genre_ids={list.genre_ids} clsName="collectionCard"/>
          })
        }
      
      </div>
  )
}

export default Collection