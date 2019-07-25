import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { login_account, fetchUser } from '../reducers/authReducer';
import { fetchCarts } from '../reducers/productReducer';
import history from '../history';
import Home from './pages/home/index';
import Produsts from './pages/products/index';
import Produst from './pages/product/index';
import Payment from './pages/payment/index';
import Cart from './pages/cart/index';
import SignIn from './pages/account/signin/index';
import SignUp from './pages/account/signup/index';

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
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  { login_account, fetchUser, fetchCarts }
)(App);
