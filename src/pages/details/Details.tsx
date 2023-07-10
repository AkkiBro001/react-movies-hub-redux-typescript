import styles from "./Details.module.scss"
import HeroPreview from "../../assets/hero-preview.jpg"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import NoPoster from "../../assets/no-poster.png"
import Rating from "../../components/Rating/Rating"
import PlayButton from "../../components/playButton/PlayButton"
import LazyLoadImg from "../../components/lazyLoadImg/LazyLoadImg"
import TopCast from "../../components/topCast/TopCast"
import TopRated from "../home/TopRated"
import { useDispatch, useSelector } from "react-redux"
import { ConfigurationAPI, DeatilPageAPI, Genres } from "../../constants/TypeGuards"
import { RootState } from "../../store/Store"
import { useEffect, useState } from "react"
import fetchDataFromAPI from "../../utils/API"
import { getAPIConfiguration } from "../../store/HomeSlice"
import useFetch from "../../hooks/useFetch"
import { useParams } from "react-router-dom"
import { toHoursAndMinutes } from "../../utils/Utils"
import dayjs from "dayjs";
import { useErrorBoundary } from "react-error-boundary";


import VideoPopUp from "../../components/videoPopup/VideoPopUp"

const Details = () => {

  const dispatch = useDispatch()
  
  const [show, setShow] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams()
  const { showBoundary } = useErrorBoundary();


  const {url}:{url:ConfigurationAPI | object} = useSelector((state: RootState) => state.home);
  const base_url:string = (url as ConfigurationAPI).secure_base_url + "original";

  useEffect(()=>{
    if(url && (url as ConfigurationAPI).secure_base_url ) return;
    fetchDataFromAPI('configuration')
    .then(res => {
      dispatch(getAPIConfiguration(res.images))
    }).catch(err => showBoundary(err))
   
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  const {data}:{data: unknown | Partial<DeatilPageAPI>} = useFetch(`${params.type}/${params.id}`)
  const {data: castCrew}:{data: unknown} = useFetch(`${params.type}/${params.id}/credits`)
  const {data: video}:{data: unknown} = useFetch(`${params.type}/${params.id}/videos`)
  

  
  
  
  const backDropImage = (data as Partial<DeatilPageAPI>)?.backdrop_path ? (base_url + (data as Partial<DeatilPageAPI>)?.backdrop_path) : HeroPreview;
  const posterImage = (data as Partial<DeatilPageAPI>)?.poster_path ? (base_url + (data as Partial<DeatilPageAPI>)?.poster_path) : NoPoster
  
  if(!data){
    return null
  }

  

  

  const title = (data as Partial<DeatilPageAPI>).original_title || (data as Partial<DeatilPageAPI>).original_name
  const tagline = (data as Partial<DeatilPageAPI>).tagline || "N/A"
  const rate = (data as Partial<DeatilPageAPI>).vote_average as number
  const overview = (data as Partial<DeatilPageAPI>).overview || "N/A"
  const status = (data as Partial<DeatilPageAPI>).status || "N/A"
  const release_date = dayjs((data as Partial<DeatilPageAPI>)?.release_date).format("MMM D, YYYY") || "N/A"
  const runtime =  toHoursAndMinutes((data as Partial<DeatilPageAPI>).runtime as number) || toHoursAndMinutes((data as Partial<DeatilPageAPI>).episode_run_time?.reduce((c,v)=>c+=v) as number)
  const videoKey = video?.results[0]?.key || null;

  const Directors = [...new Set(castCrew?.crew.filter(crw => crw.job.includes("Director")).map(obj => obj.name))].slice(0,3)
  const Writer = [...new Set(castCrew?.crew.filter(crw => crw.department === "Writing").map(obj => obj.name))].slice(0,3)

  
  return (
    <>
    <VideoPopUp show={show} setShow={setShow} videoId={videoKey}/>
    <div className={styles.detailContainer}>
      <div className={styles.backDropImage}>
        <img src={backDropImage} alt="" />
        <div className={styles.gradient}></div>
      </div>
      <section className={styles.wrapper}>
        <ContentWrapper>
          <header className={styles.main}>
            <div className={styles.poster}>
              <LazyLoadImg src={posterImage} className=""/>
              
            </div>


            <div className={styles.details}>
              <div className={styles.titleContainer}>
                <h1>{title}</h1>
                <p>{tagline}</p>
                <div className={styles.genres}>
                  {((data as Partial<DeatilPageAPI>)?.genres as Genres[]).map((genre) => <span key={genre.id}>{genre.name}</span>)}
                </div>
              </div>

              <div className={styles.ratingContainer}>
                <Rating rating={rate} clsName="rating__details" />
                {videoKey && <div className={styles.playButton} onClick={()=>setShow(true)}>

                  <PlayButton />
                  <span>Watch Trailor</span>
                </div>}
              </div>

              <div className={styles.overviewContainer}>
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.movieInfo}>
                  <span>
                    <b>Status:</b>
                    <p>{status}</p>
                  </span>
                  <span>
                    <b>Release Date:</b>
                    
                    <p>{release_date}</p>
                  </span>
                  <span>
                    <b>Runtime:</b>
                    <p>{runtime || "N/A"}</p>
                  </span>
                </div>
                <div className={styles.directorInfo}>
                  <span>
                    <b>Director:</b>
                    <p>{Directors.length ? Directors.join(", ") : "N/A"}</p>
                  </span>
                </div>
                <div className={styles.writerInfo}>
                  <span>
                    <b>Writer:</b>
                    <p>{Writer.length ? Writer.join(", ") : "N/A"}</p>
                  </span>
                </div>
              </div>
            </div>
          </header>


          <TopCast imgBaseURL={base_url} data={castCrew?.cast}/>
          <TopRated header="Similar"/>
          <TopRated header="Recommendations"/>
        </ContentWrapper>
      </section>
    </div>
    </>
  )
}

export default Details