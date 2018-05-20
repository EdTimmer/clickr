import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ path }) => {
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
            path === '/users' ? (
              <p>Users</p>
            ) : (
              <Link to="/users">Users</Link>
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
      </div>
      <hr />
    </div>
  );
};

export default Nav;
