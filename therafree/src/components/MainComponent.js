import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';


class Main extends Component {

  render() {
    const HomePage = () => {
      return(
          <Home />
      );
    }

    return (
      <div>
        <Header />
        <div>
          <Switch>
              <Route exact path='/home' component={HomePage} />
              <Route exact path='/contactus' component={Contact} />
              <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Main);

