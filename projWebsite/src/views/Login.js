import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import LoginPageTitle from "../components/login-register/LoginPageTitle";
import LoginForm from "../components/login-register/LoginForm";



const Login = () => (
  <Container fluid className="main-content-container px-4 py-5 d-flex justify-content-center">

    <Row className="mb-0 col d-flex justify-content-center">
        <Col sm="6">
            <Card>
                <CardHeader className="border-bottom">
                    <LoginPageTitle sm="4" title="Login" className="text-sm-center" />
                </CardHeader>
                <LoginForm />
            </Card>
        </Col>
    </Row>

  </Container>
  );
  
  export default Login;




  
  