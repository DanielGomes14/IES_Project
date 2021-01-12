import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import UserAccountDetails from "../components/user-profile/UserAccountDetails";
import ProfileService from "../services/ProfileService";


class UserProfile extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }


  componentDidMount() {
    console.log("inside");
    ProfileService.getMyProfile()
      .then(data => {
        console.log("-->", data)
          this.setState({
            user: data,
          });
        })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if(!this.state.user){
      return null;
    }

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails  user={this.state.user} />
          </Col>
          <Col lg="8">
            <UserAccountDetails />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default UserProfile;
