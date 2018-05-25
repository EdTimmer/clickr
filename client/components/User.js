import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreate from './PhotoCreate';
import { saveUser, deleteUser } from '../store/users';
import AlbumCreate from './AlbumCreate';
import themes from '../themes';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhotoCreate: false,
      showAlbumCreate: false,
      theme: this.props.user ? this.props.user.theme : 'style-1.css'
    };
    this.photoCreate = this.photoCreate.bind(this);
    this.albumCreate = this.albumCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveTheme = this.saveTheme.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  photoCreate(ev) {
    ev.preventDefault();
    this.setState({ showPhotoCreate: true });
  }
  albumCreate(ev) {
    ev.preventDefault();
    this.setState({ showAlbumCreate: true });
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  saveTheme(ev) {
    ev.preventDefault();
    const userInfo = {
      id: this.props.user.id,
      theme: this.state.theme
    };
    this.props.saveUser(userInfo);
  }
  onDelete() {
    this.props.deleteUser({id: this.props.id});
  }
  render() {
    const { user, albumsUser, photosUser } = this.props;
    const { photoCreate, albumCreate, saveTheme, onChange, onDelete } = this;
    const { showPhotoCreate, showAlbumCreate, theme } = this.state;
    if (!user || !albumsUser) {
      return null;
    }
    document.getElementById('theme_css').href = this.state.theme;

    return (
      <div className="container">
        <h1>{ user.name }</h1>   
        <div className="row">
          <div className="col">
            <div>
              {
                showPhotoCreate ? null : ( <button onClick={ photoCreate }> Add Photo </button> )
              }
            </div>
            <div>
              {
                showPhotoCreate ? <PhotoCreate id={this.props.id} parentHistory={this.props.history} albumsUser={ albumsUser } /> : null
              }
            </div><br />
            <div>
              {
                showAlbumCreate ? null : ( <button onClick={ albumCreate }> Add Album </button> )
              }
            </div>
            <div>
              {
                showAlbumCreate ? <AlbumCreate userId={this.props.id} parentHistory={this.props.history} /> : null
              }
            </div>
          </div>
          <div className="col">
            <p><i>Select Theme</i></p>
          <form onSubmit={saveTheme}>
            <select value={theme} name="theme" onChange={ onChange }>
              {
                themes.map(_theme => {
                  return (
                    <option key={_theme.id} value={_theme.file}>
                      {_theme.name}
                    </option>
                  );
                })
              }
            </select>
            <button> Save Theme </button>
          </form>
          </div>
        </div>
        <div className="center"><br />
          <p>Albums:</p>
          {
            albumsUser.map(album => {
              return (
                <ul key={album.id}>
                  <li>
                    <Link to={`/albums/${album.id}`}>{album.name}</Link>
                  </li>
                </ul>
              );
            })
          }
        </div>
        <div align="center">
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
        <button type="submit" onClick={onDelete}>Delete User</button>
      </div>
    );
  }
}

const mapStateToProps = ({ users, albums, photos }, { id }) => {
  const user = users.find( user => user.id === id );
  const albumsUser = albums.filter( album => album.userId === id);
  const photosUser = photos.filter( photo => photo.userId === id);
  return {
    user,
    albumsUser,
    photosUser
  };
};

const mapDispatch = (dispatch, { history }) => {
  console.log('HISTORY in mapDispatch is:', history);
  return {
    saveUser: (userInfo) => dispatch(saveUser(userInfo)),
    deleteUser: (user) => dispatch(deleteUser(user, history))
  };
};

export default connect(mapStateToProps, mapDispatch)(User);
