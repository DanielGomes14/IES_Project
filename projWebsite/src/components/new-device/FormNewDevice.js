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
import { FaLightbulb, FaTemperatureHigh, FaPlayCircle, FaCoffee, FaWifi, FaWind, FaTv } from "react-icons/fa";
import { IoWater, IoPower } from "react-icons/io5";

import DeviceService from "./../../services/DeviceService";

const { Option } = components
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
// const options = [
// 	{ value: 'light', icon: <FaLightbulb /> },
// 	{ value: 'water', icon: <IoWater /> },
// 	{ value: 'temperature', icon: <FaTemperatureHigh /> },
// 	{ value: 'music', icon: <FaPlayCircle /> },
// 	{ value: 'coffe', icon: <FaCoffee /> },
// 	{ value: 'fan', icon: <FaWind /> },
// 	{ value: 'wifi', icon: <FaWifi /> },
// 	{ value: 'tv', icon: <FaTv /> },
// ]

const options = [
	{ id: 3, value: 'Luminosity', icon: <FaLightbulb /> },
	{ id: 2, value: 'Humidity', icon: <IoWater /> },
	{ id: 1, value: 'Temperature', icon: <FaTemperatureHigh /> },
	{ id: 4, value: 'Eletronic', icon: <IoPower /> },
]

class FormNewDevice extends React.Component {
	constructor(props) {
		super(props);
		this.division = window.location.href.split('=')[1]
		this.state = {
			selectedType: options[3],
			name: "",
			notes: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		});
	}

	handleSelect = selectedType => {
		this.setState({ selectedType });
	};
	
	handleSubmit(event) {
		DeviceService.addDevice(
			this.division, this.state.selectedType.id, this.state.name
		);
		event.preventDefault();
		window.location.pathname = '/'
	}

	render() {
		return (
			<Card small className="h-100 py-3 col-sm-8">

				<CardHeader className="border-bottom">
					<h5 className="m-0">{this.props.title}</h5>
				</CardHeader>

				<CardBody className="d-flex flex-column">
					<Form className="quick-post-form" onSubmit={ this.handleSubmit }>

						<FormGroup className="row">
							<Col md="12" lg="8">
								<label htmlFor="deName">Name</label>    
								<FormInput id="deName" name="name" value={ this.state.name } onChange={ this.handleChange }/>
							</Col>
							<Col md="12" lg="4">
								<label htmlFor="deType">Type</label>
								<Select options={ options } id="deIcon" placeholder="" defaultValue={ options[0] }
								components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }}
								value={ this.state.selectedType } onChange={ this.handleSelect } />
							</Col>
							{/* <Col sm="5" md="4" lg="3">
								{/* NOT BEING USED
								<label htmlFor="deIcon">Icon</label>
								<Select options={ options } id="deIcon" name="icon" 
								components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }}
								value={ this.state.selectedIcon } onChange={ this.handleSelect } />
							</Col> */}
						</FormGroup>

						<FormGroup className="row">
							<Col sm="12">
								<label htmlFor="deNotes">Notes</label>
								<FormTextarea id="deNotes" name="notes" value={ this.state.notes } onChange={ this.handleChange }/>
							</Col>
						</FormGroup>

						<FormGroup className="mb-0 d-flex justify-content-center mt-3">
							<Button theme="accent" type="submit" className="bg-primary text-white text-center rounded"
							style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "150px", height:  "40px" }}>
								Add Device
							</Button>
						</FormGroup>

					</Form>
				</CardBody>
			</Card>
		);
	}
}

FormNewDevice.propTypes = {
    title: PropTypes.string
};

FormNewDevice.defaultProps = {
title: "New Device"
};

export default FormNewDevice;