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
	Button,
	FormCheckbox,
} from "shards-react";

import DivisionService from "./../../services/DivisionService";
import EditDivision from "./EditDivision";

import {transitionAlertTrigger} from "../common/TransitionAlertTrigger";


class HouseSets extends React.Component {
	constructor(props) {
		super(props);
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
		for (let i = 0; i < this.state.OPTIONS.length; i++) {
			if (this.state.OPTIONS[i].id == user)
				newState.OPTIONS[i].checked = !this.state.OPTIONS[i].checked;  
			this.setState({ ...this.state, ...newState });
		}
	}

	handleSubmit(event) {
		if (!this.state.name.replace(/\s/g, '').length){
            transitionAlertTrigger("Division's must have a name", "error", false)
		} else {
			var response = DivisionService.addDivision(this.state.name);
			EditDivision.ComponentDidMount();
			event.preventDefault();
		}
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
								<Form onSubmit={ this.handleSubmit }>
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
