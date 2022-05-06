//In React, each component has a set of methods that lets you run a piece of code at specific points within the component’s lifetime. constructor(),componenetDidMount()etc.
// myFlix-client/src/main-view/main-view.jsx
import React from "react";
import axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import "./main-view.scss"

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";  //LoginView is imported here to get the user details from the MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavbarView } from "../navbar-view/navbar-view";

export class MainView extends React.Component {

  constructor() { //REACT uses Constructor method to allow components to be rendered in the DOM. If you don’t use the constructor() method, you can’t include any extra code to be executed at the point where the component is created. 
    super();   //super()will call the parent React.Component’s constructor, which will give your class the actual React component’s features. 
    //Also, it will initialize the component’s 'this' variable. Keep in mind that calling super() is a mandatory step whenever you want to include the constructor() method in your component.
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null // Set initial user state to null, used for user login --> Default is logged out. The LoginView is rendered as long as there's no user in the state.
    };
  }

  getMovies(token) {
    axios.get('https://myflixs.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() { //inside the componentDidMount() lifecycle method, query your myFlix API server’s /movies endpoint with a get request using Axios. 
    //Code executed right after the component is added to the DOM
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

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) { //this is updated from login-view (props.onLoggedIn(data))
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token'); //first get the value of the token from localStorage. If the access token is present, it means the user is already logged in and you can call the getMovies method, which makes a GET request to the “movies” endpoint
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* User registers */
  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {  //render() method is the only mandatory method for a class component.
    const { movies, selectedMovie, user, register } = this.state;

    //if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Container>

        <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>

        <Row>
          <NavbarView user={user} />

        </Row>
        <Row className="main-view justify-content-md-center"> {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie
            ? (
              <Col md={6}>
                <MovieView movie={selectedMovie}
                  onBackClick={newSelectedMovie => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            )
            : (
              movies.map(movie => (
                <Col md={6} lg={4}>
                  <MovieCard key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))
            )
          }
        </Row>

      </Container>
    );
  }
}
export default MainView;

MainView.propTypes = {};


