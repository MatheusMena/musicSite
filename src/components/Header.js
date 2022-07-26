import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import './header.css';

export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loads: false,
      userName: '',
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser = async () => {
    this.setState({
      loads: true,
    });

    const user = await getUser();

    this.setState({
      loads: false,
      userName: user.name,
    });
  }

  render() {
    const { loads, userName } = this.state;
    return (
      <div className="headers">
        { loads ? (
          <Loading />
        ) : (
          <header data-testid="header-component">
            <Link to="/search" data-testid="link-to-search">Search</Link>
            <Link to="/favorites" data-testid="link-to-favorites">favorites</Link>
            <Link to="/profile" data-testid="link-to-profile">profile</Link>
            <div data-testid="header-user-name">
              {userName}
            </div>
          </header>
        )}
      </div>
    );
  }
}
// testando avaliador
