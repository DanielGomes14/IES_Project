import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Button,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  FormCheckbox,
} from "shards-react";
import Select, { components } from 'react-select'

const FormNewHouse = ({ title }) => (
        <Card small className="h-100 py-3 col-sm-8">

            <CardHeader className="border-bottom">
            <h5 className="m-0">{title}</h5>
            </CardHeader>

            <CardBody className="d-flex flex-column">
            <Form className="quick-post-form">

                <FormGroup className="row">
                    <Col sm="12">
                        <label htmlFor="deName">Name</label>    
                        <FormInput placeholder="" if="deName"/>
                    </Col>
                </FormGroup>

                <FormGroup className="row">
                    <Col sm="12">
                        <label htmlFor="feInputAddress">Address</label>
                        <FormInput id="feInputAddress" placeholder="1234 Main St" />
                    </Col>
                </FormGroup>

                <FormGroup className="row">
                    <Col md="6">
                        <label htmlFor="feInputCity">City</label>
                        <FormInput id="feInputCity" />
                    </Col>
                    <Col md="4">
                        <label htmlFor="feInputState">State</label>
                        <FormSelect id="feInputState">
                        <option>Choose...</option>
                        <option>...</option>
                        </FormSelect>
                    </Col>
                    <Col md="2">
                        <label htmlFor="feInputZip">Zip</label>
                        <FormInput id="feInputZip" />
                    </Col>
                </FormGroup>



                <FormGroup className="mb-0 d-flex justify-content-center mt-3">
                    <Button theme="accent" type="submit" className="bg-primary text-white text-center rounded"
                     style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "150px", height:  "40px" }}>
                        Add House
                    </Button>
                </FormGroup>

            </Form>
            </CardBody>
        </Card>
);

FormNewHouse.propTypes = {
    title: PropTypes.string
};

FormNewHouse.defaultProps = {
title: "New House"
};

export default FormNewHouse;