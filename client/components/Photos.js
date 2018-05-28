import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Photos = ({photos, albums, people}) => {
  if (photos.length > 0) {

    document.getElementById('theme_css').href = 'style-1.css';

    return (
      <div>
        <h1>All Photos</h1>
          <p><i>Number of photos in clickr:</i> <strong>{photos.length}</strong></p>
        <div className="container-1">
          {
            photos.map(photo => {
              const album = albums.find(album => album.id === photo.albumId);
              const person = people.find(person => person.id === photo.personId);
              const albumName = album ? (<Link to={`/albums/${album.id}`}>{album.name}</Link>) : ('none');
              return (
                <div key={photo.id} className="photos-box">
                  <img src={photo.imageURL} height={400} /><br />
                  <Link to={`/photos/${photo.id}`}>details</Link><br />
                  <p>by: {person.name}</p>
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
        {/*<Link to="/photocreate">Add photo</Link>*/}
      </div>
    );
  }
};

const mapStateToProps = ({ photos, albums, people }) => {
  return {
    photos,
    albums,
    people
  }
};

export default connect(mapStateToProps)(Photos);
