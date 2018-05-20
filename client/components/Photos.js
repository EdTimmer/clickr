import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Photos = ({photos, albums, users})=> {
  if (photos.length > 0) {
    return (
      <div>
        <h1>All Photos</h1>
          <p><i>Number of photos in clickr:</i> <strong>{photos.length}</strong></p>
        <div>
          {
            photos.map(photo => {
              const album = albums.find(album => album.id === photo.albumId);
              const user = users.find(user => user.id === photo.userId);
              const albumName = album ? (<Link to={`/albums/${album.id}`}>{album.name}</Link>) : ('none');
    
              return (
                <div key={photo.id}>
                  <img src={photo.imageURL} width={400} /><br />
                  <Link to={`/photos/${photo.id}`}>details</Link><br />
                  <p>by: {user.name}</p>
                  <p><i>In album:</i> {albumName}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h4><i>There are no photos.  Please add photos.</i></h4>
        <Link to="/photocreate">Add photo</Link>
      </div>
    );
  }
};

const mapStateToProps = ({ photos, albums, users }) => {
  return {
    photos,
    albums,
    users
  }
};

export default connect(mapStateToProps)(Photos);
