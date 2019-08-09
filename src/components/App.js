import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { login_account, fetchUser } from '../reducers/authReducer';
import { fetchCarts } from '../reducers/productReducer';
import history from '../history';
import Home from './pages/home';
import Produsts from './pages/products';
import Produst from './pages/product';
import Payment from './pages/payment';
import Cart from './pages/cart';
import SignIn from './pages/account/signin';
import SignUp from './pages/account/signup';
import Profile from './pages/account/profile';
import Address from './pages/account/address';
import Password from './pages/account/password';

import './App.css';

export class App extends Component {
  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('Session'));
    if (localData) {
      this.props.login_account(localData);
      this.props.fetchUser(localData);
      this.props.fetchCarts(localData);
    }
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Produsts} />
          <Route path="/products/:type" exact component={Produsts} />
          <Route path="/product/:id" exact component={Produst} />
          <Route path="/payment" exact component={Payment} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/account/login" exact component={SignIn} />
          <Route path="/account/signup" exact component={SignUp} />
          <Route path="/account/profile" exact component={Profile} />
          <Route path="/account/address" exact component={Address} />
          <Route path="/account/password" exact component={Password} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  { login_account, fetchUser, fetchCarts }
)(App);
