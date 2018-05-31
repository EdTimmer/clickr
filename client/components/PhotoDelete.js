import React from 'react';
import { connect } from 'react-redux';
import { deletePhoto } from '../store/photos';

class PhotoDelete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: null
    };
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(ev) {
    ev.preventDefault();
    const photoInfo = {
      id: this.props.photo.id,
    };
    this.props.deletePhoto(photoInfo);
  }
  render() {
    const { photo } = this.props;
    const { onDelete } = this;

    if (!photo) {
      return null;
    }

    return (
      <div className="container">
        <button onClick={onDelete}>Delete Photo</button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }, { photo }) => {
  return {
    photo,
    user
  };
};

const mapDispatch = (dispatch, { parentHistory, id }) => {
  return {
    deletePhoto: (photoInfo) => dispatch(deletePhoto(photoInfo, parentHistory, id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(PhotoDelete);
