/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head'
import Button from '@material-ui/core/Button'
import styles from '../../styles/Home.module.css'
export default function Home() {
  return (
    
    <div className={styles.Page}>
      <Head>
        <title>Zuweisung</title>
        <meta name='keywords' content='web development, porgramming'/>
        
      </Head>
      <div className={styles.Subpage}>
          <h1>Zuweisungen</h1>
      </div>
      
      <div className={styles.Subpage}>
      <a href="all"><Button variant='contained' color='primary' id="M_Menü" >Zuweisungen anzeigen </Button></a>
      <a href="create"> <Button variant='contained' color='primary' id="M_Menü" >Zuweisungen erstellen</Button></a>
      <a href="findById"><Button variant='contained' color='primary' id="M_Menü" >Zuweisung finden</Button></a>
      <a href="update"><Button variant='contained' color='primary' id="M_Menü" >Zuweisung bearbeiten</Button></a>
      </div>
      
     
      
      
    </div>
  )
}