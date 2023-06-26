import { useState } from "react"
import CarouselContainer from "../../components/CarouselContainer/CarouselContainer"
import {ListsAPI } from "../../constants/TypeGuards"
import useFetch from "../../hooks/useFetch"

interface Category {
  category: string
} 

function Trending({category}: Category) {

    const [switchToggle, setSwitchToggle] = useState<string>("day");
    const {data, loading}:{data:ListsAPI | unknown, loading: boolean} = useFetch(`trending/${category}/${switchToggle}`)
    
   
    if(!data){
      return null
    }

    
  return (
     <CarouselContainer 
    header={`Trending ${category === 'movie' ? 'Movies' : 'Shows'}`} 
    toggle={["Day", "Week"]} 
    loading={loading} data={data as ListsAPI} 
    setSwitchToggle={setSwitchToggle}
    />
   
  )
}

export default Trending