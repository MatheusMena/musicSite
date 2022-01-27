// import React, { Component } from 'react';
// import Header from '../components/Header';
// import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import MusicCard from '../components/MusicCard';
// import Loading from './Loading';

// export default class Favorites extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       favoriteList: [],
//       loaded: false,
//     };
//     this.handleFavs = this.handleFavs.bind(this);
//   }

//   componentDidMount() {
//     this.handleFavs();
//   }

//   handleFavs = async () => {
//     this.setState({
//       loaded: true,
//     });
//     const fav = await getFavoriteSongs();
//     this.setState({
//       loaded: false,
//       favoriteList: fav,
//     }, () => {
//     });
//   }

//   render() {
//     const { loaded, favoriteList } = this.state;
//     return (
//       <div data-testid="page-favorites">
//         <Header />
//         {loaded ? (<Loading />) : (

//           <div>
//             Musicas favoritas:
//             {favoriteList.map((item) => (
//               <MusicCard
//                 key={ item.trackId }
//                 trackName={ item.trackName }
//                 previewUrl={ item.previewUrl }
//                 trackId={ item.trackId }
//               />

//             ))}
//           </div>

//         )}

//       </div>
//     );
//   }
// }
