import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.getFavorites = this.getFavorites.bind(this);
    this.getSongs = this.getSongs.bind(this);
    this.state = {
      loading: false,
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  componentDidUpdate() {
    this.getSongs();
  }

  async getSongs() {
    const favoritesSongs = await getFavoriteSongs();
    this.setState((prevState) => {
      if (prevState.favoritesSongs !== favoritesSongs) {
        this.setState({ favoritesSongs, loading: false });
      }
    });
  }

  getFavorites() {
    this.setState({ loading: true }, async () => this.getSongs());
  }

  render() {
    const { favoritesSongs, loading } = this.state;

    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        { loading && <Loading /> }

        <div>
          { favoritesSongs.length > 0 ? (
            favoritesSongs.map((favorite) => (
              <MusicCard
                key={ favorite.trackId }
                music={ favorite }
                favoriteSong
              />))
          ) : null }
        </div>
      </div>
    );
  }
}

export default Favorites;
