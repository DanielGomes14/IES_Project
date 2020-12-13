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
  FormTextarea,
  Button,
  Col,
} from "shards-react";
import Select, { components } from 'react-select'
import { FaLightbulb, FaTemperatureHigh } from "react-icons/fa";
import { IoWater } from "react-icons/io5";


class FormNewSensor extends React.Component {

	constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		// if (name == "custom")
		// 	this.setState({ custom: !this.state.custom });
		// else
		// 	this.setState({ [name]: value });
	}
	
	handleSubmit(event) {
		alert('A name was submitted: ' + '');
		// DivisionService.addDivisions(
		// 	1, this.state.name,
		// 	this.state.OPTIONS.filter(function(opt) {
		// 		if (opt.checked) return opt.id;
		// 	})
		// );
	}

  render() {
    const { Option } = components;
    const CustomSelectOption = props => (
      <Option {...props} selectProps>
        {props.data.value}      {props.data.icon}
        {props.data.label}
      </Option>
    )
    const CustomSelectValue = props => (
      <div>
        {props.data.value}      {props.data.icon}
        {props.data.label}
      </div>
    )
    const options = [
      { value: 'Luminosity', icon: <FaLightbulb /> },
      { value: 'Humidity', icon: <IoWater /> },
      { value: 'Temperature', icon: <FaTemperatureHigh /> },
    ]
    return (
        <Card small className="h-100 py-3 col-sm-4">

            <CardHeader className="border-bottom">
            <h5 className="m-0">{ this.props.title }</h5>
            </CardHeader>

            <CardBody className="d-flex flex-column">
            <Form className="quick-post-form">

                <FormGroup className="row">
                    <Col sm="12">
                        <label htmlFor="deIcon">Sensor Type:</label>
                        <Select options={options} id="deIcon" placeholder="" defaultValue={options[0]}
                        components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }} />
                    </Col>
                </FormGroup>

                <FormGroup className="mb-0 d-flex justify-content-center mt-3">
                    <Button theme="accent" type="submit" className="bg-primary text-white text-center rounded"
                     style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "150px", height:  "40px" }}
                     onClick={ this.handleSubmit }>
                        Add Sensor
                    </Button>
                </FormGroup>

            </Form>
            </CardBody>
        </Card>
    );
  }
}

FormNewSensor.propTypes = {
    title: PropTypes.string
};

FormNewSensor.defaultProps = {
title: "Add Sensor To Division"
};

export default FormNewSensor;