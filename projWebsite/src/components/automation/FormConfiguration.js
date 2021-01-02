import React from "react";
import { FormCheckbox, Button, Row, Col} from "shards-react";
import { TextField } from '@material-ui/core';
import TypeSlider from "./TypeSlider"

import DeviceConfigService from "../../services/DeviceConfigService";


class FormConfiguration extends React.Component {

    constructor(props) {
        super(props);
        if (props.config) {
            // Form state for existent configuration
            this.device = props.config.device;
            var timeBegin = new Date(props.config.timeBegin)
            var timeEnd = new Date(props.config.timeEnd)
            this.state = {
                apply: false,
                timeBegin: timeBegin.getHours() + ':' + timeBegin.getMinutes(),
                timeEnd: timeEnd.getHours() + ':' + timeEnd.getMinutes(),
                value: props.config.value
            }
        } else if (props.device) {
            // Form state for new configuration
            this.device = props.device;
            this.state = {
                apply: true,
                timeBegin: '00:00',
                timeEnd: '00:00',
                value: 0
            }
        } else {
            throw new Error('Unexpected props');
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
		const {name, value} = event.target;
		this.setState({
            apply: true,
			[name]: value
        });
	}

    handleSubmit(event) {
        if (this.props.config)
            DeviceConfigService.updateConfiguration(
                this.props.config.id, this.device.id, this.state.timeBegin, this.state.timeEnd, this.state.value
            );
        else
            DeviceConfigService.addConfiguration(
                this.device.id, this.state.timeBegin, this.state.timeEnd, this.state.value
            );
		event.preventDefault();
	}

    render() {
        let field;
        if (this.device.type.name == "Eletronic")
            field = <FormCheckbox id="value" toggle checked> Off/On </FormCheckbox>;
        else
            field = <TextField
                        type={"number"}
                        onChange={(event) => {
                            if (event.target.value < 0)
                                event.target.value = 0
                            else if (event.target.value > 100)
                                event.target.value =  100
                        }}
                    />;

        return (
            <form noValidate style={{'width':"100%"}} onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm="12" className="px-5">
                        <h5 className="text-black text-semibold">Set Value:</h5>
                    </Col>
                    <Col sm="12" className="px-5 mb-5 mt-2">
                        {field}
                    </Col>
                    <Col sm="12" className="px-5">
                        <h5 className="text-black text-semibold">Schedule:</h5>
                    </Col>
                    <Col sm="2" className="px-5 mb-4 mt-2">
                        <TextField
                            name="timeBegin"
                            value={this.state.timeBegin}
                            onChange={this.handleChange}
                            label="Start time"
                            type="time"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Col>
                    <Col sm="2" className="px-5 mb-4 mt-2" >
                        <TextField
                            name="timeEnd"
                            value={this.state.timeEnd}
                            onChange={this.handleChange}
                            label="End time"
                            type="time"
                            className=""
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </Col>
                </Row>
                {this.state.apply ? (
                    <div>
                        <Button type="submit" className="float-right">Apply Changes</Button>
                        <div className="clearfix"></div>
                    </div>
                ) : (
                    <div></div>
                )}
            </form>
        );
    }
}


export default FormConfiguration;