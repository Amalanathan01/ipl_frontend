import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppHeaderDropdown, AppSidebarToggler, AppNavbarBrand } from '@coreui/react';
import logo from '../images/IPL-logo.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
  render() {
    //const { children, ...attributes } = this.props;

    return (
        <React.Fragment>
            <AppSidebarToggler className="d-md-down-none" display="lg" />
        <AppNavbarBrand
            full={{ src: logo, width: 130, height: 40, alt: 'CoreUI Logo' }}
            />
        
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
            <i className="icon-user" />
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
         </Nav>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
