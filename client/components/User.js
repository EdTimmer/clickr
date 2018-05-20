import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreate from './PhotoCreate';
import saveUser from '../store/users';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreate: false,
      theme: this.props.user ? this.props.user.theme : 'style-1.css'
    };
    this.showPhotoCreate = this.showPhotoCreate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  showPhotoCreate(ev) {
    ev.preventDefault();
    this.setState({ showCreate: true });
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
    const { showPhotoCreate, changeTheme, onChange, changeTheme1, changeTheme2, changeTheme3, changeTheme4 } = this;
    const { showCreate, theme } = this.state;
    if (!user || !albumsUser) {
      return null;
    }
    document.getElementById('theme_css').href = this.state.theme;
    const themes = [
      {
        id: 1,
        name: 'style-1.css'
      },
      {
        id: 2,
        name: 'style-2.css'
      },
      {
        id: 3,
        name: 'style-3.css'
      },
      {
        id: 4,
        name: 'style-4.css'
      }
    ];
    return (
      <div className="container">
        <h1>{ user.name }</h1>   
        <div className="row">
          <div className="col">
            <div>
              {
                showCreate ? null : ( <button onClick={ showPhotoCreate }> Add Photo </button> )
              }
            </div>
            <div>
              {
                showCreate ? <PhotoCreate id={this.props.id} parentHistory={this.props.history} albumsUser={ albumsUser } /> : null
              }
            </div>
          </div>
          <div className="col">
            <p><i>Select Theme</i></p>
            <select value={theme} name="theme" onChange={onChange}>
              {
                themes.map(el => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })
              }
            </select>
          </div>
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
