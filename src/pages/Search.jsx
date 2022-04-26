import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Sidebar from '../components/Sidebar';
import AlbumContainer from '../components/AlbumContainer';
import Loading from '../components/Loading';
import '../styles/search.css';

const MIN_ARTIST_NAME_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.requestAlbum = this.requestAlbum.bind(this);

    this.state = {
      loading: false,
      artistName: '',
      albums: [],
      albumsLoaded: false,
      search: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  clearInput() {
    this.requestAlbum();
    this.setState({ artistName: '' });
  }

  requestAlbum() {
    const { artistName } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(artistName)
      .then((data) => {
        this.setState({
          loading: false,
          albums: data,
          albumsLoaded: true,
          search: artistName,
        });
      });
  }

  render() {
    const {
      artistName: inputValue,
      albums,
      albumsLoaded,
      loading,
      search,
    } = this.state;

    const albumsContainer = albumsLoaded === true && albums.length > 0
      ? <AlbumContainer albums={ albums } search={ search } />
      : 'Nenhum álbum foi encontrado';

    return (
      <div data-testid="page-search" className="page-search">
        <Sidebar />
        <form className="search-form">
          <input
            type="text"
            name="artistName"
            className="artist-name"
            placeholder="Digite o nome do artista"
            value={ inputValue }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />

          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ inputValue.length < MIN_ARTIST_NAME_LENGTH }
            onClick={ this.clearInput }
          >
            Pesquisar
          </button>
        </form>
        { loading && <Loading /> }
        { albumsLoaded && albumsContainer }

      </div>
    );
  }
}

export default Search;
