import React from 'react';
import PropTypes from 'prop-types';
import './movie-card.scss'
import { CardGroup, Container, Button, Card } from "react-bootstrap";


import { Link } from 'react-router-dom'


export class MovieCard extends React.Component {

    render() {
        const { movie } = this.props;
        return (

            <Container>
                <CardGroup>
                    <Card id="movie-card">
                        <a><Card.Img variant="top" src={movie.ImagePath} /></a>
                        <Card.Body>
                            <Card.Title id="card-title">{movie.Title}</Card.Title>
                            <Link to={`/movies/${movie._id}`}>
                                <Button id="card-button" variant="link">Show more</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
        )
    };
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
//export default MovieCard;

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onMovieClick function is required
*/
