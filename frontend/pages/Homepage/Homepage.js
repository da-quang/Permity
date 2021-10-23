import Head from 'next/head'
import Button from '@material-ui/core/Button'
import styles from '../../styles/Home.module.css'
export default function Home() {
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
      <a href="all"><Button variant='contained' color='primary' id="" >Profil</Button></a>
      <a href="getKSV"><Button variant='contained' color='primary' id="M_Menü" >Übersicht finden</Button></a>
      <a href="getKSV"><Button variant='contained' color='primary' id="M_Menü" >Freigabe finden</Button></a>
      </div>
      
      
    </div>
  )
}