import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormCheckbox,
  Button,
} from "shards-react";

import AuthenticationService from "./../../services/AuthenticationService";

handleSubmit() {

}

const RegisterForm = () => (
  <ListGroup flush>
    <ListGroupItem className="p-6">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row form className="form-group py-1">
              <Col sm="6">
                <label htmlFor="feFirstName">First Name</label>
                <FormInput
                    id="feFirstName"
                    placeholder="First name"
                    required
                />
              </Col>
              <Col sm="6">
                <label htmlFor="feLastName">Last Name</label>
                    <FormInput
                        id="feLastName"
                        placeholder="Last name"
                        required
                    />
                </Col>
            </Row>
            <Row form className="form-group py-1">
                <label htmlFor="feUsername">Username</label>
                <FormInput
                    id="feUsername"
                    placeholder="Username"
                    required
                />
            </Row>
            <Row form className="form-group py-1">
                <label htmlFor="feEmailAddress">Email</label>
                <FormInput
                  id="feEmailAddress"
                  type="email"
                  required
                  placeholder="Email"
                />
            </Row>
            <Row form className="form-group py-1">
                <label htmlFor="fePassword">Password</label>
                <FormInput
                  id="fePassword"
                  type="password"
                  required
                  placeholder="Password"
                />
            </Row>


            <Row form>
              <Col md="12" className="form-group">
                <FormCheckbox required>
                  {/* eslint-disable-next-line */}I agree with your{" "}
                  <a href="#">Privacy Policy</a>.
                </FormCheckbox>
              </Col>
            </Row>
            <Row form >
              <Col className="text-sm-center py-1">
                  <span>Already have an account?</span>
              </Col>
            </Row>
            <Row form >
              <Col className="text-sm-center py-1">
                  <a href="/login" underline="always">
                      Log In
                  </a>
              </Col>
            </Row>
            <Row form>
                <Col className="text-sm-center py-3">
                    <Button className="bg-primary text-white text-center rounded p-3"
                     style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px" }}
                     type="submit">
                        <span>Create New Account</span>
                    </Button>
                </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default RegisterForm;
