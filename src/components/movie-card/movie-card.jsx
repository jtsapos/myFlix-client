import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return (<div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>); //here are two props: one function (onMovieClick) and one object (movie)
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Director: PropTypes.string.isRequired,
        Actors: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};