import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <div>
        { loads ? (
          <Loading />
        ) : (
          <header data-testid="header-component">
            <div data-testid="header-user-name">
              {userName}
            </div>
          </header>
        )}
      </div>
    );
  }
}
