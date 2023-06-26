import { useState } from "react"
import CarouselContainer from "../../components/CarouselContainer/CarouselContainer"
import {ListsAPI } from "../../constants/TypeGuards"
import useFetch from "../../hooks/useFetch"


function TopRated() {

    const [switchToggle, setSwitchToggle] = useState<string>("movie");
    const {data, loading}:{data:ListsAPI | unknown, loading: boolean} = useFetch(`${switchToggle}/top_rated`)
    

    
   
    if(!data){
      return null
    }

    
  return (
     <CarouselContainer 
    header="Top Rated" 
    toggle={["Movies", "Shows"]} 
    loading={loading} data={data as ListsAPI} 
    setSwitchToggle={setSwitchToggle}
    />
   
  )
}

export default TopRated