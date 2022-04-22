import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Container, Button, Card } from "react-bootstrap";

import './movie-card.scss'


export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;
        return (

            <Container>
                <CardGroup>
                    <Card id="movie-card">
                        <a><Card.Img variant="top" src={movie.ImagePath} /></a>
                        <Card.Body>
                            <Card.Title id="card-title">{movie.Title}</Card.Title>
                            <Button id="card-button" onClick={() => onMovieClick(movie)} variant="link">Show more</Button>
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
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Actors: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
//export default MovieCard;

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onMovieClick function is required
*/
//MovieCard.propTypes = {
  //  movie: PropTypes.shape({
  //      Title: PropTypes.string.isRequired,
  //      Description: PropTypes.string.isRequired,
  //      Genre: PropTypes.shape({
  //          Name: PropTypes.string.isRequired
  //      }),
  //      Director: PropTypes.shape({
  //          Name: PropTypes.string.isRequired
  //      }),
  //      Actors: PropTypes.string.isRequired,
  //      ImagePath: PropTypes.shape
  //  }).isRequired,
  //  onMovieClick: PropTypes.func.isRequired
//};