import React from "react";
import { Card, CardBody, FormCheckbox, Row, Col } from "shards-react";

import AutomationConfig from "./AutomationConfig";
import TypeSlider from "../automation/TypeSlider";

import DivisionConfigService from "../../services/DivisionConfigService";
import DeviceService from "../../services/DeviceService";


class AutomationDevice extends React.Component {

    constructor(props) {
        super(props);
        this.division = props.division;
        console.log(this.division);
        this.state = {
            loading1: 0,
            loading2: 0,
            divisionConfigs: [],
            devices: [],
        }
    }

    componentDidMount() {
        this.setState({ loading1: 1, loading2: 1 });
        
        // DivisionConfigService.getConfigurations(this.division.id)
		// 	.then(data => {
		// 		this.setState({ 
		// 			divisionConfigs: data,
		// 			loading1: 0
		// 		});
		// 	})
		// 	.catch(error => {
		// 		console.log(error) ;
		// 		this.setState({ loading1: 2 })
		// 	});

		DeviceService.getDevices(this.division.id)
			.then(data => {
				this.setState({ 
					devices: data,
					loading2: 0
				});
			})
			.catch(error => {
				console.log(error) ;
				this.setState({ loading2: 2 })
            });
	}

    render() {
        return (
            <div>
                <Row>
                    {this.state.divisionConfigs.map((config, index) => (
                        <Col key={index} lg="4">
                            <h4>{config.type}</h4>
                            <TypeSlider type={config.type} min_value={config.minValue}
                                max_value={config.maxValue} />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {this.state.devices.map((device, index) => (
                        <Col key={index} lg="6" className="py-3">
                            <Card className="">
                                <CardBody>
                                    <h3>{device.name}</h3>
                                    <Row>
                                        <Col lg="7">
                                            <FormCheckbox toggle checked={device.state}> Off/On </FormCheckbox>
                                        </Col>
                                        <Col lg="5">
                                            <h6 style={{textAlign:"right"}}>{device.type}</h6>
                                        </Col>
                                    </Row>    
                                        <AutomationConfig device={device}></AutomationConfig>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default AutomationDevice;