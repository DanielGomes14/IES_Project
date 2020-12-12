import React from "react";
import {
	Card,
	CardHeader,
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Form,
	FormInput,
	FormSelect,
	Button,
	FormCheckbox,
} from "shards-react";

import DivisionService from "./../../services/DivisionService";


class HouseSets extends React.Component {
	constructor() {
		super();
		this.OPTIONS = [
			{ id: 1, name: "Daniel", checked: true },
			{ id: 2, name: "Leandro", checked: true },
			{ id: 3, name : "Chico", checked: true },
			{ id: 4, name : "Bruno", checked: true }
		];
		this.state = { custom: false, name: "", OPTIONS : this.OPTIONS };
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const {name, value} = event.target;
		if (name == "custom")
			this.setState({ custom: !this.state.custom });
		else
			this.setState({ [name]: value });
	}
	
	handleChangeCheckBox(e, user) {
		var newState = this.state
		for(let i = 0; i < this.state.OPTIONS.length; i++){
			if(this.state.OPTIONS[i].id == user)
				newState.OPTIONS[i].checked = !this.state.OPTIONS[i].checked;  
			this.setState({ ...this.state, ...newState });
		}
	}

	handleSubmit(event) {
		console.log("jdsj")
		alert('A name was submitted: ' + this.state.name);
		// DivisionService.addDivisions("1", this.state.name, this.state.OPTIONS);
		event.preventDefault();
	}

	render() {
		const content = this.state.custom 
		? (
			<Col sm="12" md="4" className="mb-3">
				<strong className="text-muted d-block mb-2">Checkboxes</strong>
				<fieldset>
					{ 
						this.state.OPTIONS.map(user => (
							<div key={ user.name }>
								<FormCheckbox checked={ user.checked } onChange={ e => this.handleChangeCheckBox(e, user.id) }>{ user.name }</FormCheckbox>
							</div>
						))
					}
				</fieldset>
			</Col> 
		)
		: null;

		return (
			<Card small className="mb-4">
				<CardHeader className="border-bottom">
					<h6 className="m-0">Add a new Division</h6>
				</CardHeader>
				<ListGroup flush>
					<ListGroupItem className="p-3">
						<Row>
							<Col>
								<Form>
									<Row form>
										{/* Name of the Division */}
										<Col md="6" className="form-group">
											<label htmlFor="Division Name">Division Name</label>
											<FormInput
												id="feDivs"
												name="name"
												placeholder="Enter the Name of The Division"
												value={ this.state.name } onChange={ this.handleChange }
											/>
										</Col>
									</Row>
									<Row form>
										{/* Permissions */}
										<Col md="12" className="form-group">
											<label htmlFor="Permissions for This Division">Permissions for This Division</label>
											<FormSelect id="feInputState" name="custom" onChange={ this.handleChange }>
												<option checked={ this.state.custom }>Everyone can Configure</option>
												<option>Custom</option>
											</FormSelect>
										</Col>
									</Row>  
									<Row form>
										{/* Users Added */}
										<Col md="12" className="form-group">
											{ content }
										</Col>
									</Row>
									<Row form>
									</Row>
									<Button type="submit" theme="accent" value="Submit">Add new Division</Button>
								</Form>
							</Col>
						</Row>
					</ListGroupItem>
				</ListGroup>
			</Card>
		);
	}
}

export default HouseSets;
