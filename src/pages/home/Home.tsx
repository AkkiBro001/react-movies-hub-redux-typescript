import { useEffect } from "react"
import HeroBanner from "../heroBanner/HeroBanner"
import fetchDataFromAPI from "../../utils/API"
import { getAPIConfiguration } from "../../store/HomeSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { ConfigurationAPI } from "../../constants/TypeGuards";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import CarouselContainer from "../../components/CarouselContainer/CarouselContainer";




function Home() { 

  const dispatch = useDispatch()
 
  

  const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);

  useEffect(()=>{
    if(url && (url as ConfigurationAPI).secure_base_url ) return;
    fetchDataFromAPI('configuration')
    .then(res => {
      dispatch(getAPIConfiguration(res.images))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
    <HeroBanner/>
    <ContentWrapper>
        <CarouselContainer/>
    </ContentWrapper>
    </>
  )
}

export default Home