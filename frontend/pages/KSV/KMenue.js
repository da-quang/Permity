/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import Button from '@material-ui/core/Button'
import styles from '../../styles/Home.module.css'
export default function Home() {
  return (
    
    <div className={styles.Page}>
      <Head>
        <title>Mitarbeiter</title>
        <meta name='keywords' content='web development, porgramming'/>
        
      </Head>

      <div className={styles.Subpage}>
      <h1>KSV</h1>
      </div>

      <div className={styles.Subpage}>
      <a href="all"><Button variant='contained' color='primary' id="" >KSV anzeigen</Button></a>
      <a href="getKSV"><Button variant='contained' color='primary' id="M_Menü" >KSV finden</Button></a>
      </div>
      
      
    </div>
  )
}