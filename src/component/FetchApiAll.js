import { useState, useEffect } from 'react'

export default function FetchApiAll() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        FetchData()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            })
    }, [])
    return { loading, data, error }
}

function FetchData() {
    const url = 'http://131.181.190.87:3001/all'
    return (
        fetch(url)
            .then(res => {
                if (res.ok) return res.json(); else throw new Error("Feth failed, status: " + res.status)
            })
            .then(res => res.map((x) => ({
                symbol: x.symbol,
                name: x.name,
                industry: x.industry
            })))
    )
}