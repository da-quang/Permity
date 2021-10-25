import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

function Profile() {
  const { data, error } = useSWR('http://localhost:8090/Auftrag/all', fetcher)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  else{
    return (
        <form >
            <h1>Aufträge</h1> 
            {
                data && 
                <div>
                    <ul>
                        {data && data.map((Auftrag, index) => <li key={index}> {Auftrag.KSV + " | " + Auftrag.Auftraggeber + " | " + Auftrag.Auftragnehmer + " | " + Auftrag.Status + " | " + Auftrag.Kommentar}</li>)}
                    </ul> 
                </div>
            }{
                error && 
                    <div>Error fetching data.</div>
            }
    
        </form>
      );
  }

 
}

export default Profile;
