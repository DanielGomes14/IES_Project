import React from "react";
import { Row, Col, Button } from "shards-react";

import DeviceService from "../../services/DeviceService";
import SensorService from "../../services/SensorService";
import DeviceCard from "./DeviceCard";
import SensorCard from "./SensorCard";


class DeviceGroup extends React.Component {
	constructor(props) {
		super(props);
		this.division = props.division;
		this.state = {
			devices: [],
			sensors: [],
		};
	}

	componentDidMount() {
		DeviceService.getDevices(this.division.id)
			.then(data => {
				this.setState({ 
					devices: data,
				});
			})
			.catch(error => {
				console.log(error) ;
			});
		SensorService.getSensors(this.division.id)
			.then(data => {
				this.setState({ 
					sensors: data,
				});
			})
			.catch(error => {
				console.log(error) ;
			});
	}


  
	render() {
		return (
			<div>
				<h4 className="float-left" style={{marginLeft: "20px"}}><h4>{this.division.name}</h4></h4>
				<a href={"/newsensor?div="+this.division.id}><Button className="float-right mb-2 mr-2" theme="info" style={{ fontSize: "16px", height: '100%'}}>Add Sensor</Button></a>
				<a href={"/newdevice?div="+this.division.id}><Button className="float-right mb-2 mr-2" theme="info" style={{ fontSize: "16px", height: '100%'}}>Add Device</Button></a>
				<div className="clearfix" style={{paddingBottom: "15px"}}></div>
				<Row>
          		{
					this.state.sensors && this.state.sensors.map((sen) => (
							<Col key={sen.id} lg="12" md="12" sm="12" className="mb-4">
							<SensorCard sensor={sen} />
						</Col>
						))
				}
				{
					this.state.devices && this.state.devices.map((dev) => (
						<Col key={dev.id} lg="12" md="12" sm="12" className="mb-4">
							<DeviceCard device={dev} />
						</Col>
					))
				}
				</Row>
			</div>
		)
	}
}

export default DeviceGroup;
