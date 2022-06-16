//In React, each component has a set of methods that lets you run a piece of code at specific points within the component’s lifetime. constructor(),componenetDidMount()etc.
// myFlix-client/src/main-view/main-view.jsx
import React from "react";
import axios from "axios";

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';


import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";  //LoginView is imported here to get the user details from the MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from "react-bootstrap";
import "./main-view.scss"

class MainView extends React.Component {

  constructor() { ///REACT uses Constructor method to allow components to be rendered in the DOM. If you don’t use the constructor() method, you can’t include any extra code to be executed at the point where the component is created. 
    super();   //super()will call the parent React.Component’s constructor, which will give your class the actual React component’s features. 
    //Also, it will initialize the component’s 'this' variable. Keep in mind that calling super() is a mandatory step whenever you want to include the constructor() method in your component.
    // Initial state is set to null
    this.state = {
      user: null,
      selectedMovie: null,
      directors: [],
      genres: [],
      movies: [],
      FavoriteMovies: [],

    };
  }

  getMovies(token) {
    axios.get('https://myflixs.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
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
      user: null,
    });
  }



  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  //setSelectedMovie(movie) {
  //this.setState({
  //selectedMovie: movie
  //});
  //}

  /* User registers */
  //onRegistration(register) {
  //this.setState({
  //register
  //});
  //}

  render() {  //render() method is the only mandatory method for a class component.
    let { movies } = this.props;

    const { user, selectedMovie, directors, genres, FavoriteMovies } = this.state;

    //if (!register) return <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    //if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>

        <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>

        <NavbarView user={user} />
        <Container>

          <Row className="main-view justify-content-md-center"> {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}

            <Route exact path="/" render={() => { //If there is no user, the LoginView is rendered. If a user is logged in, the user details are passed as a prop to the LoginView
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies} />;

            }} />



            <Route exact path="/login" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
            }} />

            <Route exact path="/register" render={() => {
              if (user) {
                return <Redirect to="/" />;
              }
              return
              <Col>
                <RegistrationView />
              </Col>

            }} />


            <Route exact path="/movies/:movieId" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (

                <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            <Route exact path="/profile" render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />

            <Route path="/genre/:name" render={({ match, history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <GenreView
                    genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
                </Col>
              );
            }} />

            <Route exact path="/director/:name" render={({ match, history }) => {

              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              if (movies.length === 0) {
                return <div className="main-view" />;
              }

              return (
                <Col md={8}>
                  <DirectorView
                    director={movies.find(m => m.Director.Name === match.params.name).Director}
                    onBackClick={() => history.goBack()}
                    movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
                </Col>
              );
            }} />

            <Route path={`/users/${user}`} render={({ history }) => {
              if (!user)
                return <Redirect to="/" />
              return <Col>
                <ProfileView user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}
let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);



