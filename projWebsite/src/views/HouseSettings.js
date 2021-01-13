import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import HouseSets from "../components/house-settings/HouseSets";
import EditDivision from "../components/house-settings/EditDivision"
import HouseMembers from "../components/house-settings/HouseMembers"

const HouseSettings = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="House Settings" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="12">
        <HouseMembers/>
      </Col>
    </Row>

    <hr/>
    <PageTitle title="Divisions" md="12" className="ml-sm-auto mr-sm-auto" />
    <Row>
      <Col lg="5">
        <HouseSets />
        </Col>
        <Col lg="7">
        <EditDivision/>
        </Col>
    </Row>
  </Container>
);

export default HouseSettings;