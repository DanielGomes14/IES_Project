import React from "react";
import { Card, CardBody, Button, Row, Col} from "shards-react";
import SensorService from '../../services/SensorService';

class DivisionConfig extends React.Component {

    constructor(props) {
        super(props);
        this.config = props.config;

        if (props.config.type.name == "Temperature") {
            this.theme = "danger";
        } else if (props.config.type.name == "Humidity") {
            this.theme = "info"
        } else if (props.config.type.name == "Luminosity") {
            this.theme = "warning"
        } else {
            throw new Error('Unexpected props');
        }

        this.state = {value:'?'}
    }

    componentDidMount(){
        if(this.props.sensor){
            SensorService.getSensorData(this.props.sensor.id).then(
                res => {
                    if (res.length > 0){
                        this.setState({value: res[0].data})
                    }
                })
        }
    }

    render() {
        return (
            <Card className="">
                <CardBody>
                    <h3>{this.config.type.name}</h3>
                    <h5 className="float-left">Current Value:</h5>
                    <h5 className={"float-right text-" + this.theme}> {this.state.value} </h5>
                    <div className="clearfix"></div>
                    <h5 className="float-left">Comfort Interval:</h5>
                    <h5 className={"float-right text-" + this.theme}>{this.config.minValue} - {this.config.maxValue}</h5>
                    <div className="clearfix"></div>
                </CardBody>
            </Card>
        )
    }
}

export default DivisionConfig;