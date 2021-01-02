import React from "react";
import { Slider } from "shards-react";

/*
    Type Slider

    @param: type (temperature,...) , minValue , maxValue

    Used in ConfigDivision
*/
class TypeSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltip: false,
            value: [props.minValue, props.maxValue]
        }
        if (props.type == "Temperature") {
            this.theme = "danger";
            this.range = { min: 15, max: 35 };
        } else if (props.type == "Humidity") {
            this.theme = "info"
            this.range = { min: 40, max: 60 }
        } else if (props.type == "Humidity") {
            this.theme = "warning"
            this.range = { min: 20, max: 80 }
        } else {
            throw new Error('Invalid props');
        }
        this.handleSlide = this.handleSlide.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSlide(event) {
        this.setState({
          value: [parseFloat(event[0]), parseFloat(event[1])],
          tooltip: true
        });
      }

    handleSubmit(event) {
        event.prevaultDefault();
    }
    
    render() {
        return (
            <form noValidate style={{'width':"100%"}} onSubmit={this.handleSubmit}>
                <Slider
                    start={[this.state.value[0], this.state.value[1]]}
                    pips={{
                        mode: "positions",
                        values: [0, 25, 50, 75, 100],
                        stepped: true,
                        density: 5
                    }}
                    range={this.range}
                    step={1}
                    margin={5}
                    theme={this.theme}
                    animate={true}
                    connect
                    tooltips={this.state.tooltip}
                    onSlide={this.handleSlide}
                    onEnd={e => this.setState({tooltip: false})}
                />
            </form>
        )
    }
}

export default TypeSlider;