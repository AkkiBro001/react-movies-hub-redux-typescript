import { useState } from "react"
import CarouselContainer from "../../components/CarouselContainer/CarouselContainer"
import {DetailsAPI, ListsAPI } from "../../constants/TypeGuards"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"

type Prop = {header: string}

function TopRated({header}:Prop) {

    const [switchToggle, setSwitchToggle] = useState<string>("movie");
    const params = useParams()
    
    const mediaType = params?.type === "movie" ? "Movies" : "Shows"
    const title = params.id && params.type && header === 'Similar' ? `${header} ${mediaType}` : header;
    const FetchURL = params.id && params.type && header === 'Similar' ? `${params.type}/${params.id}/similar` : params.id && params.type && header === 'Recommendations' ? `${params.type}/${params.id}/recommendations` : `${switchToggle}/top_rated`;
    const {data, loading}:{data:ListsAPI | unknown, loading: boolean} = useFetch(FetchURL)
    // const {data: similer}:{data: unknown} = useFetch(`${params.type}/${params.id}/similar`)

    if(!data || (data?.results as DetailsAPI[]).length === 0){
      return null
    }

    
  return (
     <CarouselContainer 
    header={title}
    toggle={["Movies", "Shows"]} 
    loading={loading} data={data as ListsAPI} 
    setSwitchToggle={setSwitchToggle}
    switchToggle={switchToggle}
    />
   
  )
}

export default TopRated