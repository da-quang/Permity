import { useRouter } from 'next/router';
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Profil")
export default function OutsideUsageExample() {
    const {query} = useRouter()
    let kurzzeichen = query.param
   
    const { data, error } = useSWR(`http://localhost:8090/api/Mitarbeiter/profil?kurzzeichen=${kurzzeichen}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div>
        <h1>Meine Daten</h1> 
        {data && data.map((mitarbeiter, id) => <div key={id}> 
          <div>{mitarbeiter.ID}</div> 
          <div>{mitarbeiter.KURZZEICHEN}</div>
          <div>{mitarbeiter.NAME}</div>
          <div>{mitarbeiter.PERSONALNR}</div>
          <div>{mitarbeiter.TEAM}</div>
          <div>{mitarbeiter.ABTEILUNG}</div>
          <div>{mitarbeiter.BEREICH}</div>
        </div>)} 
        {error && <div>Error fetching data.</div>}
      </div>
    )
  } 


      