import React from "react";
import { Card, CardBody, Button, Row, Col} from "shards-react";

import DeviceConfigService from "../../services/DeviceConfigService";
import FormDeviceConfig from "./FormDeviceConfig";


class EditDeviceConfigs extends React.Component {

    constructor(props) {
        super(props)
        this.device = props.device;
        this.state = {
            addConfig: false,
            loading: 0,
            deviceConfigs: []
        }
        this.toggleAddConfig = this.toggleAddConfig.bind(this);
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
    
    toggleAddConfig() {
        this.setState({addConfig: !this.state.addConfig});
    }

    render() {
        return (
            <Card className="">
                <CardBody>
                    <Row>
                        <Col sm="6" md="7">
                            <h3>
                                {this.device.name}
                            </h3>
                        </Col>
                        <Col sm="6" md="5">
                            <h6 style={{textAlign:"right"}}>{this.device.type.name}</h6>
                        </Col>
                    </Row>
                    {!this.state.addConfig ? (
                        <Button theme="info" onClick={this.toggleAddConfig}>Add Configuration</Button>
                    ) : (
                        <div>
                            <Button className="mb-3" theme="info" onClick={this.toggleAddConfig}>Cancel</Button>
                            <div style={{backgroundColor: "#E5E8E8", padding: "10px", borderRadius: "5px"}}>
                                <FormDeviceConfig device={this.device} />
                            </div>
                        </div>
                    )}
                    <Row>
                        {this.state.deviceConfigs.map((config, index)=> (
                            <Col key={index} sm="12" className="my-2">
                                <div style={{border: "solid 2px #E5E8E8", padding: "10px", borderRadius: "5px"}}>
                                    <FormDeviceConfig config={config} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default EditDeviceConfigs;