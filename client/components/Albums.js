import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Albums = ({albums, photos}) => {
  if (albums.length > 0) {
    return (
      <div className="container">
        <h1>All Albums</h1>
        <div>
          <p><i>Number of albums in clickr:</i> <strong>{albums.length}</strong></p>
        </div>
        <div>
          {
            albums.map(album => {
              return (
                <div key={album.id}>
                  <div>
                    <Link to={`/albums/${album.id}`}>{album.name}</Link>
                    <p><i>Number of photos:</i> {photos.filter( photo => photo.albumId === album.id).length}</p>                    
                  </div>
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
        <h4><i>There are no albums at present.  Add an album.</i></h4>
        <Link to="/albumcreate">Add Album</Link>
      </div>
    );
  }
};

const mapStateToProps = ({ albums, photos }) => {
  return {
    albums,
    photos
  };
};

export default connect(mapStateToProps)(Albums);
