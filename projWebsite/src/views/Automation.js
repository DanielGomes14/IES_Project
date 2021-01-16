
import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row
} from "shards-react";

import AutomationTab from "../components/automation/AutomationTab";
import PageTitle from "../components/common/PageTitle";

import DivisionService from "../services/DivisionService";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// import NewConfiguration from "../components/automation/NewConfiguration";



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
                    {children}
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


class Automation extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            loading: 0,
            divisions: [],
            value: 0
        }
        this.classes = this.useStyles;
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
		this.setState({ loading: 1 });

		DivisionService.getDivisions()
			.then(data => {
				this.setState({ 
					divisions: data,
					loading: 0
				});
			})
			.catch(error => {
				console.log(error) ;
				this.setState({ loading: 2 })
			});
	}

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }));

    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Automation" subtitle="Dashboard" className="text-sm-left" />
                </Row>

                <Container>
                    <div className={this.classes.root}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example">

                                {this.state.divisions.map((division, index) => (
                                    <Tab key={index} label={division.name} {...a11yProps(index)} />
                                ))}

                            </Tabs>
                        </AppBar>
                        {this.state.divisions.map((division, index) => (
                            <TabPanel key={index} value={this.state.value} index={index}>
                                <AutomationTab division={division}></AutomationTab>
                            </TabPanel>
                        ))}
                    </div>
                </Container>
            </Container>
        );
    }
};

Automation.propTypes = {
    devices: PropTypes.array,
    divisions: PropTypes.array
};

Automation.defaultProps = {
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
            name:"TV1",
            configurations:[{
                start:"00:00",
                end:"01:00",
                value:"10"
            },
            {
                start:"03:00",
                end:"04:00",
                value:"10"
            }
            ],
            type:"Eletronic",
            state: true

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
            name:"TV2",
            configurations:[{
                start:"00:00",
                end:"01:00",
                value:"10",
            }],
            type:"Eletronic",
            state:false

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
            configurations:[{
                start:"00:00",
                end:"01:00",
                value:"10"
            }],
            type:"Eletronic",
            state: true
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
            name:"Air conditioner",
            configurations:[{
                start:"00:00",
                end:"01:00",
                value:"10"
            }],
            type:"Temperature",
            state:false
        }
        ]
    }
]};

export default Automation;