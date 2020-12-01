import React from "react";
import { Container, Row, Col, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import InviteModel from "../components/group-settings/InviteModel";


const GroupSettings = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Group Settings" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <InviteModel />
    <Button outline={true} theme="danger" className="mx-2" >
      Remove User
    </Button>
    <hr></hr>
    <Row>
      <Col lg="3">
        <UserDetails />
      </Col>
      <Col lg="3">
        <UserDetails />
      </Col>
      <Col lg="3">
        <UserDetails />
      </Col>
    </Row>
  </Container>
);

export default GroupSettings;
