import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PhotoCreate from './PhotoCreate';
import { savePerson, deletePerson } from '../store/people';
import AlbumCreate from './AlbumCreate';
import themes from '../themes';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhotoCreate: false,
      showAlbumCreate: false,
      theme: this.props.person ? this.props.person.theme : 'style-5.css'
      // theme: this.props.person.theme
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
    const personInfo = {
      id: this.props.person.id,
      theme: this.state.theme
    };
    this.props.savePerson(personInfo);
  }
  onDelete() {
    this.props.deletePerson({id: this.props.id});
  }
  render() {
    const { person, albumsPerson, photosPerson, user } = this.props;
    const { photoCreate, albumCreate, saveTheme, onChange, onDelete } = this;
    const { showPhotoCreate, showAlbumCreate, theme } = this.state;
    if (!person) {
      return null;
    }
    if (!albumsPerson) {
      return null;
    }
    let myTheme = person.theme;
    if (!myTheme) {
      return null;
    }
    // document.getElementById('theme_css').href = theme;

    return (      
      <div className="container">
      <style><link rel='stylesheet' type='text/css' href={myTheme} id="theme_css" /></style>
        <h1>{ person.name }</h1>
        {
          person.email === user.email ? (
            <div className="row">
            <div className="col">
              <div>
                {
                  showPhotoCreate ? null : ( <button onClick={ photoCreate }> Add Photo </button> )
                }
              </div>
              <div>
                {
                  showPhotoCreate ? <PhotoCreate id={this.props.id} parentHistory={this.props.history} albumsPerson={ albumsPerson } /> : null
                }
              </div>
              <div>
                {
                  showAlbumCreate ? null : ( <button onClick={ albumCreate }> Add Album </button> )
                }
              </div>
              <div>
                {
                  showAlbumCreate ? <AlbumCreate personId={this.props.id} parentHistory={this.props.history} /> : null
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
              <button> Try Theme </button>
            </form>
            </div>
          </div>
          ) : null 
        }  
        
        <div className="center"><br />
          <p>Albums:</p>
          {
            albumsPerson ? (
              albumsPerson.map(album => {
                return (
                  <ul key={album.id}>
                    <li>
                      <Link to={`/albums/${album.id}`}>{album.name}</Link>
                    </li>
                  </ul>
                );
              })
            ) : ('none')
            
          }
        </div>
        <div align="center">
          {
            photosPerson.map(photo => {
              return (
                <div key={photo.id}>
                  <img src={photo.imageURL} width={600} /><br />
                  <p>{photo.title}<br />
                  <Link to={`/photos/${photo.id}`}>details</Link>
                  </p>
                </div>
              );
            })
          }
        </div>
        <div>
          {
            person.email === user.email ? (
              <div>
                <p>Delete your account and all of your albums and photos</p>
                <button type="submit" onClick={onDelete}>Delete Account</button>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ people, albums, photos, user }, { id }) => {
  const person = people.find( _person => _person.id === id );
  const albumsPerson = albums.filter( album => album.personId === id);
  const photosPerson = photos.filter( photo => photo.personId === id);
  // const theme = person.theme;
  return {
    person,
    albumsPerson,
    photosPerson,
    user,
    // theme
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    savePerson: (personInfo) => dispatch(savePerson(personInfo)),
    deletePerson: (person) => dispatch(deletePerson(person, history))
  };
};

export default connect(mapStateToProps, mapDispatch)(Person);
