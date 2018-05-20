import React, { Component } from 'react';
import { connect } from 'react-redux';
import { savePhoto } from '../store/photos';

class PhotoCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: this.props.photo ? this.props.photo.imageURL : null,
      title: '',
      description: '',
      userId: this.props.user.id,
      albumId: -1
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.previewFile = this.previewFile.bind(this);
  }

  previewFile() {
    const preview = document.querySelector('img');
    const file = preview ? document.querySelector('input[type=file]').files[0] : null;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = reader.result;
      this.setState({ imageURL: image });
      console.log('image is:', image);
      preview.src = image;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const photoInfo = this.state;
    this.props.savePhoto(photoInfo)
      .then(() => this.setState({ albumId: -1 }));
  }

  render(){
    const { user, albums, albumsUser } = this.props;
    const { onChange, onSave, previewFile } = this;
    const { albumId, imageURL } = this.state;
    if (!user) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <div>
          <h3>Add A New Photo</h3>
          <form onSubmit={ onSave }>
            <div>
              <input name="title" onChange={onChange} placeholder="Title" />
            </div><br />
            <div>
              <input name="description" onChange={onChange} placeholder="Description" />
            </div>
            <div>
              <label htmlFor='imageURL'>New Photo: </label><br />
              <input type="file" name='imageURL' onChange={previewFile} />
              <img src="/images/Preview-icon.png" alt="Image preview..." width={100} /> 
            </div>
            <div className='form-group'>
              <select name='albumId' onChange={onChange}>
                <option value="-1"> Select Album </option>
                {
                  albumsUser.map(album => <option key={album.id} value={album.id}> {album.name} </option>)
                }
              </select>
            </div>
            <button type="submit" disabled={(albumId * 1 === -1) || !imageURL }> Upload </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = ({ users, albums }, { id, albumsUser }) => {
  const user = users.find(user => user.id === id);
  return {
    users,
    user,
    albums,
    albumsUser
  };
};

const mapDispatch = (dispatch, { parentHistory, id }) => {
  return {
    savePhoto: (photoInfo) => dispatch(savePhoto(photoInfo, parentHistory, id)),
  };
};

export default connect(mapState, mapDispatch)(PhotoCreate);
