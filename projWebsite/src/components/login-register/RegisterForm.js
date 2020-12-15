import React from "react";
import {
	ListGroup,
	ListGroupItem,
	Row,
	Col,
	Form,
	FormInput,
	FormCheckbox,
	Button,
} from "shards-react";

import AuthenticationService from "./../../services/AuthenticationService";
import { Redirect } from "react-router-dom";


class RegisterForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		const {name, value} = event.target;
		this.setState({ [name]: value });
	};

	handleSelect = selectedIcon => {
		this.setState({ selectedIcon });
	};
	
	handleSubmit(event) {
		alert('Register :\n ' + this.state.firstName
		+ '\n' + this.state.lastName
		+ '\n' + this.state.email
		+ '\n' + this.state.username
		+ '\n' + this.state.password
		);
		AuthenticationService.login(
			this.state.firstName, 
			this.state.lastName,
			this.state.email, 
			this.state.username, 
			this.state.password
		).then((response) => {
			console.log(response);
			if (response.ok) {
				var json = response.json();
				console.log("Login successfull:");
				console.log(json);
				localStorage.setItem('token', json);
				this.setState({loggedIn: true});
			} else if (response.status == "400") {
				console.log("400: ");
				console.log(response.json());
			}
		});
		event.preventDefault();
	};

	render() {
		if (this.state.loggedIn === true) {
			return <Redirect to='/' />
		}

		return (
      	<ListGroup flush>
				<ListGroupItem className="p-6">
					<Row>
						<Col>
							<Form onSubmit={this.handleSubmit}>
								<Row form className="form-group py-1">
									<Col sm="6">
										<label htmlFor="feFirstName">First Name</label>
										<FormInput
											id="feFirstName" name="firstName"
											value={this.state.firstName} onChange={this.handleChange}
											required
										/>
									</Col>
									<Col sm="6">
										<label htmlFor="feLastName">Last Name</label>
										<FormInput
											id="feLastName" name="lastName"
											value={this.state.lastName} onChange={this.handleChange}
											required
										/>
									</Col>
								</Row>
								<Row form className="form-group py-1">
									<label htmlFor="feUsername">Username</label>
									<FormInput
											id="feUsername" name="username"
											value={this.state.username} onChange={this.handleChange}
											required
									/>
								</Row>
								<Row form className="form-group py-1">
									<label htmlFor="feEmailAddress">Email</label>
									<FormInput
										id="feEmailAddress" type="email" name="email"
										value={this.state.email} onChange={this.handleChange}
										required
									/>
								</Row>
								<Row form className="form-group py-1">
									<label htmlFor="fePassword">Password</label>
									<FormInput
										id="fePassword" type="password" name="password"
										value={this.state.password} onChange={this.handleChange}
										required
									/>
								</Row>
								<Row form>
									<Col md="12" className="form-group">
										<FormCheckbox required>
											{/* eslint-disable-next-line */}I agree with your{" "}
											<a href="#">Privacy Policy</a>.
										</FormCheckbox>
									</Col>
								</Row>
								<Row form >
									<Col className="text-sm-center py-1">
											<span>Already have an account?</span>
									</Col>
								</Row>
								<Row form >
									<Col className="text-sm-center py-1">
											<Button className="bg-primary text-white text-center rounded p-3"
												style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px" }}
												type="submit">
													Log In
											</Button>
									</Col>
								</Row>
								<Row form>
									<Col className="text-sm-center py-3">
										<a href="#">
											Create New Account
										</a>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</ListGroupItem>
			</ListGroup>
		);
  }
}

export default RegisterForm;
