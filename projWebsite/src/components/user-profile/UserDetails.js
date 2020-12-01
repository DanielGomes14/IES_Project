import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Badge,
  ListGroup,
  ListGroupItem,
} from "shards-react";

const calculate_age = (dob1) => {
  var today = new Date();
  var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age_now--;
  }
  return age_now;

}


const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
      <span className="text-muted d-block mb-2">Age: {calculate_age(userDetails.birth)}</span>
      <Badge theme="info">
        {userDetails.email}
      </Badge>
    </CardHeader>
    <ListGroup flush>
    
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Antonio Silva",
    avatar: require("./../../images/avatars/3.jpg"),
    metaTitle: "Description",
    email:"antonio@example.com",
    birth: "5/10/1985",
    metaValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?"
  }
};

export default UserDetails;
