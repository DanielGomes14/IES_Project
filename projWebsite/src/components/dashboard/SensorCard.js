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
    Button,
    Badge
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
			value: 69,
        };
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
                        <Badge theme={types[this.sensor.type.name].theme}  style={{width: "100%", height:"100%", minWidth: "80px"}}>
                            <span>{this.state.value}</span>
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
        )
    }
}

export default SensorCard;
