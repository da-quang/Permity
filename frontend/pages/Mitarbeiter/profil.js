import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Profil")
export default function OutsideUsageExample() {
  const { query } = useRouter()
  let kurzzeichen = query.param

  const { data, error } = useSWR(`http://localhost:8090/api/Mitarbeiter/profil?kurzzeichen=${kurzzeichen}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(router.query);

  return (
    <div className={styles.Profil}>

      <><div className={styles.ProfilÜberschrift}>
        <Typography style={{ fontWeight: 600 }} className={styles.typoh4} variant="h4" align="center">Ihr Profil</Typography>
      </div>
        {data && data.map ((mitarbeiter, id) => <div className={styles.MaDaten}>
          <Typography className={styles.typoh6} variant="h6" align="center">Id: {mitarbeiter.id}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Personalnummer: {mitarbeiter.personalnr}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Kurzziechen: {mitarbeiter.Kurzzeichen}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Name: {mitarbeiter.Name}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Abteilung: {mitarbeiter.abteilung}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Team: {mitarbeiter.team}</Typography>
          <Typography className={styles.typoh6} variant="h6" align="center">Bereich: {mitarbeiter.bereich}</Typography>

        </div>)}</>
      <Button variant='contained' color='secondary' onClick={() => router.back()}><ArrowBackIcon /></Button>
    </div>

  )
}

