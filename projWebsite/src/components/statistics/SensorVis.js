import React from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    AreaSeries
} from 'react-vis';
import SensorDataService from '../../services/SensorDataService';

export default class SensorVis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            division_id: 2,
            temperature: [],
            humidity: [],
            luminosity: []
        };
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData()
        setInterval(this.loadData, 5000);
    }
    
    async loadData() {
        try {
            SensorDataService.getSensorData(this.state.division_id)
            .then(data => this.processData(data)
            )
            .catch(error => {
                console.log(error) ;
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
    }
    else{
        console.log("NOT FOUND")
    }
    }
    
    render() {
        return (
            
            <XYPlot
                xType="time"
                width={1000}
                height={500}>
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
                <VerticalGridLines />
                <HorizontalGridLines />
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
            </XYPlot>
        );
    }
}