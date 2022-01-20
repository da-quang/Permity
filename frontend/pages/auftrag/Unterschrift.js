import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import sigCanvas from '../startseite/sigCanvas.module.css';
import SignaturePad from "react-signature-canvas";
import React, { Fragment, useState, useRef, useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BasicMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    let [AUFTRAGGEBER_UNTERSCHRIFT, setAUFTRAGGEBER_UNTERSCHRIFT] = useState('aaaaaanull')

    const sigCanvasRef = useRef({});
    const clear = () => sigCanvasRef.current.clear();
    const save = () => {

        setAUFTRAGGEBER_UNTERSCHRIFT(sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png"))

        // let base64 = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
        // let blob = dataURItoBlob(base64);
        // const blobUrl = URL.createObjectURL(blob);
        // setAUFTRAGGEBER_UNTERSCHRIFT(blobUrl);
        // console.log("Unterschrift wurde gespeichert!")
    }


  return (

    <Dialog
      fullScreen
      open={open2}
      onClose={handleClose2}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.Unterschrift} sx={{ position: 'relative' }}>
        <Toolbar >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose2}
            aria-label="close"

          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Unterschrift
          </Typography>
          <div className={classes.c}>
            <Button color="inherit" autoFocus onClick={clear}>Leeren</Button>
            <Button color="inherit" autoFocus onClick={() => save()}>Speichern</Button>
          </div>
        </Toolbar>
      </AppBar>
      <>
        <div className={sigCanvas.signatureCanvas} >
          <SignaturePad
            ref={sigCanvasRef}
            canvasProps={
              {
                style: { background: 'white', width: '100%', minHeight: '99%', border: 'solid' }
              }
            } />
        </div>
      </>
    </Dialog>
  );


  
}



const useStyles = makeStyles({
  CreateBTN: {
      width: "80%",
      marginTop: "20%",

  },

  SignBTN: {
      width: "80%",

  },

  BTNGroup: {
      fontWeight: "bold",
      height: "60px",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",



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
      position: "fixed",
      right: "8%",
      bottom: "5%",

      zIndex: "999",
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
      boxShadow: '0 3px 5px 2px rgba(20, 57, 104, .3)',
      marginTop: 0,
      paddingTop: 15,
      marginBottom: "5%",
      height: 60,
      color: 'white',
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      justifyContent: 'space-between',
      display: 'flex',
  },

  SignatureBTNRow: {
      display: "flex",
      textAlign: "center",
      margin: "auto",
      justifyContent: "center",
  },

  g: {
      display: "flex",
      padding: 10,
  },

  h: {
      paddingRight: 10,
  },
});


export default BasicMenu;