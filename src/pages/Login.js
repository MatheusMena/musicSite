import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      loginName: '',
      load: false,
      userAprove: false,
    };
    this.handleSubmitValidation = this.handleSubmitValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

handleChange =({ target }) => {
  const { value, name } = target;
  this.setState({
    [name]: value,
  }, () => {
    const { loginName } = this.state;
    const minNumber = 3;
    if (loginName.length < minNumber) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  });
}

  handleSubmitValidation = async () => {
    const { loginName } = this.state;
    this.setState({
      load: true,
    });
    await createUser({ name: loginName });
    this.setState({
      userAprove: true,
    });
  }

  render() {
    const { isDisabled, loginName, load, userAprove } = this.state;
    return (
      <div data-testid="page-login">
        {userAprove ? <Redirect to="/search" /> : null}
        <form>
          {load ? <Loading /> : null}
          <input
            type="text"
            name="loginName"
            data-testid="login-name-input"
            value={ loginName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleSubmitValidation }
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
