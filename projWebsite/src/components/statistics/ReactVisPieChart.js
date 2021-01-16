import '../../../node_modules/react-vis/dist/style.css';
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
Row,
Col,
FormSelect,
Card,
CardHeader,
CardBody,
CardFooter
} from "shards-react";
import Chart from "./../../utils/chart";
import DeviceLogService from "../../services/DeviceLogService";


export default class ReactVisPieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: 1,
            chartData : [],
            divisions: [],
        }
        this.canvasRef = React.createRef();
        this.handleLogs.bind(this);
    }
    
    componentDidMount() {
        DeviceLogService.getDeviceLogs()
        .then(data => {
            this.setState({
                loading: 0,
            });
            this.handleLogs(data)
        }).catch(error => {
            console.log(error);
            this.setState({ loading: 2 })
        });
    }
    
	handleLogs(data) {
        let division_data = {};
        let total = 0;

		data.forEach(e => {
            var isNotPresent = division_data[e.device.division.name] === undefined
            if (isNotPresent) {
                division_data[e.device.division.name] = 1;
            } else {
                division_data[e.device.division.name]++;
            }
        });

        let chart_data = [];
        let divisions = [];

        for (const [key, value] of Object.entries(division_data)) {
            chart_data.push(value);
            divisions.push(key);
        }

        this.setState({
            chart_data: chart_data,
            divisions: divisions,
        })

        this.props.chartData.labels = divisions;
        this.props.chartData.datasets[0].data = chart_data;
                
        console.log(this.props.chartData);

        const chartConfig = {
            type: "pie",
            data: this.props.chartData,
            options: {
                ...{
                    legend: {
                    position: "bottom",
                    labels: {
                    padding: 25,
                    boxWidth: 20
                    }
                },
                cutoutPercentage: 0,
                tooltips: {
                    custom: false,
                    mode: "index",
                    position: "nearest"
                }
                },
                ...this.props.chartOptions
            }
        };

        new Chart(this.canvasRef.current, chartConfig);
    }

    render() {
        var content = "";
		switch (this.state.loading) {
			case 0:
                content = (
                    <Card small className="h-100">
                        <CardHeader className="border-bottom">
                        <h6 className="m-0">{this.props.title}</h6>
                        </CardHeader>
                        <CardBody className="d-flex py-0">
                        <canvas
                            height="220"
                            ref={this.canvasRef}
                            className="blog-users-by-device m-auto"
                        />
                        </CardBody>
                        <CardFooter className="border-top">
                        <Row>
                        </Row>
                        </CardFooter>
                    </Card>
                )
				break;
			case 1:
				content = "Loading...";
				break;
			case 2:
				content = "Something went wrong...";
				break;
		}
		return (
            content
		)
    }
}
    
ReactVisPieChart.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart config object.
     */
    chartConfig: PropTypes.object,
    /**
     * The Chart.js options.
     */
    chartOptions: PropTypes.object,
    /**
     * The chart data.
     */
    chartData: PropTypes.object
};
    
ReactVisPieChart.defaultProps = {
    title: "Device Activity (%)",
    chartData: {
    datasets: [
        {
        hoverBorderColor: "#0f706b",
        data: [],
        backgroundColor: [
            "#87f186", "#00dfb8", "#00c6eb", "#00a6ff", "#007bff", "#d36be7", "#ff6bb3", "#ff917e", "#ffc65f", "#f9f871",
        ]
    }
        
    ],
    labels: []
    }
};