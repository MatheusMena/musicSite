import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumSongs: [],
      albumName: '',
      artistsName: '',
    };
    this.handleAlbumSongs = this.handleAlbumSongs.bind(this);
  }

  componentDidMount() {
    this.handleAlbumSongs();
  }

  handleAlbumSongs = async () => {
    const { match: { params: { id } } } = this.props;
    const song = await getMusics(id);
    console.log(song);
    this.setState({
      albumSongs: song.slice(1),
      albumName: song[0].collectionName,
      artistsName: song[0].artistName,
    });
  }

  render() {
    const { albumSongs, albumName, artistsName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div data-testid="artist-name">
          { artistsName }
        </div>
        <div data-testid="album-name">
          { albumName }
        </div>

        {albumSongs.map((item) => (
          <MusicCard
            key={ item.trackId }
            trackName={ item.trackName }
            previewUrl={ item.previewUrl }
            trackId={ item.trackId }
          />

        ))}

      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
  }).isRequired,
};
