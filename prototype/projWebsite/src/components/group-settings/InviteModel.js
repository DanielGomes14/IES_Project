import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  FormTextarea,
  Button
} from "shards-react";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  DialogContentText:{
    paddingTop: '2ch'
  },
}));

export default function InviteModel() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Invite User
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Invite Users</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>Invite someone to use this app on this house by entering an email address.</div>
            <div>Separete the emails by line or semicolon.</div>
          </DialogContentText>

          <FormGroup>
            <FormTextarea placeholder="email@example.com" />
          </FormGroup>
          <hr></hr>
          <DialogContentText>
            Choose the divisions to give permission.
          </DialogContentText>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={true} name="Kitchen" />}
              label="Kitchen"
            />
            <FormControlLabel
              control={<Checkbox checked={false} name="Living Room" />}
              label="Living Room"
            />
            <FormControlLabel
              control={<Checkbox checked={true} name="Bedroom #1" />}
              label="Bedroom #1"
            />
            <FormControlLabel
              control={<Checkbox checked={true} name="Bedroom #1" />}
              label="Bedroom #2"
            />
          </FormGroup>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} theme="primary" className="mx-2" >
            Invite
          </Button>
          <Button onClick={handleClose} outline={true} theme="danger" className="mx-2" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}