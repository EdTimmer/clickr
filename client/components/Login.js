import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../store';

class Login extends React.Component {
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      error: null,
      errors: {}
    };
    this.validators = {
      email: (value) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value){
        return 'Please enter your email address.';
        }
        return regEx.test(String(value).toLowerCase()) ? null : 'Please enter a valid email address.';
      },
      password: (value) => {
        if (!value){
          return 'Please enter your password.';
          }
      },
    };
  }

  onLogin(ev) {
     ev.preventDefault();
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
    const credentials = this.state;
    this.props.attemptLogin(credentials)
    .then(err => {
      if (err){
      this.setState({ error: err.response.data.status });
      }
    });
  }

  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render(){
    const { email, password, error, errors } = this.state;
    const { onLogin, onChange } = this;
    return (
      <div>
        <h3> Login </h3>
        {
            error && (
              <div> The email or password you entered is not correct, please try again.
              </div>
            )
          }
        <form onSubmit={ onLogin }>
          <div>
            <input value={ email } onChange={ onChange } name="email" placeholder="Email" />
            <div>{ errors.email }</div>
          </div>
          <div>
            <input type="password" value={ password } onChange={ onChange } name="password" placeholder="Password" />
            <div>{ errors.password }</div>
          </div>
          <button> Login </button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials, history))
  };
};

export default connect(null, mapDispatch)(Login);
