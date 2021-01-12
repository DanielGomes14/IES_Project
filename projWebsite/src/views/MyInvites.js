import React from "react";
import { Container, Row, Col, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile/UserDetails";
import InviteModel from "../components/invites/InviteModel";
import InviteService from "../services/InviteService";


class MyInvites extends React.Component{
  constructor() {
    super();
		this.state = { 
      invites: [],
    };
  }
  
  componentDidMount() {
    InviteService.getMyInvites().then(data => { 
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

        <h2>Received Invitations</h2>
        <Row>
          {
            this.state.invites.map((invite) => (
                <Col key={invite.id} lg="3" style={{textAlign: "center"}}>
                  <h4>House: {invite.home.name}</h4>
                  <UserDetails user={invite.inv_user} />
                  <Button outline={true} theme="danger" className="mx-2" value={invite.id} onClick={this.acceptInvite}>
                    Accept Invite
                  </Button>
                  <Button outline={true} theme="danger" className="mx-2" value={invite.id} onClick={this.removeInvite}>
                    Ignore Invite
                  </Button>
                </Col>
              ))
          }
        </Row>
      </Container>

    )
  };
}

export default MyInvites;
