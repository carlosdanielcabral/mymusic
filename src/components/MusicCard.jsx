import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/music-card.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    const { favoriteSong } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.saveFavoriteSong = this.saveFavoriteSong.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);

    this.state = {
      loading: false,
      checked: favoriteSong,
    };
  }

  handleChange(event) {
    const { checked } = event.target;
    this.setState({ checked }, () => {
      const { checked: favorite } = this.state;
      if (favorite) {
        this.saveFavoriteSong();
      } else {
        this.setState((prevState) => {
          if (!prevState.checked) this.removeFavorite();
        });
      }
    });
  }

  saveFavoriteSong() {
    const { music } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({ loading: false, checked: true });
    });
  }

  removeFavorite() {
    this.setState({ loading: true }, async () => {
      const { music } = this.props;
      await removeSong(music);
      this.setState({ loading: false });
    });
  }

  render() {
    const { music } = this.props;
    const { checked } = this.state;
    const { trackId, trackName: name, previewUrl, artworkUrl100, collectionName } = music;

    return (
      <div className="music">
        <h2>{name}</h2>
        <div className="music-player">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>

        <label htmlFor={ trackId }>
          Favorita

          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            name={ trackId }
            onChange={ this.handleChange }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
  favoriteSong: PropTypes.bool.isRequired,
};

export default MusicCard;
