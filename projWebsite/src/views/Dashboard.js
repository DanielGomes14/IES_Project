import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import DeviceGroup from "./../components/dashboard/DeviceGroup";
import DeviceCard from "./../components/dashboard/DeviceCard";

const BlogOverview = ({ smallStats }) => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Dashboard" subtitle="" className="text-sm-left mb-3" />
    </Row>

    <h4 style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>Kitchen</a></h4>
    <DeviceGroup>
      <DeviceCard title="Lights" progress={95} type="light" />
    </DeviceGroup>

    <h4 style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>Living Room</a></h4>
    <DeviceGroup>
      <DeviceCard title="Air Conditioning" progress={95} type="temperature" />
    </DeviceGroup>


    <h4 style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>Bedroom #1</a></h4>
    <DeviceGroup>
      <DeviceCard title="Zumifier" progress={10} type="humidity" />
      <DeviceCard title="Radiator" progress={35} type="temperature" />
    </DeviceGroup>

    <h4 style={{marginLeft: "20px"}}><a href="#" style={{color: "#17c671"}}>Bedroom #2</a></h4>
    <DeviceGroup>
      <DeviceCard title="Zumifier" progress={55} type="humidity" />
      <DeviceCard title="Radiator" progress={40} type="temperature" />
      <DeviceCard title="Presence Light" progress={5} type="light" />
    </DeviceGroup>
  </Container>
);

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    {
      label: "Posts",
      value: "2,390",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Pages",
      value: "182",
      percentage: "12.4",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Comments",
      value: "8,147",
      percentage: "3.8%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [2, 3, 3, 3, 4, 3, 3]
        }
      ]
    },
    {
      label: "New Customers",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [1, 7, 1, 3, 1, 4, 8]
        }
      ]
    },
    {
      label: "Subscribers",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [3, 2, 3, 2, 4, 5, 4]
        }
      ]
    }
  ]
};

export default BlogOverview;
