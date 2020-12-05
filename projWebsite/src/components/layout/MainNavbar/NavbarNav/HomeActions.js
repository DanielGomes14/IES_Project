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

export default class HomeActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleHomeActions = this.toggleHomeActions.bind(this);
  }

  toggleHomeActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
        <NavItem className="border-right" tag={Dropdown} caret toggle={this.toggleHomeActions}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style={{paddingTop: "20px"}}>
                {" "}
                Home 1
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                <DropdownItem tag={Link} to="#">
                    <Badge pill theme="danger" className="mr-2" style={{lineHeight: "4px"}}> 2 </Badge>
                    Home 1
                </DropdownItem>
                <DropdownItem tag={Link} to="#">
                    <Badge pill theme="light" className="mr-2 text-white" style={{lineHeight: "4px"}}> 0 </Badge>
                    Home 2
                </DropdownItem>
                <DropdownItem tag={Link} to="#">
                    <Badge pill theme="danger" className="mr-2" style={{lineHeight: "4px"}}> 1 </Badge>
                    Home 3
                </DropdownItem>
                <DropdownItem tag={Link} to="/newhouse">
                    <Button theme="primary" outline={true} className="w-100">Add Home</Button>
                </DropdownItem>
            </Collapse>
        </NavItem>
    );
  }
}
