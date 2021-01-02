import React from "react";
import { Card, CardBody, CardHeader, FormCheckbox, Slider, Row, Col } from "shards-react";



/*
    Type Slider

    @param: type (temperature,...) , minValue , maxValue

    Used in ConfigDivision

*/
class TypeSlider extends React.Component{

    constructor(props){
        super(props);
    }


    render(){
        let min = this.props.minValue;
        let max = this.props.maxValue;
        let type_conf;
        if (this.props.type === "Temperature") {

            type_conf = <Slider
                theme="danger"
                connect
                start={[min, max]}
                pips={{
                    mode: "positions",
                    values: [0, 20, 40, 60, 80, 100],
                    stepped: true,
                    density: 5
                }}
                range={{ min: 0, max: 50 }}
            />
        } else if (this.props.type === "Humidity") {
            type_conf = <Slider
                connect
                start={[min, max]}
                pips={{
                    mode: "positions",
                    values: [0, 25, 50, 75, 100],
                    stepped: true,
                    density: 5
                }}
                range={{ min: 0, max: 100 }}
            />
        } else if (this.props.type === "Light") {
            type_conf = <Slider
                theme="warning"
                connect
                start={[min, max]}
                pips={{
                    mode: "positions",
                    values: [0, 25, 50, 75, 100],
                    stepped: true,
                    density: 5
                }}
                range={{ min: 0, max: 100 }}
            />
        }
        else {
            type_conf = <div></div>
        }

        return(
            type_conf
        );

    }

}

export default TypeSlider;