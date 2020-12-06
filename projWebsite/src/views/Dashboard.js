import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import DeviceGroup from "./../components/dashboard/DeviceGroup";
import DeviceCard from "./../components/dashboard/DeviceCard";

import DivisionService from "./../services/DivisionService";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      divisions: []
    }
  }

  componentDidMount(){
    DivisionService.getDivisions().then((response) => {
      this.setState({ divisions : response.data })
    });
  }
  
  render(){
    return(
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Dashboard" subtitle="" className="text-sm-left mb-3" />
        </Row>

          {this.state.divisions.map((div) => {
              return (
                <DeviceGroup division={div} />
              )
          })}
        
        {/* <DeviceGroup division="Kitchen">
          <DeviceCard title="Lights" progress={95} type="light" />
        </DeviceGroup>

        <DeviceGroup division="Living Room">
          <DeviceCard title="Air Conditioning" progress={95} type="temperature" />
        </DeviceGroup>

        <DeviceGroup division="Bedroom #1">
          <DeviceCard title="Zumifier" progress={10} type="humidity" />
          <DeviceCard title="Radiator" progress={35} type="temperature" />
        </DeviceGroup>

        <DeviceGroup division="Bedroom #2">
          <DeviceCard title="Zumifier" progress={55} type="humidity" />
          <DeviceCard title="Radiator" progress={40} type="temperature" />
          <DeviceCard title="Presence Light" progress={5} type="light" />
        </DeviceGroup> */}
      </Container>
    )
  }
}

export default Dashboard;
