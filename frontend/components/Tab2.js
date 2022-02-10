import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);


    };


    const [filter3, setfilter3] = useState("");
    const [filter4, setfilter4] = useState("");

    const handleSearchChange3 = e => {
        console.log(e.target.value)
        setfilter3(e.target.value)

    };

    const handleSearchChange4 = e => {
        console.log(e.target.value)
        setfilter4(e.target.value)

    };


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                    onChange={handleChange}
                    
                    aria-label="scrollable force tabs example">
                    <Tab wrapped label="Von" {...a11yProps(0)} />
                    <Tab wrapped label="Bis" {...a11yProps(1)} />
                   
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter3} onChange={handleSearchChange3} label={<SearchIcon />}></TextField>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TextField style={{ width: "200px" }} fullWidth size="small" variant="outlined" value={filter4} onChange={handleSearchChange4} label={<SearchIcon />}></TextField>
            </TabPanel>
        </Box>
    );
}