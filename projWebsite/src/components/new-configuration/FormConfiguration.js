import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox, Slider, Row, Col} from "shards-react";
import { TextField } from '@material-ui/core';
import TypeSlider from "../automation/TypeSlider"
/*
    Form for Device Configuration

    @param : name, type
    Used in the New Configuration View
*/


class FormConfiguration extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        let value;
        if (this.props.type=="Eletronic") {
            value = valueTypeEletronic();
        } else {
            value = valueTemperature(this.props.type);
        }
        
        function valueTypeEletronic() {
            return <FormCheckbox id="value" toggle checked> Off/On </FormCheckbox>;
        }
    
        function valueTemperature(value_type) {
            return <TypeSlider type={value_type} min_value="-20" max_value="50" />
        }

        return (
            <Row>
                <form noValidate style={{'width':"100%"}}>
                    <Row>

                        <Col sm="12" className="px-5">
                            <h5 className="text-black text-semibold">Set Value:</h5>
                        </Col>
                        <Col sm="12" className="px-5 mb-5 mt-2">
                            { value }
                        </Col>
                        <Col sm="12" className="px-5">
                            <h5 className="text-black text-semibold">Schedule:</h5>
                        </Col>
                        <Row>
                            <Col sm="2" className="px-5  mb-4 mt-2">
                                <TextField
                                    id="time_start"
                                    label="Start time"
                                    type="time"
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                            </Col>
                            <Col sm="2" className="px-5  mb-4 mt-2" >
                                <TextField
                                    id="time_end"
                                    label="End time"
                                    type="time"
                                    className=""
                                    defaultValue="07:30"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                            </Col>
                        </Row>
                    </Row>
                </form>
            </Row>
        );
    }
}


export default FormConfiguration;