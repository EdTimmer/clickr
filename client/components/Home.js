import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {

  document.getElementById('theme_css').href = 'style-1.css';
  
  return (
    <div className="container">      
      <div>
        <img className="img-home" align="center" src="/vendor/images/bridge2.jpg" />
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
