import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePhoto } from '../store/photos';

class AlbumForPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: null
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev) {
    ev.preventDefault();
    const photoInfo = {
      id: this.photo.id,
      albumId: this.state.albumId,
      theme: this.props.person ? this.props.person.theme : 'style-1.css'
    }
    this.props.savePhoto(photoInfo);
  }
  render() {
    const { person, photo, albumsPerson } = this.props;
    const { onChange, onSave } = this;

    if (!photo && !person) {
      return null;
    }
    document.getElementById('theme_css').href = this.state.theme;
    console.log('albumsPerson is:', albumsPerson);
    return (
      <div className="container">    
test
        {/*<form onSubmit={ onSave }>
          <div className='form-group'>
            <select name='albumId' onChange={onChange}>
              <option value="-1"> Select Album </option>
              {
                albumsPerson.map(album => <option key={album.id} value={album.id}> {album.name} </option>)
              }
            </select>
          </div>
            </form>*/}
      </div>
    );
  }
}

const mapStateToProps = ({ people, albums, photos, user }, { id, albumsPerson, person, photo }) => {
  // const photo = photos.find( photo => photo.id === id );
  // const albumsPerson = albums.find(album => album.personId === user.id);
  // const person = people.find( person => person.id === user.id);
  return {
    photo,
    user,
    person,
    albumsPerson
  };
};

const mapDispatch = (dispatch) => {
  return {
    savePhoto: (photoInfo) => dispatch(savePhoto(photoInfo)),
  };
};

export default connect(mapStateToProps, mapDispatch)(AlbumForPhoto);
