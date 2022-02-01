import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      loadButton: false,
      userNameEdit: '',
      emailEdit: '',
      descriptionEdit: '',
      imageEdit: '',
      isDisabled: true,
    };
    this.handleProfileEdit = this.handleProfileEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
  }

  componentDidMount() {
    this.handleProfileEdit();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = () => {};
  } // Com referencia ao repositório https://github.com/tryber/sd-017-project-trybetunes/commit/016aeb7e13e34524b33d5d010399de961fb74dab

  handleSaveButton = async () => {
    this.setState({
      loadButton: true,
    });
    const { userNameEdit,
      emailEdit,
      descriptionEdit,
      imageEdit } = this.state;
    const UserSaved = {
      name: userNameEdit,
      email: emailEdit,
      description: descriptionEdit,
      image: imageEdit,

    };
    await updateUser(UserSaved);
    const { history } = this.props;
    history.push('/profile');
    this.setState({
      loadButton: false,
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { userNameEdit,
        emailEdit,
        descriptionEdit,
        imageEdit } = this.state;
      if (emailEdit.includes('@')
       && userNameEdit
       && descriptionEdit
       && imageEdit) {
        return this.setState({
          isDisabled: false,
        });
      }
    });
  }

  handleProfileEdit = async () => {
    this.setState({
      load: true,
    });
    const user = await getUser();
    console.log(user);
    this.setState({
      userNameEdit: user.name,
      emailEdit: user.email,
      descriptionEdit: user.description,
      imageEdit: user.image,
      load: false,
    });
  };

  render() {
    const { load,
      userNameEdit,
      emailEdit,
      descriptionEdit,
      imageEdit,
      isDisabled,
      loadButton } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {load ? (<Loading />
        ) : (
          <form>
            Username
            <input
              data-testid="edit-input-name"
              type="text"
              name="userNameEdit"
              value={ userNameEdit }
              onChange={ this.handleChange }
            />
            <br />
            Email
            <input
              data-testid="edit-input-email"
              type="email"
              name="emailEdit"
              value={ emailEdit }
              onChange={ this.handleChange }
            />
            <br />
            Descrição
            <input
              data-testid="edit-input-description"
              type="text"
              name="descriptionEdit"
              value={ descriptionEdit }
              onChange={ this.handleChange }
            />
            <br />
            Imagem de perfil
            <input
              data-testid="edit-input-image"
              type="img"
              name="imageEdit"
              value={ imageEdit }
              onChange={ this.handleChange }
            />
            <br />
            {loadButton ? (<Loading />
            ) : (
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ this.handleSaveButton }
              >
                Editar perfil

              </button>)}
          </form>

        )}
      </div>
    );
  }
}
ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
