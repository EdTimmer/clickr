import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AlbumForPhoto from './AlbumForPhoto';

const Photo = ({user, people, albums, photos, id }) => {

  // console.log('person is:', person);
  // console.log('albumsPerson is:', albumsPerson);
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
  document.getElementById('theme_css').href = '/vendor/style-1.css';


  return (
    <div className="container">
    <style><link rel='stylesheet' type='text/css' href={person.theme} id="theme_css" /></style>
      <div>
        <img className="center" src={photo.imageURL} width={1000} /><br />
        <p>{photo.title}</p>
        <p>{photo.description}</p>
      </div>
      <div>
      {
        person.email === user.email ? (
          <AlbumForPhoto photo={photo} person={person} albumsPerson={albumsPerson} />
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
