/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbums from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: '',
      isDisabled: true,
      load: false,
      searchAlb: [],
      searched: false,
      saveArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchArtist } = this.state;
      const minNumber = 2;
      if (searchArtist.length < minNumber) {
        this.setState({
          isDisabled: true,
        });
      } else {
        this.setState({
          isDisabled: false,
        });
      }
    });
  }

  handleClick = async () => {
    const { searchArtist } = this.state;
    const album = await searchAlbums(searchArtist);
    console.log(album);
    this.setState({
      saveArtist: searchArtist,
      searchArtist: '',
      searchAlb: album,
    });
    const { searchAlb } = this.state;
    console.log(searchAlb);
    this.setState({
      load: true,
      searched: true,
    });
    this.setState({
      load: false,
    });
  }

  render() {
    const { isDisabled,
      searchArtist, load, searchAlb, searched,
      saveArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { load ? (<Loading />
        ) : (
          <form>
            <input
              name="searchArtist"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ searchArtist }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        {searched && searchAlb.length > 0
          ? (
            `Resultado de álbuns de: ${saveArtist}`) : null}

        {searchAlb ? (searchAlb.map((item) => (
          <div key={ item.collectionId }>
            {item.artistName}
            <Link
              key={ item.collectionId }
              data-testid={ `link-to-album-${item.collectionId}` }
              to={ `/album/${item.collectionId}` }
            >
              {item.collectionName}
            </Link>
          </div>
        ))
        ) : null }
        {searchAlb.length <= 0 && searched ? <p>Nenhum álbum foi encontrado</p> : null}
      </div>
    );
  }
}
