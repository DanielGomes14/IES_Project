import React from "react";
import PropTypes from "prop-types";

import { FaLightbulb, FaTemperatureHigh } from "react-icons/fa";
import { IoWater } from "react-icons/io5";

import {
  Card,
  CardHeader,
  CardBody,
  FormCheckbox,
  Progress,
  Button
} from "shards-react";


const DeviceCard = ({ title, progress, type }) => {
  const types = {
    "light": {
      theme: "warning",
      icon: <FaLightbulb />
    },
    "temperature": {
      theme: "danger",
      icon: <FaTemperatureHigh />
    },
    "humidity": {
      theme: "info",
      icon: <IoWater />
    },
  }

  return (
    <Card small className="h-100">
      {/* Card Header */}
      <CardHeader className="border-bottom" st>
        <div className="d-flex float-left">
          {types[type].icon} 
        <h6 className="ml-2">{title}</h6>
        </div>
        <FormCheckbox className="float-right" toggle defaultChecked>
          Enable Device
        </FormCheckbox>
      </CardHeader>
    
      <CardBody className="d-flex flex-column">
      <div className="progress-wrapper">
        <strong className="text-muted d-block mb-2">
          Device's Progress
        </strong>
        <Progress
            theme={types[type].theme}
            style={{ height: "5px" }}
            className="mb-3"
            value={progress}
        >
          <span className="progress-value">{progress}%</span>
        </Progress>
        </div>
      </CardBody>
    </Card>
  )
}

DeviceCard.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  progress: PropTypes.number,
  type: PropTypes.string
};

DeviceCard.defaultProps = {
  title: "My Device",
  progress: 40,
  type: "light"
};

export default DeviceCard;
