import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUsers, getAlbums, getPhotos, getUserFromToken, getPeople } from '../store';

import Nav from './Nav';
import Home from './Home';
import Albums from './Albums';
import Photos from './Photos';
import Users from './Users';
import User from './User';
import People from './People';
import Person from './Person';
import Album from './Album';
import Photo from './Photo';
import Login from './Login';
import LoggedOut from './LoggedOut';
import SignUp from './SignUp';

class Main extends React.Component {
  componentDidMount() {
    this.props.fetch();
    if (window.localStorage.getItem('token')) {
      const token = window.localStorage.getItem('token');
      this.props.getUser(token);
    }
  }
  render() {
    return (
      <HashRouter>
        <div>
         <Route render={({location}) => <Nav path={location.pathname} />} />
          <div className="container-fluid">
            <Switch>
              <Route path="/users/:id" exact render={({match, history}) => <User id={ match.params.id * 1 } history={ history } /> } />
              <Route path="/people/:id" exact render={({match, history}) => <Person id={ match.params.id * 1 } history={ history } /> } />
              <Route path="/albums/:id" exact render={({match, history}) => <Album id={ match.params.id * 1 } history={ history } /> } />
              <Route path="/photos/:id" exact render={({match, history}) => <Photo id={ match.params.id * 1 } history={ history } /> } />
              <Route exact path="/users" component={ Users } />
              <Route exact path="/people" component={ People } />
              <Route exact path="/albums" component={ Albums } />
              <Route exact path="/photos" component={ Photos } />
              {/*<Route path='/login' component={ Login } />*/}
              <Route path='/login' exact render={({history}) => <Login history={ history } /> } />
              <Route path='/logged-out' component={ LoggedOut } />
              <Route path='/signup' component={ SignUp } />
              <Route exact path="/" component={ Home } />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </HashRouter>
    );
  }   
} 
  

const mapState = null;

const mapDispatch = dispatch => ({
  fetch() {
    dispatch(getPeople());
    dispatch(getAlbums());
    dispatch(getPhotos());
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  },
  getUsers() {
    dispatch(getUsers());
  }
});

export default connect(mapState, mapDispatch)(Main);
