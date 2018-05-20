import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({users, albums, photos}) => {
  if (users.length > 0) {
    return (
      <div className="conatiner">
      <div className="row">   
        <div className="col" />           
        <div className="col">
          <h1>All Users</h1><br />
          {
            users.map(user => {
              return (
                <div key={user.id}>
                  <div>
                    <p><Link to={`/users/${user.id}`}>{user.name}</Link></p>
                    <p><i>Number of albums:</i> {albums.filter( album => album.userId === user.id).length}</p> 
                    <p><i>Number of photos:</i> {photos.filter( photo => photo.userId === user.id).length}</p>                    
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="col">
          <p><i>Number of users:</i> <strong>{users.length}</strong></p>
          <Link to="/usercreate"><button>Add new user</button></Link>
        </div>
        <div className="col" />
      </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h4><i>There are no users at present.  Add a user.</i></h4>
        <Link to="/usercreate">Add User</Link>
      </div>
    );
  }
};

const mapStateToProps = ({ users, albums, photos }) => {
  return {
    users,
    albums,
    photos
  };
};

export default connect(mapStateToProps)(Users);
