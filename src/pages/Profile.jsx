import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.getUserData = this.getUserData.bind(this);

    this.state = {
      name: '',
      email: 'Sem email cadastrado',
      description: 'Eu estou usando o MyMusic!',
      image: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.setState({ loading: true });

    getUser().then((userData) => {
      const { name, email, image, description } = userData;
      
      this.setState({ name, loading: false });

      if (image.length > 0) this.setState({ image });
      if (email.length > 0) this.setState({ email });
      if (description.length > 0) this.setState({ description })
    });
  }

  render() {
    const { name, email, image, description, loading } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        {
          loading
            ? <Loading />
            : <div className="data-container">
                <Link to="/profile/edit">Editar perfil</Link>
                <div className="image">
                  <img src={ image } data-testid="profile-image" alt="Profile" />
                </div>

                <div className="personal-data">
                  <h2>Nome</h2>
                  <h3>{ name }</h3>

                  <h2>Email</h2>
                  <h3>{ email }</h3>

                  <h2>Description</h2>
                  <h3>{ description }</h3>
                </div>
              </div>
        }
      </div>
    );
  }
}

export default Profile;
