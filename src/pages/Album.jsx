import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../styles/page-album.css';

class Album extends React.Component {
  constructor() {
    super();

    this.getSongs = this.getSongs.bind(this);

    this.state = {
      musics: [],
      loading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    this.getSongs(id);
  }

  getSongs(id) {
    this.setState({ loading: true }, async () => {
      const musics = await getMusics(id);
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ loading: false, favoriteSongs, musics });
    });
  }

  render() {
    const { musics, loading, favoriteSongs } = this.state;
    const {
      artistName,
      collectionName,
      artworkUrl100,
    } = musics.length > 0 ? musics[0] : { artistName: '', collectionName: '', artworkUrl100: '' };

    return (
      <div data-testid="page-album" className="page-album">
        <Sidebar />
        <div className="container">
          <section className="left">
            <div className="album">
              <img src={ artworkUrl100 } alt={ collectionName } />
              <span data-testid="album-name">{` ${collectionName} `}</span>
              <span data-testid="artist-name">{` ${artistName}`}</span>
            </div>
          </section>
          { loading && <Loading /> }

          <div className="right">
            <div className="music-container">
              { musics.map((music) => {
                if (musics.indexOf(music) !== 0) {
                  const favoriteSong = favoriteSongs.some((favorite) => (
                    favorite.trackId === music.trackId));
                  return (
                    <MusicCard
                      key={ music.previewUrl }
                      music={ music }
                      favoriteSong={ favoriteSong }
                    />);
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};

export default Album;
