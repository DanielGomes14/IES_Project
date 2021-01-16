import React, { useState } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import "react-widgets/dist/css/react-widgets.css";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    AreaSeries,
    FlexibleWidthXYPlot,
    FlexibleXYPlot,
    DiscreteColorLegend
} from 'react-vis';
import SensorDataService from '../../services/SensorDataService';
import DivisionService from '../../services/DivisionService';
import { Card,CardBody,FormSelect,CardHeader, Form, Col, Row,Button } from 'shards-react';


import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import dateFnsLocalizer from 'react-widgets-date-fns';
import Multiselect from 'react-widgets/lib/Multiselect'

export default class SensorVis extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: 1,
            asyncreq: true,
            divisions : [],
            division_id: null,
            temperature: [],
            humidity: [],
            luminosity: [],
            selectedDate: new Date(Date.now() - 7*24*3600*1000),
            selectedEndDate: new Date(),
            types: ["Temperature","Humidity","Luminosity"],
            selectedtypes: ["Temperature","Humidity","Luminosity"],
            series : { "Humidity" : "#5bc0de", "Temperature": "#d9534f", "Luminosity": "#f0ad4e"}
        };
        
        this.loadDivisions = this.loadDivisions.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleTypeFilter = this.handleTypeFilter.bind(this);

    }
    
    handleEndDateChange(event){
        console.log(event)
        console.log(this.state.selectedEndDate)
        this.setState({
            selectedEndDate: event
        });
    }

    handleDateChange(event) {
        console.log(event)
        console.log(this.state.selectedDate)
        this.setState({
            selectedDate: event
        });
    };

    handleColor(time) {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };
    

    handleChange(event) {
		const {name, value} = event.target;
		this.setState({
            [name]: value,
            loading: 1
		});
	}
    
    handleTypeFilter(event){
        let newState = this.state
        newState.selectedtypes=event
        this.setState({ ...this.state, ...newState });
        console.log("STATE")
        console.log(this.state.selectedtypes)
    }


    componentDidMount() {  
        this.loadDivisions();
        this.loadData();
        this.interval = setInterval(this.loadData, 5000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval)  
    }

    async loadData() {
        if(this.state.division_id != null){
            console.log(this.state.division_id)
            try {
                SensorDataService.getSensorData(
                    this.state.division_id,
                    this.state.selectedDate,
                    this.state.selectedEndDate,
                    this.state.selectedtypes
                    )
                    .then(data => {
                        if (data.length != 0) {
                            this.setState({loading: 0 });
                            this.processData(data);
                        } else {
                            this.setState({loading: 2 });
                        }
                    })
                    .catch(error => {
                        console.log(error) 
                        this.setState({loading: 3 });
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }
    
    loadDivisions(){
        try {
            DivisionService.getDivisions()
                .then(data => {
                    const tmp_arr = [];
                    data.map((div) => {
                        tmp_arr.push(div)
                    });
                    if (tmp_arr.length != 0) {
                        this.setState({ divisions : tmp_arr});
                        this.setState({division_id : tmp_arr[0].id});
                    } else {
                        console.log("No Divisions!");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    }

    processData(data){
        if (data != null ) {
            var dataSeries = {
                temperature: [],
                humidity: [],
                luminosity: []
            };
            data.map(d => {
                if (d.sensor.type.name ==  "Temperature" && this.state.types.includes("Temperature")){
                    dataSeries.temperature.push({x: new Date(d.timestampDate), y: d.data})
                } else if (d.sensor.type.name == "Humidity" && this.state.types.includes("Humidity")) {
                    dataSeries.humidity.push({x: new Date(d.timestampDate), y: d.data})
                } else if (d.sensor.type.name == "Luminosity" && this.state.types.includes("Luminosity")) {
                    dataSeries.luminosity.push({x: new Date(d.timestampDate), y: d.data})
                }
            });
            this.setState({temperature: dataSeries.temperature});
            this.setState({humidity: dataSeries.humidity});
            this.setState({luminosity: dataSeries.luminosity});
        } else {
            console.log("NOT FOUND")
        }
    }

    
    
    render() {
        new dateFnsLocalizer();
        const plot = (
            <div>
            <FlexibleWidthXYPlot height={600} xType="time">
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis tickFormat={function tickFormat(d){
                        const date = new Date(d)
                        return date.toISOString().substr(11, 8)
                    }}
                    tickLabelAngle={-45}
                    // tickFormat={(d) => Date.parse(d, { rawFormat: 'MMM' })}
                    // tickLabelAngle={-45}
                    // // xDomain={[new Date(data[0].x), new Date(data[data.length - 1].x)]}
                    // // xRange={[0, 9]}
                    // tickValues={[0, 100000]}
                />
                <YAxis title="Y Axis" />
                <AreaSeries
                    data={this.state.temperature}
                    opacity={0.25}
                    fill="#d9534f"
                    stroke="#d9534f"
                    curve={'curveMonotoneX'}
                />
                <AreaSeries
                    data={this.state.humidity}
                    opacity={0.25}
                    fill="#5bc0de"
                    stroke="#5bc0de"
                    curve={'curveMonotoneX'}
                />
                <AreaSeries
                    data={this.state.luminosity}
                    opacity={0.25}
                    fill="#f0ad4e"
                    stroke="#f0ad4e"
                    curve={'curveMonotoneX'}
                />
                <LineSeries animation="wobbly" data={this.state.temperature} curve={'curveMonotoneX'} color={"#d9534f"} />
                <LineSeries animation="wobbly" data={this.state.humidity} curve={'curveMonotoneX'} color={"#5bc0de"}
                    onSeriesClick={(event)=>{
                        console.log("Ola Chico!")
                        // does something on click
                        // you can access the value of the event
                    }}
                />
                <LineSeries animation="wobbly" data={this.state.luminosity} curve={'curveMonotoneX'} color={"#f0ad4e"} />
            </FlexibleWidthXYPlot>
            <DiscreteColorLegend
                // onItemClick={this.clickHandler}
                orientation="vertical"

                // width={180}
                items={Object.keys(this.state.series).map((key,index) => {
                // console.log(series.props.colour+"");
                    return {title: key, color: this.state.series[key]}
                })
                }
            />
        </div>
            
        )
        return (
            <Card>
                <CardHeader className="border-bottom">
                    <h6 className="m-0"> Division Statistics - Sensor Data</h6>
                </CardHeader>
                <Row className="px-3 py-4">
                {this.state.division_id ? (
                    <Col>
                    <h6 className="m-0">Division</h6>
                    <FormSelect name="division_id" value={this.state.division_id} onChange={this.handleChange}>
                    {this.state.divisions.map((div, index) => 
                        <option key={index} value={div.id}>{div.name}</option>
                    )}                    
                </FormSelect>
                </Col>
                ) : null}
                <Col>
                <h6 className="m-0">Starting Date</h6>

                <DateTimePicker
                    value= {this.state.selectedDate}
                    onChange= {this.handleDateChange}
                />
                </Col>
                <Col>
                <h6 className="m-0">Ending Date</h6>

                <DateTimePicker  
                    value= {this.state.selectedEndDate}
                    onChange= {this.handleEndDateChange}
                />
                </Col>
                <Col lg="4">
                <h6 className="m-0">Sensor Types</h6>
                {
                    <Multiselect
                            data={this.state.types}
                            value={this.state.selectedtypes}
                            defaultValue={this.state.types}
                            onChange={this.handleTypeFilter}
                            />
                }
                </Col>
                </Row>

                <CardBody>
                    {(() => {
                        switch(this.state.loading) {
                            case 0 :
                                return plot;
                            case 1 :
                                return "No Content available. Might take a while..";
                            case 2 :
                                return "Something went wrong..";
                        }
                    })()}
                </CardBody>
            </Card>
        );
    }
}

/*
  <DatePicker
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={20}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    selected={this.state.selectedDate}
                    onChange={this.handleDateChange}
                />
                
*/