import React from 'react';
import propTypes from 'prop-types';
import "./movie-view.scss"

import { Card, Col, Container, Row, Button } from "react-bootstrap";

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card id="movie-view">
                            <Card.Body>
                                <Card.Img id="movie-view-image" variant="top" src={movie.ImagePath} />
                                <Card.Title id="movie-title" className="movie-title">{movie.Title}</Card.Title>
                                <Card.Text id="movie-description" className="movie-description">{movie.Description}</Card.Text>
                                <Card.Text id="movie-director" className="movie-director">Director: {movie.Director.Name}</Card.Text>
                                <Card.Text id="movie-genre" className="movie-gerne">Genre: {movie.Genre.Name}</Card.Text>

                            </Card.Body>
                        </Card>
                        <Button id="movie-view-button" onClick={() => { onBackClick(null); }}>Back</Button> {/*onClick() event listener sets selectedMovie variable in main-view to null, allowing to return back to list of MovieCards*/}
                        <Button id="movie-view-button" onClick={() => { }}>Add to favorites</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onBackClick function is required
*/
MovieView.propTypes = {
    movie: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string.isRequired,
            Birth: propTypes.string.isRequired,
        }),
        Actors: propTypes.array,
        ImagePath: propTypes.string.isRequired
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};