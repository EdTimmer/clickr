import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Photo = ({photo}) => {
  if (!photo) {
    return null;
  }
  return (
    <div className="container">
      <div>
        <img className="img-home" src={photo.imageURL} /><br />
        <p>{photo.title}</p>
        <p>{photo.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ albums, photos }, { id }) => {
  const photo = photos.find( photo => photo.id === id );
  // const photosAlbum = photos.filter( photo => photo.albumId === album.id);
  // const photosUser = photos.filter( photo => photo.userId === user.id);
  return {
    photo
  };
};

export default connect(mapStateToProps)(Photo);
