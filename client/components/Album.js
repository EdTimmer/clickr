import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreateInAlbum from './PhotoCreateInAlbum';
import AlbumDelete from './AlbumDelete';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      theme: this.props.person ? this.props.person.theme : 'style-1.css'
    };
    this.showPhotoCreate = this.showPhotoCreate.bind(this);  
  }
  showPhotoCreate(ev) {
    ev.preventDefault();
    this.setState({ showCreate: true });
  }
  render() {
    const { id, person, people, album, photosAlbum, albums, photos, albumsUser, photosUser, user } = this.props;
    const { showPhotoCreate } = this;
    const { showCreate } = this.state;
    if (!album || !person) {
      return null;
    }
    
    document.getElementById('theme_css').href = this.state.theme;

    return (
      <div className="container">
        <h1>{ album.name }</h1>
        <h3>{ person.name }</h3>
        {
          person.email === user.email ? (
        <div>
          <div>
          {
            showCreate ? null : ( <button onClick={ showPhotoCreate }> Add Photo </button> )
          }    
          </div>    
          <div>
          {
            showCreate ? <PhotoCreateInAlbum personId={album.personId} albumId={id} parentHistory={this.props.history} /> : null
          }
          </div><br />
        </div>
          ) : null
        }        
        
        <div align="center">
          {
            photosAlbum.map(photo => {
              return (
                <div key={photo.id}>
                  <div>
                    <img src={photo.imageURL} width={600} /><br />
                    <p>{photo.title}<br />
                    <Link to={`/photos/${photo.id}`}>details</Link>
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div>
        {
          person.email === user.email ? (
            <div>
               <AlbumDelete album={album} parentHistory={this.props.history} id={person.id} />
            </div>
          ) : null
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ people, albums, photos, user }, { id }) => {
  const album = albums.find( album => album.id === id );
  if (!album) {
    return null;
  }
  const photosAlbum = photos.filter( photo => photo.albumId === album.id);
  if (!photosAlbum) {
    return null;
  }
  const person = people.find(person => person.id === album.personId);
  if (!person) {
    return null;
  }
  // const photosUser = photos.filter( photo => photo.personId === person.id);
  return {
    // person,
    // people,
    // albums,
    // photos,
    // albumsUser,
    // photosUser,
    album,
    photosAlbum,
    id,
    person,
    user
  };
};

export default connect(mapStateToProps)(Album);
