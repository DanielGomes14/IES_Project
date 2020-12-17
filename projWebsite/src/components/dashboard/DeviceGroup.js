import React from "react";
import { Row, Col, Button } from "shards-react";

import DeviceCard from "./DeviceCard";

import DeviceService from "./../../services/DeviceService";

const DeviceGroup = ({ division }) => {
  return (
    <div>
      <h4 className="float-left" style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>{division.name}</a></h4>
      <a href="/newsensor"><Button className="float-right mb-2 mr-2" theme="success" style={{ fontSize: "16px"}}>Add Sensor</Button></a>
      <a href="/newdevice"><Button className="float-right mb-2 mr-2" theme="success" style={{ fontSize: "16px"}}>Add Device</Button></a>
      <div className="clearfix"></div>
      <Row>
          {console.log(division.devices)}

          {division.devices.map((dev) => {
              return (
                <Col lg="12" md="12" sm="12" className="mb-4">
                  <DeviceCard title={dev.name} progress={10} type={"temperature"} />
                </Col>
              )
          })}
      </Row>
    </div>
  )
}

export default DeviceGroup;
