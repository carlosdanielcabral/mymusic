import React from 'react';
import PropTypes from 'prop-types';
import AlbumCard from './AlbumCard';
import '../styles/album-container.css';

class AlbumContainer extends React.Component {
  render() {
    const { albums, search } = this.props;

    return (
      <div className="albuns-container">
        <h2>
          {`Resultado de álbuns de: ${search}`}
        </h2>

        <div className="albuns">

          { albums.map((album) => {
            const { collectionName, artworkUrl100, collectionId } = album;
            return (<AlbumCard
              key={ collectionId }
              image={ artworkUrl100 }
              collection={ collectionName }
              collectionId={ collectionId }
            />);
          })}
        </div>
      </div>
    );
  }
}

AlbumContainer.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
};

export default AlbumContainer;
