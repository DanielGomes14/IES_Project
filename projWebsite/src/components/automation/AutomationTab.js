import React from "react";
import { Button, Row, Col } from "shards-react";

import DivisionConfig from "./DivisionConfig";
import FormDivisionConfig from "./FormDivisionConfig";
import DeviceConfigs from "./DeviceConfigs";
import EditDeviceConfigs from "./EditDeviceConfigs";

import DivisionConfigService from "../../services/DivisionConfigService";
import DeviceService from "../../services/DeviceService";



function remainingTypeOptions(divisionConfigs) {
    var remaining = [
        {id: 1, name: "Temperature"},
        {id: 2, name: "Humidity"},
        {id: 3, name: "Luminosity"},
    ]
    divisionConfigs.forEach((opt) => {
        for (var i = 0; i < remaining.length; i++) {
            if (remaining[i].id == opt.type.id) {
                remaining.splice(i, 1);
                break;
            }
        }
    })
    return remaining;
}

class AutomationTab extends React.Component {

    constructor(props) {
        super(props);
        this.division = props.division;
        this.state = {
            edit: false,
            addConfig: false,
            loading1: 0,
            loading2: 0,
            divisionConfigs: [],
            devices: [],
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleAddConfig = this.toggleAddConfig.bind(this);
    }

    componentDidMount() {
        this.setState({ loading1: 1, loading2: 1 });
        
        DivisionConfigService.getConfigurations(this.division.id)
			.then(data => {
				this.setState({ 
					divisionConfigs: data,
					loading1: 0
				});
			})
			.catch(error => {
				console.log(error) ;
				this.setState({ loading1: 2 })
			});
        
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
    
    toggleEdit() {
        if (this.state.edit)
            window.location.reload();
        this.setState({ edit: !this.state.edit });
    }

    toggleAddConfig() {
        this.setState({addConfig: !this.state.addConfig});
    }
    
    render() {
        return !this.state.edit ? (
            <div>
                <Button className="float-right mx-2 mb-3">Set Default</Button>
                <Button className="float-right mx-2 mb-3">Set Economics</Button>
                <Button className="float-right mx-2 mb-3" onClick={this.toggleEdit}>Custom Edit</Button>
                <div className="clearfix"></div>
                <Row>
                    {this.state.divisionConfigs.map((config, index) => (
                        <Col key={index} lg="6">
                            
                            <DivisionConfig config={config} />

                        </Col>
                    ))}
                </Row>
                <Row>
                    {this.state.devices.map((device, index) => (
                        <Col key={index} lg="4" className="py-3">
                            
                            <DeviceConfigs device={device} />

                        </Col>
                    ))}
                </Row>
            </div>
        ) : (
            <div>
                {remainingTypeOptions(this.state.divisionConfigs).length != 0 ? (
                    <Button className="float-left mx-2 mb-3" theme="info" onClick={this.toggleAddConfig}>
                        {this.state.addConfig ? "Cancel" : "Add Division Configuration"}
                    </Button>
                ) : null}
                
                <Button className="float-right mx-2 mb-3" theme="danger" onClick={this.toggleEdit}>Close</Button>
                <div className="clearfix"></div>
                {this.state.addConfig ? (
                    <Row>
                        <Col lg="6">
                            
                            <FormDivisionConfig division={this.division} types={remainingTypeOptions(this.state.divisionConfigs)} />

                        </Col>
                    </Row>
                ) : null}
                <Row>
                    {this.state.divisionConfigs.map((config, index) => (
                        <Col key={index} lg="6">
                            
                            <FormDivisionConfig config={config} />

                        </Col>
                    ))}
                </Row>
                <Row>
                    {this.state.devices.map((device, index) => (
                        <Col key={index} lg="12" className="py-3">
                            
                            <EditDeviceConfigs device={device} />

                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default AutomationTab;