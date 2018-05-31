import axios from 'axios';

const GET_ALBUMS = 'GET_ALBUMS';
const UPDATE_ALBUM = 'UPDATE_ALBUM';
const CREATE_ALBUM = 'CREATE_ALBUM';
const DELETE_ALBUM = 'DELETE_ALBUM';
const DELETE_USER = 'DELETE_USER';

const addAlbumsToStore = albums => {
  const action = { type: GET_ALBUMS, albums };
  return action;
};

const createAlbumInStore = album => {
  const action = { type: CREATE_ALBUM, album };
  return action;
};

const deleteAlbumInStore = album => {
  const action = { type: DELETE_ALBUM, album };
  return action;
};

const updateAlbumInStore = album => {
  const action = { type: UPDATE_ALBUM, album };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GET_ALBUMS:
    return action.albums;
  case CREATE_ALBUM:
    return [...state, action.album];
  case DELETE_ALBUM:
    return state.filter(album => album.id !== action.album.id);
  case UPDATE_ALBUM:
    return state.map(album => album.id === action.album.id ? action.album : album);
  case DELETE_USER:
    return state.filter( album => album.userId !== action.user.id);
  default:
    return state;
  }
};

export const getAlbums = () => (
  dispatch => (
    axios.get('/api/albums')
      .then(res => res.data)
      .then(albums => dispatch(addAlbumsToStore(albums)))
  )
);

export const deleteAlbum = (album, history, id) => (
  dispatch => (
    axios.delete(`api/albums/${album.id}`)
      .then( () => dispatch(deleteAlbumInStore(album)))
      .then( () => history.push(`/people/${id}`))
  )
);

export const saveAlbum = (album, history) => (
  album.id ? (
    dispatch => (
      axios.put(`/api/albums/${album.id}`, album)
        .then(result => result.data)
        .then(album => dispatch(updateAlbumInStore(album))))
  ) : (
    dispatch => (
      axios.post(`api/albums`, album)
        .then(result => result.data)
        .then(album => dispatch(createAlbumInStore(album)))
        // .then( () => history.push('/albums'))
    )
  )
);

export default reducer;
