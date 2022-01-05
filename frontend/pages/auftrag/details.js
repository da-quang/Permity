import { TextField, Grid, Box, Typography } from '@material-ui/core';
import {useState} from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { autocompleteClasses } from '@mui/material';


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
