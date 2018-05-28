import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../store/sessions';
// import { NavLink } from 'react-router-dom';

const Nav = ({ path, user, logout }) => {
  return (
    <div className="container">
      <hr />
      <div className="row">
        <div className="col">
          {
            path === '/' ? (
              <p>c l i c k r</p>
            ) : (
              <Link to="/">c l i c k r</Link>
            )
          }
        </div>
        <div className="col">
          {
            path === '/people' ? (
              <p>People</p>
            ) : (
              <Link to="/people">People</Link>
            )
          }
        </div>
        <div className="col">
          {
            path === '/albums' ? (
              <p>All Albums</p>
            ) : (
              <Link to="/albums">All Albums</Link>
            )
          }
        </div>
        <div className="col">
          {
            path === '/photos' ? (
              <p>All Photos</p>
            ) : (
              <Link to="/photos">All Photos</Link>
            )
          }
        </div>
        <div className="nav-item">
        {
          user && user.id ? (
            <NavLink to='/' className='nav-link' onClick={ logout }>Logout { user.firstName }</NavLink>
          ) : (
            <NavLink className="nav-link" to="/login" activeClassName='active'>Log In</NavLink>
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
