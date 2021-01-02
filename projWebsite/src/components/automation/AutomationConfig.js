import React from "react";
import { Row, Col } from "shards-react";

import { timestampToHour } from "../../utils/date";

import DeviceConfigService from "../../services/DeviceConfigService";


class AutomationConfig extends React.Component {

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
            <div>
                {this.state.deviceConfigs.map((config, index)=> (
                    <div key={index} className="px-3 py-2">
                        <Row>
                            <Col>
                                <h5>
                                    {timestampToHour(config.timeBegin)} {" to "}
                                    {timestampToHour(config.timeEnd)} {" with "} {config.value}
                                </h5>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
        );
    }
}

export default AutomationConfig;
