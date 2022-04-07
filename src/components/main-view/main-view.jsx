// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() { //REACT uses Constructor method to allow component to be rendered in the DOM. If you don’t use the constructor() method, you can’t include any extra code to be executed at the point where the component is created. 
    super(); //super()will call the parent React.Component’s constructor, which will give your class the actual React component’s features. 
    //Also, it will initialize the component’s this variable. Keep in mind that calling super() is a mandatory step whenever you want to include the constructor() method in your component.

    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'desc1...', Director: 'dir1' },
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', Director: 'dir2' },
        { _id: 3, Title: 'Gladiator', Description: 'desc3...', Director: 'dir3' }
      ],
      selectedMovie: null,
      // Set initial user state to null, used for user login --> Default is logged out
      user: null
    };
  }

  //componentDidMount() {
  //axios.get('https://myflixs.herokuapp.com/movies')
  //.then(response => {
  //this.setState({
  //movies: response.data
  //});
  //})
  //.catch(error => {
  //console.log(error);
  //});
  //}

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() { //render() method is the only mandatory method for a class component.
    const { movies, selectedMovie } = this.state;
    //if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;