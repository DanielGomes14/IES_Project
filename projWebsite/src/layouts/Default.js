import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, timeoutsShape } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { current_home } from "../utils/auth";
import PageTitle from "../components/common/PageTitle";
import LocalStorageService from "../services/LocalStorageService";

class DefaultLayout extends React.Component {

	constructor(props) {
    super(props);

    this.children = props.children;
    this.noNavbar = props.noNavbar;
    this.noFooter = props.noFooter;
    
		this.state = {
      current_home: current_home.current_home(),
      refresh: false,
    }
  }

  componentDidMount() {
    this.setState({ current_home:  current_home.current_home(), refresh:true })
  }

  
	render() {
		if (this.state.refresh == false){
      return (
        <Container fluid>
          <Row>
            <MainSidebar />
            <Col
              className="main-content p-0"
              lg={{ size: 10, offset: 2 }}
              md={{ size: 9, offset: 3 }}
              sm="12"
              tag="main"
            >
              {!this.noNavbar && <MainNavbar />}
              <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                  <PageTitle sm="4" title="No House yet." className="text-sm-left" />
                </Row>
              </Container>
              {!this.noFooter && <MainFooter />}
            </Col>
          </Row>
        </Container>
      )
    } else {
      return (
        <Container fluid>
          <Row>
            <MainSidebar />
            <Col
              className="main-content p-0"
              lg={{ size: 10, offset: 2 }}
              md={{ size: 9, offset: 3 }}
              sm="12"
              tag="main"
            >
              {!this.noNavbar && <MainNavbar />}
              {this.children}
              {!this.noFooter && <MainFooter />}
            </Col>
          </Row>
        </Container>
      )
    }
  }
}
//   }
// const DefaultLayout = ({ children, noNavbar, noFooter }) => (
//   <Container fluid>
//     <Row>
//       <MainSidebar />
//       <Col
//         className="main-content p-0"
//         lg={{ size: 10, offset: 2 }}
//         md={{ size: 9, offset: 3 }}
//         sm="12"
//         tag="main"
//       >
//         {!noNavbar && <MainNavbar />}
//         {children}
//         {!noFooter && <MainFooter />}
//       </Col>
//     </Row>
//   </Container>
// );

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: true
};

export default DefaultLayout;
