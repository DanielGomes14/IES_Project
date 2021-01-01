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
import {current_user} from "../../utils/auth";
import HomeService from "../../services/HomeService";

class FormNewHouse extends React.Component{

    constructor(props) {
		super(props);
		
		this.state = {name: "",city:"",address:"",zipcode:"",state:""};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


    handleChange(event) {
		const {name, value} = event.target;
        this.setState({ [name]: value });
	}

    handleSubmit(event) {
        alert("House has been added")
        
		HomeService.addHome(
			current_user.current_user(), this.state.name, this.state.address,this.state.city,this.state.state,this.state.zipcode
        );
        
		event.preventDefault();
	}


    render(){

        return (
            <Card small className="h-100 py-3 col-sm-8">

            <CardHeader className="border-bottom">
            <h5 className="m-0">New House</h5>
            </CardHeader>

            <CardBody className="d-flex flex-column">
            <Form className="quick-post-form" onSubmit={ this.handleSubmit }>

                <FormGroup className="row">
                    <Col sm="12">
                        <label htmlFor="deName">Name</label>    
                        <FormInput name="name" value={this.state.name} onChange={this.handleChange} placeholder="" if="deName"/>
                    </Col>
                </FormGroup>

                <FormGroup className="row">
                    <Col sm="12">
                        <label htmlFor="feInputAddress">Address</label>
                        <FormInput name="address" value={this.state.address} onChange={this.handleChange} id="feInputAddress" placeholder="1234 Main St" />
                    </Col>
                </FormGroup>

                <FormGroup className="row">
                    <Col md="6">
                        <label htmlFor="feInputCity">City</label>
                        <FormInput name="city" value={this.state.city} onChange={this.handleChange} id="feInputCity" />
                    </Col>
                    <Col md="4">
                        <label htmlFor="feInputState">State</label>
                        <FormInput name="state" value={this.state.state} onChange={this.handleChange} id="feInputState" />
                    </Col>
                    <Col md="2">
                        <label htmlFor="feInputZip">Zip</label>
                        <FormInput name="zip" value={this.state.zip} onChange={this.handleChange} id="feInputZip" />
                    </Col>
                </FormGroup>



                <FormGroup className="mb-0 d-flex justify-content-center mt-3">
                    <Button theme="accent" value="submit" type="submit" className="bg-primary text-white text-center rounded"
                     style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "150px", height:  "40px" }}>
                        Add House
                    </Button>
                </FormGroup>

            </Form>
            </CardBody>
        </Card>

        )
    }


}

export default FormNewHouse;