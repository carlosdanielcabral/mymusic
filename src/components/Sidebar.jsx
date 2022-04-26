import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.getUser = this.getUser.bind(this);

    this.state = {
      loading: false,
      userName: '',
      userImage: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    this.setState({ loading: true }, () => {
      getUser().then((userData) => {
        const { name: userName, image: userImage } = userData;
        if (userData.image.length > 0) this.setState({ userImage });
        this.setState({ loading: false, userName })
      });
    });
  }

  render() {
    const { userName, loading, userImage } = this.state;
    return (
      <header data-testid="header-component">
        <section>
          <h1>MyMusic</h1>
          {
            loading
              ? <Loading />
              : (
                <section className="user-data">
                  <div className="image">
                    <img src={ userImage } alt="user" />
                  </div>
                  <h2 data-testid="header-user-name">{ userName }</h2>
                </section>
              )
          }
        </section>

        <nav>
          <ul>
            <li key="link1">
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>

            <li key="link2">
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>

            <li key="link3">
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
