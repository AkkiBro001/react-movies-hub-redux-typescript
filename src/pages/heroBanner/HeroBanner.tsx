import React, {useEffect, useState} from 'react';
import styles from "./HeroBanner.module.scss";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConfigurationAPI, ListsAPI } from '../../constants/TypeGuards';
import { RootState } from '../../store/Store';
import useFetch from '../../hooks/useFetch';
import HeroPreview from "../../assets/hero-preview.jpg"

function HeroBanner() {

  const [backdrop, setBackDrop] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const navigate = useNavigate()
  const {data}:{data:ListsAPI | unknown} = useFetch('movie/upcoming')
  

  const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);

  const handleSearch = (e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
    if(query.length > 0){
      navigate(`/search/${query}`)
    }
  }
  const base_url:string = (url as ConfigurationAPI).secure_base_url + "original";

  
  useEffect(()=>{
    if(data && (data as ListsAPI)?.results){
        const bg = base_url + (data as ListsAPI).results[Math.floor(Math.random() * 20)].backdrop_path;
        
        setBackDrop(bg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  

  return (
    <div className={styles.heroBannerContainer}>
        <img src={backdrop ? backdrop : HeroPreview} alt="backdrop" className={styles.backdropImg}/>
        <h3 className={styles.title}>Millions of movies, TV shows and people to discover. Explore now.</h3>
        <form className={styles.serachContainer} onSubmit={(e)=>handleSearch(e)}>
            <input type="text" placeholder="search movies and shows....."
            onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Search</button>
        </form>
        <div className={styles.gradient}>
            
        </div>
    </div>
  )
}

export default HeroBanner