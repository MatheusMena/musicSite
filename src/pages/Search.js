import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchArtist: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const { isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="searchArtist"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
