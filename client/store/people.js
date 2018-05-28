import axios from 'axios';

const GOT_PEOPLE = 'GOT_PEOPLE';
const DELETE_PERSON = 'DELETE_PERSON';
const GET_PERSON = 'GET_PERSON';
const UPDATE_PERSON = 'UPDATE_PERSON';
const CREATE_PERSON = 'CREATE_PERSON';

const addPeopleToStore = people => {
  const action = { type: GOT_PEOPLE, people };
  return action;
};

const createPersonInStore = person => {
  const action = { type: CREATE_PERSON, person };
  return action;
};

const deletePersonInStore = person => {
  const action = { type: DELETE_PERSON, person };
  return action;
};

const updatePersonInStore = person => {
  const action = { type: UPDATE_PERSON, person };
  return action;
};

const addPersonInStore = person => {
  const action = { type: CREATE_PERSON, person };
  return action;
};


const reducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PEOPLE:
      return action.people;
    case DELETE_PERSON:
      return state.filter(person => person.id !== action.person.id);
    case UPDATE_PERSON:
      return state.map(person => person.id === action.person.id ? action.person : person);
    case GET_PERSON:
      return [...state, action.person];
    case CREATE_PERSON:
      return [...state, action.person];
    default:
      return state;
  }
};

export const getPeople = () => (
  dispatch => {
    axios.get('/api/people')
      .then(res => res.data)
      .then(people => dispatch(addPeopleToStore(people)));
  }
);

export const savePerson = (personInfo) => (
  dispatch => {
    return axios.put(`/api/people/${personInfo.id}`, personInfo)
      .then(result => result.data)
      .then(person => dispatch(updatePersonInStore(person)));
  }
);

export const addPerson = (personInfo) => (
  dispatch => {
    return axios.post('api/people', personInfo)
      .then(result => result.data)
      .then(person => dispatch(addPersonInStore(person)));
  }
)

export const deletePerson = (person, history) => (
  dispatch => {
    return axios.delete(`/api/people/${person.id}`)
      .then( () => dispatch(deletePersonInStore(person)))
      .then( () => history.push('/people'));
  }
);

export default reducer;
