import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">      
      <h1>welcome to clickr</h1>
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
