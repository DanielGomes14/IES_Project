import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries,FlexibleXYPlot} from 'react-vis';
import {GradientDefs} from 'react-vis';

class ReactVisCharts extends Component {
  render() {
    const series = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ]

    const series2 = [
      {x: 0, y: 5},
      {x: 1, y: 2},
      {x: 2, y: 8},
      {x: 3, y: 2},
      {x: 4, y: 7},
      {x: 5, y: 4},
      {x: 6, y: 1},
      {x: 7, y: 9},
      {x: 8, y: 6},
      {x: 9, y: 1}
    ]

    const series3 = [
      {x: 0, y: 7},
      {x: 1, y: 4},
      {x: 2, y: 5},
      {x: 3, y: 1},
      {x: 4, y: 2},
      {x: 5, y: 7},
      {x: 6, y: 9},
      {x: 7, y: 6},
      {x: 8, y: 4},
      {x: 9, y: 3}
    ]

    const gradient = (<GradientDefs>
      <linearGradient
          id="myGradient"
          gradientUnits="userSpaceOnUse"
          x1="0" y1="0" x2="200" y2="200">
          <stop offset="10%" stopColor="#c6e48b" />
          <stop offset="33%" stopColor="#7bc96f" />
          <stop offset="66%" stopColor="#239a3b" />
          <stop offset="90%" stopColor="#196127" />
      </linearGradient>
    </GradientDefs>);
    
    return (
      <div className="App">
   
    <XYPlot height={300} width={500}>
      <VerticalBarSeries data={series} />
    </XYPlot>
    <XYPlot height={300} width={500}>
      <LineSeries data={series} />
    </XYPlot>
    <XYPlot height={300} width={500}>
      <MarkSeries data={series} />
    </XYPlot>

    <FlexibleXYPlot colorType="literal">
      <VerticalBarSeries data={series} />
    </FlexibleXYPlot>


    <XYPlot height={300} width={500} color="red">
      <VerticalBarSeries data={series}/>
      <VerticalBarSeries data={series2}/>
    </XYPlot>
    <XYPlot height={300} width={500} stroke="red">
      <LineSeries data={series}/>
      <LineSeries data={series2}/>
    </XYPlot>
    <XYPlot height={300} width={500} >
      <MarkSeries data={series} color="red" />
      <MarkSeries data={series2} color="blue" />
    </XYPlot>

    <XYPlot height={300} width={500} colorRange={['#c7e9c0', '#00441b']}>
      <VerticalBarSeries data={series} />
      <VerticalBarSeries data={series2} />
      <VerticalBarSeries data={series3} />
    </XYPlot>
    <XYPlot height={300} width={500} colorRange={['#c7e9c0', '#00441b']}>
      <LineSeries data={series} />
      <LineSeries data={series2} />
      <LineSeries data={series3} />
    </XYPlot>
    <XYPlot height={300} width={500} colorRange={['#c7e9c0', '#00441b']}>
      <MarkSeries data={series} />
      <MarkSeries data={series2} />
      <MarkSeries data={series3} />
    </XYPlot>


    <div style={{display: 'flex'}}>
    <XYPlot height={250} width={400}>
      {gradient}
      <VerticalBarSeries data={series} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={250} width={400}>
      {gradient}
      <LineSeries data={series} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={250} width={400}>
      {gradient}
      <MarkSeries data={series} color={'url(#myGradient)'} />
    </XYPlot>
  </div>


      </div>



    );
  }
}

export default ReactVisCharts;