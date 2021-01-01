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
import {current_home} from '../../../../utils/auth';

export default class HomeActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,loading:1
    };
    this.homes = [];
    this.current_home={"id":-1,"name":"error"};
    this.selected_home = this.current_home;
    
    this.toggleHomeActions = this.toggleHomeActions.bind(this);
  }
  componentDidMount(){
    HomeService.getHomesDropdown().then(data=>{this.homes=data});
    
    HomeService.getHomeById()
    .then(data => {
      this.setState({ 
        loading: 0,
        current_home:data
      });
    });
    
  }

  toggleHomeActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onChangeHome(index){
    this.selected_home = this.homes[index];
    this.ChangeHome();
  }

 
  ChangeHome(){
    this.current_home = this.selected_home;
    this.setState({
      current_home: this.current_home
    })
    current_home.change_home(this.current_home.id)
  }


  render() {
    var content = "";
    switch(this.state.loading) {
			case 0:
				content = this.state.current_home.name;
				break;
			case 1:
				content = "Loading...";
				break;
			case 2:
				content = "Ups! Something Went Wrong...";
				break;
    }
    
    return (
        <NavItem className="border-right" tag={Dropdown} caret toggle={this.toggleHomeActions}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3" style={{paddingTop: "20px"}}>
                {content}
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                {this.homes.map((home, index) => (
                  <DropdownItem key={index} tag={Link}  to="#">
                    <Badge pill theme="danger" className="mr-2"  style={{lineHeight: "4px"}}> 2 </Badge>
                    <span onClick={()=> this.onChangeHome(index)}>{home.name}</span>
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
