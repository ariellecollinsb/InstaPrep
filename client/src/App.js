import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import API from "./utils/API";
import { API_URL } from './config';
import io from 'socket.io-client';

//Pages
import HomePage from "./views/Home.js";
import ProfilePage from "./views/Profile.js";
import DiscoverPage from "./views/Discover.js";
import AttributionsPage from "./views/Attributions.js";
import LoginPage from "./views/Login.js";
import RegisterPage from "./views/Register.js";
import MealsPage from "./views/Meals.js";
import LogoutPage from "./views/Logout.js";
import ShoppingListPage from "./views/ShoppingList.js";
import BlogPage from './views/Blog.js';
//Components
import { UserProvider } from './UserContext';

const socket = io(API_URL);

export default class App extends Component {
  setUser = (user) => {
    this.setState(state => ({
      user: user
    }));
  }

  isAuthenticated = () => {
    return this.state.user && Object.entries(this.state.user).length !== 0;
  }

  state = {
    loading: true,
    user: {},
    isAuthenticated: this.isAuthenticated,
    setUser: this.setUser,
    socket: socket
  }

  componentDidMount = () => {
    API.getSession()
      .then(res => {
        if (res.data.passport) {
          this.setState({
            user: res.data.passport.user
          })
        }
      })
  }

  render() {

    return (
      <UserProvider value={this.state}>
        <BrowserRouter>
          <Switch>
            <Route
              path="/index"
              render={props => <HomePage {...props} />}
            />
            <Route
              path="/profile"
              render={props => <ProfilePage {...props} />}
            />
            <Route
              path="/discover"
              render={props => <DiscoverPage {...props} />}
            />
            <Route
              path="/shoppinglist"
              render={props => <ShoppingListPage {...props} />}
            />
            <Route
              path="/login"
              render={props => <LoginPage {...props} />}
            />
            <Route
              path="/register"
              render={props => <RegisterPage {...props} />}
            />
            <Route
              path="/logout"
              render={props => <LogoutPage {...props} />}
            />
            <Route
              path="/meals"
              render={props => <MealsPage {...props} />}
            />
            <Route
              path="/blog"
              render={props => <BlogPage {...props} />}
            />
            <Route
              path="/attributions"
              render={props => <AttributionsPage {...props} />}
            />
            <Redirect to="/index" />
          </Switch>
        </BrowserRouter>
        <div className={"wrapper"}>
          <div className={"container"}>

          </div>
        </div>
      </UserProvider>
    );
  }

};