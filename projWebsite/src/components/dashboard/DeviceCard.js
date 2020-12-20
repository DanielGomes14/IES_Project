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
	Row
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
        this.device = props.device;
		this.state = {
			connected: 0,
			refresh: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	componentDidMount() {
		DeviceService.getDeviceState(this.device.id)
            .then(data => {
                this.setState({ 
                    connected: data,
                });
            })
            .catch(error => {
                console.log(error) ;
            });
	}

	handleChange(event) {
		const {name, value, type, checked} = event.target;
		console.log(JSON.stringify(this.device));
		if (type === "checkbox"){
			this.setState({ [name]: checked });
			this.device.state = checked ? 1:0;
			DeviceService.updateDeviceState(this.device);
		}
		else{
			this.setState({ [name]: value });
			this.device.state = value;
			DeviceService.updateDeviceState(this.device);
		}
	}
	
	submit = () => {
		confirmAlert({
		  title: 'Confirm to submit',
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
							<Button className="float-right" theme="white" style={{ width: "100%", height:"100%", minWidth: "160px", marginRight: "25px"}}>
								<FormCheckbox toggle defaultChecked={this.device.state}	name="connected">
									Enable Device
								</FormCheckbox>
							</Button>
						</Col>
					</Row>
				</CardHeader>
				{/* { this.state.connected ? (
					<CardBody className="d-flex flex-column">
						<div className="progress-wrapper">
						<strong className="text-muted d-block mb-2">
							Device's Progress
						</strong>
						<Progress
								theme={types[this.device.type.name].theme}
								style={{ height: "5px" }}
								className="mb-3"
								value={50}
						>
							<span className="progress-value">{50}%</span>
						</Progress>
						</div>
					</CardBody>
					) : ""
				} */}
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
