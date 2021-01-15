import React from "react";
import { Card, CardBody, Button, Slider, FormSelect, Row, Col } from "shards-react";

import DivisionConfigService from "../../services/DivisionConfigService";



class FormDivisionConfig extends React.Component {

    constructor(props) {
        super(props);

        
        if (props.config) {
            // Form state for existent configuration
            this.division = props.config.division;
            var theme;
            var range;
            [theme, range] = this.getThemeNRange(props.config.type.name)
            this.state = {
                theme: theme,
                range: range,
                type: props.config.type,
                apply: false,
                tooltip: false,
                value: [this.props.config.minValue, this.props.config.maxValue],
            };
        } else if (props.division && props.types) {
            // Form state for new configuration
            this.division = props.division;
            var theme;
            var range;
            [theme, range] = this.getThemeNRange(props.types[0].name)
            this.state = {
                theme: theme,
                range: range,
                type: props.types[0],
                apply: true,
                tooltip: false,
                value: range,
            };
        } else {
            throw new Error('Unexpected props');
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSlide = this.handleSlide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteConfig = this.deleteConfig.bind(this);
    }

    getThemeNRange(typeName) {
        if (typeName == "Temperature") {
            return ["danger", [15, 35]]
        } else if (typeName == "Humidity") {
            return ["info", [40, 60]]
        } else if (typeName == "Luminosity") {
            return ["warning", [20, 80]]
        } else {
            throw new Error('Unexpected props');
        }
    }

    handleSelect(event) {
        let theme;
        let range;
        let type = this.props.types.find(item => item.id == event.target.value);
        [theme, range] = this.getThemeNRange(type.name);
        this.setState({
            theme: theme,
            range: range,
            value: range,
            type: type,
        })
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
                this.props.config.id, this.division.id, this.state.type.name, this.state.value[0], this.state.value[1]
            ).then(() => window.location.reload());
        else
            DivisionConfigService.addConfiguration(
                this.division.id, this.state.type.name, this.state.value[0], this.state.value[1]
            ).then(() => window.location.reload());
        event.preventDefault();
    }
    
    deleteConfig(){
        console.log()
        DivisionConfigService.deleteConfiguration(this.props.config.id).then(() => window.location.reload());
    }


    render() {
        if (!this.state.range || !this.state.value)
            return null;
        console.log(this.props.config);
        return (
            <Card className="">
                {!this.props.config ? (
                    <FormSelect name="type" value={this.state.type.id} onChange={this.handleSelect}>
                        {this.props.types.map((type, index) => 
                            <option key={index} value={type.id}>{type.name}</option>
                        )}
                    </FormSelect>
                ) : null}
                <CardBody>
                    {(this.state.type.error !== undefined) ?
                        <span className="text-danger">{this.state.type.error}</span>
                    : (
                        <div>
                            <h3>{this.state.type.name}</h3>
                            <form noValidate style={{'width':"100%"}} onSubmit={this.handleSubmit}>
                                <Slider
                                    start={[this.state.value[0], this.state.value[1]]}
                                    pips={{
                                        mode: "positions",
                                        values: [0, 25, 50, 75, 100],
                                        stepped: true,
                                        density: 5
                                    }}
                                    range={{ min: this.state.range[0], max: this.state.range[1] }}
                                    step={1}
                                    margin={5}
                                    theme={this.state.theme}
                                    animate={true}
                                    connect
                                    tooltips={this.state.tooltip}
                                    onSlide={this.handleSlide}
                                    onEnd={e => this.setState({tooltip: false})}
                                />
                                <Row>
                                    {this.props.config? (
                                    <Col lg="6" className="my-2">
                                        <Button onClick={ this.deleteConfig } className="btn btn-danger ">DELETE</Button>
                                    </Col>
                                    ) : null}
                                    <Col lg="6">
                                        {this.state.apply ? (
                                            <div>
                                                <div className="my-2"></div>
                                                <Button type="submit" className="float-right">Apply Changes</Button>
                                                <div className="clearfix"></div>
                                            </div>
                                        ) : null}
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    )}
                </CardBody>
            </Card>
        )
    }
}

export default FormDivisionConfig;