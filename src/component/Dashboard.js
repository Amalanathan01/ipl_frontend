import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../_nav';
import routes from '../routes';
const jwt = require('jsonwebtoken');

const DefaultFooter = React.lazy(() => import('./Footer'));
const DefaultHeader = React.lazy(() => import('./Header'));

class DashBoard extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    state = {
        isAdmin: false,
        decodedToken: jwt.decode(sessionStorage.getItem("token")),
        addedNavigation : false
    };

    signOut(e) {
      console.log(e)
    e.preventDefault()
    sessionStorage.clear()
    this.props.history.push('/login')
    }

    componentDidMount() {
        const dateNow = new Date();
        if (this.state.decodedToken
            && this.state.decodedToken.exp >= (dateNow.getTime() / 1000)
            && this.state.decodedToken.data.role === 'admin') {
            this.setState({
                isAdmin: true
            })
        }
    }

    render() {
        if (this.state.isAdmin && !this.state.addedNavigation) {
            this.setState({
                addedNavigation : true
            })
        navigation.items.push({
            name: 'Manage Score',
            url: '/managescore',
            icon: 'icon-puzzle'
        });
        navigation.items.push({
            name: 'Batsman Teams',
            url: '/manageteams',
            icon: 'icon-puzzle'
        })
        }
      return (
          <div className="app" style={{ backgroundColor: '#07888B' }}>
            <AppHeader fixed style={{ backgroundColor: "#141B2F"}}>
         // <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          //</Suspense>
        </AppHeader>
        <div className="app-body">
            <AppSidebar style={{ backgroundColor: "#141B2F" }}>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/dashboard" to="/" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
				
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DashBoard;
