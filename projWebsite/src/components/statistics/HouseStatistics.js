
import React from 'react';
import { Card,CardBody,FormSelect,CardHeader, Form, Col, Row,Button } from 'shards-react';
import Chart from "./../../utils/chart";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";
import DivisionService from '../../services/DivisionService';
import SensorService from '../../services/SensorService';

export default class HouseStatistics extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
            loading: 1,
            asyncreq: true,
            series : { "Humidity" : "#5bc0de", "Temperature": "#d9534f", "Luminosity": "#f0ad4e"},
            avg_tmp: NaN,
            avg_hum: NaN,
            avg_lum: NaN,
        };
        
        this.divisions = [];
        this.temperature = [];
        this.humidity = [];
        this.luminosity = [];

        this.loadDivisions = this.loadDivisions.bind(this);
    }


    loadDivisions(){
        this.divisions = [];
        this.temperature = [];
        this.humidity = [];
        this.luminosity = [];
        try {
            DivisionService.getDivisions()
                .then(data => {
                    const tmp_arr = [];
                    data.map((div) => {
                        tmp_arr.push(div)
                    });
                    if (tmp_arr.length != 0) {
                        this.setState({ divisions : tmp_arr});
                    } else {
                        this.setState({ loading : 2});
                    }
                }).then( () => {
                    
                    for(let i =0; i < this.state.divisions.length;i ++){
                        let div_id = this.state.divisions[i].id

                        SensorService.getSensors(div_id)
                            .then(data => {
                                data.forEach(
                                    sensor => {
                                        SensorService.getSensorData(sensor.id)
                                            .then(data => {
                                                if (data && data.length > 0){
                                                    if (sensor.type.name == "Temperature") {
                                                        this.temperature.push(data[0].data);
                                                    }
                                                    else if ( sensor.type.name == "Humidity" ) {
                                                        this.humidity.push(data[0].data);
                                                    }
                                                    else if ( sensor.type.name == "Luminosity") {
                                                        this.luminosity.push(data[0].data);
                                                    }
                                                    this.calcAverage();
                                                }
                                            })
                                            .catch(error => {
                                                this.setState({ loading : 3});
                                                console.log(error) ;
                                            });
                                    }
                                )
                            })
                            .catch(error => {
                                this.setState({ loading : 3});
                                console.log(error) ;
                            });
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ loading : 3});
                });
                
                

        } catch (e) {
            console.log(e);
        }
    }


    calcAverage(){
        let sum = 0;
        for(let i =0; i < this.temperature.length;i ++){
            sum += parseFloat( this.temperature[i], 10 );
        }
        let avg = sum/this.temperature.length
        this.setState({
            avg_tmp: avg
        })

        sum=0;
        for(let i =0; i < this.humidity.length;i ++){
            sum += parseFloat( this.humidity, 10 );
        }
        avg = sum/this.humidity.length
        this.setState({
            avg_hum: avg
        })
        sum=0;
        for(let i =0; i < this.luminosity.length;i ++){
            sum += parseFloat( this.luminosity, 10 );
        }
        avg = sum/this.luminosity.length
        this.setState({
            avg_lum: avg
        })
    }

    componentDidMount(){
        this.loadDivisions();
    }


    render() {

        const { variation, label, value, percentage, increase, smallStats} = this.props;

        const cardClasses = classNames(
          "stats-small",
          variation && `stats-small--${variation}`
        );
    
        const cardBodyClasses = classNames(
          variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
        );
    
        const innerWrapperClasses = classNames(
          "d-flex",
          variation === "1" ? "flex-column m-auto" : "px-3"
        );
    
        const dataFieldClasses = classNames(
          "stats-small__data",
          variation === "1" && "text-center"
        );
    
        const labelClasses = classNames(
          "stats-small__label",
          "text-uppercase",
          variation !== "1" && "mb-1"
        );
    
        const valueClasses = classNames(
          "stats-small__value",
          "count",
          variation === "1" ? "my-3" : "m-0"
        );
    
        const innerDataFieldClasses = classNames(
          "stats-small__data",
          variation !== "1" && "text-right align-items-center"
        );
    
        const percentageClasses = classNames(
          "stats-small__percentage",
          `stats-small__percentage--${increase ? "increase" : "decrease"}`
        );
    
        return (
            <Row>
                <Col className="py-4" lg="12" md="12" sm="12" style={{textAlign: "center"}}>
                    <h4 className="m-0">Average House Values</h4>
                </Col>
                <Col lg="4" md="4" sm="4">
                    <Card small className={cardClasses} >
                        <CardBody className={cardBodyClasses}>
                            <div className={innerWrapperClasses}>
                                <div className={dataFieldClasses}>
                                    <span className={labelClasses}>Temperature</span>
                                    <h6 className={valueClasses}  style={{ color: this.state.series["Temperature"]  }}>
                                        {this.state.avg_tmp ? this.state.avg_tmp + " °C" : "?"}
                                        </h6>
                                </div>
                            </div>
                        </CardBody>
                    </Card> 
                </Col>
                <Col lg="4" md="4" sm="4">
                    <Card small className={cardClasses} >
                        <CardBody className={cardBodyClasses}>
                            <div className={innerWrapperClasses}>
                                <div className={dataFieldClasses}>
                                <span className={labelClasses} >Humidity</span>
                                <h6 className={valueClasses} style={{ color: this.state.series["Humidity"]  }}>
                                    {this.state.avg_hum ? this.state.avg_hum + " %" : "?"}
                                    </h6>
                                </div>
                            </div>
                        </CardBody>
                    </Card>                
                </Col>
                <Col lg="4" md="4" sm="4">
                    <Card small className={cardClasses} >
                        <CardBody className={cardBodyClasses}>
                            <div className={innerWrapperClasses}>
                                <div className={dataFieldClasses}>
                                <span className={labelClasses}>Luminosity</span>
                                <h6 className={valueClasses} style={{ color: this.state.series["Luminosity"]  }}>
                                    {this.state.avg_lum ? this.state.avg_lum + " %" : "?"}
                                    </h6>
                                </div>
                            </div>
                        </CardBody>
                    </Card>                
                </Col>
            </Row>
        )
    }
}

HouseStatistics.propTypes = {
    /**
     * The Small Stats variation.
     */
    variation: PropTypes.string,
    /**
     * The label.
     */
    label: PropTypes.string,
    /**
     * The value.
     */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * The percentage number or string.
     */
    percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * Whether is a value increase, or not.
     */
    increase: PropTypes.bool,
    /**
     * The Chart.js configuration object.
     */
    chartConfig: PropTypes.object,
    /**
     * The Chart.js options object.
     */
    chartOptions: PropTypes.object,
    /**
     * The chart data.
     */
    chartData: PropTypes.array.isRequired,
    /**
     * The chart labels.
     */
    chartLabels: PropTypes.array
};

HouseStatistics.defaultProps = {
    increase: true,
    percentage: 0,
    value: 0,
    label: "Label",
    chartOptions: Object.create(null),
    chartConfig: Object.create(null),
    chartData: [],
    chartLabels: []
};
  