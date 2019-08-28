import React from "react";
import Sidebar from "react-sidebar";

const mql = window.matchMedia(`(min-width: 800px)`);
 

class Header extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
 
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
 
  render() {
    return (
	<div>
	 <header class="navbar navbar-light">
      <button class="navbar-toggler sidebar-toggler" type="button" data-toggle="sidebar-show">
        <span class="navbar-toggler-icon"></span>
      </button>
     </header>
     
	  </div>
    );
  }
}

export default Header;
