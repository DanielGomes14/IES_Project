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

import SensorService from "./../../services/SensorService";


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
	{ id: 1, value: 'Luminosity', icon: <FaLightbulb /> },
	{ id: 2, value: 'Humidity', icon: <IoWater /> },
	{ id: 3, value: 'Temperature', icon: <FaTemperatureHigh /> },
]

class FormNewSensor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedType: options[0],
		}
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

	handleSelect = selectedType => {
		this.setState({ selectedType });
	};
	
	handleSubmit(event) {
		alert('Sensor submitted: ' + this.state.selectedType.id);
		SensorService.addSensor(
			1, this.state.selectedType.id
		);
		event.preventDefault();
	}

	render() {
		return (
			<Card small className="h-100 py-3 col-sm-4">

				<CardHeader className="border-bottom">
				<h5 className="m-0">{ this.props.title }</h5>
				</CardHeader>

				<CardBody className="d-flex flex-column">
				<Form className="quick-post-form" onSubmit={ this.handleSubmit }>

					<FormGroup className="row">
						<Col sm="12">
							<label htmlFor="deIcon">Sensor Type:</label>
							<Select options={ options } id="deIcon" placeholder="" defaultValue={ options[0] }
							components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }}
							value={ this.state.selectedType } onChange={ this.handleSelect } />
						</Col>
					</FormGroup>

					<FormGroup className="mb-0 d-flex justify-content-center mt-3">
						<Button theme="accent" type="submit" className="bg-primary text-white text-center rounded"
							style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "150px", height:  "40px" }}>
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