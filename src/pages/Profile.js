import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      load: false,
      userName: '',
      email: '',
      description: '',
      image: '',
    };
    this.handleProfile = this.handleProfile.bind(this);
  }

  componentDidMount() {
    this.handleProfile();
  }

 handleProfile = async () => {
   this.setState({
     load: true,
   });
   const user = await getUser();
   console.log(user);
   this.setState({
     userName: user.name,
     email: user.email,
     description: user.description,
     image: user.image,
     load: false,
   });
 };

 render() {
   const { userName, email, description, image, load } = this.state;
   if (load) { return <Loading />; }
   return (
     <div data-testid="page-profile">
       <Header />
       <div>
         <p>{email}</p>
         <p>{description}</p>
         <p>{userName}</p>
         <Link to="/profile/edit">Editar perfil</Link>
         <img src={ image } data-testid="profile-image" alt="profile-pic" />
       </div>

     </div>
   );
 }
}
