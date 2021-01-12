import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Badge,
  ListGroup,
  ListGroupItem,
} from "shards-react";
import ProfileService from "../../services/ProfileService";

const calculate_age = (dob1) => {
  var today = new Date();
  var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;

}

class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.user = props.user;
    console.log(this.user);
    
  }

  

  componentDidMount() {
  }

  render() {

    if(!this.user)
      return null;

    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              //src={this.user.client.profile_pic}
              //alt={this.user.client.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{this.user.client.firstName} {this.user.client.lastName} </h4>
          <span className="text-muted d-block mb-2">Age: {calculate_age(this.user.client.birth)}</span>
          <h5><Badge theme="info">
            {this.user.client.email}
          </Badge></h5>
        </CardHeader>
      </Card>
    )
  }
}




export default UserDetails;
