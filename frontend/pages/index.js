import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';


console.log("--> Start")
export default function Start() {
    const router = useRouter()

    function start(){
      router.push(`/mitarbeiter/login`) 
    }

    const classes = useStyles();
    return(
        <div className={classes.b}>
          <Button className={classes.a} onClick={() => start()}>Starten</Button>
        </div>
    )
}

const useStyles = makeStyles({
    a: {
      background: 'linear-gradient(45deg, #143968  30%, #143968  90%)',
      borderRadius: 3,
      boxShadow: '0 2px 5px 2px rgba(50, 50, 50, .3)',
      color: 'white',
      height: 80,
      width: "70%",
      padding: '0 30px',
      textAlign: 'center',
      marginTop: "10%",
      
    },

    b: {
        display: 'block',
        marginLeft: 'auto',
        marginTop: 'auto'
    },
})

