import { useState, useEffect } from 'react';
import fetchDataFromAPI from '../utils/API';
import {useErrorBoundary } from "react-error-boundary";

function useFetch(url: string) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(true)
    
    
    const {showBoundary} = useErrorBoundary()
    
    useEffect(() => {

        
        
        
        try {
            fetchDataFromAPI(url)
                .then(res => {
                    
                    setData(res)
                    setLoading(false)
                })
        }catch(err){
            setLoading(true)
            showBoundary(err)
        }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

    return {data, loading}
}

export default useFetch