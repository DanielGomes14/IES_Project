import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function MaxWidthDialog({content,al}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('md');
  const [state, setState] = React.useState({
      users: content.people
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event,user) => {
    console.log("aaa" +user)
    var newState = state
    for(let i = 0; i< state.users.length;i++){
      // eslint-disable-next-line
      if(state.users[i].id == user){
        newState.users[i].checked =  !state.users[i].checked;  
      }
      setState({ ...state, ...newState });    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit Division
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title"> {content.name} Settings</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit here the Division Name
          </DialogContentText>
          <TextField fullWidth required id="standard-required" label="Required" defaultValue={content.name} />
          <DialogContentText className= {classes.DialogContentText}>
            Edit here the users allowed to this Division
          </DialogContentText>
          <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                {
                    state.users.map(person => (
                        <div key={person.id}>
                          <FormControlLabel
                            control={<Checkbox checked={person.checked}  color="primary" onChange={e => handleChange(e,person.id)} name="gilad" />}
                            label={person.name}
                          />
                        </div>
                    ))
                  }
                </FormGroup>
                </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}