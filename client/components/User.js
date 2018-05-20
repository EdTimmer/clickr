import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreate from './PhotoCreate';
import saveUser from '../store/users';
import AlbumCreate from './AlbumCreate';

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
      id: this.props.id,
      theme: this.state.theme
    };
    this.props.saveUser(userInfo);
  }
  render() {
    const { user, albumsUser, photosUser } = this.props;
    const { photoCreate, albumCreate, changeTheme, onChange } = this;
    const { showPhotoCreate, showAlbumCreate, theme } = this.state;
    if (!user || !albumsUser) {
      return null;
    }
    document.getElementById('theme_css').href = this.state.theme;
    const themes = [
      {
        id: 1,
        name: 'White',
        file: 'style-1.css'
      },
      {
        id: 2,
        name: 'Forest Green',
        file: 'style-2.css'
      },
      {
        id: 3,
        name: 'Light Blue',
        file: 'style-3.css'
      },
      {
        id: 4,
        name: 'Dark Grey',
        file: 'style-4.css'
      }
    ];

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
            <select value={theme} name="theme" onChange={onChange}>
              {
                themes.map(el => {
                  return (
                    <option key={el.id} value={el.file}>
                      {el.name}
                    </option>
                  );
                })
              }
            </select>
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
      </div>
    );
  }
}

const mapStateToProps = ({ users, albums, photos }, { id }) => {
  const user = users.find( user => user.id === id );
  const albumsUser = albums.filter( album => album.userId === user.id);
  const photosUser = photos.filter( photo => photo.userId === user.id);
  return {
    user,
    users,
    albums,
    photos,
    albumsUser,
    photosUser,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveUser: (userInfo) => dispatch(saveUser(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatch)(User);
