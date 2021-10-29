/* eslint-disable @next/next/no-sync-scripts */
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import { Typography } from '@material-ui/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

export default function Login() {

  let [name, setName] = useState('')
  let [kurzzeichen, setKurzzeichen] = useState('')
  const router = useRouter()


  function login() {
    axios.get('http://localhost:8090/api/Mitarbeiter/login', { params: { name, kurzzeichen } }).then(res => {
      if (res.data[0].exists == true) {
        console.log("Login Succesful!")
        console.log(`Logged in as ${name}.`)
        router.push(`/startseite?param=${kurzzeichen}`)
      } else {
        console.log("Your login attempt was not successful. Please Try again.")
      }
    })
  }

  return (

    <><div className={styles.LoginÜberschrift}>
      <Typography style={{ fontWeight: 600 }} className={styles.typoh4} variant="h4" align="center">Permity</Typography>
    </div>
      <div className={styles.Homepage}>
        <TextField onChange={e => setName(e.target.value)} id="kurzzeichen" fullWidth className={styles.TxtField} label="Kurzzeichen" variant="outlined"> </TextField>
        <TextField onChange={e => setKurzzeichen(e.target.value)} id="name" fullWidth className={styles.TxtField} label="Name" variant="outlined"> </TextField>
        <Button onClick={() => login()} variant='contained' color='primary' id="Index">Authentifizieren</Button>
      </div></>
  )
}













