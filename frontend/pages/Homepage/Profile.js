import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'
import axios from 'axios';
import React, { useState } from 'react'

import { Router } from 'next/router';
import { useRouter } from 'next/router';

import PassOn from "../index";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    const [Mitarbeiter, setMitarbeiter] = useState({
      id: '',
      kurzzeichen: '',
      name: '',
      personalnr: '',
      abteilung: '',
      team: '',
      bereich: ''
    })

    const

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

    
   const { query } = useRouter();
   const router = useRouter();

  console.log(router.query);

    
    

    return (


        



     
        <div className={styles.MaDaten}>

          <h2 id="DatenTag">Ihre Daten</h2>
          <p>{query.Kurzzeichen}</p>
          <p>{Mitarbeiter.id}</p>
          <p>{Mitarbeiter.kurzzeichen}</p>
          <p>{Mitarbeiter.name}</p>
          <p>{Mitarbeiter.personalnr}</p>
          <p>{Mitarbeiter.abteilung}</p>
          <p>{Mitarbeiter.team}</p>
          <p>{Mitarbeiter.bereich}</p>
        </div>
          
    
    )
  }
  export default FindById; {
  }
