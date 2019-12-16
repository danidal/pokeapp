import { useState, useEffect } from 'react'

const useFetch = url => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchUrl = async () => {
        try {
            const response = await fetch(url)
            const json = await response.json()
            setData(json)
            setLoading(false)
        } catch(err) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return [data, loading, error]
}

export { useFetch }