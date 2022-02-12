import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { image, collection, collectionId } = this.props;
    return (
      <div className="album-card">
        <img src={ image } alt={ collection } />
        <h2>{ collection }</h2>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  image: PropTypes.string.isRequired,
  collection: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
