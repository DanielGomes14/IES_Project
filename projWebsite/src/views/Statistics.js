
import React from "react";
import PropTypes from "prop-types";

import {
    Container, Row, Col, Card, CardBody
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Graph from "../components/statistics/Graph";
import DivisionGraph from "../components/statistics/DivisionGraph";
import HouseStatistics from "../components/statistics/HouseStatistics";
import SensorVis from "../components/statistics/SensorVis";
import ReactVisCharts from "../components/statistics/ReactVisCharts";
import { DynamicCrosshair, ScatterPlotOnNearestXY, LineChartMouseOverSeries, LineChartMouseOverXY, LinkedCharts, Example} from "../components/statistics/DynamicCrosshair";
import { MarkSeries, LineSeries, VerticalBarSeries } from "react-vis";
import ReactVisPieChart from "../components/statistics/ReactVisPieChart";
/*
    Users Overview @param: title,charData
    
    Chardata = {
        labels : []     // seems to be the number of days 
        datasets: [{
            label : "Name"                              // ex: current month   
            fill : "start"                              // dont know
            data : []                                   // array with the data (must be equal to the number of labels)
            backgroundColor: "rgba(0,123,255,0.1)",     // make things pretty
            borderColor: "rgba(0,123,255,1)",
            pointBackgroundColor: "#ffffff",
            pointHoverBackgroundColor: "rgb(0,123,255)",
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3
        },
        more data
    ]
    }
*/ 



const statistics = () => (

    <Container fluid className="main-content-container px-4 mb-3">
        <Row noGutters className="page-header px-3 py-4 ">
            <PageTitle title="Statistics" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>
        {/* <Row className="px-3">
            <Col lg="12" md="12" sm="12" className="mb-4">
                <Graph />
            </Col>
        </Row>
        <Row className="px-3">
            <Col lg="6" md="12" sm="12" >
                <DivisionGraph />    
            </Col>
        </Row>  */}
        <Row className="px-3 py-4">
            <Col lg="4" md="6" sm="12" >
                <ReactVisPieChart />    
            </Col>
            <Col>
            
                <HouseStatistics />  
     
            </Col>
        </Row> 
        <Row className="px-3">
            <Col lg="12" md="12" sm="12">
                <SensorVis /> 
            </Col>
        </Row> 
    </Container>
);

export default statistics;