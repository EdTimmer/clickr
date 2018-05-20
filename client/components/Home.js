import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">      
      <div>
        <img align="center" src="/vendor/images/bridge2.jpg" width={1100} />
      </div><br />
      <div>
        <h1 align="right">c l i c k r     </h1>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, albums, photos }) => {
  return {
    users,
    albums,
    photos
  };
};

export default connect(mapStateToProps)(Home);
