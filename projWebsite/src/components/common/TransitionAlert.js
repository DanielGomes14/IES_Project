import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export function activateAlert() {
  this.setState({ open: true })
}

export class TransitionAlert extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.text;
    this.classes = this.useStyles;
    this.state = {
      open: false
    }
    activateAlert = activateAlert.bind(this);
  }

  useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  render() {
    return (
      <div className={this.classes.root}>
        <Collapse in={this.state.open}>
          <Alert
            action={
              <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                this.setState({open: false})
              }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            >
            {this.text}
          </Alert>
        </Collapse>
      </div>
    );
  }
}