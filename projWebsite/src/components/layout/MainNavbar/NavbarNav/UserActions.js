import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import {current_user, auth, current_home} from '../../../../utils/auth';


export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.username = current_user.getUsername();
    this.state = {
      visible: false,
    };
    this.toggleUserActions = this.toggleUserActions.bind(this);

  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout(){
    current_home.remove_home();
    current_user.logout();
    auth.logout();
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/default-profile-picture.jpg").default}
            alt="User Avatar"
          />
          <span className="d-none d-md-inline-block">{this.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="account">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="my-invites">
            <i className="material-icons">person_add</i> Invites
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} onClick={this.logout} to="login" className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
