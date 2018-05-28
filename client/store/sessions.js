import axios from 'axios';

const SET_USER = 'SET_USER';

const setUser = user => {
  const action = { type: SET_USER, user};
  return action;
};

export const signUp = userInfo => {
  return dispatch => {
    return axios.post('/api/sessions/signup', userInfo)
      .then(result => {
        window.localStorage.setItem('token', result.data);
      })
      .then(() => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
      .catch(() => window.localStorage.removeItem('token'));
  };
};

export const getUserFromToken = token => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then( result => {
        dispatch(setUser(result.data));
        return result.data;
      })
      .catch(() => window.localStorage.removeItem('token'));
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('token');
    dispatch({
      type: SET_USER,
      user: {}
    });
  };
};

export const attemptLogin = (credentials, history) => {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then(result => window.localStorage.setItem('token', result.data))
      .then(() => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
      .then(() => history.push('/'))
      .catch((err) => {
        window.localStorage.removeItem('token');
        return err;
      });
  };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
  case SET_USER:
    return action.user;
  default:
    return state;
  }
};

export default reducer;
