import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import { FaTemperatureHigh } from "react-icons/fa";
import NotificationService from "../../../../services/NotificationService";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      notifications: []
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible,
    });
    NotificationService.getNotifications(1)
      .then(data => {
        this.setState({ 
          notifications: data,
        });
      })
      .catch(error => {
        console.log(error) ;
      });
  }

  render() {
    var content = ""
    content = this.state.notifications.map((notification) => (
        <DropdownItem>
          <div className="notification__icon-wrapper">
            <div className="notification__icon">
              <i className="material-icons">&#xE6E1;</i>
            </div>
          </div>
          <div className="notification__content">
            <span className="notification__category">{notification.title}<span className="text-black text-semibold">{notification.timestampDate}</span></span>
            <p>{notification.text}</p>
          </div>
        </DropdownItem>
      )
    )
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              2
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >

          {content}


         
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
