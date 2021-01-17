import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { Dispatcher, Constants, Store } from "../../flux";

export default class TransitionAlert extends React.Component {
  constructor(props) {
    super(props);
    this.classes = this.useStyles;
    this.state = {
      open: Store.getAlertState(),
      text: Store.getAlertText(),
      severity: Store.getAlertSeverity(),
    }
    this.onChange = this.onChange.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentWillMount() {
    Store.addAlertListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeAlertListener(this.onChange);
  }

  onChange() {
    this.setState({
      open: Store.getAlertState(),
      text: Store.getAlertText(),
      severity: Store.getAlertSeverity(),
    })
  }

  closeAlert() {
    Dispatcher.dispatch({
        actionType: Constants.CLOSE_ALERT,
    });
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
          <Alert severity={this.state.severity}
            action={
              <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={this.closeAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            >
            {this.state.text}
          </Alert>
        </Collapse>
      </div>
    );
  }
}