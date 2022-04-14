//In React, each component has a set of methods that lets you run a piece of code at specific points within the component’s lifetime. constructor(),componenetDidMount()etc.
// myFlix-client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios'; //An ajax operation, Axios will fetch the movies, then set the state of movies using this.setState.
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'; //import the Row Bootstrap component into “main-view.jsx"
import { LoginView } from '../login-view/login-view'; //LoginView is imported here to get the user details from the MainView
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

class MainView extends React.Component {

  constructor() { //REACT uses Constructor method to allow components to be rendered in the DOM. If you don’t use the constructor() method, you can’t include any extra code to be executed at the point where the component is created. 
    super(); //super()will call the parent React.Component’s constructor, which will give your class the actual React component’s features. 
    //Also, it will initialize the component’s 'this' variable. Keep in mind that calling super() is a mandatory step whenever you want to include the constructor() method in your component.
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null // Set initial user state to null, used for user login --> Default is logged out. The LoginView is rendered as long as there's no user in the state. 
    };
  }

  componentDidMount() { //inside the componentDidMount() lifecycle method, query your myFlix API server’s /movies endpoint with a get request using Axios. Code executed right after the component is added to the DOM
    axios.get('https://myflixs.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) { /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
    this.setState({
      selectedMovie: movie
    });
  }

  /* User registers */
  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

  onLoggedIn(user) { /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
    this.setState({
      user
    });
  }

  render() { //render() method is the only mandatory method for a class component.
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">

        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie ? (
          <Row>
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} /> {/*onBackClick prop is used in movie-view <button> element as function passed to onClick() event listener*/}
          </Row>
        )
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} /> // onMovieClick prop is used in movie-card <div> element as function passed to onClick() event listener
          ))
        }
      </div>
    );
  }
}
MainView.propTypes = {};

export default MainView;