import * as React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { Fab, Link, Typography } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});



export default function Hook() {
  const classes = useStyles();
  return (
  <div>
    <Link href="Mitarbeiter/login">
    <Button className={classes.root}>Hook</Button>
    </Link>
  </div>)
}
