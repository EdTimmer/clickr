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
    this.saveTheme = this.saveTheme.bind(this);
    this.changeTheme1 = this.changeTheme1.bind(this);
    this.changeTheme2 = this.changeTheme2.bind(this);
    this.changeTheme3 = this.changeTheme3.bind(this);
    this.changeTheme4 = this.changeTheme4.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  showPhotoCreate(ev) {
    ev.preventDefault();
    this.setState({ showCreate: true });
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
    // console.log(ev.target.value);
  }
  saveTheme(ev) {
    ev.preventDefault();
    const userInfo = {
      id: this.props.id,
      theme: this.state.theme
    };
    this.props.saveUser(userInfo);
  }
  changeTheme1() {
    document.getElementById('theme_css').href = 'style-1.css';
  }
  changeTheme2() {
    document.getElementById('theme_css').href = 'style-2.css';
  }
  changeTheme3() {
    document.getElementById('theme_css').href = 'style-3.css';
  }
  changeTheme4() {
    document.getElementById('theme_css').href = 'style-4.css';
  }
  render() {
    const { user, albumsUser, photosUser } = this.props;
    const { showPhotoCreate, changeTheme, onChange, changeTheme1, changeTheme2, changeTheme3, changeTheme4 } = this;
    const { showCreate, theme } = this.state;
    if (!user || !albumsUser) {
      return null;
    }
    // console.log('theme in local state is', this.state.theme);
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
        <button type="submit" onClick={changeTheme1}>Theme 1</button>
        <button type="submit" onClick={changeTheme2}>Theme 2</button>
        <button type="submit" onClick={changeTheme3}>Theme 3</button>
        <button type="submit" onClick={changeTheme4}>Theme 4</button>
        
        <form onSubmit={ changeTheme }>          
            <select value={theme} name="theme" onChange={onChange}>
              <option value="-1"> Select Theme </option>
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
          <button type="submit"> Change Theme </button>
        </form> 
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
