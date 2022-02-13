import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

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

    const [value1, setValue1] = useState(new Date(""));
    const [value2, setValue2] = useState(new Date(""));

    

    let VON = `${value1.getFullYear()}.${value1.getMonth() + 1}.${value1.getDate()} ${value1.getHours()}:${value1.getMinutes()}`;
    let BIS = `${value2.getFullYear()}.${value2.getMonth() + 1}.${value2.getDate()} ${value2.getHours()}:${value2.getMinutes()}`;

    return (
        <Box sx={{ width: '100%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value}
                    onChange={handleChange}

                    aria-label="scrollable force tabs example">
                    <Tab wrapped label="Von" {...a11yProps(0)} />
                    <Tab wrapped label="Bis" {...a11yProps(1)} />

                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Stack>
                    <MobileDateTimePicker
                        ampm={false}
                        label="24hours"
                        value={value1}
                        onChange={(newValue1) => {
                            setValue1(newValue1)
                        }}
                        X
                        label="VON"
                        inputFormat="yyyy/MM/dd HH:mm"
                        renderInput={(params) => <TextField size="small"  onChange={e => setBis(e.target.value)} variant="outlined" {...params} />}
                    />
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Stack>
                    <MobileDateTimePicker
                        ampm={false}
                        label="24hours"
                        value={value2}
                        onChange={(newValue2) => {
                            setValue2(newValue2)
                        }}
                        
                        label="Bis"
                        inputFormat="yyyy/MM/dd HH:mm"
                        renderInput={(params) => <TextField size="small" onChange={e => setBis(e.target.value)} variant="outlined" {...params} />}
                    />
                </Stack>
            </TabPanel>
            </LocalizationProvider>
        </Box>
    );
}