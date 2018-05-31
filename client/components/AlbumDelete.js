import React from 'react';
import { connect } from 'react-redux';
import { deleteAlbum } from '../store/albums';

class AlbumDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: null
    };
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(ev) {
    ev.preventDefault();
    const albumInfo = {
      id: this.props.album.id,
    };
    this.props.deleteAlbum(albumInfo);
  }
  render() {
    const { album } = this.props;
    const { onDelete } = this;

    if (!album) {
      return null;
    }

    return (
      <div className="container">
        <button onClick={onDelete}>Delete Album</button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { album }) => {
  return {
    album,
    user
  };
};

const mapDispatch = (dispatch, { parentHistory, id }) => {
  console.log('parentHistory is:', parentHistory);
  return {
    deleteAlbum: (albumInfo) => dispatch(deleteAlbum(albumInfo, parentHistory, id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(AlbumDelete);
