import React from 'react';
import { connect } from 'react-redux';
import { signUpAddUser, addPerson } from '../store';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = {
      firstName: value => {
        if (!value) return 'First name is required.';
      },
      lastName: value => {
        if (!value) return 'Last name is required.';
      },
      email: value => {
        if (!value) return 'Email is required.';
      },
      password: value => {
        if (!value) return 'Password is required.';
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    this.props.addPerson(this.state);
    this.props.signUp(this.state);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { firstName, lastName, email, password, errors } = this.state;
    document.getElementById('theme_css').href = 'style-1.css';
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <input name='firstName' value={ firstName } onChange={ this.handleChange } placeholder='First Name' />
            <p>{ errors.firstName }</p>
          </div>
          <div>
            <input name='lastName' value={ lastName } onChange={ this.handleChange } placeholder='Last Name' />
            <p>{ errors.lastName }</p>
          </div>
          <div>
            <input name='email' value={ email } onChange={ this.handleChange } placeholder='Email' />
            <p>{ errors.email }</p>
          </div>
          <div>
            <input type='password' name='password' value={ password } onChange={ this.handleChange } placeholder='Password' />
            <p>{ errors.password }</p>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
  signUp(userInfo) {
    dispatch(signUpAddUser(userInfo, history));
  },
  addPerson(userInfo) {
    dispatch(addPerson(userInfo, history));
  }
});

export default connect(null, mapDispatch)(SignUp);
