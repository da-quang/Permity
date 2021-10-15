import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

function Profile() {
  const { data, error } = useSWR('http://localhost:8090/api/Mitarbeiter/all', fetcher)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  else{
    return (
        <form >
            <h1>Mitarbeiter</h1> 
            {
                data && 
                <div>
                    <ul>
                        {data && data.map((Mitarbeiter, index) => <li key={index}> {Mitarbeiter.ID + " | " + Mitarbeiter.KURZZEICHEN + " | " + Mitarbeiter.NAME}</li>)}
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



