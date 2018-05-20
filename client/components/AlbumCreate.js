import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAlbum } from '../store/albums';

class AlbumCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userId: this.props.userId      
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const albumInfo = this.state;
    this.props.saveAlbum(albumInfo);
  }

  render(){
    const { name } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <div>
          <h3>Add A New Album</h3>
          <form onSubmit={ onSave }>
            <div>
              <input name="name" onChange={onChange} placeholder="Album Name" />
            </div><br />
            
            
            
            <button type="submit" disabled={!name}> Make Album </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = ({ users, albums }, { userId }) => {
  // const user = users.find(user => user.id === id);
  return {
    userId
  };
};

const mapDispatch = (dispatch, { parentHistory, id }) => {
  return {
    saveAlbum: (albumInfo) => dispatch(saveAlbum(albumInfo, parentHistory, id)),
  };
};

export default connect(mapState, mapDispatch)(AlbumCreate);
