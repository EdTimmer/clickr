import axios from 'axios';

const GOT_USERS = 'GOT_USERS';
const DELETE_USER ='DELETE_USER';
const GET_USER = 'GET_USER';
const UPDATE_USER = 'UPDATE_USER';

const addUsersToStore = users => {
  const action = { type: GOT_USERS, users };
  return action;
};

const deleteUserInStore = user => {
  const action = { type: DELETE_USER, user };
  return action;
};

const updateUserInStore = user => {
  const action = { type: UPDATE_USER, user };
  return action;
};
export const addUser = user => {
  const action = { type: GOT_USER, user };
  return action;
};

const reducer = (state = [], action) => {
  switch (action.type) {
  case GOT_USERS:
    return action.users;
  case DELETE_USER:
    return state.filter(user => user.id !== action.user.id);
  case UPDATE_USER:
    console.log(action.user)
    return state.map(user => user.id === action.user.id ? action.user : user);
  case GET_USER:
    return [...state, action.user];
  default:
    return state;
  }
};

export const getUsers = () => (
  dispatch => {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => dispatch(addUsersToStore(users)));
  }
);

export const saveUser = (userInfo, history) => (
  dispatch => {
    return axios.put(`api/users/${userInfo.id}`, userInfo)
      .then(result => result.data)
      .then(user => {
        dispatch(updateUserInStore(user));
      })
      .then(() => history.push('/'));
  }
);

export const deleteUser = (user, history) => (
  dispatch => {
    return axios.delete(`api/users/${user.id}`)
      .then( () => dispatch(deleteUserInStore(user)))
      .then( () => history.push('/users'));
  }
);

export default reducer;
