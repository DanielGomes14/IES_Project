import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  FormInput,
  FormSelect,
  InputGroupAddon,
  Button
} from "shards-react";
import UserDetails from "../user-profile-lite/UserDetails";


class UserAccountDetails extends React.Component {


  constructor(props){
    super(props);
    this.state = {user: props.user};
    this.state.user.password = "";
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    const {name, value} = event.target;
    
    if (name !== "password")
      this.setState({ user:{
                    ...this.state.user,
                    client:{
                      [name]: value
                    },
                  } });
    else
      this.setState({ user:{
        ...this.state.user,
        [name]: value
      } });           

    
	}


  handleSubmit(event) {
    event.preventDefault();
  }


  render() {
    console.log(this.state.user);
    return (
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">User Details</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feFirstName">First Name</label>
                      <FormInput
                        id="feFirstName"
                        placeholder="First Name"
                        name = "firstName"
                        value={this.state.user.client.firstName}
                        onChange={ this.handleChange }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput
                        id="feLastName"
                        placeholder="Last Name"
                        name = "lastName"
                        value={this.state.user.client.lastName}
                        onChange={ this.handleChange }
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="feEmail">Email</label>
                      <FormInput
                        type="email"
                        id="feEmail"
                        placeholder="Email Address"
                        name = "email"
                        value={this.state.user.client.email}
                        onChange={ this.handleChange }
                        autoComplete="email"
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput
                        type="password"
                        id="fePassword"
                        placeholder="Password"
                        name= "password"
                        value={ this.state.user.password }
                        onChange={ this.handleChange }
                        autoComplete="current-password"
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="12">
                      <label htmlFor="fePhoto">Profile Picture</label>
                      <InputGroup>
                        <FormInput name="profile_pic"
                         onChange={this.handleChange}
                         value={this.state.user.client.profile_pic} p
                         laceholder="Enter here your profile pic" />

                        <InputGroupAddon type="append">
                          <Button theme="primary">Upload Photo</Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "15px" }} form>
                    <Col md="3" className="form-group">
                      <label htmlFor="feBirth">Birth</label>
                      <FormInput
                        id="feBirth"
                        name= "birth"
                        placeholder="Birth Date: dd/mm/yyyy"
                        value={this.state.user.client.birth}
                        onChange={ this.handleChange }
                      />
                    </Col>
                    <Col md="2" className="form-group">
                      <label htmlFor="feInputState">Sex</label>
                      <FormSelect id="feInputState" name="sex"  value={this.state.user.client.sex} onChange={ this.handleChange}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </FormSelect>
                    </Col>
                  </Row>
                  <Button theme="accent">Update Account</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )


  }


}

export default UserAccountDetails;
