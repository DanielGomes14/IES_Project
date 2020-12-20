import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import {Crosshair, MarkSeries } from 'react-vis';
import { Button } from 'shards-react';


const DATA = [
    [
      {x: 1, y: 10},
      {x: 2, y: 7},
      {x: 3, y: 12},
      {x: 4, y: 10},
      {x: 5, y: 8},
      {x: 6, y: 18},
    ],
    [
      {x: 1, y: 20},
      {x: 2, y: 5},
      {x: 3, y: 15},
      {x: 4, y: 8},
      {x: 5, y: 17},
      {x: 6, y: 15},
    ]
  ];
  
  export class DynamicCrosshair extends React.Component {
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

  export class ScatterPlotOnNearestXY extends React.Component {
    constructor() {
      super();
      this.state = {index: null};
    }
    render() {
      const {index} = this.state;
      const data = DATA[1].map((d, i) => ({...d, color: i === index ? 1 : 0}));
      return <XYPlot
        width={300}
        height={300}
        colorDomain={[0, 1]}
        onMouseLeave={() => this.setState({index: null})}
      >
        <MarkSeries
          data={data}
          stroke="white"
          onNearestXY={(datapoint, {index}) => this.setState({index})}
        />
      </XYPlot>
    }
  }


  export class LineChartMouseOverSeries extends Component {
    constructor() {
      super();
      this.state = {index: null};
    }
    render() {
      const {index} = this.state;
      return <XYPlot 
            width={300}
            height={300}
          onMouseLeave={() => this.setState({index: null})}
        >
        {DATA.map((d, i) => (<LineSeries
          data={d} key={`${i}`} stroke={i === index ? "orange" : undefined}
        />))}
        {DATA.map((d, i) => (<LineSeries
          data={d} key={`${i}-mouseover`}
          onSeriesMouseOut={() => this.setState({index: null})}
          onSeriesMouseOver={() => this.setState({index: i})}
          strokeWidth={10} stroke={"transparent"}
        />))}
      </XYPlot>
    }
  }


  const allData = DATA.reduce((prev, curr, i) => {
    return [...prev, ...curr.map((d) => ({...d, index: i}))]
  }, []);
  
  export class LineChartMouseOverXY extends Component {
    constructor() {
      super();
      this.state = {index: null};
    }
    render() {
      const {index} = this.state;
  
      return <XYPlot
            width={300}
            height={300}
          onMouseLeave={() => this.setState({
            highlightedSeries: null,
            pointUsed: null
          })}
        >
        {DATA.map((d, i) => (<LineSeries
          data={d} key={`${i}`} stroke={i === index ? "orange" : undefined}
        />))}
        <MarkSeries
          data={allData}
          color="transparent"
          size={10}
          onNearestXY={({index}) => this.setState({index})}
        />
      </XYPlot>
    }
  }


  export class LinkedCharts extends Component {
    constructor() {
      super();
      this.state = {index: null};
      this.handleMouseOver = this.handleMouseOver.bind(this);
    }
    handleMouseOver(index) {
      this.setState({index});
    }
    render() {
      const {index} = this.state;
      return (<div style={{display: 'flex'}}>
        {DATA.map((d, i) => (<div key={i}>
          <LineChart
            data={d}
            index={index}
            handleMouseOver={this.handleMouseOver} />
          </div>))}
      </div>);
    }
  }
  
  function LineChart({data, index, handleMouseOver}) {
    return (<XYPlot
        width={300}
        height={300}
      yDomain={[0, 10]}
      onMouseLeave={() => handleMouseOver(null)}
      >
          <VerticalGridLines />
          <HorizontalGridLines />
        <LineSeries
          data={data}
          onNearestX={(datapoint, {index}) => handleMouseOver(index)} />
        {index === null ? null : <LineSeries
          data={[{x: index, y: 0}, {x: index, y: 10}]}
          opacity={0.5} />
        }
        {index === null ? null : <MarkSeries
          data={[data[index]]}
          stroke="white" />
        }
      </XYPlot>);
}






function generateData() {
  return [...new Array(10)].map(row => ({
    x: Math.random() * 5,
    y: Math.random() * 10
  }));
}

const MODE = ['noWobble', 'gentle', 'wobbly', 'stiff'];

export class Example extends React.Component {
    constructor(props) {
        super(props);
        this.series=props.series;
    }
  state = {
    data: generateData(),
    modeIndex: 0
  };

  updateModeIndex = increment => () => {
    const newIndex = this.state.modeIndex + (increment ? 1 : -1);
    const modeIndex =
      newIndex < 0 ? MODE.length - 1 : newIndex >= MODE.length ? 0 : newIndex;
    this.setState({
      modeIndex
    });
  };

  render() {
    const {modeIndex, data} = this.state;
    return (
      <div className="centered-and-flexed">
        <div className="centered-and-flexed-controls">
          <Button  theme="secondary" outline={true}
            onClick={this.updateModeIndex(false)}
          >PREV</Button>
          <div> {`ANIMATION TECHNIQUE: ${MODE[modeIndex]}`} </div>
          <Button  theme="secondary" outline={true}
            onClick={this.updateModeIndex(true)}
          >NEXT</Button>
        </div>
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <this.series animation={MODE[modeIndex]} data={data} />
        </XYPlot>
        <Button
          onClick={() => this.setState({data: generateData()})}
        >UPDATE DATA</Button>
      </div>
    );
  }
}