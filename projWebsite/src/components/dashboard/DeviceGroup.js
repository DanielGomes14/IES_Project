import React from "react";
import { Children } from 'react';
import { Row, Col } from "shards-react";

const DeviceGroup = ({ children, division }) => {
  return (
    <div>
      <h4 style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>{division}</a></h4>
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
