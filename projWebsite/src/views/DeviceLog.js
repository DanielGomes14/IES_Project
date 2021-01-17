import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";

import DeviceLogService from "../services/DeviceLogService";

import {pageLoading, pageError} from "../components/common/Loading";


class DeviceLogPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: 1,
			deviceLogs: [],
			sort: {
				type: 'division',
				order: true,
			}
		}
		this.sortData = this.sortData.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: 1 });

		DeviceLogService.getDeviceLogs()
			.then(data => {
				this.setState({
					deviceLogs: this.transformLogs(data),
					loading: 0,
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ loading: 2 })
			});
	}

	transformLogs(data) {
		let data2 = [];
		console.log(data)
		data.forEach(e => {
			data2.push({
				division: e.device.division.name,
				type: e.device.type.name,
				device: e.device.name,
				data: e.data,
				timestamp: e.timestampDate
			})
		});
		console.log(data2)
		return data2;
	}

	transformData(data, type) {
		if (data == 0) {return <span style={{color: 'red'}}>OFF</span>}
		if (data == 1) {return <span style={{color: 'green'}}>ON</span>}
		if (type == 'Temperature') {return data + 'ºC'}
		return data + '%';
	}	

	handleClick(event) {
		this.setState({
			sort: {
				type: event.target.name,
				order: !this.state.sort.order,
			}
		}, () => {this.sortData();});
		event.preventDefault();
	}

	sortData() {
		const prop = this.state.sort.type;
		const asc = this.state.sort.order;
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
										{['division', 'type', 'device', 'data', 'timestamp'].map((elem, index) => (
											<th key={index} scope="col" className="border-0">
												<a href="#" name={elem} onClick={this.handleClick}>
													{elem.charAt(0).toUpperCase() + elem.slice(1)} 
													{this.state.sort.type == elem ? 
														<i className="material-icons">
															expand_{this.state.sort.order ? 'less' : 'more'}
														</i> : null}
												</a>
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{this.state.deviceLogs.map((e, index) => (
										<tr key={index}>
											<td>{e.division}</td>
											<td>{e.type}</td>
											<td>{e.device}</td>
											<td>{this.transformData(e.data, e.type)}</td>
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
				content = pageLoading;
				break;
			case 2:
				content = pageError;
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
