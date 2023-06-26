import { useEffect } from "react"
import HeroBanner from "../heroBanner/HeroBanner"
import fetchDataFromAPI from "../../utils/API"
import { getAPIConfiguration, getGenres } from "../../store/HomeSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { ConfigurationAPI } from "../../constants/TypeGuards";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";






function Home() { 

  const dispatch = useDispatch()
 
  

  const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);
  
  
  useEffect(()=>{
    if(url && (url as ConfigurationAPI).secure_base_url ) return;
    fetchDataFromAPI('configuration')
    .then(res => {
      dispatch(getAPIConfiguration(res.images))
    })
   
    fetchDataFromAPI(`genre/movie/list`).then(res => dispatch(getGenres(res.genres)))
    fetchDataFromAPI(`genre/tv/list`).then(res => dispatch(getGenres(res.genres)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  


  return (
    <>
    <HeroBanner/>
    <ContentWrapper>
        <Popular/>
        <TopRated/>
        <Trending category="movie"/>
        <Trending category="tv"/>
    </ContentWrapper>
    </>
  )
}

export default Home