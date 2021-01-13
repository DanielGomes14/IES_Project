import React from "react";
import {
	CardHeader,
	ListGroup,
	Container,
	Row,
	Col,
	Card,
	CardBody
} from "shards-react";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MaxWidthDialog from "./DialogDivision"
import { Button } from "@material-ui/core";
import {current_home} from './../../utils/auth';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import DivisionService from "./../../services/DivisionService";

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

class EditDivision extends React.Component{
	constructor() {
		super();
		this.state = { 
			checked: false,
			title: "Current Divisions", 
			loading: 0,
			divisions: []
		};
		this.handleRemoveDivision = this.handleRemoveDivision.bind(this);
		
	}

	componentDidMount() {
		this.setState({ loading: 1 });
		DivisionService.getDivisions(current_home.current_home())
			.then(data => { 
				console.log(data);
				this.setState({ 
					loading: 0,
					divisions: data
				}) 
			})
			.catch(error => {
				this.setState({ loading: 2 })
			});
	}
	
	getNumChecked(row) {
		let counter=0;
		for(let i = 0 ; i< row.people.length;i++){
			if (row.people[i].checked)
				counter++;
		}
		return counter
	}
	/*
	handleChange() {

		this.setState({
			checked: !this.state.checked
		})
	}
	*/
		
	handleRemoveDivision = (division_id) => {
		confirmAlert({
		  title: 'Confirm Deletion',
		  message: 'Are you sure you want to remove this division?',
		  buttons: [
			{
				label: 'Yes',
				onClick: () => {
					DivisionService.deleteDivision(division_id)
					.then(data => { 
						this.componentDidMount()
					})
					.catch(error => {
						alert(error);
					});
				}
			},
			{
			  label: 'No',
			}
		  ]
		});
	  };

	render() {
		return  (
			<Card small className="mb-4">
				<CardHeader className="border-bottom">
					<h6 className="m-0">{this.state.title}</h6>
				</CardHeader>
				<CardBody className="p-0 pb-3">
					<table className="table mb-0">
						<tbody>
							{this.state.divisions.map((e, index) => (
								<tr key={index}>
									<td>{e.name}</td>
									<td style={{textAlign: "right"}}>
										<Button variant="outlined" color="secondary" onClick={() => this.handleRemoveDivision(e.id)}>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
			</Card>
		);
	}
}

export default EditDivision;
