import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Fab, Link, Typography } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import useSWR from "swr"
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Router from "next/router";
console.log("--> Startseite")

const fetcher = (...args) => fetch(...args).then((response) => response.json())
console.log("--> Übersicht")

export default function Startseite() {
    const { query } = useRouter()
    const router = useRouter()
    const classes = useStyles();


    let kurzzeichen = query.param
    let name = query.param2

    const { data, error } = useSWR(`http://localhost:8090/api/Auftrag/all?name=${name}`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    function add(){
        router.prefetch(`/auftrag/formular?param=${kurzzeichen}&param2=${name}`, '/auftrag/formular')
        router.push(`/auftrag/formular?param=${kurzzeichen}&param2=${name}`) 
    }
    return (
        <form>
            <div className={classes.e}>
                <Button color="inherit" className={classes.BTN}><MenuIcon fontSize="large" /></Button>
                <Typography variant="h4" className={classes.typoh4}> Startseite </Typography>
                <Typography variant="h6" className={classes.typoh6}>{query.param}</Typography>
            </div>
            <div className={classes.h}>
                <Button onClick={() => add()}>
                <Fab  color="secondary" className={classes.Fab} aria-label="add">
                    <AddIcon />
                </Fab>
                </Button>
                
            </div>
            <div >
                {data && data.map((auftrag, id) => <ul className={classes.g} key={id}>
                    <details className={classes.details}>
                        <summary className={classes.summary}>{auftrag.ID}
                            <div className={classes.BTNROW}>
                                <Button style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} color="inherit">
                                    <CreateIcon />
                                </Button>
                                <Button onClick={() => Delete(auftrag.ID)} style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px' }} className={classes.DeleteBTN} color="inherit">
                                    <DeleteIcon />
                                </Button>
                            </div>
                        </summary>
                    
                        <div className={classes.InsideCard}>
                            <Typography className={classes.p}>KSV: {auftrag.KSV}</Typography>
                            <Typography className={classes.p}>Auftraggeber: {auftrag.AUFTRAGGEBER}</Typography>
                            <Typography className={classes.p}>Auftragnehmer: {auftrag.AUFTRAGNEHMER}</Typography>
                            <Typography className={classes.p}>Sperren: {auftrag.SPERREN}</Typography>
                            <Typography className={classes.p}>Kommentar: {auftrag.KOMMENTAR}</Typography>
                            <Typography className={classes.p}>Status: {auftrag.STATUS}</Typography>
                           
                        </div>
                    </details>
                </ul>)}
                {error && <div>Error fetching data.</div>}
                <footer>



                </footer>
            </div>

        </form>
    )
}

const Delete = async auftragID => {
    const response = await fetch(`http://localhost:8090/api/Auftrag/delete?id=${auftragID}`, {
        method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
    Router.reload()
}


const useStyles = makeStyles({
    a: {
        background: 'linear-gradient(45deg, #0288d1 30%, #03a9f4 90%)',
        borderRadius: 3,
        boxShadow: '0 2px 5px 2px rgba(20, 57, 104, .3)',
        color: 'white',
        height: 80,
        width: "70%",
        padding: '0 30px',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 20,
    },

    ChangeBTN: {
        width: 2,
    },

    DeleteBTN: {

    },


    typoh4: {
        fontWeight: "bold",
    },
    typoh6: {
        width: 60,
        height: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        textAlign: 'center',
        position: 'relative',
        right: '2%',
        top: '15%'
    },

    Fab: {
        position: 'relative',
        left: "80%",
        background: 'red',
    },

    BTN: {
        color: 'white',
        fontSize: 100,
        fontWeight: '600',
    },

    b: {
        height: 40,
        width: 280,
        padding: '0 30px',
    },

    c: {
        textAlign: 'center',

    },

    d: {
        color: "green",
        textAlign: 'center',
        marginTop: 40,
    },

    e: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
        boxShadow: '0 2px 5px 2px rgba(20, 57, 104, .3)',
        marginTop: 0,
        paddingTop: 60,
        marginBottom: "5%",

        height: 110,
        color: 'white',
        justifyContent: 'space-between',
        display: 'flex',
    },



    g: {
        borderRadius: 10,
        background: '#143968',
        marginRight: "10%",
        marginLeft: "10%",
        color: "white",
    },

    summary: {
        fontWeight: "bold",
        height: 45,
        lineHeight: 3,
        display: "flex",
        justifyContent: 'space-between',


    },

    p: {
        borderBottom: "solid",
        width: "85%",
        marginTop: 10,


    },

    kommi: {
        borderBottom: "solid",
        width: "85%",
        wordWrap: "break-word",
    },

})

