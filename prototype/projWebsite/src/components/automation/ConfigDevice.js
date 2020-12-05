import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox, Slider, Row,Col } from "shards-react";
import PageTitle from "../common/PageTitle";
/*
    Configure Default

    @param : start (time), end(time), value (0 means off) 
    Used in the Automation view
*/


class ConfigDevice extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {

        
        return (
            /*
                Don't know why but width 1000 works 
            */
                    <div className="px-3 py-2">
                        <Row>
                            <Col>
                                <h5>{this.props.start} to {this.props.end}  with {this.props.value}</h5>
                            </Col>
                        </Row>
                    </div>
        );
    }



}


export default ConfigDevice;