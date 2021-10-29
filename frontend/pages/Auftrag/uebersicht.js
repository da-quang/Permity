import { useRouter } from 'next/router';
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")
export default function OutsideUsageExample() {
    const {query} = useRouter()
    let kurzzeichen = query.param
   
    const { data, error } = useSWR(`http://localhost:8090/api/Auftrag/all?name=${kurzzeichen}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    console.log(data)
    return (
      <div>
        <h1>Meine Daten</h1> 
        {data && data.map((mitarbeiter, id) => <ul key={id}> 
          <div>{mitarbeiter.ID}</div> 
          <div>{mitarbeiter.KSV}</div>
          <div>{mitarbeiter.AUFTRAGGEBER}</div>
          <div>{mitarbeiter.AUFTRAGNEHMER}</div>
          <div>{mitarbeiter.SPERREN}</div>
          <div>{mitarbeiter.KOMMENTAR}</div>
          <div>{mitarbeiter.STATUS}</div>
        </ul>)} 
        {error && <div>Error fetching data.</div>}
      </div>
    )
  } 
