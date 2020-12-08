import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import DeviceGroup from "./../components/dashboard/DeviceGroup";

import DivisionService from "./../services/DivisionService";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			divisions: []
		}
  	}

	componentDidMount() {
		this.setState({ loading: true });
		DivisionService.getDivisions()
			.then(data => { this.setState({ 
					loading: false,
					divisions: data 
				}) 
			});
	}
  
	render() {
		const content = this.state.loading 
			? (
				this.state.divisions.map(div => (
					<DeviceGroup division={ div } />
				))
			) : "LOADING...";

		return (
			<Container fluid className="main-content-container px-4">
				{/* Page Header */}
				<Row noGutters className="page-header py-4">
					<PageTitle title="Dashboard" subtitle="" className="text-sm-left mb-3" />
				</Row>

				{ content }

				

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
