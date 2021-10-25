import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Router from 'next/router';

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

  function FindById() {
    
   

      

   const { query } = useRouter();
   const router = useRouter();

  console.log(router.query);
    return (
        <div className={styles.Profil}>
            
        <><div className={styles.ProfilÜberschrift}>
             <Typography style={{ fontWeight:600}}className={styles.typoh4} variant="h4" align="center">Ihr Profil</Typography>
        </div><div className={styles.MaDaten}>
                <Typography className={styles.typoh6} variant="h6" align="center">Id: {query.id}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Personalnummer: {query.personalnr}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Kurzziechen: {query.Kurzzeichen}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Name: {query.Name}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Abteilung: {query.abteilung}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Team: {query.team}</Typography>
                <Typography className={styles.typoh6} variant="h6" align="center">Bereich: {query.bereich}</Typography>

            </div></>
            <Button variant='contained' color='secondary' onClick={() => router.back()}><ArrowBackIcon/></Button>
          </div>
    
    )
  }
  export default FindById; {
  }
