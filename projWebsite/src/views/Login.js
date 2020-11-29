import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import LoginPageTitle from "../components/common/LoginPageTitle";
import Forms from "../components/components-overview/Forms";
import FormValidation from "../components/components-overview/FormValidation";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";



const Login = () => (
    <Container fluid className="main-content-container px-4">

      <Row className="mb-0 page-header py-4 text-sm-center">
        <LoginPageTitle sm="4" title="Log In" className="text-sm-center" />
      </Row> 

      <Row className="mb-0 col d-flex justify-content-center">
        <Card small >
          <CardHeader className="border-bottom">
            <h6 className="m-0">Form Example</h6>
          </CardHeader>
          <CompleteFormExample />
        </Card>
      </Row>



    </Container>
  );
  
  export default Login;




  
  