import Head from 'next/head'
import Button from '@material-ui/core/Button'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';

export default function Home() {


    const { query } = useRouter();
    const router = useRouter();
    console.log(query.Kurzzeichen)
  return (
    <div className={styles.Page}>
      <Head>
        <title>Homepage</title>
        <meta name='keywords' content='web development, porgramming'/>
        
      </Head>

      <div className={styles.Subpage}>
      <h1>Homepage</h1>
      </div>

      <div className={styles.Homepage}>
      <Link href={`Homepage?Kurzzeichen=${query.kurzzeichen}&Name=${query.name}&id=${query.id}&personalnr=${query.personalnr}&abteilung=${query.abteilung}&team=${query.team}&bereich=${query.bereich}`}></Link>
      <Button variant='contained' color='primary' id="" >Profil</Button>
     
      <a href="getKSV"><Button variant='contained' color='primary' id="M_Menü" >Übersicht finden</Button></a>
      <a href="getKSV"><Button variant='contained' color='primary' id="M_Menü" >Freigabe finden</Button></a>
      </div>
      
      
    </div>
  )
}