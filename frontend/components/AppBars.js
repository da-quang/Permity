/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { AppBar, Menu, Typography, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

function AppBars(props) {
  const { query } = useRouter();
  const router = useRouter();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#143968",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => router.push(`/mitarbeiter/login`)}>
              <LogoutIcon />
              Logout{" "}
            </MenuItem>
            <MenuItem
              className={props.StartseiteButton !== "" ? classes.disabled : ""}
              onClick={() =>
                router.push(
                  `/startseite?param=${query.param}&param2=${query.param2}`
                )
              }
            >
              <HomeIcon />
              Startseite
            </MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.Überschrift}
          </Typography>
          <Button variant="outlined" size="small" color="inherit">
            {props.Kurzzeichen}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  disabled: {
    display: "none",
  },
}));

export default AppBars;
