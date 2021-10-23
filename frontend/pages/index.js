/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'

import {useRouter} from 'next/router';
import Link from 'next/link';



import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { route } from 'next/dist/server/router';
import { display } from '@mui/system';

// import * as React from 'react';
// import Box from'@material-ui/core/Box';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
// import AccountCircle from '@material-ui/core/AccountCircle';

// export default function InputWithIcon() {
//   return (
//     <Box sx={{ '& > :not(style)': { m: 1 } }}>
//       <FormControl variant="standard">
//         <InputLabel htmlFor="input-with-icon-adornment">
//           With a start adornment
//         </InputLabel>
//         <Input
//           id="input-with-icon-adornment"
//           startAdornment={
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           }
//         />
//       </FormControl>
//       <TextField
//         id="input-with-icon-textfield"
//         label="TextField"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AccountCircle />
//             </InputAdornment>
//           ),
//         }}
//         variant="standard"
//       />
//       <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         <TextField id="input-with-sx" label="With sx" variant="standard" />
//       </Box>
//     </Box>
//   );
// }


  

  

  function FindById() {

    const router = useRouter();

    const [Mitarbeiter, setMitarbeiter] = useState({
      id: '',
      kurzzeichen: '',
      name: '',
      personalnr: '',
      abteilung: '',
      team: '',
      bereich: ''
    })



    const loginMitarbeiter = async (kurzzeichen1, name1) => {
      axios.get('http://localhost:8090/api/Mitarbeiter/login', { params: { name: name1, kurzzeichen: kurzzeichen1 } }).then(res => {
        console.log(res.data[0]);
        setMitarbeiter({
          id: res.data[0].ID,
          kurzzeichen: res.data[0].KURZZEICHEN,
          name: res.data[0].NAME,
          personalnr: res.data.PERSONALNR,
          abteilung: res.data[0].ABTEILUNG,
          team: res.data[0].TEAM,
          bereich: res.data[0].BEREICH,
        })
      })
    }

    function submit(e) {
      e.preventDefault();
      loginMitarbeiter(Mitarbeiter.kurzzeichen, Mitarbeiter.name);

    }

    function handle(e) {
      const newMitarbeiter = { ...Mitarbeiter }
      newMitarbeiter[e.target.id] = e.target.value
      setMitarbeiter(newMitarbeiter)
      console.log(newMitarbeiter)
    }

    
    const inputRef = useRef(null)

    useEffect(() => {
      inputRef.current.style.display='';
    }, [])

    function MakeAppear() {
      console.log("I appeared");
    }

    function PassOn(Kurzzeichen2,name2){
     let Kurzzeichen = Kurzzeichen2;
      let Name = name2;

      console.log(Kurzzeichen);
      console.log(Name);
    }


    return (






      <><div className={styles.Homepage}>
        <footer className={styles.line}> </footer>
        <h1>Permity</h1>


        <TextField onChange={(e) => handle(e)} id="kurzzeichen" value={Mitarbeiter.kurzzeichen} fullWidth className={styles.TxtField} label="Kurzzeichen" variant="outlined"> </TextField>
        <TextField onChange={(e) => handle(e)} id="name" value={Mitarbeiter.name} fullWidth className={styles.TxtField} label="Name" variant="outlined"> </TextField>


        <Button onClick ={PassOn(Mitarbeiter.kurzzeichen,Mitarbeiter.name)}onClick={() => Router.push({ pathname: 'Homepage/Profile', query: { kurzzeichen1: Mitarbeiter.kurzzeichen, name1: Mitarbeiter.name }, })} onClick={(e) => submit(e)} variant='contained' color='primary' id="Index">Anmelden</Button>

      </div><div>
          {/* {Mitarbeiter.map(e => ( */}
          <Link as={`/Homepage/Profile?Kurzzeichen=${Mitarbeiter.kurzzeichen}&Name=${Mitarbeiter.name}`} href="Homepage/Profile">
            <Button ref={inputRef}>Weiter</Button>
          </Link>
          {/* ))} */}


          <div className={styles.MaDaten}>

            <h2 id="DatenTag">Ihre Daten</h2>
            <p>{Mitarbeiter.id}</p>
            <p>{Mitarbeiter.kurzzeichen}</p>
            <p>{Mitarbeiter.name}</p>
            <p>{Mitarbeiter.personalnr}</p>
            <p>{Mitarbeiter.abteilung}</p>
            <p>{Mitarbeiter.team}</p>
            <p>{Mitarbeiter.bereich}</p>
          </div>

        </div></>
    )
  }
  console.log(route.query);
  export default FindById; {
  }
