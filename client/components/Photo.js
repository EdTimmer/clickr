import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumForPhoto from './AlbumForPhoto';
import PhotoDelete from './PhotoDelete';

const Photo = ({user, people, albums, photos, id, history }) => {

  const photo = photos.find( _photo => _photo.id === id );
  if (!photo) {
    return null;
  }
  const person = people.find( _person => _person.id === photo.personId);
  if (!person) {
    return null;
  }  
  const albumsPerson = albums.filter(album => album.personId === person.id);
  if (!albumsPerson) {
    return null;
  }

  // document.getElementById('theme_css').href = person.theme;
  // document.getElementById('theme_css').href = '/vendor/style-1.css';
  // console.log('history:', history);

  return (
    <div className="container">
    <style><link rel='stylesheet' type='text/css' href={person.theme} id="theme_css" /></style>
      <div>
        <img className="img-home" src={photo.imageURL} width={1000} /><br />
        <p>{photo.title}</p>
        <p>{photo.description}</p>
      </div>
      <div>
      {
        person.email === user.email ? (
          <div>
            <AlbumForPhoto photo={photo} person={person} albumsPerson={albumsPerson} />
            <PhotoDelete photo={photo} parentHistory={history} id={person.id} />
          </div>
        ) : null
      }
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, people, albums, photos }, { id }) => {
  // const photo = photos.find( photo => photo.id === id );
  // const person = people.find( person => person.id === photo.personId);
  // const albumsPerson = albums.filter(album => album.personId === person.id);
  // const photosAlbum = photos.filter( photo => photo.albumId === album.id);
  // const photosUser = photos.filter( photo => photo.userId === user.id);
  return {
    photos,
    people,
    // person,
    user,
    albums,
    id
    // albumsPerson
  };
};

export default connect(mapStateToProps)(Photo);
