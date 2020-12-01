
import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row, Col, Card, CardBody, Button
} from "shards-react";

import ConfigProfile from "../components/automation/ConfigProfile";
import ConfigDevice from "../components/automation/ConfigDevice";
import PageTitle from "../components/common/PageTitle";

// https://material-ui.com/pt/components/tabs/

// npm install @material-ui/core
// Imports for tabs
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));





function automation({ profiles }) {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Automation" subtitle="Dashboard" className="text-sm-left" />
            </Row>

            <Container >
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example">


                            {profiles.map((profile, idx) => (
                                <Tab label={profile.name} {...a11yProps(idx)} />
                            ))}

                        </Tabs>
                    </AppBar>

                    {profiles.map((profile, idx_prof) => (
                        //needs a container inside of the map to work
                        // TODO: make it pretty
                        <TabPanel value={value} index={idx_prof}>
                            <Button className="float-right mx-2">Edit</Button>
                            <Button className="float-right mx-2">Duplicate</Button>
                            <Button className="float-right mx-2">Delete</Button>
                            <div className="clearfix"></div>
                            {profile.devices.map((device, idx_dev) => (

                                <Row className="py-2 px-4">

                                    <ConfigDevice name={device.name} division={device.division} type={device.type} isOn={device.isOn} />

                                </Row>

                            ))}
                        </TabPanel>
                    ))}



                </div>

            </Container>
            <Container>


            </Container>
        </Container>
    );
};

automation.propTypes = {
    profiles: PropTypes.array,
    devices: PropTypes.array
};

automation.defaultProps = {
    profiles: [{
        name: "Default",
        devices: [{
            name: "Air conditioner",
            division: "Kitchen",
            type: "temperature",
            isOn: true
        },
        {
            name: "Lights",
            division: "Bedroom",
            type:"light",
            isOn:true
        }
        ]
    },
    {
        name: "Economics",
        devices: [{
            name: "Air conditioner",
            division: "Bedroom",
            type:"humidity",
            isOn:false
        },
        {
            name: "Door",
            division: "Kitchen",
            type:"",
            isOn:false
        }
        ]
    },
    {
        name: "Custom",
        devices: []
    }
    ]
};

export default automation;