import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
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
import { auth,current_user,current_home } from "../../utils/auth";
import { Card,CardBody,FormSelect,CardHeader } from 'shards-react';



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
            series : { "Humidity" : "#5bc0de", "Temperature": "#d9534f", "Luminosity": "#f0ad4e"}
        };
        this.loadDivisions = this.loadDivisions.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
		const {name, value} = event.target;
		this.setState({
            [name]: value,
            loading: 1
		});
	}
    
    componentDidMount() {
        
        this.loadDivisions()
        this.loadData()
        this.interval=setInterval(this.loadData, 5000);
        
        
    }
    
    componentWillUnmount() {
        
        clearInterval(this.interval)
        
    }
    async loadData() {
        console.log(this.state)
        if(this.state.division_id != null){
            console.log(this.state.division_id)
            try {
                SensorDataService.getSensorData(this.state.division_id)
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
            DivisionService.getDivisions(current_home.current_home())
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
                if (d.sensor.type.name ==  "Temperature"){
                    dataSeries.temperature.push({x: new Date(d.timestampDate), y: d.data})
                } else if (d.sensor.type.name == "Humidity") {
                    dataSeries.humidity.push({x: new Date(d.timestampDate), y: d.data})
                } else if (d.sensor.type.name == "Luminosity") {
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
                {this.state.division_id ? (
                    <FormSelect name="division_id" value={this.state.division_id} onChange={this.handleChange}>
                    {this.state.divisions.map((div, index) => 
                        <option key={index} value={div.id}>{div.name}</option>
                    )}
                </FormSelect>
                ) : null}
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