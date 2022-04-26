import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/page-index.css';

const Index = () => {
  const { push } = useHistory();
  return (
    <div className="index-page-container">
      <header>
        <div>
          Brand
        </div>
        <nav>
          <Link to="/login">
            Login
          </Link>
          <Link to="/login">
            Cadastro
          </Link>
        </nav>
      </header>

      <div>
        <section>
          <h1>MyMusic</h1>
          <h2>O seu app de música!</h2>
          <button
            type="button"
            onClick={() => push('/search')}>
            Ouça
          </button>
        </section>

      </div>
    </div>
  )
};

export default Index;
