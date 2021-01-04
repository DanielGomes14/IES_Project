import React from "react";
import { Card, CardBody, Button, Slider } from "shards-react";


import DivisionConfigService from "../../services/DivisionConfigService";

/*
    Type Slider

    @param: type (temperature,...) , minValue , maxValue

    Used in ConfigDivision
*/





class FormDivisionConfig extends React.Component {

    constructor(props) {
        super(props);

        if (props.config.type.name == "Temperature") {
            this.theme = "danger";
            this.range = [15, 35];
        } else if (props.config.type.name == "Humidity") {
            this.theme = "info"
            this.range = [40, 60];
        } else if (props.config.type.name == "Luminosity") {
            this.theme = "warning"
            this.range = [20, 80];
        } else {
            throw new Error('Unexpected props');
        }

        if (props.config) {
            // Form state for existent configuration
            this.division = props.config.division;
            this.type = props.config.type;
            this.state = {
                apply: false,
                tooltip: false,
                value: [this.props.config.minValue, this.props.config.maxValue]
            }
        } else if (props.division && props.type) {
            // Form state for new configuration
            this.division = props.division;
            this.type = props.type;
            this.state = {
                apply: true,
                tooltip: false,
                value: this.range
            }
        } else {
            throw new Error('Unexpected props');
        }
        
        this.handleSlide = this.handleSlide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSlide(event) {
        this.setState({
          value: [parseFloat(event[0]), parseFloat(event[1])],
          tooltip: true,
          apply: true
        });
      }

    handleSubmit(event) {
        if (this.props.config)
            DivisionConfigService.updateConfiguration(
                this.props.config.id, this.props.config.type.id, this.division.id, this.state.value[0], this.state.value[1]
            ).then(() => window.location.reload());
        else
            DivisionConfigService.addConfiguration(
                this.division.id, this.state.type, this.state.value[0], this.state.value[1]
            ).then(() => window.location.reload());
        event.preventDefault();
    }
    
    render() {
        return (
            <Card className="">
                <CardBody>
                    <h3>{this.type.name}</h3>
                    <form noValidate style={{'width':"100%"}} onSubmit={this.handleSubmit}>
                        <Slider
                            start={[this.state.value[0], this.state.value[1]]}
                            pips={{
                                mode: "positions",
                                values: [0, 25, 50, 75, 100],
                                stepped: true,
                                density: 5
                            }}
                            range={{ min: this.range[0], max: this.range[1] }}
                            step={1}
                            margin={5}
                            theme={this.theme}
                            animate={true}
                            connect
                            tooltips={this.state.tooltip}
                            onSlide={this.handleSlide}
                            onEnd={e => this.setState({tooltip: false})}
                        />
                        {this.state.apply ? (
                            <div>
                                <div className="my-5"></div>
                                <Button type="submit" className="float-right">Apply Changes</Button>
                                <div className="clearfix"></div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </form>
                </CardBody>
            </Card>
        )
    }
}

export default FormDivisionConfig;