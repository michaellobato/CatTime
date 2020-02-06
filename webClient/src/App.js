import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Navbar from './navBar';
import Landing from './landing';
import Register from './register';
import Login from './login';
import Home from './home';

export default () => (
  <Router>
    <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
    </div>
  </Router>
);
