
import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row, Col, Card, CardBody, Button
} from "shards-react";

import ConfigProfile from "../components/automation/ConfigProfile";
import ConfigDevice from "../components/automation/ConfigDevice";
import TypeSlider from "../components/automation/TypeSlider";
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





function automation({ divisions }) {

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


                            {divisions.map((division, idx) => (
                                <Tab label={division.name} {...a11yProps(idx)} />
                            ))}

                        </Tabs>
                    </AppBar>
                    {/*
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
                    */}
                    {divisions.map((division, idx_div) => (
                        <TabPanel value={value} index={idx_div}>
                            <Button className="float-right mx-2 mb-3">Edit</Button>
                            <Button className="float-right mx-2 mb-3">Duplicate</Button>
                            <Button className="float-right mx-2 mb-3">Delete</Button>
                            <div className="clearfix"></div>

                            <Row>
                                {division.configurations.map((configuration,idx_conf) => (

                                    <Col lg="4">
                                        <h4>{configuration.type}</h4>
                                        <TypeSlider type={configuration.type} min_value={configuration.min_value}
                                        max_value={configuration.max_value} />
                                    </Col>


                                ))}


                            </Row>
                            
                            <Row>

                                {division.devices.map((device, idx_dev) => (
                                    <Col lg="4" className="py-3">
                                        <Card className="">
                                            <CardBody>
                                                <h3>
                                                    {device.name}
                                                </h3>
                                                <div>

                                                </div>

                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>


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
    devices: PropTypes.array,
    divisions: PropTypes.array
};

automation.defaultProps = {
    divisions: [{
        id: "1",
        name: "Kitchen",
        configurations: [{
            type: "Temperature",
            min_value: 10,
            max_value: 20
        },
        {
            type: "Light",
            min_value: 10,
            max_value: 40
        },
        {
            type: "Humidity",
            min_value: 30,
            max_value: 60
        }
        ],
        permissions: [],
        devices:[{
            name:"TV1"
        }
        ]
    },
    {
        id: "2",
        name: "Bedroom",
        configurations: [{
            type: "Temperature",
            min_value: 20,
            max_value: 40
        },
        {
            type: "Light",
            min_value: 10,
            max_value: 40
        },
        {
            type: "Humidity",
            min_value: 30,
            max_value: 60
        }
        ],
        permissions: [],
        devices:[{
            name:"TV2"
        }
        ]
    },
    {
        id: "3",
        name: "Living Room",
        configurations: [{
            type: "Temperature",
            min_value: 10,
            max_value: 20
        },
        {
            type: "Light",
            min_value: 10,
            max_value: 40
        },
        {
            type: "Humidity",
            min_value: 30,
            max_value: 60
        }
        ],
        permissions: [],
        devices:[{
            name:"TV3",

        }
        ]
    }, {
        id: "4",
        name: "Bedroom 2",
        configurations: [{
            type: "Temperature",
            min_value: 10,
            max_value: 20
        },
        {
            type: "Light",
            min_value: 10,
            max_value: 40
        },
        {
            type: "Humidity",
            min_value: 30,
            max_value: 60
        }
        ],
        permissions: [],
        devices:[{
            name:"TV4"
        }
        ]
    }
]};



export default automation;