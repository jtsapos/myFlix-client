import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './movie-view.scss'
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export class MovieView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            FavoriteMovies: []
        };
    }

    getUser(token) {
        let user = localStorage.getItem('user');
        axios
            .get(`https://myflixs.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                //assign the result to the state
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch((e) => console.log(e));

    }
    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }

    // Add Favorite movie 
    addFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);
        if (!isFav) {
            axios.post(`https://myflixs.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((response) => {
                    console.log(response.data);
                    alert(
                        `${this.props.movie.Title} has been added to your list of movies`
                    );
                    window.open(`/movies/${this.props.movie._id}`, "_self");
                })
                .catch(e => {
                    console.log('Error')
                });
        } else if (isFav) {
            alert(
                `${this.props.movie.Title} is already present in your list of movies`
            );
        }
    }

    // Delete a movie from Favourite movies 
    removeFavMovie = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.delete(`https://myflixs.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }).then((response) => {
                console.log(response.data);
                alert(
                    `${this.props.movie.Title} has been removed from your list of movies`
                );
                window.open(`/movies/${this.props.movie._id}`, "_self");
            })
            .catch(e => {
                console.log('Error')
            });
    }

    render() {
        const { movie, onBackClick } = this.props;
        const { FavoriteMovies, username, password, email, birthday } = this.state;
        let userFavMovies = this.state.FavoriteMovies;
        let isFav = userFavMovies.includes(this.props.movie._id);

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="movie-view">
                            <Card.Body>
                                <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                                <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                                <Card.Text id="movie-description" className="movie-description">
                                    {movie.Description}</Card.Text>
                                <Link to={`/director/${movie.Director.Name}`}>
                                    <Button variant="link" id="movie-director" className="movie-director">
                                        Director: {movie.Director.Name}</Button>
                                </Link>
                                <Link to={`/genre/${movie.Genre.Name}`}>
                                    <Button variant="link" id="movie-genre" className="movie-gerne">
                                        Genre: {movie.Genre.Name}</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button>
                        {!isFav && (
                            <Button className="add-list__button" variant="warning" onClick={this.addFavMovie}>Add to Favorites</Button>
                        )}
                        {isFav && (
                            <Button className="add-list__button" variant="warning" onClick={this.removeFavMovie}>Remove from Favorites</Button>
                        )}
                        {/*<Button id="movie-view-button" onClick={() => { }}>Add to favorites</Button>*/}
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired
        }),
        Actors: PropTypes.array,
        ImagePath: PropTypes.string
    }).isRequired
};


//export default MovieView;

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onBackClick function is required
*/
