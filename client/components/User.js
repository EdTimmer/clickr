import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreate from './PhotoCreate';

class User extends React.Component {
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
    const { user, users, albums, photos, albumsUser, photosUser } = this.props;
    const { showPhotoCreate } = this;
    const { showCreate } = this.state;
    if (!user) {
      return null;
    }
  
    return (
      <div className="container">
        <h1>{ user.name }</h1>
          {
            showCreate ? null : ( <button onClick={ showPhotoCreate }> Add Photo </button> )
          }        
        <div>
          {
            showCreate ? <PhotoCreate id={this.props.id} parentHistory={this.props.history} albumsUser={ albumsUser } /> : null
          }
        </div>
        <div>
          <p>Albums:</p>
          {
            albumsUser.map(album => {
              return (
                <div key={album.id}>
                  <div>
                    <Link to={`/albums/${album.id}`}>{album.name}</Link>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div>
          <p>Photos:</p>
          {
            photosUser.map(photo => {
              return (
                <div key={photo.id}>
                  <img src={photo.imageURL} width={600} /><br />
                  <p>{photo.title}</p>
                  <Link to={`/photos/${photo.id}`}>details</Link><br />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, albums, photos }, { id }) => {
  const user = users.find( user => user.id === id );
  const albumsUser = albums.filter( album => album.userId === user.id);
  const photosUser = photos.filter( photo => photo.userId === user.id);
  // const campusOfThisStudent = campuses.find(campus=> campus.id === student.campusId);
  console.log('albums is:', albums);
  console.log('albumsUser is:', albumsUser);
  return {
    user,
    users,
    albums,
    photos,
    albumsUser,
    photosUser
  };
};

export default connect(mapStateToProps)(User);
