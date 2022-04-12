import React from 'react';
import propTypes from 'prop-types';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;
        return (
            <div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div> // onClick() event listener sets selectedMovie variable in main-view to null, allowing to return back to list of MovieCards

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
        Title: propTypes.string,
        Description: propTypes.string.isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired
        }),
        Director: propTypes.shape({
            Name: propTypes.string.isRequired
        })
        //Actors: propTypes.string.isRequired,
        //ImagePath: propTypes.string.isRequired
    }).isRequired,
    onBackClick: propTypes.func.isRequired
};