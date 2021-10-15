import useSWR from 'swr'
import { mutate } from 'swr'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

function Profile() {
  const { data, error } = useSWR('http://localhost:8090/api/Assignment', fetcher)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <form >
        <h1>Assignment</h1> 
        {
            data && 
            <div>
                <ul>
                    {data && data.map((assignment, index) => <li key={index}> {assignment.ID + " " + assignment.FROM + " " + assignment.TO + " " + assignment.TYPE + " " + assignment.TIME + " " + assignment.STATUS}</li>)}
                </ul>
            </div>
        }{
            error && 
                <div>Error fetching data.</div>
        }

    </form>
  );
}

export default Profile;



