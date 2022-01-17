import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

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


