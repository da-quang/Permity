
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const BTNTheme = createTheme({
    palette: {
        primary: {
            main: "rgba(212,25,25,1)",
        },
    },
});

function AddAuftrag(props){

    const router = useRouter()
    const classes = useStyles();

    return(
        <ThemeProvider theme={BTNTheme}>
        <Box position="fixed" className={classes.Fab} sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab onClick={() => router.push(`/auftrag/formular?param=${props.Kurzzeichen}&param2=${props.Name}`)} aria-label="add" color="primary">
                <AddIcon />
            </Fab>
        </Box>
    </ThemeProvider>
    );

}

const useStyles = makeStyles((theme) => ({

    disabled: {
        display: 'none'
    },

    Fab: {
        position: "fixed",
        right: "3%",
        bottom: "3%",
        zIndex: "999",
    },

}))

export default AddAuftrag