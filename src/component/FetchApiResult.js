export default function FetchApiResult(url) {
    return (
        fetch(url)
            .then(res => { if (res.ok) return res.json(); else throw new Error("Feth failed, status: " + res.status) })
            .then(res => res.map(x => ({
                //use regex for splitting the date from 000Z, add +10:00 to return it back to the time difference between AU and timestamp.
                time: new Date(x.timestamp.match(/.*(?=\.000Z)/gi)[0].concat('+10:00')),
                name: x.name,
                symbol: x.symbol,
                industry: x.industry,
                open: x.open,
                high: x.high,
                low: x.low,
                close: x.close,
                volumes: x.volumes
            })))
    )
}