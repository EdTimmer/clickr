import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store/sessions';
// import { NavLink } from 'react-router-dom';

const Nav = ({ path, user, logout }) => {
  return (
    <div className="navbar navbar-expand-lg navbar-light container">
        
        <div className="nav-item">
          <NavLink to="/" className="navbar-brand header">c l i c k r</NavLink>
        </div>
        <div className="nav-item">
          {
            user && user.id ? (
              <NavLink to={`/people/${user.id}`} className='nav-link' activeClassName="active">My Account</NavLink>
            ) : null
          }
        </div>
        <div className="nav-item">
          <NavLink to="/people" className='nav-link' activeClassName="active">People</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/albums" className='nav-link' activeClassName="active">All Albums</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/photos" className='nav-link' activeClassName="active">All Photos</NavLink>
        </div>
        <div className="nav-item">
        {
          user && user.id ? (
            <NavLink to='/' className='nav-link' onClick={ logout }>Logout { user.firstName }</NavLink>
          ) : (
            <NavLink className="nav-link" to="/login">Log In</NavLink>
          )
        }
        </div>
        <div className="nav-item">
        {
          user && user.id ? (
            null
          ) : (
            <NavLink className="nav-link" to="/signup" activeClassName='active'>Sign Up</NavLink>
          )
        }
        </div>
      
      <hr />

    </div>
  );
};

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(Nav);
