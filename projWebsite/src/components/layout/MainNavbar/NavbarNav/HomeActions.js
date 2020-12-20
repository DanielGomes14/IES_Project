import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
  Badge,
  Button
} from "shards-react";

import HomeService from '../../../../services/HomeService';

export default class HomeActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
    this.homes = [];
    this.current_home={"id":0,"name":"Home"};
    HomeService.getHomesDropdown().then(data=>{this.homes=data});
    HomeService.getHomeById().then(data=>{this.current_home=data});
    
    this.toggleHomeActions = this.toggleHomeActions.bind(this);
  }
  

  toggleHomeActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  changeHome(){
    console.log("Changing Home");
  }

  render() {
    return (
        <NavItem className="border-right" tag={Dropdown} caret toggle={this.toggleHomeActions}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style={{paddingTop: "20px"}}>
                {this.current_home.name}
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                {this.homes.map((home, index) => (
                  <DropdownItem key={index} tag={Link}  to="#">
                    <Badge pill theme="danger" className="mr-2"  style={{lineHeight: "4px"}}> 2 </Badge>
                    <span onClick={this.changeHome()}>{home.name}</span>
                  </DropdownItem>
                ))}
                
                <DropdownItem  tag={Link} to="/newhouse">
                    <Button theme="primary" outline={true} className="w-100">Add Home</Button>
                </DropdownItem>
            </Collapse>
        </NavItem>
    );
  }
}
