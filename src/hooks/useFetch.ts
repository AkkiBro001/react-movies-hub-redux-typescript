import { useState, useEffect } from 'react';
import fetchDataFromAPI from '../utils/API';

function useFetch(url: string) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    useEffect(() => {
        setLoading(true);
        try {
            fetchDataFromAPI(url)
                .then(res => {
                    setData(res)
                    setLoading(false)
                })
        }catch(err){
            setLoading(false)
            setError("Something went wrong !!!!")
        }
    
  }, [url])

    return {data, loading, error}
}

export default useFetch