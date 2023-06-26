import { useState, useEffect } from 'react';
import fetchDataFromAPI from '../utils/API';

function useFetch(url: string) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    
    
    useEffect(() => {

        
        
        
        try {
            fetchDataFromAPI(url)
                .then(res => {
                    
                    setData(res)
                    setLoading(false)
                })
        }catch(err){
            setLoading(true)
            setError("Something went wrong !!!!")
        }
    
  }, [url])

    return {data, loading, error}
}

export default useFetch