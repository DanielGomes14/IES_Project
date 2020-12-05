import React from "react";
import { Container, Row, Col, Card, CardHeader} from "shards-react";
import LoginPageTitle from "../components/login-register/LoginPageTitle";
import RegisterForm from "../components/login-register/RegisterForm";



const Register = () => (

    <Container fluid className="main-content-container px-4 py-5 d-flex justify-content-center">

        <Row className="mb-0 col d-flex justify-content-center">
            <Col sm="6">
                <Card>
                    <CardHeader className="border-bottom">
                        <LoginPageTitle sm="4" title="Register" className="text-sm-center" />
                    </CardHeader>
                    <RegisterForm />
                </Card>
            </Col>
        </Row>

    </Container>
);

export default Register;