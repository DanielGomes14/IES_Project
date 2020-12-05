import React from "react";
import { Children } from 'react';
import { Row, Col } from "shards-react";

const DeviceGroup = ({ children }) => {
  return (
    <Row>
        {Children.map(children, (child) => {
            return (
                <Col lg="12" md="12" sm="12" className="mb-4">
                    {child}
                </Col>
            )
        })}
    </Row>
  )
}

export default DeviceGroup;
