import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox, Slider, Row, Col } from "shards-react";
import PageTitle from "../common/PageTitle";
import TypeSlider from ".";
/*
    Configure Division

    @param : name (division name), configurations (array with types and values), 
             permission (boolean)


    Used in the Automation view
*/


class ConfigDivision extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {

        
        return (
            /*
                Don't know why but width 1000 works 
            */
            <Card style={{ width: 1000 }}>
                <CardHeader>
                    <PageTitle title={this.props.name} subtitle={this.props.division} className="text-sm-left" sm="4" />
                </CardHeader>
                <CardBody>
                    <div className="px-3">

                        {this.props.configurations.map((division, idx_div) => (
                            <Row>
                                <TypeSlider type={division.type} 
                                min_value={division.min_value}  
                                max_value={division.max_value} />
                            </Row>
                        ))}
                        <h6>{this.props.type}</h6>
                        {type_conf}
                    </div>
                </CardBody>
            </Card>
        );
    }



}


export default ConfigDivision;