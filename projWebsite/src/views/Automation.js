
import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row, Col, Card, CardBody
} from "shards-react";

import ConfigProfile from "../components/automation/ConfigProfile";
import ConfigDevice from "../components/automation/ConfigDevice";
import PageTitle from "../components/common/PageTitle";

const automation = ({ profiles,devices }) => (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Automation" subtitle="Dashboard" className="text-sm-left" />
        </Row>

        <Container >
            <Row noGutters className="page-header py-2 ">
                {profiles.map((profile, idx) => (
                    <Col className="col-lg mb-4 px-2" key={idx} {...profile.attrs}>
                        <ConfigProfile
                            name={profile.name} />
                    </Col>
                ))}
                <Col className="col-lg mb-4 px-2">
                    <Card small>
                        <CardBody>
                            <div style={{ textAlign: "center" }}>
                                <h6>+</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Container>
        <Container>
            
            {devices.map((device,idx) => (
            <Row className="py-2 px-4">
                <ConfigDevice name={device.name} division={device.division} />
            </Row>
            ))}
        </Container>
    </Container>
);

automation.propTypes = {
    profiles: PropTypes.array,
    devices : PropTypes.array
};

automation.defaultProps = {
    profiles: [{
        name: "Default"
    },
    {
        name: "Economics"
    },
    {
        name: "Custom"
    }
    ],
    devices: [{
        name : "Air conditioner", 
        division : "Kitchen"
    },
    {
        name : "Lights",
        division: "Bedroom"
    }
    ]
};

export default automation;