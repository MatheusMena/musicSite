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
      favoriteList: [],
      loaded: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      loaded: true,
    });
    const fav = await getFavoriteSongs();
    this.setState({
      loaded: false,
      favoriteList: fav,
    }, () => {
      const { favoriteList } = this.state;
      const { trackId } = this.props;
      if (favoriteList.some((item) => item.trackId === trackId)) {
        console.log(favoriteList);
        this.setState({
          ischecked: true,
        });
      }
    });
  }

  // if (favoriteList.filter((item) => item === trackId).length > 0)
  handleClick = async () => {
    const { ischecked } = this.state;
    if (ischecked) {
      this.setState({
        ischecked: false,
        load: true,
      });
      const { trackId } = this.props;
      const list = { trackId };
      await getFavoriteSongs();
      await removeSong(list);
      await getFavoriteSongs();
      this.setState({
        load: false,
      });
    }
    if (ischecked === false) {
      this.setState({
        ischecked: true,
        load: true,
      });
      const { trackId, trackName, previewUrl } = this.props;
      const list = { trackId, trackName, previewUrl };
      await addSong(list);
      this.setState({
        load: false,
      });
      await getFavoriteSongs();
    }
  }

  render() {
    const { trackName, previewUrl, trackId, remov } = this.props;
    const { ischecked, load, loaded } = this.state;
    return (
      <div>
        {remov ? (null) : (
          <div>
            {loaded ? (<Loading />
            ) : (
              <div data-testid="audio-component">
                { trackName }
                <audio src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="input">
                  <p>Favorita</p>
                  {load ? <Loading /> : null}
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    onChange={ this.handleClick }
                    checked={ ischecked }
                  />

                </label>
              </div>
            )}
          </div>
        )}

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  remov: propTypes.bool.isRequired,
};
