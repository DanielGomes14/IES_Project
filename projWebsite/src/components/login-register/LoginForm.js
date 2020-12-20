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

import AuthenticationService from "../../services/AuthenticationService";
import { Redirect } from "react-router-dom";
import { auth, current_home, current_user } from '../../utils/auth';
import LocalStorageService from '../../services/LocalStorageService';
import baseURL  from "../../data/base-url";

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
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
		alert('Login : '
		+ '\n' + this.state.username
		+ '\n' + this.state.password
		);
		var token = 'Basic ' + window.btoa(this.state.username + ":" + this.state.password);
		AuthenticationService.login(token)
			.then((response) => {
				console.log(response);
				if (response.ok) {
					console.log("Login successfull:");
					auth.login(token)
					
					LocalStorageService.get_user(this.state.username).then(data=>current_user.login(data));
					LocalStorageService.get_first_home().then(data=>current_home.change_home(data));
					
					this.setState({loggedIn: true});
				} else if (response.status == "400") {
					console.log("400: ");
				}
			});
		event.preventDefault();
	};

	render() {
		if (this.state.loggedIn === true)
			return <Redirect to='/' />
		return (
			<ListGroup flush>
				<ListGroupItem className="p-6">
					<Row>
						<Col>
							<Form onSubmit={this.handleSubmit}>
								<Row form className="form-group">
									<label htmlFor="feUsername">Username</label>
									<FormInput
										id="feUsername" name="username"
										value={this.state.username} onChange={this.handleChange}
										required
									/>
								</Row>
								<Row form className="form-group">
									<label htmlFor="fePassword">Password</label>
									<FormInput
										id="fePassword" type="password" name="password"
										value={this.state.password} onChange={this.handleChange}
										required
									/>
								</Row>

								<Row form className="py-3">
									<Col className="text-sm-center py-1">
										<span>Don't have an account yet?</span>
									</Col>
								</Row>
								<Row form >
									<Col className="text-sm-center py-1">
										<a href="/register" underline="always">
											Create Account
										</a>
									</Col>
								</Row>
								<Row form>
									<Col className="text-sm-center py-3">
										<Button className="bg-primary text-white text-center rounded p-3"
										style={{ boxShadow: "inset 0 0 5px rgba(0,0,0,.2)", fontSize: "16px", width:  "100px" }}
										type="submit">
											<span>Log In</span>
										</Button>
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

export default LoginForm;
