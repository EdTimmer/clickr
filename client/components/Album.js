import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreateInAlbum from './PhotoCreateInAlbum';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false
    };
    this.showPhotoCreate = this.showPhotoCreate.bind(this);  
  }
  showPhotoCreate(ev) {
    ev.preventDefault();
    this.setState({ showCreate: true });
  }
  render() {
    const { id, user, users, album, photosAlbum, albums, photos, albumsUser, photosUser } = this.props;
    const { showPhotoCreate } = this;
    const { showCreate } = this.state;
    if (!album) {
      return null;
    }
  
    return (
      <div className="container">
        <h1>{ album.name }</h1>
          {
            showCreate ? null : ( <button onClick={ showPhotoCreate }> Add Photo </button> )
          }        
        <div>
          {
            showCreate ? <PhotoCreateInAlbum userId={album.userId} albumId={id} parentHistory={this.props.history} /> : null
          }
        </div>
        <div>
          
          {
            photosAlbum.map(photo => {
              return (
                <div key={photo.id}>
                  <div>
                    <img src={photo.imageURL} width={600} /><br />
                    <p>{photo.title}</p>
                    <Link to={`/photos/${photo.id}`}>details</Link>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ albums, photos }, { id }) => {
  const album = albums.find( album => album.id === id );
  const photosAlbum = photos.filter( photo => photo.albumId === album.id);
  // const photosUser = photos.filter( photo => photo.userId === user.id);
  return {
    // user,
    // users,
    // albums,
    // photos,
    // albumsUser,
    // photosUser,
    album,
    photosAlbum,
    id
  };
};

export default connect(mapStateToProps)(Album);
