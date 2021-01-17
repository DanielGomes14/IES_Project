import React from "react";
import { Card, CardBody, FormCheckbox, Row, Col } from "shards-react";

import { timestampToHour } from "../../utils/date";

import DeviceConfigService from "../../services/DeviceConfigService";


class DeviceConfigs extends React.Component {

    constructor(props) {
        super(props);
        this.device = props.device;
        this.state = {
            loading: 0,
            deviceConfigs: []
        }
    }

    componentDidMount() {
		this.setState({ loading: 1 });

		DeviceConfigService.getConfigurations(this.device.id)
			.then(data => {
				this.setState({ 
					deviceConfigs: data,
					loading: 0
				});
			})
			.catch(error => {
				console.log(error) ;
				this.setState({ loading: 2 })
			});
    }

    render() {
        return (
            <Card className="">
                <CardBody>
                    <h4>{this.device.name}</h4>
                    <Row>
                        <Col lg="7">
                            Status: <span style={{"fontWeight": "bold"}}>{this.device.state ? "ON" : "OFF"}</span>
                        </Col>
                        <Col lg="5">
                            <h6 style={{textAlign:"right"}}>{this.device.type.name}</h6>
                        </Col>
                    </Row>    
                    {this.state.deviceConfigs.map((config, index)=> (
                        <div key={index} className="px-3 py-2">
                            <Row>
                                <Col>
                                    <h5>
                                        {timestampToHour(config.timeBegin)} {" to "}
                                        {timestampToHour(config.timeEnd)} {config.device.type.name != "Eletronic" ? " with " + config.value : null}
                                    </h5>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </CardBody>
            </Card>
        );
    }
}

export default DeviceConfigs;
