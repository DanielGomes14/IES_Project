import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";



const LoginLayout = ({ children, noNavbar, noFooter }) => (
    <Container fluid>
      <Row>
        <Col
          className="main-content p-0"
          lg={{ size: 12 }}
          md={{ size: 12 }}
          sm="12"
          tag="main"
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
  

  
  export default LoginLayout;
  