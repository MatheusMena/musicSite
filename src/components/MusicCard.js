import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ischecked: false,
      load: false,
      favList: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = async () => {
    this.setState({
      ischecked: true,
      load: true,
    });
    const { trackId } = this.props;
    const adSong = await addSong(trackId);
    const favTo = getFavoriteSongs();
    this.setState({
      favList: adSong,
      load: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { ischecked, load } = this.state;
    return (
      <div data-testid="audio-component">
        { trackName }
        <audio src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          Favorita
          {load ? <Loading /> : null}
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleClick }
            checked={ ischecked }
          />

        </div>
      </div>);
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
};
