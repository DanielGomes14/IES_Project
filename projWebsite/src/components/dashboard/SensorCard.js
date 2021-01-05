import React from "react";
import PropTypes from "prop-types";

import { FaLightbulb, FaTemperatureHigh } from "react-icons/fa";
import { IoWater, IoPower } from "react-icons/io5";
import { Redirect } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SensorService from "../../services/SensorService";

import {
	Card,
	CardHeader,
	CardBody,
	FormCheckbox,
	Progress,
    Button,
    Badge,
    Row, 
    Col
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
        theme: "primary",
        icon: <IoWater />
    },
    "Eletronic": {
        theme: "primary",
        icon: <IoPower />
    }
}

class SensorCard extends React.Component {
    constructor(props) {
        super(props);
        this.sensor = props.sensor;
		this.state = {
            value: '-',
            refresh: false
        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
		SensorService.getSensorData(this.sensor.id)
            .then(data => {
                console.log("-->", data)
                if (data && data.length > 0){
                    this.setState({ 
                        value: data[0].data,
                    });
                }
            })
            .catch(error => {
                console.log(error) ;
            });
    }
    
    submit = () => {
		confirmAlert({
		  title: 'Confirm to submit',
		  message: 'Are you sure you want to remove this sensor?',
		  buttons: [
			{
				label: 'Yes',
				onClick: () => {
					SensorService.deleteSensor(this.sensor.id)
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
                        <Button theme="white" style={{ width: "10px", borderRadius:'50%'}}  onClick={this.submit}>
                            <span style={{fontWeight: '20px', marginLeft: "-4px", color: "red"}}>X</span>
                        </Button>
                    </span>{" "}
                    <Row>
                        <Col>
                            <div className="d-flex float-left">
                                {types[this.sensor.type.name].icon} 
                                <h6 className="ml-2">{this.sensor.type.name}</h6>
                            </div>
                        </Col>
                        <Col>
                            <div className="float-right">
                                <Badge theme={types[this.sensor.type.name].theme} style={{height:"100%", width: "80px", marginRight: '25px'}}>
                                    <span>{this.state.value}</span>
                                </Badge>
                            </div>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
        )
    }
}

export default SensorCard;
