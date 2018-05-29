import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumForPhoto from './AlbumForPhoto';

const Photo = ({photo, person, user, albumsPerson}) => {
  if (!photo || !person) {
    return null;
  }
  return (
    <div className="container">
      <div>
        <img className="img-home" src={photo.imageURL} /><br />
        <p>{photo.title}</p>
        <p>{photo.description}</p>
      </div>
      {/*<div>
      {
        person.email ? (
          <AlbumForPhoto photo={photo} person={person} albumsPerson={albumsPerson} />
        ) : null
      }
    </div>*/}
    </div>
  );
};

const mapStateToProps = ({ user, people, albums, photos }, { id }) => {
  const photo = photos.find( photo => photo.id === id );
  const person = people.find( person => person.id === photo.personId);
  const albumsPerson = albums.find(album => album.personId === person.id);
  // const photosAlbum = photos.filter( photo => photo.albumId === album.id);
  // const photosUser = photos.filter( photo => photo.userId === user.id);
  return {
    photo,
    person,
    user,
    albumsPerson
  };
};

export default connect(mapStateToProps)(Photo);
