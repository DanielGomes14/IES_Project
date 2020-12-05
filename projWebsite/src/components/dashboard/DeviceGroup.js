import React from "react";
import { Children } from 'react';
import { Row, Col, Button } from "shards-react";

const DeviceGroup = ({ division, children }) => {
  return (
    <div>
    <h4 className="float-left" style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>{division}</a></h4>
    <a href="/newdevice"><Button className="float-right mb-2 mr-2" theme="success" style={{ fontSize: "16px"}}>Add Device</Button></a>
    <div className="clearfix"></div>
    <Row>
        {Children.map(children, (child) => {
            return (
                <Col lg="12" md="12" sm="12" className="mb-4">
                    {child}
                </Col>
            )
        })}
    </Row>
    </div>
  )
}

export default DeviceGroup;
