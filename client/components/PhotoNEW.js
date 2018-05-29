import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePhoto } from '../store/photos';

class Photo extends React.Component {
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
    const { person, user, photo, albumsPerson } = this.props;
    const { onChange, onSave } = this;

    if (!photo && !person) {
      return null;
    }
    document.getElementById('theme_css').href = this.state.theme;
    return (
      <div className="container">
        <div className="img-home">
          <img src={photo.imageURL} /><br />
          <p>{photo.title}</p>
          <p>{photo.description}</p>
        </div>
        {/*<div>
          {
            person.email === user.email ? (
              <form onSubmit={ onSave }>
              <div className='form-group'>
              <select name='albumId' onChange={onChange}>
                <option value="-1"> Select Album </option>
                {
                  albumsPerson.map(album => <option key={album.id} value={album.id}> {album.name} </option>)
                }
              </select>
            </div>
            </form>
            ) : null
          }
        </div>*/}
      </div>
    );
  }
}

const mapStateToProps = ({ people, albums, photos, user }, { id }) => {
  const photo = photos.find( photo => photo.id === id );
  const albumsPerson = albums.find(album => album.personId === user.id);
  const person = people.find( person => person.id === user.id);
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

// export default connect(mapStateToProps, mapDispatch)(Photo);
