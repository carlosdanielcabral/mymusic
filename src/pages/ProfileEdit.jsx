import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/profile-edit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.getUserData = this.getUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveData = this.saveData.bind(this);

    this.state = {
      name: '',
      email: '',
      description: 'Eu estou usando o MyMusic',
      image: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png',
      loading: false,
      savedData: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  getUserData() {
    this.setState({ loading: true });

    getUser().then((userData) => {
      const { name, email, image, description } = userData;
      this.setState({ name, email, image, description, loading: false });
    });
  }

  saveData(event) {
    event.preventDefault();
    this.setState({ loading: true }, () => {
      const { name, email, image, description } = this.state;
      const data = { name, email, image, description };
      updateUser(data).then(() => {
        this.setState({ loading: false, savedData: true });
      });
    });
  }

  render() {
    const { name, email, image, description, loading, savedData } = this.state;
    const data = [name, description, image];
    const regexEmail = /\w+@\w+\.com/;
    const validEmail = regexEmail.test(email);
    const validInputs = data.every((value) => value.length > 0) && validEmail;
    if (savedData) return <Redirect to="/profile" />;

    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  name="name"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ this.handleChange }
                  placeholder="Digite seu nome"
                />

                <input
                  type="email"
                  name="email"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                  placeholder="Digite seu email"
                />

                <textarea
                  value={ description }
                  name="description"
                  onChange={ this.handleChange }
                  data-testid="edit-input-description"
                  placeholder="Descreva-se"
                  rows="5"
                />

                <input
                  type="text"
                  name="image"
                  onChange={ this.handleChange }
                  value={ image }
                  data-testid="edit-input-image"
                  placeholder="coloque o link de sua imagem"
                />

                <button
                  type="submit"
                  onClick={ this.saveData }
                  data-testid="edit-button-save"
                  disabled={ !validInputs }
                >
                  Salvar
                </button>
              </form>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
