import React from "react";
import { Container, Row, Col, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import InviteModel from "../components/invites/InviteModel";
import InviteService from "../services/InviteService";

import {current_home} from '../utils/auth';


class Invites extends React.Component{
  constructor() {
    super();
		this.state = { 
      invites: [],
    };
  }
  
  componentDidMount() {
    if (current_home.current_home())
      InviteService.getHomeInvites(current_home.current_home()).then(data => { 
        this.setState({ invites: data });
      }).catch(error => {
        console.log(error) ;
      });
  }

  removeInvite = ev => {
    InviteService.deleteHomeInvite(ev.currentTarget.value).then(data => { 
      this.setState({ invites: data });
    }).catch(error => {
      console.log(error) ;
    });
  }
  
  render() {

    return (
      
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Group Settings" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>

        <InviteModel />

        <hr></hr>

        <h2>Invited Users</h2>
        <Row>
          {
            this.state.invites.map((invite) => (
                <Col key={invite.id} lg="3" style={{textAlign: "center"}}>
                  <UserDetails client={invite.invclient} />
                  <Button outline={true} theme="danger" className="mx-2" value={invite.id} onClick={this.removeInvite}>
                    Remove Invite
                  </Button>
                </Col>
              ))
          }
        </Row>
      </Container>
    )
  };
}

export default Invites;
