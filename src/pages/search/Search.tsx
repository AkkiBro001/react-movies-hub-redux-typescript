import { useParams } from "react-router-dom"
import styles from "./Search.module.scss"
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { ConfigurationAPI, ListsAPI } from "../../constants/TypeGuards";
import fetchDataFromAPI from "../../utils/API";
import { useErrorBoundary } from "react-error-boundary";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import Card from "../../components/Card/Card";
import NoPoster from "../../assets/no-poster.png"
import NoResult from "../noResult/NoResult";

function Search() {
  const {query} = useParams()
  const [data, setData] = useState<ListsAPI | null>(null);
  const [page, setPage] = useState<number>(1);
  const { showBoundary } = useErrorBoundary();

  const { url }: { url: ConfigurationAPI | object } = useSelector((state: RootState) => state.home);

  function fetchInitialData() {

    fetchDataFromAPI(`search/multi?query=${query}`)
      .then(res => {
        setData(res)
        setPage((prev) => prev + 1)
      }).catch((err) => showBoundary(err))
  }

  function fetchMoreData() {

    fetchDataFromAPI(`search/multi?query=${query}&page=${page}`)
      .then(res => {
        if (data?.results) {
          setData({
            ...data,
            // eslint-disable-next-line no-unsafe-optional-chaining
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPage((prev) => prev + 1);
      }
      ).catch((err) => showBoundary(err))


  }
  
  useEffect(()=>{
    fetchInitialData()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query])

  if(!data){
    return null
  }else if((data as unknown as ListsAPI)?.total_results === 0){
    return <NoResult/>
  }
  
  return (
    <div className={styles.searchContainer}>
        <header className={styles.header}>
            <h1>{query && `Search results for "${query}"`}</h1>
        </header>
        {(data as unknown as ListsAPI)?.total_pages > 0 ? <InfiniteScroll
          loader=""
          dataLength={page * 10}
          next={fetchMoreData}
          className={styles.collection}
          hasMore={page <= (data as unknown as ListsAPI)?.total_pages}
        >
            {
            (data as unknown as ListsAPI)?.results?.map(list => {
              const img = list.poster_path ? ((url as ConfigurationAPI).secure_base_url || "https://image.tmdb.org/t/p/") + "original" + list.poster_path : NoPoster;

              return <Card 
              key={list.id} 
              imgURL={img} 
              title={(list.title || list.name) as string} 
              rating={list.vote_average} 
              genre_ids={list.genre_ids} 
              clsName="collectionCard" 
              id={list.id}
              mediaType={list.media_type}
              />
            })
          }
          </InfiniteScroll>: null}
    </div>
  )
}

export default Search