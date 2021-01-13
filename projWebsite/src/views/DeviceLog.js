import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

import DeviceLogService from "../services/DeviceLogService";
import { current_home } from "../utils/auth";

class DeviceLogPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: 1,
			deviceLogs: [],
		}
		this.sortData = this.sortData.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: 1 });

		DeviceLogService.getDeviceLogs()
			.then(data => {
				this.setState({
					deviceLogs: this.transformData(data),
					loading: 0,
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ loading: 2 })
			});
	}

	transformData(data) {
		let data2 = [];
		data.forEach(e => {
			data2.push({
				division: e.device.division.name,
				type: e.device.type.name,
				device: e.device.name,
				data: e.data,
				timestamp: e.timestampDate
			})
		});
		return data2;
	}

	sortData(event) {
		const prop = event.target.name;
		const asc = true; // NOTE: not implemented, but ready to dynamically change the order
		this.setState({
			deviceLogs: [].concat(this.state.deviceLogs).sort((a, b) => {
				if (asc) {
					return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
				} else {
					return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
				}
			})
		});	
  }

	render() {
		var content = ""
		switch (this.state.loading) {
			case 0:
				content = (
					<Row>
						<Col>
							<Card small className="mb-4">
								<CardHeader className="border-bottom">
									<h6 className="m-0">Device Logs</h6>
								</CardHeader>
								<CardBody className="p-0 pb-3">
									<table className="table mb-0">
										<thead className="bg-light">
											<tr>
												<th scope="col" className="border-0">
													<a href="#" name="division" onClick={this.sortData}>
														Division<i class="material-icons">expand_more</i>
													</a>
												</th>
												<th scope="col" className="border-0">
													<a href="#" name="type" onClick={this.sortData}>
														Type<i class="material-icons">expand_more</i>
													</a>
												</th>
												<th scope="col" className="border-0">
													<a href="#" name="device" onClick={this.sortData}>
														Device<i class="material-icons">expand_more</i>
													</a>
												</th>
												<th scope="col" className="border-0">
													<a href="#" name="data" onClick={this.sortData}>
														Data<i class="material-icons">expand_more</i>
													</a>
												</th>
												<th scope="col" className="border-0">
													<a href="#" name="timestamp" onClick={this.sortData}>
														Timestamp<i class="material-icons">expand_more</i>
													</a>
												</th>
											</tr>
										</thead>
										<tbody>
											{this.state.deviceLogs.map((e, index) => (
												<tr key={index}>
													<td>{e.division}</td>
													<td>{e.type}</td>
													<td>{e.device}</td>
													<td>{e.data}</td>
													<td>{new Date(e.timestamp).toLocaleString()}</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				);
				break;
			case 1:
				content = "Loading...";
				break;
			case 2:
				content = "Something went wrong...";
				break;
		}
		return (
			<Container fluid className="main-content-container px-4">
				{/* Page Header */}
				<Row noGutters className="page-header py-4">
					<PageTitle title="Device Logs" subtitle="" className="text-sm-left mb-3" />
				</Row>

				{ content }

			</Container>
		)
	}
}

export default DeviceLogPage;
