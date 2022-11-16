import { useEffect, useState } from "react";

export function useFetch(url){
     const [data, setData] = useState(null); 
     const [error, setError] = useState(null); 
     const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then(response => response.json())
        .then((response) =>{
            if(response["cod"] !== "404"){
                setData(response)
            }
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }, [url])  
     return { data, error, loading }

}