import { useEffect, useState } from "react"
import CarouselContainer from "../../components/CarouselContainer/CarouselContainer"
import {ListsAPI } from "../../constants/TypeGuards"
import useFetch from "../../hooks/useFetch"
import fetchDataFromAPI from "../../utils/API";
import { useDispatch } from "react-redux";
import { getGenres } from "../../store/HomeSlice";

function Popular() {

    const [switchToggle, setSwitchToggle] = useState<string>("movie");
    const {data, loading}:{data:ListsAPI | unknown, loading: boolean} = useFetch(`${switchToggle}/popular`)
    const dispatch = useDispatch()

    useEffect(()=>{
      fetchDataFromAPI(`genre/${switchToggle}/list`).then(res => dispatch(getGenres(res.genres)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchToggle])
   
    if(!data){
      return null
    }

    
  return (
     <CarouselContainer 
    header="Popular" 
    toggle={["Movies", "Shows"]} 
    loading={loading} data={data as ListsAPI} 
    setSwitchToggle={setSwitchToggle}
    />
   
  )
}

export default Popular