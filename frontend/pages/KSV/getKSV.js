import useSWR from 'swr'
import { useEffect } from 'react'
import React, {useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import Router from 'next/router';

function Profile() {

    const [KSV, setKSV] = useState([]);

    const router = useRouter()
    console.log(router.query);
    

    const ksv = router.query.newKSV;
    const ebene = router.query.newEbene;

    function test(newKSV, newEbene) {
        axios.get('http://localhost:8090/api/KSV/select', {params: {ksv: newKSV, ebene: newEbene} }).then(res => {
        console.log(res.data);
        setKSV(res.data);
        })
    }

    function submit(e) {
        e.preventDefault();
        test(ksv, ebene)
    }
    
    


  return (
    <form onSubmit={(e)=>submit(e)}>
        <button>Next</button>
        <div>
            <ul>
                {KSV && KSV.map((item, index) => <li key={index}> <p> <button type="button" onClick={() => Router.push({pathname: 'getKSV', query: {newKSV: item.KSV, newEbene: item.EBENE + 1},})}>{item.BEZEICHNUNG}</button> {item.ID + " " + item.KSV + " " + item.BEZEICHNUNG + " " + item.EBENE + " " + item.ROWID + " " + item.BETRIEBSBEREICH}</p></li>)}
            </ul>
        </div>
    </form>
  );
}

export default Profile;
