import React from "react";
import { Container, Row } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import DeviceGroup from "../components/dashboard/DeviceGroup";

import DivisionService from "../services/DivisionService";
import {pageLoading, pageError} from "../components/common/Loading";

import { current_home } from "../utils/auth";


class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: 1,
			divisions: [],
		}
		this.loadData.bind(this);
  	}

	componentDidMount() {
		this.setState({ loading: 1 });
		this.loadData();
	}

	loadData() {
        if (current_home.current_home())
		DivisionService.getDivisions()
			.then(data => {
				if (data != undefined){
					this.setState({ divisions: data	});
				} else
					this.setState({ loading: 2 });
				return data;
			}).then( () => {
				if (this.state.divisions.length == 0) {
					this.setState({ loading: 2 });
				} else {
					this.setState({ loading: 0 });
				}
			})
			.catch(error => {
				console.log(error) ;
				this.setState({ loading: 3 })
			});
	}
  
	render() {
		
		var content = ""
		switch(this.state.loading) {
			case 0:
				if (Array.isArray(this.state.divisions))
					content =  this.state.divisions.map((div) => (
							<DeviceGroup key={div.id} division={div} />
						)
					)
				break;
			case 1:
				content = pageLoading;
				break;
			case 2:
				content = "No divisions yet";
				break;
			case 3:
				content = pageError;
				break;
		}
		if (content=="") {
			this.loadData();
		}
		
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
				</DeviceGroup>  */}
			</Container>
		)
	}
}

export default Dashboard;
