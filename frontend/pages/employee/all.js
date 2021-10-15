import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((response) => response.json())

function Profile() {
  const { data, error } = useSWR('http://localhost:8090/api/Employee', fetcher)


  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <form >
        <h1>Employees</h1> 
        {
            data && 
            <div>
                <ul>
                    {data && data.map((employee, index) => <li key={index}> {employee.ID + " " + employee.KURZZEICHEN + " " + employee.NAME}</li>)}
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



