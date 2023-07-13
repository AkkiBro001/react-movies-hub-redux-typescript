import styles from "./Collection.module.scss";
import useFetch from "../../hooks/useFetch";
import Card from "../../components/Card/Card";
import { AllGenres, ConfigurationAPI, Genres } from "../../constants/TypeGuards";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import { ListsAPI } from "../../constants/TypeGuards"
import {useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { SelectOption } from "../../constants/TypeGuards";
import InfiniteScroll from "react-infinite-scroll-component";
import fetchDataFromAPI from "../../utils/API";
import NoPoster from "../../assets/no-poster.png"
import { useErrorBoundary } from "react-error-boundary"



const sortbyData = [
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

interface Filters {
  sort_by: string,
  with_genres: string
}

interface SelectedItems {
   value: string, label: string 
}

function Collection() {

  
  const [data, setData] = useState<ListsAPI | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<null | SelectOption>(null)
  const [genresOpt, setGenresOpt] = useState<SelectOption[]>([])
  const filters = useRef({})
  const { showBoundary } = useErrorBoundary();
  


  const { type } = useParams()

  useEffect(() => {
    setPage(1)
    setSortBy(null)
    setGenresOpt([])
    filters.current = {};
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  const filterType = type === 'movies' ? 'movie' : 'tv';


  const { data: genres } = useFetch(`genre/${filterType}/list`)
  const { url }: { url: ConfigurationAPI | object } = useSelector((state: RootState) => state.home);
  if (!genres) return null;
  const genresOption = ((genres as AllGenres)?.genres as Genres[]).map(g => ({ value: g.name, label: g.name }))


  function fetchInitialData() {

    fetchDataFromAPI(`discover/${filterType}`, filters.current)
      .then(res => {
        setData(res)
        setPage((prev) => prev + 1)
      }).catch((err) => showBoundary(err))
  }

  function fetchMoreData() {

    fetchDataFromAPI(`discover/${filterType}?page=${page}`, filters.current)
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



  const onChange = (option: SelectedItems | readonly SelectedItems[] | null, actionMeta: ActionMeta<SelectedItems>) => {
    if (actionMeta.name === "sortby") {

      if (actionMeta.action !== "clear") {
        (filters.current as Partial<Filters>).sort_by = (option as SelectedItems).value

      } else {

        delete (filters.current as Partial<Filters>).sort_by


      }

      setSortBy(option as SelectedItems);
    }

    
    if (actionMeta.name === "genres") {
      setGenresOpt(option as SelectedItems[]);
      if (actionMeta.action !== "clear") {
        
        let genreId: string[] | number[] | string = (option as SelectedItems[]).map(v => v.value)
        genreId = genreId.map(v => {
          return (genres as AllGenres)?.genres.find(g => g.name === v)
        }).map(v => v?.id) as number[]
       
        
        genreId = JSON.stringify(genreId).slice(1, -1);
        (filters.current as Partial<Filters>).with_genres = genreId;
      } else {
        delete (filters.current as Partial<Filters>).with_genres;
      }
    }

    setPage(1);
    fetchInitialData();
  }


  

  return (
    <section className={styles.collectionContainer}>
      <header className={styles.header}>
        <h2>Explore {type === "movies" ? "Movies" : "Shows"}</h2>
        <div className={styles.selectContainer}>
          <Select
            isMulti={true}
            placeholder="Select Genres"
            value={genresOpt}
            onChange={onChange}
            name="genres"
            closeMenuOnSelect={false}
            options={genresOption}
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,

              colors: {
                ...theme.colors,
                primary25: 'var(--secondary-color)',

              },
            })}
          />
          <Select
            options={sortbyData}
            isClearable={true}
            placeholder="Sort by"
            onChange={onChange}
            value={sortBy}
            name="sortby"
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,

              colors: {
                ...theme.colors,
                primary25: 'var(--secondary-color)',

              },
            })}
          />

        </div>
      </header>
      {(data as unknown as ListsAPI)?.total_pages > 0 ?
        <InfiniteScroll
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
              mediaType={filterType}
              />
            })
          }

        </InfiniteScroll>
        : null
      }
    </section>
  )
}

export default Collection