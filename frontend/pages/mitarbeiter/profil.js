import { useRouter } from 'next/router';
import useSWR from "swr";
import Fab from '@mui/material/Fab';

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Profil")
export default function Profil() {
    const {query} = useRouter()
    let kurzzeichen = query.param
   
    const { data, error } = useSWR(`http://localhost:8090/api/Mitarbeiter/profil?kurzzeichen=${kurzzeichen}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
      <div>
        <h1 align="center">Meine Daten</h1> 
        {data && data.map((mitarbeiter, id) => <div key={id} align="center"> 
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.ID}</Fab></div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.KURZZEICHEN}</Fab> </div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.NAME}</Fab> </div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.PERSONALNR}</Fab> </div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.TEAM}</Fab> </div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.ABTEILUNG}</Fab> </div>
        <div><Fab variant="extended" sx={{width: 200, height: 40, marginTop: 3}}>{mitarbeiter.BEREICH}</Fab> </div>
        </div>)} 
        {error && <div>Error fetching data.</div>}
      </div>
    )
  } 
 
      