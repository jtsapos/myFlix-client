import React from 'react';
import PropTypes from 'prop-types';
import "./movie-card.scss"

import { CardGroup, Container, Button, Card } from "react-bootstrap";

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
                            {/*<Card.Text>{movie.Description}</Card.Text>*/}
                            <Button id="card-button" onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
        )

    };
}
/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onMovieClick function is required
*/
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        //Description: PropTypes.string.isRequired,
        //Genre: PropTypes.shape({
        //  Name: PropTypes.string.isRequired
        //}),
        //Director: PropTypes.shape({
        //  Name: PropTypes.string.isRequired
        //})
        //Actors: PropTypes.string.isRequired,
        //ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};