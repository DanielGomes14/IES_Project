import React from "react";
import PropTypes from "prop-types";

import { FaLightbulb, FaTemperatureHigh } from "react-icons/fa";
import { IoWater, IoPower } from "react-icons/io5";

import SensorService from "../../services/SensorService";

import {
	Card,
	CardHeader,
	CardBody,
	FormCheckbox,
	Progress,
	Button
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

class SensorCard extends React.Component {
    constructor(props) {
        super(props);
        this.sensor = props.sensor;
		this.state = {
			value: 0,
        };
    }

    componentDidMount() {
		SensorService.getSensorData(this.sensor.id)
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
            <Card small className="h-100">
                {/* Card Header */}
                <CardHeader className="border-bottom">
                    <div className="d-flex float-left">
                    {types[this.sensor.type.name].icon} 
                    <h6 className="ml-2">{this.sensor.type.name}</h6>
                    </div>
                    <div className="float-right">
                        {this.state.value}
                    </div>
                </CardHeader>
            </Card>
        )
    }
}

export default SensorCard;
