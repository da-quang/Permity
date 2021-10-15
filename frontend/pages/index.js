/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import { StylesContext } from '@material-ui/styles'

export default function Home() {
  return (
    
    <div className={styles.Page}>
      <Head>
        <title>Permity</title>
        <meta name='keywords' content='web development, porgramming'/>
      </Head>
      
      <div className={styles.Homepage}>
        <h1>Permity</h1>
      </div>
      
      <div className={styles.Homepage}>
        
          <a href="Mitarbeiter/MMenue"><Button variant='contained' color='primary' >Mitarbeiter</Button></a>
          <a href="assignment/AMenue"><Button variant='contained' color='primary' >Zuweisungen</Button></a>
          <a href="KSV/KMenue"><Button variant='contained' color='primary' >KSV</Button></a>
        
      </div>
    </div>
  )
}
