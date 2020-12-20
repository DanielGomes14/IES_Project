import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries, MarkSeries,FlexibleXYPlot} from 'react-vis';
import {GradientDefs, AreaSeries} from 'react-vis';

class ReactVisCharts extends Component {
  render() {
    const series = [
      {x: new Date('2020-12-18T21:54:00Z'), y: 8},
      {x: new Date('2020-12-18T21:55:01Z'), y: 5},
      {x: new Date('2020-12-18T21:56:02Z'), y: 4},
      {x: new Date('2020-12-18T21:57:03Z'), y: 9},
      {x: new Date('2020-12-18T21:58:05Z'), y: 1},
      {x: new Date('2020-12-18T21:59:05Z'), y: 7},
      {x: new Date('2020-12-18T22:00:06Z'), y: 6},
      {x: new Date('2020-12-18T22:01:07Z'), y: 3},
      {x: new Date('2020-12-18T22:02:08Z'), y: 2},
      {x: new Date('2020-12-18T22:03:09Z'), y: 0},
      {x: new Date('2020-12-18T22:04:00Z'), y: 8},
      {x: new Date('2020-12-18T22:05:01Z'), y: 5},
      {x: new Date('2020-12-18T22:06:02Z'), y: 4},
      {x: new Date('2020-12-18T22:07:03Z'), y: 9},
      {x: new Date('2020-12-18T22:08:05Z'), y: 1},
      {x: new Date('2020-12-18T22:09:05Z'), y: 7},
      {x: new Date('2020-12-18T22:10:06Z'), y: 6},
      {x: new Date('2020-12-18T22:11:07Z'), y: 3},
      {x: new Date('2020-12-18T22:12:08Z'), y: 2},
      {x: new Date('2020-12-18T22:13:09Z'), y: 0}
    ]

    var d = new Date('2020-12-18T21:04:09Z');
    // console.log(Date.parse('2020-12-18T21:04:09Z'))
    console.log(d.toISOString())
    const series2 = [
      {x: new Date('2020-12-18T21:44:00Z'), y: 10},
      {x: new Date('2020-12-18T21:45:01Z'), y: 7},
      {x: new Date('2020-12-18T21:46:02Z'), y: 8},
      {x: new Date('2020-12-18T21:47:03Z'), y: 5},
      {x: new Date('2020-12-18T21:48:05Z'), y: 4},
      {x: new Date('2020-12-18T21:49:05Z'), y: 9},
      {x: new Date('2020-12-18T21:50:06Z'), y: 1},
      {x: new Date('2020-12-18T21:51:07Z'), y: 7},
      {x: new Date('2020-12-18T21:52:08Z'), y: 6},
      {x: new Date('2020-12-18T21:53:09Z'), y: 3},
      {x: new Date('2020-12-18T21:54:00Z'), y: 2},
      {x: new Date('2020-12-18T21:55:01Z'), y: 0},
      {x: new Date('2020-12-18T21:56:02Z'), y: 8},
      {x: new Date('2020-12-18T21:57:03Z'), y: 5},
      {x: new Date('2020-12-18T21:58:05Z'), y: 4},
      {x: new Date('2020-12-18T21:59:05Z'), y: 9},
      {x: new Date('2020-12-18T22:00:06Z'), y: 1},
      {x: new Date('2020-12-18T22:01:07Z'), y: 7},
      {x: new Date('2020-12-18T22:02:08Z'), y: 6},
      {x: new Date('2020-12-18T22:03:09Z'), y: 3}
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

    {/* <XYPlot height={300} width={500}>
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
    </XYPlot>*/}

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
        data={series}
        opacity={0.25}
        fill="#556887"
        stroke="#556887"
        onNearestXY={(value) => {
          this.setState({ tooltipValue: value })
        }}
        curve={'curveMonotoneX'}
      />
      <AreaSeries
        data={series2}
        opacity={0.25}
        fill="#556887"
        stroke="#556887"
        onNearestXY={(value) => {
          this.setState({ tooltipValue: value })
        }}
        curve={'curveMonotoneX'}
      />
      <LineSeries data={series} curve={'curveMonotoneX'}  />
      <LineSeries data={series2} curve={'curveMonotoneX'} 
        onSeriesClick={(event)=>{
          // does something on click
          // you can access the value of the event
        }}
      />
      {/* <LineSeries data={series3} /> */}
    </XYPlot>


    {/* <XYPlot height={300} width={500} colorRange={['#c7e9c0', '#00441b']}>
      <LineSeries data={series} />
      <LineSeries data={series2} />
      <LineSeries data={series3} />
    </XYPlot>

    <XYPlot height={300} width={500} colorRange={['#c7e9c0', '#00441b']}>
      <MarkSeries data={series} />
      <MarkSeries data={series2} />
      <MarkSeries data={series3} />
    </XYPlot> */}


    {/* <div style={{display: 'flex'}}>
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
  </div> */}


      </div>



    );
  }
}

export default ReactVisCharts;