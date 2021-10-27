import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

console.log("--> Startseite")
export default function Startseite() {
    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();
    return (
        <div>
            <div className={classes.d}>
                <div className={classes.e}> Startseite </div>
            </div>
            <div className={classes.b}>
                <div className={classes.c}><Button className={classes.a} onClick={() => router.push(`/mitarbeiter/profil?param=${query.param}`)}>Profil</Button></div>
                <div className={classes.c}><Button className={classes.a} onClick={() => router.push(`/auftrag/uebersicht?param=${query.param}`)}>Übersicht</Button></div>
                <div className={classes.c}><Button className={classes.a} onClick={() => router.push(`/auftrag/formular?param=${query.param}`)}>Freigabe</Button></div>
            </div>
            <div className={classes.f}>

            </div>
        </div>
    )
}

const useStyles = makeStyles({
    a: {
        background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(176, 190, 197, .3)',
      color: 'white',
      height: 50,
      width: 280,
      padding: '0 30px',
    },

    b: {
        height: 420,
        marginTop: 70,
    },

    c: {
        textAlign: 'center',
        marginTop: 30,
    },

    d: {
        background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
        boxShadow: '0 3px 5px 2px rgba(70, 175, 219, .3)',
        height: 70,
        marginTop: 100,
    },

    e: {
        fontFamily: 'monospace',
        paddingTop: 15,
        textAlign: "center",
        color: "white",
        fontSize: 25,
    },

    g: {
        background: 'linear-gradient(45deg, #455a64 30%, #546e7a 90%)',
        boxShadow: '0 2px 5px 2px rgba(70, 175, 219, .3)',
        marginTop: 100,
        paddingTop: 30,
        marginBottom: 30,
        fontSize: 40,
        height: 110,
        color: 'white'
    },
      
    f: {
        background: 'linear-gradient(45deg, #455a64 30%, #546e7a 90%)',
        height: 75,
        color: 'white'
    },
  });