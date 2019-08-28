import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import './App.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>

const Dashboard = Loadable({
	loader: () => import('./component/Dashboard'),
	loading
})

class App extends Component {
  render() {	
    return (
      <BrowserRouter>
	    <Switch>
	      <Route path="/" name="Dashboard" component = {Dashboard} />
	    </Switch>
	  </BrowserRouter>  
    );
  }
}

export default App;
