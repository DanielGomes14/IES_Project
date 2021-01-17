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

  acceptInvite = ev => {
    let id = ev.currentTarget.value;
    for (let i=0; i<this.state.invites.length;i++) {
      if (this.state.invites[i].id == id) {
        let invite = this.state.invites[i]
        InviteService.acceptInvite(id, invite.client.id, invite.invclient.id, invite.home.id).then(data => { 
          this.setState({ invites: data });
        }).catch(error => {
          console.log(error) ;
        });
        break;
      }
    }
  }

  removeInvite = ev => {
    InviteService.deleteReceivedInvite(ev.currentTarget.value).then(data => { 
      this.setState({ invites: data });
    }).catch(error => {
      console.log(error) ;
    });
  }
  
  render() {

    return (
      
      <Container fluid className="main-content-container px-4">
        <h2>Received Invitations</h2>
        <Row>
          {
            this.state.invites && this.state.invites.map((invite) => (
                <Col key={invite.id} lg="3" style={{textAlign: "center"}}>
                  <h4>House: {invite.home.name}</h4>
                  <UserDetails client={invite.invclient} />
                  <Button outline={true} theme="primary" className="mx-2" value={invite.id} onClick={this.acceptInvite}>
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
