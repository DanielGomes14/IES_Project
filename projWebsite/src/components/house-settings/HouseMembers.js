import React from "react";
import {
	CardHeader,
	Card,
	CardBody
} from "shards-react";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {current_home} from './../../utils/auth';
import 'react-confirm-alert/src/react-confirm-alert.css';
import HomeService from "./../../services/HomeService";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		
		fontSize: 14,
	},
}))(TableCell);
	
const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

class HouseMembers extends React.Component{
	constructor() {
		super();
		this.state = { 
			checked: false,
			title: "House Members", 
			loading: 0,
			divisions: []
		};
	}

	componentDidMount() {
		this.setState({ loading: 1 });
		HomeService.getHomeById(current_home.current_home())
			.then(data => { 
                console.log(data);
				this.setState({ 
					loading: 1,
					members: data.clients
                }) 
			})
			.catch(error => {
				this.setState({ loading: 2 })
			});
	}
	/*
	handleChange() {

		this.setState({
			checked: !this.state.checked
		})
	}
	*/

	render() {
		return  (
			<Card small className="mb-4">
				<CardHeader className="border-bottom">
					<h6 className="m-0">{this.state.title}</h6>
				</CardHeader>
				<CardBody className="p-0 pb-3">
					<table className="table mb-0">
						<thead className="bg-light">
							<tr>
								<th scope="col" className="border-0">
									<a href="#" name="division" onClick={this.sortData}>First Name</a>
								</th>
                                <th scope="col" className="border-0">
									<a href="#" name="division" onClick={this.sortData}>Last Name</a>
								</th>
                                <th scope="col" className="border-0">
									<a href="#" name="division" onClick={this.sortData}>Email</a>
								</th>
                                <th scope="col" className="border-0">
									<a href="#" name="division" onClick={this.sortData}>Gender</a>
								</th>
							</tr>
						</thead>
						<tbody>
                            {
                                this.state.members && this.state.members.map((e, index) => (
                                    <tr key={index}>
                                        <td>{e.firstName}</td>
                                        <td>{e.lastName}</td>
                                        <td>{e.email}</td>
                                        <td>{e.sex}</td>
                                    </tr>                    
                                ))
                            }
						</tbody>
					</table>
				</CardBody>
			</Card>
		);
	}
}

export default HouseMembers;
