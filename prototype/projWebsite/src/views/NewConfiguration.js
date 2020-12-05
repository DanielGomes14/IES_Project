import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row, Col, Card, CardBody
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import FormConfiguration from "../components/new-configuration/FormConfiguration"



function NewConfiguration({ devices }) {

    return (
        <Container fluid className="main-content-container px-4">

            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="New Configuration" subtitle="Automation" className="text-sm-left" />
            </Row>

            <Container className="justify-content-center">
                {devices.map((device, idx_dev) => (
                    <Col lg="12" className="py-3">
                        <Card className="">
                            <CardBody>
                                <Row>
                                    <Col sm="6" md="7">
                                        <h3>
                                            {device.name}
                                        </h3>
                                    </Col>
                                    <Col sm="6" md="5">
                                        <h6 style={{textAlign:"right"}}>{device.type}</h6>
                                    </Col>
                                </Row>
                                <FormConfiguration name={device.name} type={device.type} />
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Container>

        </Container>
    );
};

NewConfiguration.propTypes = {
    devices: PropTypes.array,
};

NewConfiguration.defaultProps = {
    devices:[
        {
            name:"TV",
            type:"Eletronic"
        },
        {
            name:"Humidifier",
            type:"Humidity"
        },
        {
            name:"Air conditioner",
            type:"Temperature"
        }
    ]
}

export default NewConfiguration;