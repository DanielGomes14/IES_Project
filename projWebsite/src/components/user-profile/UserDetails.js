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
  let today = new Date();
  let birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
  let age_now = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;

}

class UserDetails extends React.Component {

<<<<<<< Updated upstream
  constructor(props) {
    super(props);
    this.client = props.client;
  }

  
=======
const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={require("./../../images/avatars/3.jpg")}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">Age: {calculate_age(userDetails.birth)}</span>
      <h5><Badge theme="info">
        {userDetails.email}
      </Badge></h5>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">
        <strong className="text-muted d-block mb-2">
          Division Permissions:
        </strong>
        <span>Kitchen, Living Room, Bedroom #1</span>
      </ListGroupItem>
    </ListGroup>
   
  </Card>
);
>>>>>>> Stashed changes

  render() {

    if(!this.client)
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
          <h4 className="mb-0">{this.client.firstName} {this.client.lastName} </h4>
          <span className="text-muted d-block mb-2">Age: {calculate_age(this.client.birth)}</span>
          <h5><Badge theme="info">
            {this.client.email}
          </Badge></h5>
        </CardHeader>
      </Card>
    )
  }
}




export default UserDetails;
