import React, { Component } from 'react';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        Album , criar lista de musica
      </div>
    );
  }
}
