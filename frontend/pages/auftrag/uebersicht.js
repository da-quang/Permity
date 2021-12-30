import { useRouter } from 'next/router';
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")
export default function OutsideUsageExample() {
  const {query} = useRouter()
  let kurzzeichen = query.param
  
  const { data, error } = useSWR(`https://palmiest-hornet-1388.dataplicity.io/api/api/Auftrag/all?name=${kurzzeichen}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <div>
      <h1>Meine Aufträge</h1> 
      {data && data.map((auftrag, id) => <ul key={id}> 
        <div>{auftrag.ID}</div> 
        <div>{auftrag.KSV}</div>
        <div>{auftrag.AUFTRAGGEBER}</div>
        <div>{auftrag.AUFTRAGNEHMER}</div>
        <div>{auftrag.SPERREN}</div>
        <div>{auftrag.KOMMENTAR}</div>
        <div>{auftrag.STATUS}</div>
      </ul>)} 
      {error && <div>Error fetching data.</div>}
    </div>
    )
  } 
