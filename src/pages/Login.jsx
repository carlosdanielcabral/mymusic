import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/login.css';

const MIN_NAME_LENGTH = 3;

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);

    this.state = {
      userName: '',
      loading: false,
      logged: false,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  saveUser(event) {
    event.preventDefault();
    const { userName } = this.state;

    this.setState({ loading: true }, () => {
      createUser({ name: userName }).then(() => {
        this.setState({ loading: false, logged: true });
      });
    });
  }

  render() {
    const { userName, loading, logged } = this.state;

    return (
      <div data-testid="page-login" className="page-login">
        <h1>MyMusic</h1>
        <form className="login">
          <div className="form-group">
            <label htmlFor="userName">
              <input
                type="text"
                id="userName"
                name="userName"
                value={ userName }
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
            </label>

            <button
              type="submit"
              name="loginButton"
              disabled={ userName.length < MIN_NAME_LENGTH }
              onClick={ this.saveUser }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        </form>
        { loading && <Loading /> }
        { logged ? <Redirect to="/search" /> : null }
      </div>
    );
  }
}

export default Login;
