import axios from 'axios';

const GET_PHOTOS = 'GET_PHOTOS';
const UPDATE_PHOTO = 'UPDATE_PHOTO';
const CREATE_PHOTO = 'CREATE_PHOTO';
const DELETE_PHOTO = 'DELETE_PHOTO';

const addPhotosToStore = photos => {
  const action = { type: GET_PHOTOS, photos };
  return action;
};

const createPhotoInStore = photo => {
  const action = { type: CREATE_PHOTO, photo };
  return action;
};

const deletePhotoInStore = photo => {
  const action = { type: DELETE_PHOTO, photo };
  return action;
};

const updatePhotoInStore = photo => {
  const action = { type: UPDATE_PHOTO, photo };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GET_PHOTOS:
    return action.photos;
  case CREATE_PHOTO:
    return [...state, action.photo];
  case DELETE_PHOTO:
    return state.filter(photo => photo.id !== action.photo.id);
  case UPDATE_PHOTO:
    return state.map( photo => photo.id === action.photo.id ? action.photo : photo);
  default:
    return state;
  }
};

export const getPhotos = () => (
  dispatch => (
    axios.get('/api/photos')
      .then(res => res.data)
      .then(photos => dispatch(addPhotosToStore(photos)))
  )
);

export const deletePhoto = (photo, history) => (
  dispatch => (
    axios.delete(`api/photos/${photo.id}`)
      .then( () => dispatch(deletePhotoInStore(photo)))
      .then( () => history.push('/photos'))
  )
);

export const savePhoto = (photo, history, id) => (
  photo.id ? (
    dispatch => (
      axios.put(`/api/photos/${photo.id}`, photo)
        .then(result => result.data)
        .then(photo => dispatch(updatePhotoInStore(photo))))
  ) : (
    dispatch => (
      axios.post(`api/photos`, photo)
        .then(result => result.data)
        .then(photo => dispatch(createPhotoInStore(photo)))
        // .then( () => history.push(`/users/${id}`))
    )
  )
);

export default reducer;
