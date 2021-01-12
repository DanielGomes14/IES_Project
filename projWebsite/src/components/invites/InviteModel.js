import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import HomeService from '../../services/HomeService';

import {
  FormTextarea,
  Button
} from "shards-react";


class InviteModel extends React.Component{
  constructor() {
    super();
		this.state = { 
      invited: false,
      open_modal: false,
      fullWidth: true,
      maxWidth: 'md',
    };
    this.inviteClient = this.inviteClient.bind(this);
  }
  
  componentDidMount() {
	}
  
  handleClickOpen = () => {
    this.setState({open_modal: true});
  };
  
  handleClose = () => {
    this.setState({open_modal: false});
  };

  inviteClient = () => {
    HomeService.inviteUser(document.getElementById('emailToInvite').value).then(data => { 
      this.setState({invited: true});
    }).catch(error => {
      console.log(error) ;
    });
  }
  
  render() {
    if (this.state.invited === true)
      return window.location.reload();

    return (
      <React.Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Invite Users
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.state.open_modal}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Invite Users</DialogTitle>
          <DialogContent>
            <DialogContentText style={{paddingTop: '2ch'}}>
              <div>Invite someone to use this app on this house by entering an email address.</div>
              <div>Separete the emails by line or semicolon.</div>
            </DialogContentText>

            <FormGroup>
              <FormTextarea placeholder="email@example.com" id="emailToInvite"/>
            </FormGroup>
            <hr></hr>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.inviteClient} theme="primary" className="mx-2" >
              Invite
            </Button>
            <Button onClick={this.handleClose} outline={true} theme="danger" className="mx-2" >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default InviteModel;
