
import { Menu, Typography, Button  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { Divider, ListItem, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Filter(props){

    const classes = useStyles();


    const [anchor, setAnchor] = React.useState(null);
    const open = Boolean(anchor);



    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    

    const handleSearchChange = (se) => {
        
        if (props.filter2 == se) {
            props.passFilter2("")
        }
        else {
            props.passFilter2(se)
        }
    };

    const handleSearchChange3 = e => {
        console.log(e.target.value)
        setfilter3(e.target.value)

    };

    const handleSearchChange4 = e => {
        console.log(e.target.value)
        setfilter4(e.target.value)

    };

    const handleSearchChange5 = e => {
        console.log(e.target.value)
        setfilter5(e.target.value)

    };


    return(
        <div className={classes.FilterAdd}>

                <Button color="inherit" className={classes.BTN}

                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <FilterAltIcon size="small" className={classes.searchIcon} /> <Typography> Filter </Typography>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>

                    <ListItem><Typography variant='h6' fontWeight='bold' > SPERREN </Typography></ListItem>
                    <ListItem> <Button className={filter2 == "Durchführungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Durchführungserlaubnis")} variant="contained">Durchführungserlaubnis </Button></ListItem>
                    <ListItem> <Button className={filter2 == "Freigabe zur Arbeit" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Freigabe zur Arbeit")} variant="contained">Freigabe zur Arbeit</Button></ListItem>
                    <ListItem> <Button className={filter2 == "Freigabe zur Sperre" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Freigabe zur Sperre")} variant="contained">Freigabe zur Sperre</Button></ListItem>
                    <ListItem> <Button className={filter2 == "Prüfungserlaubnis" ? classes.BTNDisabled : classes.BTNEnabled} onClick={() => handleSearchChange("Prüfungserlaubnis")} variant="contained">Prüfungserlaubnis</Button></ListItem>
                    <Divider></Divider>
                    <ListItem><Typography variant='h6' fontWeight='bold' > KSV </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter3} onChange={handleSearchChange3} label={<SearchIcon />}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem><Typography variant='h6' fontWeight='bold' > Auftraggeber </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter4} onChange={handleSearchChange4} label={<SearchIcon />}></TextField></ListItem>
                    <Divider></Divider>
                    <ListItem><Typography variant='h6' fontWeight='bold' > Auftragnehmer </Typography></ListItem>
                    <ListItem> <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter5} onChange={handleSearchChange5} label={<SearchIcon />}></TextField></ListItem>
                </Menu>


            </div>
        )        
}

const useStyles = makeStyles((theme) => ({

    disabled: {
        display: 'none'
    },

    FilterAdd: {
        marginTop: "2%",
        marginBottom: "10%",
        display: "flex",
        marginLeft: "3%",
        marginRight: "3%",
        justifyContent: 'space-between',
    },

    BTNEnabled: {
        background: 'linear-gradient(45deg, #143968 30%, #143968 90%)',
    },

    BTNDisabled: {
        background: 'linear-gradient(90deg, rgba(212,25,25,1) 38%, rgba(212,25,25,1) 100%)',
    },


}))


export default Filter
