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

const UserAccountDetails = ({ title,userDetails }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <FormInput
                    id="feFirstName"
                    placeholder="First Name"
                    value={userDetails.fname}
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <FormInput
                    id="feLastName"
                    placeholder="Last Name"
                    value={userDetails.lname}
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <FormInput
                    type="email"
                    id="feEmail"
                    placeholder="Email Address"
                    value={userDetails.email}
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <FormInput
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    value={userDetails.password}
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <Row form>
                <Col md="12">
                <label htmlFor="fePhoto">Profile Picture</label>
              <InputGroup>
              <FormInput value ={userDetails.avatar_name} placeholder="Enter here your profile pic" />
              
              <InputGroupAddon type="append">
                <Button theme="primary">Upload Photo</Button>
              </InputGroupAddon>
            </InputGroup>
            </Col>
            </Row>
              <Row style={{paddingTop:"15px"}} form>
                {/* City */}
                <Col md="3" className="form-group">
                  <label htmlFor="feBirth">Birth</label>
                  <FormInput
                    id="feBirth"
                    placeholder="Birth Date: dd/mm/yyyy"
                    value={userDetails.birth}
                    onChange={() => {}}
                  />
                </Col>
                {/* State */}
                <Col md="2" className="form-group">
                  <label htmlFor="feInputState">Sex</label>
                  <FormSelect id="feInputState">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </FormSelect>
                </Col>
                {/* Zip Code */}
              </Row>
              <Button theme="accent">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  userDetails: PropTypes.object
};

UserAccountDetails.defaultProps = {
  title: "Account Details",
  userDetails: {
    fname: "Antonio",
    lname: "Silva",
    avatar_name: "3.jpg",
    avatar: require("./../../images/avatars/3.jpg" ),
    metaTitle: "Description",
    birth: "5/10/1985",
    email:"antonio@example.com",
    password:"examplepass",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
  
};

export default UserAccountDetails;
