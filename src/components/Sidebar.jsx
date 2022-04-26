import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [
    userImage,
    setUserImage
  ] = useState('https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png');

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const user = await getUser();
      const { name, image } = user;
      // console.log(name, image);
      // if (image.length > 0) setUserImage(image);
      // setUserName(name);
      setLoading(false);
    }
    getUserData();
  }, [setUserName, setUserImage]);

  return (
    <header data-testid="header-component">
      <section>

              <section className="user-data">
                <div className="image">
                  <img src={ userImage } alt="user" />
                </div>
                <h2 data-testid="header-user-name">{ userName }</h2>
              </section>

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

export default Sidebar;
