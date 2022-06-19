//In React, each component has a set of methods that lets you run a piece of code at specific points within the component’s lifetime. constructor(),componenetDidMount()etc.
// myFlix-client/src/main-view/main-view.jsx
import React from "react";
import axios from "axios";

import { connect } from 'react-redux'; //Connect is used to connect the MainView component to an action which allows you to receive the actual action as a prop.
//It’s meant to wrap any stateful component to connect it to a store.

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//modify your MainView component so it doesn’t store the movies list in its own, private state, but instead uses React Redux to update the store. 
//This ensures you’ll be able to modify the rest of the app so it uses the store as well.

// #0 imported the relevant actions (setMovies). 
//This action will be used in code section #5, where you connect it to the MainView using, again, the connect() function, which returns another function.
//this is basically a way of wrapping inputs and outputs to a component.
//Connecting the MainView component to an action allows you to receive the actual action as a prop.
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";  //LoginView is imported here to get the user details from the MainView
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";
import userData from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from "react-bootstrap";
import "./main-view.scss"

// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() { ///REACT uses Constructor method to allow components to be rendered in the DOM. If you don’t use the constructor() method, you can’t include any extra code to be executed at the point where the component is created. 
    super();   //super()will call the parent React.Component’s constructor, which will give your class the actual React component’s features. 
    //Also, it will initialize the component’s 'this' variable. Keep in mind that calling super() is a mandatory step whenever you want to include the constructor() method in your component.
    // Initial state is set to null

    // #3 movies state removed from here
    this.state = {
      user: null,
      selectedMovie: null,
      directors: [],
      genres: [],
      movies: [],
      FavoriteMovies: [],
      usr: {},

    };
  }

  getMovies(token) {
    axios.get('https://myflixs.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        // #4
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) { //this is updated from login-view (props.onLoggedIn(data))
    //console.log(authData);
    this.setState({
      usr: authData.user,
      user: authData.user.Username,
      FavoriteMovies: authData.user.FavoriteMovies,
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

  render() {  //render() method is the only mandatory method for a class component.

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props; //MoviesList’s props contain two properties; the second being movies, which is passed here in the render method.
    const { user, selectedMovie, directors, genres, FavoriteMovies } = this.state;

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

              // #6 MoviesList component expressed in the render() function receives the movies from the store in stages. 
              //First, the movies state is extracted from the store through the connect() function before being passed as the movies prop for the MainView component. 
              //Finally, the movies prop is passed to MoviesList as a prop of the same name, movies.
              return <MoviesList movies={movies} />;
            }} />

            {/* The rest of the routes */}
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

            <Route exact path="/users/:Username" render={({ history }) => {
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

// #7
let mapStateToProps = state => { //mapStateToProps is a function that—if defined—will allow the component (the one you want to connect) to subscribe to store updates. 
  //Any time the store is updated, this function will be called. should take a state (the store state) as an argument and return the new props for the component. 
  //Think of this function as picking what your component needs from your application’s global state (and possibly transforming it a little).
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies })(MainView); //connects MainView component to the store



