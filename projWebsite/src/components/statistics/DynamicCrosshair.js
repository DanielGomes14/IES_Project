import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {Crosshair} from 'react-vis';

const DATA = [
    [
      {x: 1, y: 10},
      {x: 2, y: 7},
      {x: 3, y: 15}
    ],
    [
      {x: 1, y: 20},
      {x: 2, y: 5},
      {x: 3, y: 15}
    ]
  ];
  
  export default class DynamicCrosshair extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        crosshairValues: []
      };
    }
  
    render() {
      return (
        <XYPlot
          onMouseLeave={() => this.setState({crosshairValues: []})}
          width={300}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            onNearestX={(value, {index}) =>
                this.setState({crosshairValues: DATA.map(d => d[index])})}
            data={DATA[0]}/>
          <LineSeries
            data={DATA[1]}/>
          <Crosshair values={this.state.crosshairValues}/>
        </XYPlot>
      );
    }
  }