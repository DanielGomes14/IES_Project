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
import { FaWarehouse, FaBuilding, FaHouseDamage, FaHome, FaIndustry, FaDumpster } from "react-icons/fa";


const { Option } = components
const CustomSelectOption = props => (
  <Option {...props} selectProps>
    {props.data.icon}
    {props.data.label}
  </Option>
)

const CustomSelectValue = props => (
  <div>
    {props.data.icon}
    {props.data.label}
  </div>
)

const options = [
    { value: 'FaWarehouse', icon: <FaWarehouse /> },
    { value: 'FaBuilding', icon: <FaBuilding /> },
    { value: 'FaHouseDamage', icon: <FaHouseDamage /> },
    { value: 'FaHome', icon: <FaHome /> },
    { value: 'FaIndustry', icon: <FaIndustry /> },
    { value: 'FaDumpster', icon: <FaDumpster /> },
    { value: 'tv', icon: <FaDumpster /> },
  ]


const FormNewHouse = ({ title }) => (
        <Card small className="h-100 py-3 col-sm-8">

            <CardHeader className="border-bottom">
            <h5 className="m-0">{title}</h5>
            </CardHeader>

            <CardBody className="d-flex flex-column">
            <Form className="quick-post-form">

                <FormGroup className="row">
                    <Col sm="5" md="8" lg="9">
                        <label htmlFor="deName">Name</label>    
                        <FormInput placeholder="" if="deName"/>
                    </Col>
                    <Col sm="5" md="4" lg="3">
                        <label htmlFor="deIcon">Icon</label>
                        <Select options={options} id="deIcon" placeholder="" defaultValue={options[0]}
                        components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }} />
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