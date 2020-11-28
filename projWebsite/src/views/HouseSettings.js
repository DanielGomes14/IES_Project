import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import HouseSets from "../components/house-settings/HouseSets";

const HouseSettings = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="House Settings" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <HouseSets />
      </Col>
    </Row>
  </Container>
);

export default HouseSettings;