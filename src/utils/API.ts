import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const BASE_URL:string = "https://api.themoviedb.org/3/";



type Headers = {
    Authorization: string
}

const headers: Headers = {
    Authorization: "bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWYxOGQ2NTk2MTEwMWJhODQ4ZDU0MDcyZmRlMjZlOSIsInN1YiI6IjY0N2Q3N2Q0MGZiMzk4MDExODBlNGRiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rmtEczOoP1DRoht9xrGcsP9AiXXm7WK6PjNXhHs3BVs",
}

export default async function fetchDataFromAPI (url:string, params?:string){
  
   try{
     const {data} = await axios.get(BASE_URL + url, {
        headers,
        params
     })
     return data;
   }catch(err){
    console.log(err);
   }
}