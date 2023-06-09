import {Dispatch, SetStateAction} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./CarouselContainer.module.scss"
import Card from "../Card/Card";
import ToggleButton from "../toggleButton/ToggleButton";
import { ConfigurationAPI, ListsAPI } from "../../constants/TypeGuards";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";

import NoPoster from "../../assets/no-poster.png";
import { useParams } from 'react-router-dom';


interface Props {
  header: string,
  toggle: string[]
  loading: boolean,
  data: ListsAPI,
  setSwitchToggle: Dispatch<SetStateAction<string>>,
  switchToggle?: string
}

function CarouselContainer({header, toggle, loading, data, setSwitchToggle, switchToggle}: Props){



  

const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);
const params = useParams()

const isDetailPage = params.type && params.id

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1440 },
    items: 6,
    slidesToSlide: 6
  },
  largeDesktop: {
    breakpoint: { max: 1440, min: 1170 },
    items: 5,
    slidesToSlide: 5
  },
  desktop: {
    breakpoint: { max: 1170, min: 786 },
    items: 4,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 786, min: 550 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 3,
    slidesToSlide: 3
  }
};

if(!data){
  return null;
}


return (
<div className={styles.carouselContainer}>
  <header>
    <h2>{header}</h2>
    {!isDetailPage && <ToggleButton toggle={toggle} setSwitchToggle={setSwitchToggle}/>}
  </header>
<Carousel 
responsive={responsive}
removeArrowOnDeviceType={["tablet", "mobile"]}
>
  
  {
    
    loading ? 
    (
    null
    ) 
    : 
    ( data?.results?.map(list => {
      const img = list.poster_path ? (url as ConfigurationAPI).secure_base_url + "original" + list.poster_path : NoPoster;
    return <Card 
    key={list.id}  
    imgURL={img} 
    title={(list.title || list.name) as string} 
    rating={list.vote_average} 
    genre_ids={list.genre_ids}
    mediaType={switchToggle}
    id={list.id}
    />
  }))
  }
  
  
  
  
</Carousel>
</div>
);
}

export default CarouselContainer;