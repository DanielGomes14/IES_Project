import React from "react";
import { Button, Row, Col } from "shards-react";

import DivisionConfig from "./DivisionConfig";
import FormDivisionConfig from "./FormDivisionConfig";
import DeviceConfigs from "./DeviceConfigs";
import EditDeviceConfigs from "./EditDeviceConfigs";

import DivisionConfigService from "../../services/DivisionConfigService";
import DeviceService from "../../services/DeviceService";
import SensorService from "../../services/SensorService";

import {pageLoading, pageError} from "../../components/common/Loading";


class AutomationTab extends React.Component {

    constructor(props) {
        super(props);
        this.division = props.division;
        this.state = {
            edit: false,
            addConfig: false,
            loading: 0,
            divisionConfigs: [],
            devices: [],
            sensors: [],
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleAddConfig = this.toggleAddConfig.bind(this);
        this.setDefault = this.setDefault.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: 1 });
        
        DivisionConfigService.getConfigurations(this.division.id)
			.then((data) => {
				this.setState({ 
					divisionConfigs: data,
				});
			})
			.catch((error) => {
				console.log(error);
                this.setState({ loading: 2 });
                return
            })
            .then(() => DeviceService.getDevices(this.division.id)
                .then(data => {
                    this.setState({ 
                        devices: data,
                    });
                })
                .catch(error => {
                    console.log(error) ;
                    this.setState({ loading: 2 })
                    return;
                })
                .then(() => SensorService.getSensors(this.division.id)
                    .then(data => {
                        this.setState({ 
                            sensors: data,
                            loading: 0
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.setState({ loading: 2 });
                        return;
                    })
                )
            );
    }

    remainingTypeOptions() {
        let remaining = [
            {id: 1, name: "Temperature"},
            {id: 2, name: "Humidity"},
            {id: 3, name: "Luminosity"},
        ]
        // remove options which have already division configuration
        this.state.divisionConfigs.forEach((opt) => {
            for (var i = 0; i < remaining.length; i++) {
                if (remaining[i].id === opt.type.id) {
                    remaining.splice(i, 1);
                    break;
                }
            }
        })
        for (var i = 0; i < remaining.length; i++) {
            // remove options when there's no such device
            let exists = this.state.devices.some((opt) => {
                if (remaining[i].id === opt.type.id)
                    return true;
                return false;
            })
            // remove options when there's no such sensor
    
            exists &= this.state.sensors.some((opt) => {
                if (remaining[i].id === opt.type.id)
                    return true;
                return false;
            })
            if (!exists)
                remaining[i].error = "Cannot add a division configuration "
                    + "when there's no device nor sensor of type " + remaining[i].name;
        }
        return remaining;
    }
    
    toggleEdit() {
        if (this.state.edit)
            window.location.reload();
        this.setState({ edit: !this.state.edit });
    }

    toggleAddConfig() {
        this.setState({addConfig: !this.state.addConfig});
    }
    
    setDefault(){
        DivisionConfigService.addDefaultConfigurations(this.division.id)
			.then((data) => {
                console.log(data)
				//window.location.reload();
			})
			.catch((error) => {
				console.log(error);
                this.setState({ loading: 2 });
                return
            })
    }
    
    render() {
        switch (this.state.loading) {
            case 1:
                return pageLoading;
            case 2:
                return pageError;
        }

        return !this.state.edit ? (
            <div>
                <Button className="float-right mx-2 mb-3" onClick={this.setDefault}>Set Default</Button>
                <Button className="float-right mx-2 mb-3" onClick={this.toggleEdit}>Custom Edit</Button>
                <div className="clearfix"></div>
                <Row>
                    {this.state.divisionConfigs.map((config, index) => (
                        <Col key={index} lg="6" className="py-3">
                            <DivisionConfig sensor={this.state.sensors.find(
                                (n) => n.type.id === config.type.id ) } config={config} />
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
                {this.remainingTypeOptions().length !== 0 ? (
                    <Button className="float-left mx-2 mb-3" theme="info" onClick={this.toggleAddConfig}>
                        {this.state.addConfig ? "Cancel" : "Add Division Configuration"}
                    </Button>
                ) : null}
                
                <Button className="float-right mx-2 mb-3" theme="danger" onClick={this.toggleEdit}>Close</Button>
                <div className="clearfix"></div>
                <Row>
                    {this.state.addConfig ? (
                        <Col lg="6">
                            <FormDivisionConfig division={this.division} types={this.remainingTypeOptions()} />
                        </Col>
                    ) : null}
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