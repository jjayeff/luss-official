import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Home from './pages/home/index';
import Produsts from './pages/products/index';
import Produst from './pages/product/index';
import Payment from './pages/payment/index';
import './App.css';

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Produsts} />
          <Route path="/products/:type" exact component={Produsts} />
          <Route path="/product/:id" exact component={Produst} />
          <Route path="/payment" exact component={Payment} />
        </Switch>
      </Router>
    );
  }
}

export default App;
