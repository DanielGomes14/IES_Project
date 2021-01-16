import React from "react";
import PropTypes from "prop-types";

import { FaLightbulb, FaTemperatureHigh } from "react-icons/fa";
import { IoWater, IoPower } from "react-icons/io5";
import DeviceService from "../../services/DeviceService";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Redirect } from "react-router-dom";

import {
	Card,
	CardHeader,
	CardBody,
	FormCheckbox,
	Progress,
	Button,
	Badge,
	Col,
	Row,
	Slider
} from "shards-react";


const types = {
	"Luminosity": {
		theme: "warning",
		icon: <FaLightbulb />
	},
	"Temperature": {
		theme: "danger",
		icon: <FaTemperatureHigh />
	},
	"Humidity": {
		theme: "info",
		icon: <IoWater />
	},
	"Eletronic": {
		theme: "primary",
		icon: <IoPower />
	}
}

class DeviceCard extends React.Component {
    constructor(props) {
		super(props);
		this.theme = null;
		this.range = null;
		this.device = props.device;
		this.state = {
			devstate: this.device.state,
			refresh: false,
			theme: "",
			range: [0,100],
			apply: false,
			tooltip: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
		this.getThemeNRange = this.getThemeNRange.bind(this);
		this.handleSlide = this.handleSlide.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	componentDidMount() {
		this.getThemeNRange(this.device.type.name)
	}


	handleSlide(event) {
        this.setState({
			devstate: parseFloat(event[0]),
			tooltip: true,
			apply: true
		});
		console.log(this.state)
    }

	getThemeNRange(typeName) {
        if (typeName == "Temperature") {
			this.setState({
				theme: "danger",
				range: [15, 35]
			})
        } else if (typeName == "Humidity") {
			this.setState({
				theme: "info",
				range: [40, 60]
			})
        } else if (typeName == "Luminosity") {
			this.setState({
				theme: "warning",
				range: [20, 80]
			})
		} else if (!typeName == "Eletronic") {
            throw new Error('Unexpected props');
        }
    }

	handleChange(event) {
		const {id, name, value} = event.target;
		var checkbox = document.getElementById(id);

		this.device.state = !this.device.state ? 1:0;
		this.setState({ devstate: this.device.state  });

		DeviceService.updateDeviceState(this.device);
		checkbox.checked = this.device.state;
	}


	updateState() {
		this.device.state = this.state.devstate;
		console.log(this.device.state)
		DeviceService.updateDeviceState(this.device);
	}
	
	submit = () => {
		confirmAlert({
		  title: 'Confirm Deletion',
		  message: 'Are you sure you want to remove this device?',
		  buttons: [
			{
				label: 'Yes',
				onClick: () => {
					DeviceService.deleteDevice(this.device.id)
					this.setState({refresh: true});
				}
			},
			{
			  label: 'No',
			}
		  ]
		});
	  };
	
	  
	render() {
		if (this.state.refresh === true)
			return <Redirect to='/' />

		return (
			<Card small className="h-100">
				{/* Card Header */}
				<CardHeader className="border-bottom">
					<span className="text-danger float-right" style={{position: "absolute", right: '-5px',top: 0, marginTop: '-10px'}}>
						<Button theme="white" style={{ width: "10px", borderRadius:'50%'}} onClick={this.submit}>
							<span style={{fontWeight: '20px', marginLeft: "-4px", color: "red"}}>X</span>
						</Button>
					</span>{" "}
					<Row>
						<Col sm="6" md="8" lg="8">
							<div className="d-flex float-left">
							{types[this.device.type.name].icon} 
							<h6 className="ml-2">{this.device.name}</h6>
							</div>
						</Col>
						<Col sm="6" md="4" lg="4">
							<Button className="float-right" theme="white" style={{height:"100%", marginRight: "25px"}}>
								<FormCheckbox toggle defaultChecked={this.device.state} ref={this.device.id}	name="devstate" id={this.device.id} onChange={ e => this.handleChange(e) }>
									Enable Device
								</FormCheckbox>
							</Button>
						</Col>
					</Row>
				</CardHeader>
				{ this.state.devstate!=0 && this.device.type.name != "Eletronic" ? (
					<CardBody className="d-flex flex-column">
						<Row>
							<Col lg="11" md="11" sm="11">
								<Slider
									start={[this.state.devstate]}
									pips={{
										mode: "positions",
										values: [0, 25, 50, 75, 100],
										stepped: true,
										density: 5
									}}
									range={{ min: this.state.range[0], max: this.state.range[1] }}
									step={1}
									margin={5}
									theme={this.state.theme}
									animate={true}
									connect={[true, false]}
									tooltips={this.state.tooltip}
									onSlide={this.handleSlide}
									onEnd={e => this.setState({tooltip: false})}
								/>
							</Col>
							<Col lg="1" md="1" sm="1" style={{margin: "auto"}}>
								<Button theme={this.state.theme} style={{width:"100%" }} onClick={this.updateState}>Apply</Button>
							</Col>
						</Row>
					</CardBody>

				) :null }

			</Card>
		)
	}
}

DeviceCard.propTypes = {
	/**
	 * The component's title.
	 */
	title: PropTypes.string,
	progress: PropTypes.number,
	type: PropTypes.string
};

DeviceCard.defaultProps = {
	title: "My Device",
	progress: 40,
	type: "light"
};

export default DeviceCard;
